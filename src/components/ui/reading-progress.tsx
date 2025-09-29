import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Circle } from 'lucide-react';

interface SectionProgress {
  id: string;
  title: string;
  progress: number;
  isVisible: boolean;
  isCompleted: boolean;
  estimatedTime: number; // in minutes
  wordsCount: number;
}

export const ReadingProgress = () => {
  const [sections, setSections] = useState<SectionProgress[]>([
    { id: 'abstract', title: 'Executive Summary', progress: 0, isVisible: false, isCompleted: false, estimatedTime: 5, wordsCount: 250 },
    { id: 'timeline', title: 'Research Timeline', progress: 0, isVisible: false, isCompleted: false, estimatedTime: 3, wordsCount: 150 },
    { id: 'key-points', title: 'Key Contributions', progress: 0, isVisible: false, isCompleted: false, estimatedTime: 7, wordsCount: 350 },
    { id: 'testimonials', title: 'Academic Recognition', progress: 0, isVisible: false, isCompleted: false, estimatedTime: 2, wordsCount: 100 },
    { id: 'resources', title: 'Resources & Tools', progress: 0, isVisible: false, isCompleted: false, estimatedTime: 4, wordsCount: 200 }
  ]);

  const [totalProgress, setTotalProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-80px 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const isVisible = entry.isIntersecting;
        const progressRatio = entry.intersectionRatio;

        setSections(prev => prev.map(section => {
          if (section.id === sectionId) {
            const progress = Math.round(progressRatio * 100);
            const isCompleted = progress >= 75; // Consider 75% as completed
            
            if (isVisible && progress > 0) {
              setCurrentSection(sectionId);
            }
            
            return {
              ...section,
              progress,
              isVisible,
              isCompleted
            };
          }
          return section;
        }));
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const completedSections = sections.filter(s => s.isCompleted).length;
    const newTotalProgress = Math.round((completedSections / sections.length) * 100);
    setTotalProgress(newTotalProgress);
  }, [sections]);

  const totalEstimatedTime = sections.reduce((acc, section) => acc + section.estimatedTime, 0);
  const completedTime = sections.filter(s => s.isCompleted).reduce((acc, section) => acc + section.estimatedTime, 0);
  const remainingTime = totalEstimatedTime - completedTime;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Card className="fixed right-4 top-1/2 transform -translate-y-1/2 w-80 glass shadow-strong border-border/50 z-30 hidden xl:block">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-lg">Reading Progress</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {totalProgress}%
          </Badge>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Overall Progress</span>
            <span>{totalProgress}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{remainingTime}min remaining</span>
            </div>
            <span>{completedTime}/{totalEstimatedTime}min</span>
          </div>
        </div>

        {/* Section Progress */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Sections</h4>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 border ${
                currentSection === section.id
                  ? 'border-primary/30 bg-primary/5 shadow-sm'
                  : 'border-transparent hover:border-border hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {section.isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm font-medium ${
                    section.isCompleted ? 'text-success' : 'text-foreground'
                  }`}>
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {section.estimatedTime}min
                  </span>
                  <span className={`text-xs ${
                    section.isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {section.progress}%
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    section.isCompleted 
                      ? 'bg-success' 
                      : section.isVisible 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/30'
                  }`}
                  style={{ width: `${section.progress}%` }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Reading Stats */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {sections.filter(s => s.isCompleted).length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {sections.length - sections.filter(s => s.isCompleted).length}
              </div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};