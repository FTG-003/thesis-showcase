import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Subscription Successful!",
        description: "You'll receive updates about new research and insights.",
      });
      setEmail('');
    }
  };

  return (
    <Card className="glass rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          {isSubscribed ? (
            <CheckCircle className="w-8 h-8 text-white" />
          ) : (
            <Mail className="w-8 h-8 text-white" />
          )}
        </div>
        <CardTitle className="text-2xl font-serif">Stay Updated</CardTitle>
        <CardDescription className="text-lg">
          Get notified about new research publications and insights
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {isSubscribed ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-success font-medium">
              ✓ Successfully subscribed!
            </p>
            <Button 
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              className="glass"
            >
              Subscribe Another Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass text-lg h-12"
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-12 text-lg"
            >
              Subscribe to Updates
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};