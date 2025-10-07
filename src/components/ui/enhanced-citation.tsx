import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Copy, 
  Download, 
  Check, 
  FileText, 
  BookOpen, 
  GraduationCap,
  Calendar,
  User,
  Link2
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CitationStyle {
  name: string;
  code: string;
  description: string;
  format: (data: CitationData) => string;
}

interface CitationData {
  author: string;
  title: string;
  year: string;
  publisher: string;
  url: string;
  accessDate: string;
  doi?: string;
  pages?: string;
}

const defaultCitationData: CitationData = {
  author: 'Terzi, F.',
  title: 'Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength — A Framework for Educational Evolution',
  year: '2025',
  publisher: 'Pyragogy Research Initiative',
  url: 'https://docs.pyragogy.org/core/why/',
  doi: '10.5281/zenodo.placeholder'
};

const citationStyles: CitationStyle[] = [
  {
    name: 'APA 7th Edition',
    code: 'apa',
    description: 'American Psychological Association',
    format: (data) => 
      `${data.author} (${data.year}). ${data.title}. ${data.publisher}. ${data.url}`
  },
  {
    name: 'MLA 9th Edition',
    code: 'mla',
    description: 'Modern Language Association',
    format: (data) => 
      `${data.author} "${data.title}." ${data.publisher}, ${data.year}, ${data.url}.`
  },
  {
    name: 'Chicago 17th Edition',
    code: 'chicago',
    description: 'Chicago Manual of Style',
    format: (data) => 
      `${data.author} "${data.title}." ${data.publisher}, ${data.year}. ${data.url}.`
  },
  {
    name: 'Harvard',
    code: 'harvard',
    description: 'Harvard Referencing System',
    format: (data) => 
      `${data.author} ${data.year}, '${data.title}', ${data.publisher}, <${data.url}>.`
  },
  {
    name: 'IEEE',
    code: 'ieee',
    description: 'Institute of Electrical and Electronics Engineers',
    format: (data) => 
      `${data.author} "${data.title}," ${data.publisher}, ${data.year}. [Online]. Available: ${data.url}.`
  },
  {
    name: 'Vancouver',
    code: 'vancouver',
    description: 'International Committee of Medical Journal Editors',
    format: (data) => 
      `${data.author} ${data.title}. ${data.publisher}; ${data.year}. Available from: ${data.url}`
  },
  {
    name: 'BibTeX',
    code: 'bibtex',
    description: 'Bibliography processor for LaTeX',
    format: (data) => 
`@misc{terzi2025cognitive,
  author = {${data.author.replace('.', '')}},
  title = {${data.title}},
  year = {${data.year}},
  publisher = {${data.publisher}},
  url = {${data.url}}
}`
  },
  {
    name: 'EndNote',
    code: 'endnote',
    description: 'Reference management software',
    format: (data) => 
`%0 Thesis
%A ${data.author.replace('.', '')}
%T ${data.title}
%D ${data.year}
%I ${data.publisher}
%U ${data.url}`
  },
  {
    name: 'Zotero RIS',
    code: 'zotero',
    description: 'Research Information Systems format',
    format: (data) => 
`TY  - THES
AU  - ${data.author.replace('.', '')}
TI  - ${data.title}
PY  - ${data.year}
PB  - ${data.publisher}
UR  - ${data.url}
ER  -`
  },
  {
    name: 'JSON-LD',
    code: 'jsonld',
    description: 'Structured data format',
    format: (data) => 
`{
  "@context": "https://schema.org",
  "@type": "Thesis",
  "author": {
    "@type": "Person",
    "name": "${data.author.replace('.', '')}"
  },
  "name": "${data.title}",
  "datePublished": "${data.year}",
  "publisher": {
    "@type": "Organization",
    "name": "${data.publisher}"
  }
}`
  }
];

