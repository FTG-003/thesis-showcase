import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a href="#main" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-40">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-full.png" alt="Pyragogy.org" className="h-10 w-auto" />
            <span className="text-lg font-semibold">Pyragogy Research</span>
          </div>
          
          <button className="md:hidden flex flex-col gap-1 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full md:top-0 left-0 right-0 md:left-auto md:right-auto bg-background md:bg-transparent border-b md:border-0 gap-6 p-4 md:p-0`}>
            <li><button onClick={() => scrollToSection('abstract')} className={`nav-link ${activeSection === 'abstract' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>Abstract</button></li>
            <li><button onClick={() => scrollToSection('key-points')} className={`nav-link ${activeSection === 'key-points' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>Key Points</button></li>
            <li><button onClick={() => scrollToSection('structure')} className={`nav-link ${activeSection === 'structure' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>Structure</button></li>
            <li><button onClick={() => scrollToSection('impact')} className={`nav-link ${activeSection === 'impact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>Impact</button></li>
            <li><button onClick={() => scrollToSection('resources')} className={`nav-link ${activeSection === 'resources' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>Resources</button></li>
          </ul>
        </nav>
      </header>

      <main id="main" className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden bg-gradient-hero">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="flex gap-3">
                  <Badge variant="secondary" className="glass px-4 py-2 text-primary font-medium">
                    🧬 Revolutionary Research
                  </Badge>
                  <Badge variant="outline" className="glass px-4 py-2">
                    2025
                  </Badge>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Cognitive Intraspecific Selection
                  <span className="block text-4xl lg:text-5xl mt-2 text-foreground">in Education</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                  From Individualism to Collective Strength — A Revolutionary Framework for Educational Evolution
                </p>
                
                <div className="space-y-3 p-6 glass rounded-2xl">
                  <p className="text-xl font-serif font-semibold">Fabrizio Terzi</p>
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:underline decoration-primary/30">
                    ORCID: 0009-0004-7191-0455 →
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg rounded-2xl">
                    <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                      📖 Download Full Thesis
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('abstract')} className="glass hover:bg-primary/5 transition-all duration-300 px-8 py-6 text-lg rounded-2xl">
                    🔍 Explore Abstract
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
                <div className="relative group">
                  <Card className="w-96 h-[500px] glass relative overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-strong hover:shadow-glow animate-glow rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                    <CardContent className="h-full flex flex-col justify-between p-10 relative z-10 bg-indigo-900 rounded-3xl">
                      <div className="space-y-4">
                        
                        <h2 className="text-3xl font-serif font-bold text-primary-foreground leading-tight">
                          Cognitive Intraspecific Selection
                        </h2>
                        <p className="text-xl text-primary-foreground/90 font-light">
                          in Education
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-primary-foreground">Fabrizio Terzi</p>
                        <p className="text-sm text-primary-foreground/80">Pyragogy Research Initiative</p>
                        <div className="flex gap-2 mt-4">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-warning rounded-full animate-pulse delay-200" />
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-400" />
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
                  This thesis presents a groundbreaking transposition of biological intraspecific selection to educational contexts, 
                  reimagining how ideas compete, evolve, and strengthen collective intelligence.
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
                    isomorphisms: variation in educational approaches, selection through epistemic competition, 
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
                    The framework introduces Pyragogy—a novel approach integrating Cognitive Reciprocation, 
                    Ritualization of Conflict, and non-agentive AI facilitation for collective intelligence building.
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
                      Through proposed Educational Quality Intelligence (EQI) metrics and the innovative IdeoEvo pilot project, 
                      this research offers practical pathways from traditional individualistic education toward 
                      collective cognitive strength. The implications extend beyond pedagogy to organizational learning, 
                      policy development, and the future of human-AI collaborative intelligence.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
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

        {/* PDF Viewer Section */}
        <section className="py-32 relative overflow-hidden bg-gradient-card">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Read the Full Thesis
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Immerse yourself in the complete research - revolutionary ideas await your exploration
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="max-w-6xl mx-auto">
              <Card className="glass overflow-hidden rounded-3xl shadow-strong hover:shadow-glow transition-all duration-500 animate-scale-in border-0">
                <div className="p-2">
                  <iframe src="/Cognitive_Intraspecific_Selection_EN.pdf" className="w-full h-[700px] border-0 rounded-2xl" title="Cognitive Intraspecific Selection in Education - Full Thesis PDF" />
                </div>
              </Card>
              
              <div className="text-center mt-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Unable to view the PDF? 
                </p>
                <Button asChild variant="outline" size="lg" className="glass hover:bg-primary/5 px-8 py-4 rounded-2xl">
                  <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                    📥 Download Full Thesis PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Structure Section */}
        <section id="structure" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Thesis Structure
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A comprehensive journey through revolutionary educational frameworks and cognitive evolution
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="max-w-5xl mx-auto space-y-8">
              {[{
              number: "01",
              title: "Introduction & Theoretical Foundation",
              description: "Establishes the biological basis of intraspecific selection and introduces the educational transposition framework.",
              keywords: ["evolutionary theory", "educational paradigms"],
              color: "from-primary to-primary-light"
            }, {
              number: "02",
              title: "Four Isomorphisms in Educational Evolution",
              description: "Deep dive into variation, selection, heritability, and adaptation mechanisms within educational contexts and idea competition.",
              keywords: ["variation", "selection", "adaptation"],
              color: "from-accent to-accent-light"
            }, {
              number: "03",
              title: "Pyragogy: The Methodology",
              description: "Comprehensive framework for Cognitive Reciprocation, Ritualization of Conflict, and AI-facilitated collective intelligence building.",
              keywords: ["cognitive reciprocation", "ritualized conflict"],
              color: "from-success to-primary"
            }, {
              number: "04",
              title: "AI Integration & Non-Agentive Facilitation",
              description: "Explores how artificial intelligence can support human collective cognition without supplanting human agency in learning processes.",
              keywords: ["AI facilitation", "collective intelligence"],
              color: "from-warning to-accent"
            }, {
              number: "05",
              title: "EQI Metrics & Assessment Framework",
              description: "Educational Quality Intelligence measurement system for evaluating collective cognitive development and learning effectiveness.",
              keywords: ["EQI metrics", "assessment"],
              color: "from-destructive to-primary"
            }, {
              number: "06",
              title: "IdeoEvo Pilot Project & Results",
              description: "Real-world implementation case study demonstrating practical applications and measurable outcomes of the cognitive intraspecific selection framework.",
              keywords: ["pilot study", "implementation"],
              color: "from-primary to-accent"
            }].map((chapter, index) => <Card key={index} className="group glass hover:shadow-glow transition-all duration-500 hover:scale-105 rounded-3xl border-0 animate-slide-in-right" style={{
              animationDelay: `${index * 150}ms`
            }}>
                  <CardContent className="p-8">
                    <div className="flex gap-8 items-start">
                      <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-r ${chapter.color} rounded-3xl flex items-center justify-center font-bold text-2xl text-white shadow-strong group-hover:scale-110 transition-transform duration-300`}>
                        {chapter.number}
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                          {chapter.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          {chapter.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {chapter.keywords.map((keyword, kidx) => <Badge key={kidx} variant="secondary" className="glass px-4 py-2 text-sm font-medium hover:bg-primary/10 transition-colors duration-300">
                              {keyword}
                            </Badge>)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Progress line */}
                  {index < 5 && <div className="absolute -bottom-4 left-1/2 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />}
                </Card>)}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-32 relative overflow-hidden bg-gradient-card">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Why This Research Matters
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Revolutionary implications for education, policy, and the future of human-AI collaboration
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {[{
              icon: "🎓",
              title: "Educational Innovation",
              description: "Provides a scientific foundation for moving beyond individualistic competition toward collective intelligence in educational institutions, potentially transforming how we approach curriculum design and learning assessment.",
              gradient: "from-primary to-primary-light"
            }, {
              icon: "🏛️",
              title: "Policy Implications",
              description: "Offers evidence-based frameworks for educational policy makers to design systems that harness cognitive competition for societal benefit, addressing challenges in public education and workforce development.",
              gradient: "from-accent to-accent-light"
            }, {
              icon: "🚀",
              title: "Future of Learning",
              description: "Establishes foundational principles for human-AI collaborative learning environments, preparing educational systems for the next generation of technology-enhanced collective intelligence.",
              gradient: "from-success to-warning"
            }].map((impact, index) => <Card key={index} className="group glass text-center h-full hover:shadow-glow transition-all duration-500 hover:scale-105 rounded-3xl border-0 animate-scale-in" style={{
              animationDelay: `${index * 200}ms`
            }}>
                  <CardHeader className="pb-6">
                    <div className={`w-24 h-24 bg-gradient-to-r ${impact.gradient} rounded-3xl flex items-center justify-center text-4xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-strong`}>
                      {impact.icon}
                    </div>
                    <CardTitle className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                      {impact.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {impact.description}
                    </CardDescription>
                  </CardContent>
                </Card>)}
            </div>

            {/* Key Quotes */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-serif font-bold mb-4 text-primary">Key Insights</h3>
                <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full" />
              </div>
              
              <div className="grid lg:grid-cols-1 gap-8">
                {[{
                text: "The shift from individual competition to collective cognitive strength represents perhaps the most significant paradigm change in educational theory since Dewey.",
                source: "Chapter 1: Theoretical Foundation",
                icon: "💡"
              }, {
                text: "Ideas, not individuals, are the true units of educational selection. This recognition transforms how we understand learning, teaching, and institutional development.",
                source: "Chapter 2: Educational Isomorphisms",
                icon: "🧬"
              }, {
                text: "AI's role is not to replace human cognition but to facilitate the collective intelligence that emerges from structured cognitive conflict.",
                source: "Chapter 4: AI Integration",
                icon: "🤖"
              }].map((quote, index) => <Card key={index} className="glass border-l-8 border-l-primary hover:shadow-glow transition-all duration-500 rounded-3xl animate-slide-in-right" style={{
                animationDelay: `${index * 300}ms`
              }}>
                    <CardContent className="p-8">
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl text-white flex-shrink-0 shadow-medium">
                          {quote.icon}
                        </div>
                        <div className="flex-1">
                          <blockquote className="text-xl lg:text-2xl font-serif italic leading-relaxed mb-4 text-foreground">
                            "{quote.text}"
                          </blockquote>
                          <cite className="text-base text-muted-foreground font-medium">
                            — {quote.source}
                          </cite>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Resources & Citations
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Access the complete research, author information, and proper citation formats
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {[{
              icon: "🔗",
              title: "Official DOI",
              link: "https://doi.org/10.5281/zenodo.16961291",
              text: "https://doi.org/10.5281/zenodo.16961291"
            }, {
              icon: "📄",
              title: "Download Thesis",
              link: "/Cognitive_Intraspecific_Selection_EN.pdf",
              text: "Full PDF Document"
            }, {
              icon: "👤",
              title: "Author Profile",
              link: "https://orcid.org/0009-0004-7191-0455",
              text: "ORCID: 0009-0004-7191-0455"
            }].map((resource, index) => <Card key={index} className="group glass text-center hover:shadow-glow transition-all duration-500 hover:scale-105 rounded-3xl border-0 animate-scale-in" style={{
              animationDelay: `${index * 150}ms`
            }}>
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center text-3xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-strong">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href={resource.link} target="_blank" rel="noopener" download={resource.title.includes("Download") ? true : undefined} className="text-primary hover:text-accent transition-colors duration-300 font-medium break-all">
                      {resource.text}
                    </a>
                  </CardContent>
                </Card>)}
            </div>
            
            {/* Citation Formats */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-center mb-8">How to Cite</h3>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>APA Format</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                      <p>Terzi, F. (2025). <em>Cognitive intraspecific selection in education: From individualism to collective strength</em> [Preprint]. Pyragogy.org. https://doi.org/10.5281/zenodo.16961291</p>
                      <Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={() => copyToClipboard("Terzi, F. (2025). Cognitive intraspecific selection in education: From individualism to collective strength [Preprint]. Pyragogy.org. https://doi.org/10.5281/zenodo.16961291")}>
                        📋
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>BibTeX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                      <pre>{`@misc{terzi2025cognitive,
  title={Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength},
  author={Terzi, Fabrizio},
  year={2025},
  publisher={Pyragogy.org},
  doi={10.5281/zenodo.16961291},
  url={https://doi.org/10.5281/zenodo.16961291}
}`}</pre>
                      <Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={() => copyToClipboard(`@misc{terzi2025cognitive,
  title={Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength},
  author={Terzi, Fabrizio},
  year={2025},
  publisher={Pyragogy.org},
  doi={10.5281/zenodo.16961291},
  url={https://doi.org/10.5281/zenodo.16961291}
}`)}>
                        📋
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/logo-full.png" alt="Pyragogy.org" className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-background/80 leading-relaxed">
                Advancing collective intelligence through evolutionary educational research.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Author</h3>
              <p className="text-background/80 mb-2">
                <a href="mailto:[EMAIL_AUTORE]" className="hover:text-background transition-colors">[EMAIL_AUTORE]</a>
              </p>
              <p className="text-background/80">
                <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener" className="hover:text-background transition-colors">
                  ORCID Profile
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="[TWITTER_URL]" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">🐦</a>
                <a href="[LINKEDIN_URL]" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">💼</a>
                <a href="[ACADEMIA_URL]" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">🎓</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/60 text-sm">
              © 2025 Pyragogy.org. This work is licensed under a Creative Commons Attribution 4.0 International License.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <Button className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 shadow-lg" onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })}>
        ↑
      </Button>
    </div>;
};
export default Index;