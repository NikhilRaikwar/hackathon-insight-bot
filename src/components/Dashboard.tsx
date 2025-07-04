import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  const { user, signOut } = useAuth();
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
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Event Insight Bot
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* URL Submission */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Submit Event URL</CardTitle>
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
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit URL'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Your Events</CardTitle>
                <CardDescription>
                  Manage your submitted events and chat with their AI assistants
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Loading events...</p>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No events submitted yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Submit your first event URL to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="p-4 border border-border/50 rounded-lg bg-background/50">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{event.name}</h3>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mb-3">
                          {event.original_url}
                        </p>
                        <Separator className="my-3" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Added {new Date(event.created_at).toLocaleDateString()}
                          </span>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setSelectedEventId(event.id)}
                            disabled={event.status !== 'completed'}
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
    </div>
  );
};