export const EnhancedCitation = () => {
  const [citationData, setCitationData] = useState<CitationData>(defaultCitationData);
  const [copiedStyles, setCopiedStyles] = useState<Set<string>>(new Set());
  const [isCustomizing, setIsCustomizing] = useState(false);

  const copyToClipboard = async (text: string, style: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStyles(prev => new Set([...prev, style]));
      toast({
        title: "Citation Copied!", description: `${citationStyles.find(s => s.code === style)?.name} citation copied to clipboard.`
      });
      
      setTimeout(() => {
        setCopiedStyles(prev => {
          const newSet = new Set(prev);
          newSet.delete(style);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      toast.error("Error", { description: "Failed to copy citation." });
    }
  };

  const downloadCitation = (style: CitationStyle) => {
    const citation = style.format(citationData);
    const blob = new Blob([citation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citation-${style.code}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Citation Downloaded!",
      description: `${style.name} citation saved as text file.`
    });
  };

  const downloadAllCitations = () => {
    const allCitations = citationStyles.map(style => 
      `${style.name}\n${'-'.repeat(style.name.length)}\n${style.format(citationData)}\n\n`
    ).join('');
    
    const blob = new Blob([allCitations], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all-citations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateCitationData = (field: keyof CitationData, value: string) => {
    setCitationData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="glass shadow-strong hover:shadow-glow transition-all duration-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-serif">
              <BookOpen className="w-5 h-5 text-primary" />
              Enhanced Citation Generator
            </CardTitle>
            <CardDescription>
              Generate citations in 10+ academic formats with customization options
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {isCustomizing ? 'Hide' : 'Customize'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAllCitations}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Customization Panel */}
        {isCustomizing && (
          <Card className="mb-6 bg-muted/30 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Citation Details</CardTitle>
              <CardDescription>
                Customize the citation information for different contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={citationData.author}
                    onChange={(e) => updateCitationData('author', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={citationData.year}
                    onChange={(e) => updateCitationData('year', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={citationData.title}
                    onChange={(e) => updateCitationData('title', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    value={citationData.publisher}
                    onChange={(e) => updateCitationData('publisher', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="doi">DOI (optional)</Label>
                  <Input
                    id="doi"
                    value={citationData.doi || ''}
                    onChange={(e) => updateCitationData('doi', e.target.value)}
                    placeholder="10.1000/xyz123"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Citation Styles */}
        <Tabs defaultValue="apa" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-6">
            {citationStyles.slice(0, 5).map((style) => (
              <TabsTrigger key={style.code} value={style.code} className="text-xs">
                {style.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid gap-4">
            {citationStyles.map((style) => (
              <TabsContent key={style.code} value={style.code} className="mt-0">
                <Card className="bg-muted/30 border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{style.name}</CardTitle>
                        <CardDescription>{style.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {style.code.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/30 mb-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {style.format(citationData)}
                      </pre>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(style.format(citationData), style.code)}
                        className="flex items-center gap-2"
                      >
                        {copiedStyles.has(style.code) ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedStyles.has(style.code) ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadCitation(style)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {/* Quick Access for All Styles */}
            <Accordion type="single" collapsible className="w-full mt-6">
              <AccordionItem value="all-formats" className="border-t border-border/30">
                <AccordionTrigger className="text-base font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Show All Citation Formats
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3 pt-4">
                    {citationStyles.slice(5).map((style) => (
                      <Card key={style.code} className="bg-muted/20 border-border/30">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {style.name}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {style.description}
                                </span>
                              </div>
                              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                                {style.format(citationData)}
                              </pre>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(style.format(citationData), style.code)}
                                className="h-8 w-8 p-0"
                              >
                                {copiedStyles.has(style.code) ? (
                                  <Check className="w-3 h-3 text-success" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => downloadCitation(style)}
                                className="h-8 w-8 p-0"
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{citationStyles.length}</div>
            <div className="text-xs text-muted-foreground">Citation Formats</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">47</div>
            <div className="text-xs text-muted-foreground">Recently Copied</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">2025</div>
            <div className="text-xs text-muted-foreground">Publication Year</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};