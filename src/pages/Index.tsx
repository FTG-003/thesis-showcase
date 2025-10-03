import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { CitationGenerator } from "@/components/ui/citation-generator";
import { EnhancedCitation } from "@/components/ui/enhanced-citation";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { Testimonials } from "@/components/ui/testimonials";
import { Timeline } from "@/components/ui/timeline";
import { SearchBar } from "@/components/ui/search-bar";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { SocialSharing } from "@/components/ui/social-sharing";
import { GlossaryTooltip, GlossaryText } from "@/components/ui/glossary-tooltip";
import { Share2, Download, ExternalLink, Search, BookOpen, Users, Target, Lightbulb, Users2, TrendingUp, Brain, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logoFull from '/logo-full.png';
const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const { toast } = useToast();
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-80px 0px -50% 0px'
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
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
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied!",
        description: "The research link has been copied to your clipboard."
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <ReadingProgress />
      
      {/* Skip to main content for accessibility */}
      <a href="#main" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      {/* Header - Enhanced Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg z-40 transition-all duration-300">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 group">
            <img 
              src={logoFull} 
              alt="Pyragogy.org" 
              className="h-10 w-auto transition-all duration-300 group-hover:scale-105" 
            />
            <span className="hidden sm:block text-lg font-serif font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pyragogy Research
            </span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('abstract')} 
                className={`nav-link relative font-medium text-sm ${activeSection === 'abstract' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200 after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-center after:transition-transform after:duration-300 ${activeSection === 'abstract' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                Abstract
              </button>
              <button 
                onClick={() => scrollToSection('timeline')} 
                className={`nav-link relative font-medium text-sm ${activeSection === 'timeline' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200 after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-center after:transition-transform after:duration-300 ${activeSection === 'timeline' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                Timeline
              </button>
              <button 
                onClick={() => scrollToSection('key-points')} 
                className={`nav-link relative font-medium text-sm ${activeSection === 'key-points' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200 after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-center after:transition-transform after:duration-300 ${activeSection === 'key-points' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                Key Points
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className={`nav-link relative font-medium text-sm ${activeSection === 'testimonials' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200 after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-center after:transition-transform after:duration-300 ${activeSection === 'testimonials' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('resources')} 
                className={`nav-link relative font-medium text-sm ${activeSection === 'resources' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200 after:content-[""] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-center after:transition-transform after:duration-300 ${activeSection === 'resources' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
              >
                Resources
              </button>
            </nav>
            <SearchBar className="hidden lg:block w-64" />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-hero">
          {/* Animated background elements */}
          <ParallaxSection speed={0.3} className="absolute inset-0 mx-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-5 rounded-full blur-3xl animate-parallax" />
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="flex gap-3">
                  
                  
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mx-[2px] px-0 py-px animate-reveal">
                  Cognitive Intraspecific Selection
                  <span className="block text-4xl lg:text-5xl mt-2 text-foreground font-serif italic">in Education</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-serif font-light tracking-wide">From Individualism to Collective Strength — A Framework for Educational Evolution</p>
                
                <div className="space-y-3 p-6 glass rounded-2xl">
                  <p className="text-xl font-serif font-semibold">Fabrizio Terzi</p>
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:underline decoration-primary/30">
                    ORCID: 0009-0004-7191-0455 →
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-500 px-8 py-6 text-lg rounded-2xl group hover:scale-105 active:scale-95 font-semibold">
                    <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce transition-all duration-300" />
                      Download Full Thesis
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('abstract')} className="glass hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 px-8 py-6 text-lg rounded-2xl group hover:scale-105 active:scale-95 font-semibold">
                    <Search className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    Explore Abstract
                  </Button>
                  <SocialSharing className="px-8 py-6 text-lg rounded-2xl group hover:scale-105 active:scale-95 font-semibold" />
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
                <div className="relative group">
                  <Card className="w-96 h-[500px] glass relative overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-strong hover:shadow-glow animate-glow rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                    <CardContent className="h-full flex flex-col justify-between p-10 relative z-10 bg-gradient-to-br from-primary via-primary-dark to-accent rounded-3xl">
                      {/* Logo e Header */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-center mb-6">
                          <img src={logoFull} alt="Pyragogy.org" className="h-16 w-auto filter brightness-0 invert" />
                        </div>
                        
                        <div className="text-center space-y-4">
                          <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                            Cognitive Intraspecific Selection
                          </h2>
                          <p className="text-xl text-white/90 font-light italic">
                            in Education
                          </p>
                          <div className="w-20 h-0.5 bg-white/30 mx-auto rounded-full" />
                          <p className="text-sm text-white/80 uppercase tracking-wider font-medium">
                            Academic Thesis
                          </p>
                        </div>
                      </div>
                      
                      {/* Footer con autore */}
                      <div className="space-y-4 text-center">
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">Fabrizio Terzi</p>
                          <p className="text-sm text-white/80">Pyragogy Research Initiative</p>
                        </div>
                        
                        <div className="flex justify-center gap-3 mt-4">
                          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200" />
                          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse delay-400" />
                        </div>
                        
                        <div className="text-xs text-white/60 mt-4">
                          2024 • Creative Commons 4.0
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float delay-1000" />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abstract Section */}
        <section id="abstract" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-card" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Executive Summary
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
            </div>
            
            <div className="max-w-5xl mx-auto space-y-8">
                <Card className="glass p-10 rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 animate-scale-in">
                  <p className="text-2xl lg:text-3xl font-serif font-medium text-center leading-relaxed text-primary mb-8">
                    This thesis presents a groundbreaking transposition of biological <GlossaryTooltip term="intraspecific selection">intraspecific selection</GlossaryTooltip> to educational contexts, 
                    reimagining how ideas compete, evolve, and strengthen <GlossaryTooltip term="collective intelligence">collective intelligence</GlossaryTooltip>.
                  </p>
                </Card>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="glass p-8 rounded-3xl shadow-medium hover:shadow-strong transition-all duration-500 animate-slide-in-right">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0">
                      🔬
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary">Core Framework</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    By treating ideas as the fundamental unit of selection rather than individuals, we explore four critical 
                    isomorphisms: variation in educational approaches, selection through <GlossaryTooltip term="epistemic competition">epistemic competition</GlossaryTooltip>, 
                    heritability of successful pedagogical patterns, and adaptation to learning environments.
                  </p>
                </Card>
                
                <Card className="glass p-8 rounded-3xl shadow-medium hover:shadow-strong transition-all duration-500 animate-slide-in-right delay-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0">
                      🎯
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-accent">Pyragogy Methodology</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    The framework introduces <GlossaryTooltip term="pyragogy">Pyragogy</GlossaryTooltip>—a novel approach integrating <GlossaryTooltip term="cognitive reciprocation">Cognitive Reciprocation</GlossaryTooltip>, 
                    <GlossaryTooltip term="ritualization of conflict">Ritualization of Conflict</GlossaryTooltip>, and non-agentive AI facilitation for <GlossaryTooltip term="collective intelligence">collective intelligence</GlossaryTooltip> building.
                  </p>
                </Card>
              </div>
              
              <Card className="glass p-10 rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 animate-fade-in-up delay-400">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-success to-warning rounded-3xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                    📊
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">Impact & Implementation</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Through proposed <GlossaryTooltip term="educational quality intelligence">Educational Quality Intelligence (EQI)</GlossaryTooltip> metrics and the innovative <GlossaryTooltip term="ideoevo">IdeoEvo</GlossaryTooltip> pilot project, 
                      this research offers practical pathways from traditional individualistic education toward 
                      <GlossaryTooltip term="collective intelligence">collective cognitive strength</GlossaryTooltip>. The implications extend beyond pedagogy to organizational learning, 
                      policy development, and the future of human-AI collaborative intelligence.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Research Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The evolution of revolutionary educational theory from concept to implementation
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            <Timeline />
          </div>
        </section>

        {/* Key Points Section */}
        <section id="key-points" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Key Contributions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Revolutionary insights that transform how we understand educational evolution and collective intelligence
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[{
              icon: "🧬",
              title: "Theoretical Innovation",
              description: "First systematic application of intraspecific selection theory to education, establishing ideas as evolutionary units competing within learning communities.",
              gradient: "from-primary to-primary-light"
            }, {
              icon: "⚡",
              title: "Pyragogy Methodology",
              description: "Novel framework combining Cognitive Reciprocation and Ritualized Conflict to transform educational competition into collective intelligence.",
              gradient: "from-accent to-accent-light"
            }, {
              icon: "🤖",
              title: "AI Integration",
              description: "Non-agentive AI facilitation that supports human collective cognition without replacing human agency in learning processes.",
              gradient: "from-success to-primary"
            }, {
              icon: "📊",
              title: "EQI Metrics",
              description: "Educational Quality Intelligence measurement framework for assessing collective cognitive development and learning outcomes.",
              gradient: "from-warning to-accent"
            }, {
              icon: "🎯",
              title: "Practical Implementation",
              description: "IdeoEvo pilot project demonstrating real-world applications with measurable improvements in collaborative learning effectiveness.",
              gradient: "from-destructive to-primary"
            }, {
              icon: "🌐",
              title: "Open Source & Peer Learning",
              description: "Collaborative knowledge-sharing framework where learners co-create educational resources, fostering distributed intelligence through open methodologies.",
              gradient: "from-primary to-accent"
            }].map((point, index) => <Card key={index} className="group glass h-full hover:shadow-glow transition-all duration-500 rounded-3xl p-8 animate-scale-in border-0" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <CardHeader className="pb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${point.gradient} rounded-3xl flex items-center justify-center text-3xl text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                      {point.icon}
                    </div>
                    <CardTitle className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {point.description}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                </Card>)}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 relative overflow-hidden bg-gradient-card">
          <ParallaxSection speed={0.2} className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float delay-1000" />
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Academic Recognition
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Insights from leading researchers and educators worldwide
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Resources & Tools Section */}
        <section id="resources" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Research Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Tools and resources to support your academic work and research
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
              <CitationGenerator />
              <NewsletterSignup />
            </div>
            
            {/* Additional Resources */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="glass p-8 rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                  Full Thesis
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Complete 120-page academic thesis with comprehensive analysis and practical applications.
                </p>
                <Button asChild className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </Card>
              
              <Card className="glass p-8 rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-accent rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-accent transition-colors">
                  Research Community
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join the growing community of researchers exploring cognitive selection in education.
                </p>
                <Button variant="outline" className="w-full glass hover:bg-accent/5 transition-all duration-300">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </Card>
              
              <Card className="glass p-8 rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-r from-success to-warning rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-foreground transition-colors">
                  ORCID Profile
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Access the author's complete academic profile and additional research publications.
                </p>
                <Button asChild variant="outline" className="w-full glass hover:bg-primary/5 transition-all duration-300">
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Profile
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

        {/* Contact & Footer */}
        <footer className="py-20 bg-gradient-to-br from-muted/10 to-background border-t">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <img src="/logo-full.png" alt="Pyragogy.org" className="h-12 w-auto" />
                <span className="text-2xl font-serif font-bold">Pyragogy Research</span>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Advancing educational theory through  research in cognitive selection and collective intelligence building.</p>
              
              <div className="flex justify-center gap-6">
                <Button asChild variant="outline" className="glass hover:bg-primary/5">
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    ORCID Profile
                  </a>
                </Button>
                <Button asChild variant="outline" className="glass hover:bg-primary/5">
                  <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Thesis
                  </a>
                </Button>
              </div>
              
              <div className="pt-8 border-t border-muted text-sm text-muted-foreground">
                <p>© 2024 Fabrizio Terzi. Published under Creative Commons Attribution 4.0 International License.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Index;