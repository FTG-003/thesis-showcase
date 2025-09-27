import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CitationGenerator = () => {
  const { toast } = useToast();
  
  const citations = {
    apa: "Terzi, F. (2024). Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength. Pyragogy Research Initiative. https://pyragogy.org",
    mla: "Terzi, Fabrizio. \"Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength.\" Pyragogy Research Initiative, 2024, pyragogy.org.",
    chicago: "Terzi, Fabrizio. \"Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength.\" Pyragogy Research Initiative. Accessed December 2024. https://pyragogy.org",
    ieee: "F. Terzi, \"Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength,\" Pyragogy Research Initiative, 2024. [Online]. Available: https://pyragogy.org"
  };

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Citation Copied!",
        description: `${format.toUpperCase()} citation copied to clipboard`,
      });
    } catch (err) {
      console.error('Failed to copy citation: ', err);
    }
  };

  return (
    <Card className="glass rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-serif">Citation Generator</CardTitle>
        <CardDescription className="text-lg">
          Ready-to-use citations in multiple academic formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apa" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="apa">APA</TabsTrigger>
            <TabsTrigger value="mla">MLA</TabsTrigger>
            <TabsTrigger value="chicago">Chicago</TabsTrigger>
            <TabsTrigger value="ieee">IEEE</TabsTrigger>
          </TabsList>
          
          {Object.entries(citations).map(([format, citation]) => (
            <TabsContent key={format} value={format} className="mt-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-2xl border border-muted">
                  <p className="text-sm leading-relaxed font-mono">
                    {citation}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(citation, format)}
                  className="w-full glass hover:bg-primary/10 transition-all duration-300"
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy {format.toUpperCase()} Citation
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};