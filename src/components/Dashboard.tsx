import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ChatInterface } from './ChatInterface';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'crawling': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  if (selectedEventId) {
    return (
      <ChatInterface 
        eventId={selectedEventId} 
        onBack={() => setSelectedEventId(null)} 
      />
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-border">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex-1">
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.email}
              </span>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
              {/* URL Submission */}
              <div className="aspect-video rounded-xl bg-card border border-border p-4">
                <Card className="h-full border-0 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Submit Event URL</CardTitle>
                    <CardDescription className="text-sm">
                      Add a hackathon or event URL to create a custom Q&A chatbot
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <form onSubmit={handleSubmitUrl} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="name" className="text-xs">Event Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="e.g., DevPost Hackathon 2024"
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="url" className="text-xs">Event URL</Label>
                        <Input
                          id="url"
                          name="url"
                          type="url"
                          placeholder="https://example.com/hackathon"
                          required
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button type="submit" className="w-full h-8 text-sm" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit URL'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Events List */}
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Your Events</CardTitle>
                    <CardDescription className="text-sm">
                      Manage your submitted events and chat with their AI assistants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-muted-foreground text-sm">Loading events...</p>
                      </div>
                    ) : events.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground text-sm">No events submitted yet.</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submit your first event URL to get started!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {events.map((event) => (
                          <div key={event.id} className="p-3 border border-border rounded-lg bg-background">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium text-sm">{event.name}</h3>
                              <Badge className={getStatusColor(event.status)} variant="outline">
                                {event.status}
                              </Badge>
                            </div>
                            {event.description && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {event.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mb-2 break-all">
                              {event.original_url}
                            </p>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Added {new Date(event.created_at).toLocaleDateString()}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => setSelectedEventId(event.id)}
                                disabled={event.status !== 'completed'}
                                className="h-7 text-xs"
                              >
                                {event.status === 'completed' ? 'Chat' : 'Processing...'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};