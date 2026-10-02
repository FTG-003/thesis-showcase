import { Brain, Users2, Zap, Target, TrendingUp, Lightbulb, Calendar, BookOpen, Users } from 'lucide-react';

export const siteConfig = {
  author: 'Fabrizio Terzi',
  orcid: '0009-0004-7191-0455',
  publicationYear: '2025',
  publisher: 'Pyragogy Research Initiative',
  thesisTitle: 'Cognitive Intraspecific Selection in Education',
  thesisSubtitle: 'From Individualism to Collective Strength — A Framework for Educational Evolution',
  thesisPdfUrl: '/Cognitive_Intraspecific_Selection_EN.pdf',
  contactEmail: 'info@pyragogy.org',
  social: {
    twitter: '@Pyragogy',
    community: 'https://docs.pyragogy.org/core/why/',
  }
};

export const timelineItems = [
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
    status: "completed"
  },
  {
    date: "September 2025",
    title: "Publication & Dissemination",
    description: "Published the thesis showcase and opened the framework to public reading and critique.",
    icon: BookOpen,
    status: "completed"
  },
  {
    date: "2026",
    title: "Open Iteration",
    description: "Connecting the thesis to the wider Pyragogy research program and refining its claims through evidence, critique, and adjacent experiments.",
    icon: Users,
    status: "in-progress"
  }
];

export const keyPoints = [
  {
    icon: Brain, // Storing the component reference
    title: "Idea-Centric Framework",
    description: "Shifts focus from individual competition to collective idea evolution",
    gradient: "from-primary to-primary-dark"
  },
  {
    icon: Users2,
    title: "Cognitive Reciprocation",
    description: "Mutual knowledge exchange strengthens collective intelligence",
    gradient: "from-accent to-accent-dark"
  },
  {
    icon: Zap,
    title: "Ritualized Conflict",
    description: "Transforms competition into constructive knowledge building",
    gradient: "from-warning to-warning-dark"
  },
  {
    icon: Target,
    title: "Educational Quality Intelligence",
    description: "Novel metrics for measuring collective learning outcomes",
    gradient: "from-success to-success-dark"
  },
  {
    icon: TrendingUp,
    title: "IdeoEvo Platform",
    description: "Practical implementation of intraspecific selection principles",
    gradient: "from-primary to-accent"
  },
  {
    icon: Lightbulb,
    title: "Human-AI Collaboration",
    description: "Non-agentive AI facilitation for enhanced collective intelligence",
    gradient: "from-accent to-primary"
  }
];