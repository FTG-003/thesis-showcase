import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationSection {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  completed: boolean;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'hero',
    title: 'Introduction',
    description: 'Overview of Cognitive Intraspecific Selection thesis',
    estimatedTime: '2 min',
    completed: false
  },
  {
    id: 'abstract',
    title: 'Executive Summary',
    description: 'Core framework and methodological innovations',
    estimatedTime: '5 min',
    completed: false
  },
  {
    id: 'timeline',
    title: 'Research Timeline',
    description: 'Development phases and milestones',
    estimatedTime: '3 min',
    completed: false
  },
  {
    id: 'key-points',
    title: 'Key Contributions',
    description: 'Main theoretical and practical advances',
    estimatedTime: '7 min',
    completed: false
  },
  {
    id: 'testimonials',
    title: 'Academic Recognition',
    description: 'Reviews and scholarly endorsements',
    estimatedTime: '2 min',
    completed: false
  },
  {
    id: 'resources',
    title: 'Resources & Tools',
    description: 'Citations, downloads, and research tools',
    estimatedTime: '4 min',
    completed: false
  }
];

export const SmartNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = navigationSections.findIndex(s => s.id === entry.target.id);
          if (sectionIndex !== -1) {
            setCurrentSection(sectionIndex);
            
            // Mark section as completed when viewed for more than 3 seconds
            setTimeout(() => {
              setCompletedSections(prev => new Set([...prev, entry.target.id]));
            }, 3000);
          }
        }
      });
    }, observerOptions);

    navigationSections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      scrollToSection(navigationSections[currentSection - 1].id);
    }
  };

  const goToNext = () => {
    if (currentSection < navigationSections.length - 1) {
      scrollToSection(navigationSections[currentSection + 1].id);
    }
  };

  const progressPercentage = (completedSections.size / navigationSections.length) * 100;

  return (
    <>
      {/* Floating Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <Card className="glass shadow-strong border-border/50 p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={currentSection === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 h-8"
            >
              <Menu className="w-4 h-4" />
              <span className="text-sm font-medium">
                {navigationSections[currentSection]?.title}
              </span>
              <Badge variant="secondary" className="text-xs">
                {currentSection + 1}/{navigationSections.length}
              </Badge>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={currentSection === navigationSections.length - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Navigation Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl glass shadow-strong border-border/50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-serif font-semibold">Navigation</h3>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(progressPercentage)}% completed • {completedSections.size}/{navigationSections.length} sections
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMenuOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Section List */}
                <div className="space-y-2">
                  {navigationSections.map((section, index) => {
                    const isCompleted = completedSections.has(section.id);
                    const isCurrent = index === currentSection;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          isCurrent
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : isCompleted
                            ? 'border-success/30 bg-success/5 hover:border-success/50'
                            : 'border-border hover:border-border/80 hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                              isCompleted
                                ? 'border-success bg-success text-white'
                                : isCurrent
                                ? 'border-primary bg-primary text-white'
                                : 'border-muted-foreground text-muted-foreground'
                            }`}>
                              {isCompleted ? '✓' : index + 1}
                            </div>
                            <h4 className={`font-medium ${
                              isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-foreground'
                            }`}>
                              {section.title}
                            </h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {section.estimatedTime}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground pl-9">
                          {section.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between mt-6 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollToSection('hero')}
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Back to Top
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevious}
                      disabled={currentSection === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      onClick={goToNext}
                      disabled={currentSection === navigationSections.length - 1}
                      className="bg-gradient-primary hover:shadow-glow"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="fixed top-20 left-4 z-30 hidden lg:block">
        <Card className="glass shadow-medium border-border/50 p-3">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Thesis
            </button>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {navigationSections[currentSection]?.title}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
};