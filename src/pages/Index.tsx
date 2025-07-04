import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Brain, MessageSquare, Database, Globe, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent">
                HackGPT
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Login</Link>
              <Link to="/auth">
                <Button variant="gradient" size="sm">Get Started</Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link to="/auth">
                <Button variant="gradient" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Transform{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Hackathon Data
                  </span>{" "}
                  Into Intelligent Conversations
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Your AI-Powered Event Assistant That Makes Hackathon Information Instantly Accessible
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                    Try HackGPT Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Chat Demo */}
            <div className="relative">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-md ml-auto">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Brain className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="font-medium">HackGPT Assistant</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm">What are the prizes for this hackathon?</p>
                    </div>
                    <div className="bg-gradient-primary rounded-lg p-3">
                      <p className="text-sm text-primary-foreground">
                        The hackathon offers $50,000 in total prizes including...
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm">When is the submission deadline?</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      AI is typing...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything You Need to{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Master Events
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform any hackathon or event URL into an intelligent, conversational knowledge base
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle>Instant Event Intelligence</CardTitle>
                <CardDescription>
                  Submit any hackathon URL and our AI instantly crawls and processes all event information, making it searchable and accessible.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle>Smart Q&A System</CardTitle>
                <CardDescription>
                  Ask questions in natural language and get intelligent, contextual answers powered by GPT technology and your event data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>Unified Knowledge Hub</CardTitle>
                <CardDescription>
                  Manage multiple event URLs in one place with centralized chat history and intelligent knowledge management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Your Command Center for{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Event Intelligence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of HackGPT with our intuitive dashboard designed for event organizers and participants
            </p>
          </div>

          <div className="relative">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold">Dashboard</h3>
                      <Badge variant="secondary">3 Active Events</Badge>
                    </div>
                    <Button variant="gradient" size="sm">Add Event</Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Event URLs */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Event URLs
                      </h4>
                      <div className="space-y-2">
                        {[
                          { name: "TechCrunch Disrupt 2024", status: "Processing", color: "yellow" },
                          { name: "MIT Hackathon", status: "Ready", color: "green" },
                          { name: "ETHGlobal Paris", status: "Ready", color: "green" }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${event.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                              <span className="text-sm">{event.name}</span>
                            </div>
                            <Badge variant={event.color === 'green' ? 'default' : 'secondary'} className="text-xs">
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Assistant */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        AI Assistant
                      </h4>
                      <div className="space-y-3 p-4 bg-background/50 rounded-lg min-h-[200px]">
                        <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">What are the main tracks for TechCrunch Disrupt?</p>
                        </div>
                        <div className="bg-gradient-primary rounded-lg p-3 max-w-[85%] ml-auto">
                          <p className="text-sm text-primary-foreground">
                            TechCrunch Disrupt 2024 features 5 main tracks: AI/ML, FinTech, HealthTech, Climate Tech, and Future of Work. Each track has specific judging criteria and specialized mentors.
                          </p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 max-w-[70%]">
                          <p className="text-sm">When is the demo day?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Link to="/auth">
                <Button variant="gradient" size="lg">Experience This Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent">
                HackGPT
              </span>
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              AI-powered hackathon assistant making event information instantly accessible
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 HackGPT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;