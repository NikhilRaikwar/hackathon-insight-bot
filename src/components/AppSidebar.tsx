import * as React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Brain, Plus, MessageSquare, Settings, HelpCircle, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Mock chat history data
const chatHistory = [
  { id: "1", title: "TechCrunch Disrupt 2024", lastMessage: "What are the main tracks?" },
  { id: "2", title: "MIT Hackathon", lastMessage: "When is the submission deadline?" },
  { id: "3", title: "ETHGlobal Paris", lastMessage: "Prize breakdown details" },
];

const navigationItems = [
  { title: "Settings", icon: Settings, url: "#" },
  { title: "Help", icon: HelpCircle, url: "#" },
  { title: "Templates", icon: FileText, url: "#" },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { signOut } = useAuth();
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  const handleAddChat = () => {
    if (newChatTitle.trim()) {
      // TODO: Implement actual chat creation
      console.log("Creating new chat:", newChatTitle);
      setNewChatTitle("");
      setIsAddChatOpen(false);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">
            HackGPT
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Dialog open={isAddChatOpen} onOpenChange={setIsAddChatOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mx-2 mb-4 flex items-center gap-2" variant="outline">
                  <Plus className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start New Chat</DialogTitle>
                  <DialogDescription>
                    Create a new chat session for your event or hackathon.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chat-title">Chat Title</Label>
                    <Input
                      id="chat-title"
                      placeholder="e.g., TechCrunch Disrupt 2024"
                      value={newChatTitle}
                      onChange={(e) => setNewChatTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddChatOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddChat}>Create Chat</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <a href="#" className="flex items-center gap-3 py-2">
                      <MessageSquare className="w-4 h-4" />
                      <div className="flex-1 group-data-[collapsible=icon]:hidden">
                        <div className="font-medium text-sm truncate">{chat.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage}
                        </div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={signOut}
              >
                <LogOut className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}