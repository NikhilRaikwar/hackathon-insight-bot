import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-card">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Event Insight Bot
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your AI-powered event information assistant. Submit any hackathon or event URL and get instant answers about prizes, rules, deadlines, and more.
        </p>
        <div className="space-x-4">
          <Button onClick={() => navigate('/auth')} variant="hero" size="lg">
            Get Started
          </Button>
          <Button onClick={() => navigate('/auth')} variant="outline" size="lg">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
