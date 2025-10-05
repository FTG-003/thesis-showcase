import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Users, Lightbulb } from 'lucide-react';

const timelineItems = [
  {
    date: "January 2025",
    title: "Research Initiation",
    description: "Began investigating the intersection of evolutionary biology and educational theory.",
    icon: Lightbulb,
    status: "completed"
  },
  {
    date: "March 2025",
    title: "Theoretical Framework",
    description: "Developed the core concepts of Cognitive Intraspecific Selection in educational contexts.",
    icon: BookOpen,
    status: "completed"
  },
  {
    date: "June 2025",
    title: "Pyragogy Methodology",
    description: "Formalized the Pyragogy approach with Cognitive Reciprocation and Ritualized Conflict.",
    icon: Users,
    status: "completed"
  },
  {
    date: "September 2025",
    title: "Pilot Implementation",
    description: "Launched IdeoEvo pilot project to test practical applications of the framework.",
    icon: Calendar,
    status: "in-progress"
  },
  {
    date: "December 2025",
    title: "Publication & Dissemination",
    description: "Publishing findings and expanding the research community.",
    icon: BookOpen,
    status: "upcoming"
  }
];

export const Timeline = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary opacity-30" />
        
        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-medium ${
                item.status === 'completed' 
                  ? 'bg-gradient-primary' 
                  : item.status === 'in-progress'
                  ? 'bg-gradient-accent'
                  : 'bg-gradient-subtle border-2 border-muted'
              }`}>
                <item.icon className={`w-8 h-8 ${
                  item.status === 'upcoming' ? 'text-muted-foreground' : 'text-white'
                }`} />
              </div>
              
              {/* Content */}
              <Card className={`flex-1 glass transition-all duration-500 hover:shadow-glow ${
                item.status === 'upcoming' ? 'opacity-70' : ''
              } animate-fade-in-up`} style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-serif">{item.title}</CardTitle>
                    <Badge variant={
                      item.status === 'completed' 
                        ? 'default' 
                        : item.status === 'in-progress'
                        ? 'secondary'
                        : 'outline'
                    }>
                      {item.status === 'completed' && '✓ '}
                      {item.status === 'in-progress' && '⏳ '}
                      {item.status === 'upcoming' && '📅 '}
                      {item.date}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};