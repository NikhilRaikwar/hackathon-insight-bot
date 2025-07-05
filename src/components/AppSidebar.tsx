"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Brain, MessageSquare } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

import { NavMain } from "@/components/NavMain"
import { NavUser } from "@/components/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Event {
  id: string;
  name: string;
  description: string | null;
  original_url: string;
  status: 'pending' | 'crawling' | 'completed' | 'failed';
  created_at: string;
}

export function AppSidebar({ onEventSelect, ...props }: React.ComponentProps<typeof Sidebar> & { 
  onEventSelect?: (eventId: string) => void 
}) {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents((data as Event[]) || []);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const chatHistoryItems = events.map(event => ({
    title: event.name,
    url: "#",
    icon: MessageSquare,
    onClick: () => onEventSelect?.(event.id)
  }));

  const userData = {
    name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'User',
    email: user?.email || '',
    avatar: user?.user_metadata?.avatar_url
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Brain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">HackGPT</span>
                  <span className="truncate text-xs">AI Assistant</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={chatHistoryItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}