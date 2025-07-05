import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from '@/components/AppSidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ChatInterface } from './ChatInterface';
import { MagicCard } from '@/components/magicui/magic-card';
import { SmoothCursor } from '@/components/magicui/smooth-cursor';

interface Event {
  id: string;
  name: string;
  description: string | null;
  original_url: string;
  status: 'pending' | 'crawling' | 'completed' | 'failed';
  created_at: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'User';
  };

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents((data as Event[]) || []);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    const name = formData.get('name') as string;

    try {
      // Basic URL validation
      new URL(url);

      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: user?.id,
          name: name || 'Untitled Event',
          original_url: url,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Start crawling process
      const { error: crawlError } = await supabase.functions.invoke('crawl-event', {
        body: { eventId: data.id, url }
      });

      if (crawlError) {
        console.error('Crawl error:', crawlError);
        toast.error('Failed to start crawling process');
      } else {
        toast.success('URL submitted! Crawling started...');
        loadEvents();
        (e.target as HTMLFormElement).reset();
        // Automatically redirect to the chat page
        setSelectedEventId(data.id);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        toast.error('Please enter a valid URL');
      } else {
        console.error('Error submitting URL:', error);
        toast.error('Failed to submit URL');
      }
    } finally {
      setSubmitting(false);
    }
  };


  if (selectedEventId) {
    return (
      <ChatInterface 
        eventId={selectedEventId} 
        onBack={() => setSelectedEventId(null)}
        onEventSelect={setSelectedEventId}
      />
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar onEventSelect={setSelectedEventId} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    HackGPT Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Welcome Message */}
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {getUserDisplayName()}!
            </h1>
            <p className="text-muted-foreground">
              Chat with HackGPT about your hackathons and events
            </p>
          </div>

          {/* Event URL Form */}
          <div className="max-w-md mx-auto w-full relative">
            <MagicCard
              gradientColor="#3B82F6"
              className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Add Event URL
                  </CardTitle>
                  <CardDescription>
                    Add a hackathon or event URL to create a custom Q&A chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitUrl} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Event Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., DevPost Hackathon 2024"
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">Event URL</Label>
                      <Input
                        id="url"
                        name="url"
                        type="url"
                        placeholder="https://example.com/hackathon"
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit URL'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </MagicCard>
          </div>

        </div>
      </SidebarInset>
      <SmoothCursor />
    </SidebarProvider>
  );
};