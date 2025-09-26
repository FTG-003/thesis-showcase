import React, { useEffect, useState } from 'react';
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

    const observer = new IntersectionObserver((entries) => {
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
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a href="#main" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 glass border-b border-white/10 z-40">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 animate-fade-in-up">
            <img src="/logo-full.png" alt="Pyragogy.org" className="h-10 w-auto hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold text-gradient">Pyragogy Research</span>
          </div>
          
          <button 
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full md:top-0 left-0 right-0 md:left-auto md:right-auto glass md:bg-transparent border-b md:border-0 gap-6 p-4 md:p-0`}>
            <li><button onClick={() => scrollToSection('abstract')} className={`nav-link ${activeSection === 'abstract' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'} transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Abstract</button></li>
            <li><button onClick={() => scrollToSection('key-points')} className={`nav-link ${activeSection === 'key-points' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'} transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Key Points</button></li>
            <li><button onClick={() => scrollToSection('structure')} className={`nav-link ${activeSection === 'structure' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'} transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Structure</button></li>
            <li><button onClick={() => scrollToSection('impact')} className={`nav-link ${activeSection === 'impact' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'} transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Impact</button></li>
            <li><button onClick={() => scrollToSection('resources')} className={`nav-link ${activeSection === 'resources' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'} transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Resources</button></li>
          </ul>
        </nav>
      </header>

      <main id="main" className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" style={{background: 'var(--gradient-hero)'}}>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex gap-2 animate-scale-in animate-stagger-1">
                  <Badge variant="secondary" className="glass bg-white/20 text-white border-white/30 hover-glow">Preprint</Badge>
                  <Badge variant="outline" className="glass bg-white/10 text-white border-white/30">2025</Badge>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white text-shadow animate-fade-in-up animate-stagger-2">
                  Cognitive Intraspecific Selection in Education
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animate-stagger-3">
                  From Individualism to Collective Strength — A Revolutionary Framework for Educational Evolution
                </p>
                
                <div className="space-y-2 animate-fade-in-up animate-stagger-4">
                  <p className="text-lg font-semibold text-white">Fabrizio Terzi</p>
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener" className="text-sm text-white/70 hover:text-white transition-colors">
                    ORCID: 0009-0004-7191-0455
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4 animate-fade-in-up animate-stagger-5">
                  <Button asChild size="lg" className="glass bg-white/20 text-white border-white/30 hover:bg-white/30 hover-lift backdrop-blur-sm">
                    <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download>
                      📖 Download Thesis PDF
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('abstract')} className="glass bg-white/10 text-white border-white/30 hover:bg-white/20 hover-lift">
                    🔍 Read Abstract
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center animate-float">
                <Card className="w-80 h-96 glass bg-white/10 text-white relative overflow-hidden hover-lift hover-glow animate-pulse-glow">
                  <div className="absolute inset-0" style={{background: 'var(--gradient-glass)'}} />
                  <CardContent className="h-full flex flex-col justify-between p-8 relative z-10">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-shadow">Cognitive Intraspecific Selection</h2>
                      <p className="text-lg opacity-90">in Education</p>
                    </div>
                    <div>
                      <p className="font-semibold">Fabrizio Terzi</p>
                      <p className="text-sm opacity-80">Pyragogy.org</p>
                    </div>
                  </CardContent>
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 opacity-30 blur-xl" />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Abstract Section */}
        <section id="abstract" className="py-20" style={{background: 'var(--gradient-card)'}}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient animate-fade-in-up">Executive Summary</h2>
            
            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
              <p className="text-xl font-medium text-center mb-8 animate-fade-in-up animate-stagger-1">
                This thesis presents a groundbreaking transposition of biological intraspecific selection to educational contexts, 
                reimagining how ideas compete, evolve, and strengthen collective intelligence.
              </p>
              
              <p className="animate-fade-in-up animate-stagger-2">
                By treating ideas as the fundamental unit of selection rather than individuals, we explore four critical 
                isomorphisms: variation in educational approaches, selection through epistemic competition, 
                heritability of successful pedagogical patterns, and adaptation to learning environments. 
                The framework introduces Pyragogy—a novel approach integrating Cognitive Reciprocation, 
                Ritualization of Conflict, and non-agentive AI facilitation.
              </p>
              
              <p className="animate-fade-in-up animate-stagger-3">
                Through proposed Educational Quality Intelligence (EQI) metrics and the innovative IdeoEvo pilot project, 
                this research offers practical pathways from traditional individualistic education toward 
                collective cognitive strength. The implications extend beyond pedagogy to organizational learning, 
                policy development, and the future of human-AI collaborative intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Key Points Section */}
        <section id="key-points" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient animate-fade-in-up">Key Contributions</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧬",
                  title: "Theoretical Innovation",
                  description: "First systematic application of intraspecific selection theory to education, establishing ideas as evolutionary units competing within learning communities."
                },
                {
                  icon: "⚡",
                  title: "Pyragogy Methodology",
                  description: "Novel framework combining Cognitive Reciprocation and Ritualized Conflict to transform educational competition into collective intelligence."
                },
                {
                  icon: "🤖",
                  title: "AI Integration",
                  description: "Non-agentive AI facilitation that supports human collective cognition without replacing human agency in learning processes."
                },
                {
                  icon: "📊",
                  title: "EQI Metrics",
                  description: "Educational Quality Intelligence measurement framework for assessing collective cognitive development and learning outcomes."
                },
                {
                  icon: "🎯",
                  title: "Practical Implementation",
                  description: "IdeoEvo pilot project demonstrating real-world applications with measurable improvements in collaborative learning effectiveness."
                }
              ].map((point, index) => (
                <Card key={index} className={`h-full glass hover-lift hover-glow animate-fade-in-up animate-stagger-${index + 1}`}>
                  <CardHeader>
                    <div className="text-4xl mb-4 animate-float" style={{animationDelay: `${index * 0.5}s`}}>{point.icon}</div>
                    <CardTitle className="text-xl text-gradient">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {point.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Read the Full Thesis</h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <iframe 
                  src="/Cognitive_Intraspecific_Selection_EN.pdf" 
                  className="w-full h-[600px] border-0"
                  title="Cognitive Intraspecific Selection in Education - Full Thesis PDF"
                />
              </Card>
              <p className="text-center mt-4 text-muted-foreground">
                Unable to view the PDF? <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download className="text-primary hover:underline">Download directly</a>
              </p>
            </div>
          </div>
        </section>

        {/* Structure Section */}
        <section id="structure" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Thesis Structure</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  number: "01",
                  title: "Introduction & Theoretical Foundation",
                  description: "Establishes the biological basis of intraspecific selection and introduces the educational transposition framework.",
                  keywords: ["evolutionary theory", "educational paradigms"]
                },
                {
                  number: "02", 
                  title: "Four Isomorphisms in Educational Evolution",
                  description: "Deep dive into variation, selection, heritability, and adaptation mechanisms within educational contexts and idea competition.",
                  keywords: ["variation", "selection", "adaptation"]
                },
                {
                  number: "03",
                  title: "Pyragogy: The Methodology", 
                  description: "Comprehensive framework for Cognitive Reciprocation, Ritualization of Conflict, and AI-facilitated collective intelligence building.",
                  keywords: ["cognitive reciprocation", "ritualized conflict"]
                },
                {
                  number: "04",
                  title: "AI Integration & Non-Agentive Facilitation",
                  description: "Explores how artificial intelligence can support human collective cognition without supplanting human agency in learning processes.",
                  keywords: ["AI facilitation", "collective intelligence"]
                },
                {
                  number: "05",
                  title: "EQI Metrics & Assessment Framework",
                  description: "Educational Quality Intelligence measurement system for evaluating collective cognitive development and learning effectiveness.", 
                  keywords: ["EQI metrics", "assessment"]
                },
                {
                  number: "06",
                  title: "IdeoEvo Pilot Project & Results",
                  description: "Real-world implementation case study demonstrating practical applications and measurable outcomes of the cognitive intraspecific selection framework.",
                  keywords: ["pilot study", "implementation"]
                }
              ].map((chapter, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                  <CardContent className="p-6">
                    <div className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {chapter.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{chapter.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {chapter.keywords.map((keyword, kidx) => (
                            <Badge key={kidx} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why This Research Matters</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "🎓",
                  title: "Educational Innovation",
                  description: "Provides a scientific foundation for moving beyond individualistic competition toward collective intelligence in educational institutions, potentially transforming how we approach curriculum design and learning assessment."
                },
                {
                  icon: "🏛️", 
                  title: "Policy Implications",
                  description: "Offers evidence-based frameworks for educational policy makers to design systems that harness cognitive competition for societal benefit, addressing challenges in public education and workforce development."
                },
                {
                  icon: "🚀",
                  title: "Future of Learning", 
                  description: "Establishes foundational principles for human-AI collaborative learning environments, preparing educational systems for the next generation of technology-enhanced collective intelligence."
                }
              ].map((impact, index) => (
                <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="text-5xl mb-4">{impact.icon}</div>
                    <CardTitle className="text-xl">{impact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {impact.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Quotes */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-center mb-8">Key Insights</h3>
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  {
                    text: "The shift from individual competition to collective cognitive strength represents perhaps the most significant paradigm change in educational theory since Dewey.",
                    source: "Chapter 1: Theoretical Foundation"
                  },
                  {
                    text: "Ideas, not individuals, are the true units of educational selection. This recognition transforms how we understand learning, teaching, and institutional development.",
                    source: "Chapter 2: Educational Isomorphisms"
                  },
                  {
                    text: "AI's role is not to replace human cognition but to facilitate the collective intelligence that emerges from structured cognitive conflict.",
                    source: "Chapter 4: AI Integration"
                  }
                ].map((quote, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <blockquote className="text-lg italic leading-relaxed mb-4">
                        "{quote.text}"
                      </blockquote>
                      <cite className="text-sm text-muted-foreground font-medium">
                        — {quote.source}
                      </cite>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Resources & Citations</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    🔗 Official DOI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="https://doi.org/10.5281/zenodo.16961291" target="_blank" rel="noopener" className="text-primary hover:underline break-all">
                    https://doi.org/10.5281/zenodo.16961291
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    📄 Download Thesis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="/Cognitive_Intraspecific_Selection_EN.pdf" target="_blank" rel="noopener" download className="text-primary hover:underline">
                    Full PDF Document
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    👤 Author Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="https://orcid.org/0009-0004-7191-0455" target="_blank" rel="noopener" className="text-primary hover:underline">
                    ORCID: 0009-0004-7191-0455
                  </a>
                </CardContent>
              </Card>
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard("Terzi, F. (2025). Cognitive intraspecific selection in education: From individualism to collective strength [Preprint]. Pyragogy.org. https://doi.org/10.5281/zenodo.16961291")}
                      >
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(`@misc{terzi2025cognitive,
  title={Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength},
  author={Terzi, Fabrizio},
  year={2025},
  publisher={Pyragogy.org},
  doi={10.5281/zenodo.16961291},
  url={https://doi.org/10.5281/zenodo.16961291}
}`)}
                      >
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
      <Button
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </Button>
    </div>
  );
};

export default Index;
