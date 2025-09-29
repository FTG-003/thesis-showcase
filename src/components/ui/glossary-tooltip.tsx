import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'biological' | 'educational' | 'methodological' | 'theoretical';
  relatedTerms?: string[];
  reference?: string;
}

const glossaryData: Record<string, GlossaryTerm> = {
  'intraspecific selection': {
    term: 'Intraspecific Selection',
    definition: 'Evolutionary pressure occurring within a single species, where individuals compete for resources, mates, or survival advantages. In this thesis, the concept is transposed to educational contexts where ideas compete within learning communities.',
    category: 'biological',
    relatedTerms: ['cognitive selection', 'epistemic competition'],
    reference: 'Darwin, 1859; Modern Synthesis'
  },
  'pyragogy': {
    term: 'Pyragogy',
    definition: 'A novel educational methodology introduced in this thesis that integrates Cognitive Reciprocation, Ritualization of Conflict, and non-agentive AI facilitation to build collective intelligence rather than individual performance.',
    category: 'methodological',
    relatedTerms: ['cognitive reciprocation', 'collective intelligence'],
    reference: 'Terzi, 2024'
  },
  'cognitive reciprocation': {
    term: 'Cognitive Reciprocation',
    definition: 'A process where learners exchange and build upon each other\'s ideas systematically, creating cognitive feedback loops that strengthen collective understanding rather than individual knowledge accumulation.',
    category: 'educational',
    relatedTerms: ['pyragogy', 'collective intelligence'],
    reference: 'Terzi, 2024'
  },
  'epistemic competition': {
    term: 'Epistemic Competition',
    definition: 'The competitive process by which ideas, theories, and knowledge claims compete for acceptance and integration within educational environments, analogous to biological natural selection.',
    category: 'theoretical',
    relatedTerms: ['intraspecific selection', 'idea evolution'],
    reference: 'Popper, 1972; Terzi, 2024'
  },
  'collective intelligence': {
    term: 'Collective Intelligence',
    definition: 'The enhanced capacity that results from collaboration, collective efforts, and competition among many individuals. In educational contexts, it refers to the emergent intelligence of learning communities.',
    category: 'theoretical',
    relatedTerms: ['pyragogy', 'cognitive reciprocation'],
    reference: 'Lévy, 1997; Surowiecki, 2004'
  },
  'educational quality intelligence': {
    term: 'Educational Quality Intelligence (EQI)',
    definition: 'A proposed framework of metrics for measuring the effectiveness of educational approaches based on their ability to foster collective cognitive development rather than individual performance alone.',
    category: 'methodological',
    relatedTerms: ['assessment metrics', 'collective outcomes'],
    reference: 'Terzi, 2024'
  },
  'ritualization of conflict': {
    term: 'Ritualization of Conflict',
    definition: 'A structured approach to intellectual disagreement where conflicting ideas are systematically examined through established protocols, transforming potential destructive debate into constructive knowledge evolution.',
    category: 'methodological',
    relatedTerms: ['pyragogy', 'epistemic competition'],
    reference: 'Lorenz, 1966; Terzi, 2024'
  },
  'ideoevo': {
    term: 'IdeoEvo',
    definition: 'The pilot project proposed in this thesis that applies evolutionary principles to idea development within educational settings, creating environments where concepts evolve through systematic selection pressures.',
    category: 'methodological',
    relatedTerms: ['pilot project', 'applied methodology'],
    reference: 'Terzi, 2024'
  }
};

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

const getCategoryColor = (category: GlossaryTerm['category']) => {
  switch (category) {
    case 'biological': return 'bg-success/10 text-success border-success/20';
    case 'educational': return 'bg-primary/10 text-primary border-primary/20';
    case 'methodological': return 'bg-accent/10 text-accent border-accent/20';
    case 'theoretical': return 'bg-warning/10 text-warning border-warning/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const GlossaryTooltip = ({ term, children, className }: GlossaryTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const glossaryEntry = glossaryData[term.toLowerCase()];

  if (!glossaryEntry) {
    return <span className={className}>{children}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span 
            className={`cursor-help underline decoration-dotted decoration-primary/50 hover:decoration-primary transition-all duration-200 ${className}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 glass border-border/50 shadow-strong">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-semibold text-foreground">
                {glossaryEntry.term}
              </h4>
              <Badge 
                variant="outline" 
                className={`text-xs ${getCategoryColor(glossaryEntry.category)}`}
              >
                {glossaryEntry.category}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {glossaryEntry.definition}
            </p>
            
            {glossaryEntry.relatedTerms && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Related terms:</p>
                <div className="flex flex-wrap gap-1">
                  {glossaryEntry.relatedTerms.map((relatedTerm) => (
                    <Badge 
                      key={relatedTerm} 
                      variant="secondary" 
                      className="text-xs bg-muted/50 hover:bg-muted cursor-pointer"
                    >
                      {relatedTerm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {glossaryEntry.reference && (
              <div className="flex items-center gap-1 pt-2 border-t border-border/30">
                <BookOpen className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground italic">
                  {glossaryEntry.reference}
                </span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Helper component for easy wrapping of terms in content
export const GlossaryText = ({ children }: { children: string }) => {
  const terms = Object.keys(glossaryData);
  
  const processText = (text: string) => {
    let processedText = text;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    terms.forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(processedText)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          elements.push(processedText.slice(lastIndex, match.index));
        }
        
        // Add the glossary term
        elements.push(
          <GlossaryTooltip key={`${term}-${match.index}`} term={term}>
            {match[0]}
          </GlossaryTooltip>
        );
        
        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < processedText.length) {
      elements.push(processedText.slice(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  return <>{processText(children)}</>;
};