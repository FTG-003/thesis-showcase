import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  section: string;
  element?: HTMLElement;
}

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Content indexing for search
  const searchableContent = [
    {
      id: 'abstract-intro',
      title: 'Executive Summary Introduction',
      content: 'This thesis presents a groundbreaking transposition of biological intraspecific selection to educational contexts, reimagining how ideas compete, evolve, and strengthen collective intelligence.',
      section: 'abstract'
    },
    {
      id: 'core-framework',
      title: 'Core Framework',
      content: 'By treating ideas as the fundamental unit of selection rather than individuals, we explore four critical isomorphisms: variation in educational approaches, selection through epistemic competition, heritability of successful pedagogical patterns, and adaptation to learning environments.',
      section: 'abstract'
    },
    {
      id: 'pyragogy-methodology',
      title: 'Pyragogy Methodology',
      content: 'The framework introduces Pyragogy—a novel approach integrating Cognitive Reciprocation, Ritualization of Conflict, and non-agentive AI facilitation for collective intelligence building.',
      section: 'abstract'
    },
    {
      id: 'impact-implementation',
      title: 'Impact & Implementation',
      content: 'Through proposed Educational Quality Intelligence (EQI) metrics and the innovative IdeoEvo pilot project, this research offers practical pathways from traditional individualistic education toward collective cognitive strength.',
      section: 'abstract'
    },
    {
      id: 'cognitive-intraspecific-selection',
      title: 'Cognitive Intraspecific Selection in Education',
      content: 'From Individualism to Collective Strength — A Framework for Educational Evolution. Academic thesis by Fabrizio Terzi exploring evolutionary approaches to education.',
      section: 'hero'
    }
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filteredResults = searchableContent.filter(item =>
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
    setIsOpen(filteredResults.length > 0);
    setHighlightedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          navigateToResult(results[highlightedIndex]);
        }
        break;
    }
  };

  const navigateToResult = (result: SearchResult) => {
    const element = document.getElementById(result.section);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Highlight the found content
      setTimeout(() => {
        highlightSearchTerm(result.section, query);
      }, 500);
    }
    setIsOpen(false);
    setQuery('');
  };

  const highlightSearchTerm = (sectionId: string, term: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Remove existing highlights
    const existingHighlights = section.querySelectorAll('.search-highlight');
    existingHighlights.forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });

    // Add new highlights
    const walker = document.createTreeWalker(
      section,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      const regex = new RegExp(`(${term})`, 'gi');
      if (regex.test(text)) {
        const highlightedHTML = text.replace(regex, '<mark class="search-highlight bg-warning/30 rounded px-1 animate-pulse">$1</mark>');
        const span = document.createElement('span');
        span.innerHTML = highlightedHTML;
        textNode.parentNode?.replaceChild(span, textNode);
      }
    });

    // Remove highlights after 3 seconds
    setTimeout(() => {
      const highlights = section.querySelectorAll('.search-highlight');
      highlights.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });
    }, 3000);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search thesis content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 glass border-border/50 focus:border-primary/50 transition-all duration-300"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 glass shadow-strong border-border/50 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => navigateToResult(result)}
                className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                  index === highlightedIndex
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="font-medium text-sm text-foreground mb-1">
                  {result.title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {result.content}
                </div>
                <div className="text-xs text-primary mt-1 capitalize">
                  in {result.section} section
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};