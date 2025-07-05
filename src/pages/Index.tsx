import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Brain, MessageSquare, Database, Globe, Zap, Shield, Link as LinkIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import { MagicCard } from "@/components/magicui/magic-card";
import { DashboardPreview } from "@/components/DashboardPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Transform{" "}
                  <span className="text-primary">
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
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Try HackGPT Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Chat Demo */}
            <div className="relative">
              <MagicCard
                gradientColor="rgba(120, 119, 198, 0.3)"
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                <div className="relative z-10">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="text-center pb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        AI Chat Demo
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        See how HackGPT answers questions about your events
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">User:</p>
                          <p className="text-sm">What are the main tracks for this hackathon?</p>
                        </div>
                        <div className="bg-primary rounded-lg p-4">
                          <p className="text-sm text-primary-foreground mb-2">HackGPT:</p>
                          <p className="text-sm text-primary-foreground">
                            This hackathon features 5 main tracks: AI/ML, FinTech, HealthTech, Climate Tech, and Future of Work. Each track has specific judging criteria and specialized mentors available.
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">User:</p>
                          <p className="text-sm">When is the demo day?</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </MagicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Event Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of HackGPT with our intuitive dashboard designed for event organizers and participants
            </p>
          </div>

          {/* Interactive Dashboard Preview */}
          <div className="mb-12">
            <DashboardPreview />
          </div>
          
          <div className="text-center">
            <Link to="/auth">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Experience This Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
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