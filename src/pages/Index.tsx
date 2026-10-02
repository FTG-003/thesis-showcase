import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Brain,
  Download,
  FileText,
  Github,
  Menu,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logoFull from "/logo-full.png";

const thesisUrl = "/Cognitive_Intraspecific_Selection_EN.pdf";
const canonicalUrl = "https://intraspecificselection.pyragogy.org/";
const repoUrl = "https://github.com/FTG-003/thesis-showcase";
const orcidUrl = "https://orcid.org/0009-0004-7191-0455";

const nav = [
  ["premise", "Premise"],
  ["mechanism", "Mechanism"],
  ["claims", "Claims"],
  ["limits", "Limits"],
  ["research", "Research object"],
] as const;

const loop = [
  { step: "01", title: "Variation", text: "Multiple ideas, explanations and learning strategies are made visible instead of being collapsed into one expected answer." },
  { step: "02", title: "Selection", text: "Ideas are exposed to evidence, critique, comparison and structured disagreement. The learner is not the object being selected." },
  { step: "03", title: "Retention", text: "Useful patterns survive because they can be reused, taught, documented and challenged again—not because an authority freezes them." },
  { step: "04", title: "Adaptation", text: "Retained patterns are revised when context changes or counter-evidence appears. The system remains deliberately unfinished." },
];

const propositions = [
  { icon: Brain, label: "UNIT OF SELECTION", title: "Move competition from people to ideas", text: "The central proposition is deliberately simple: participants cooperate while hypotheses, arguments and methods compete for explanatory or practical value." },
  { icon: Scale, label: "CONFLICT", title: "Make disagreement productive", text: "Ritualized Conflict treats dissent as infrastructure. Critique should increase the quality of the shared model without turning the interaction into status competition." },
  { icon: Network, label: "RECIPROCITY", title: "Treat knowledge as a distributed system", text: "Cognitive Reciprocation frames learning as mutual contribution: understanding is strengthened when participants can give, receive, transform and return knowledge." },
  { icon: Zap, label: "HUMAN + AI", title: "Use AI as a facilitative layer", text: "AI can surface alternatives, contradictions and forgotten context, but it should not silently become the epistemic authority that decides what survives." },
];

const falsifiers = [
  "If idea-level competition still reproduces interpersonal status competition, the central separation fails in practice.",
  "If structured conflict increases conformity, polarization or performance anxiety, the mechanism is counterproductive.",
  "If EQI-style metrics reward what is easy to count rather than what improves learning, measurement corrupts the target.",
  "If AI mediation narrows the search space or systematically privileges plausible consensus, collective intelligence can become collective error.",
];

const openQuestions = [
  "What observable evidence would distinguish genuine collective learning from polished group consensus?",
  "Which parts of the biological analogy are explanatory, and where does the analogy break?",
  "How should retained ideas carry provenance, counter-evidence and boundary conditions?",
  "Can an educational system preserve productive friction without rewarding dominance?",
];

function IndexPage() {
  const [active, setActive] = useState("premise");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="research-site">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href={canonicalUrl} aria-label="Pyragogy research home">
          <img src={logoFull} alt="" />
          <span><strong>Pyragogy</strong><small>Research artifact · 2025–2026</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([id, label]) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />

          <div className="hero-content">
            <div className="eyebrow"><span className="status-dot" />Personal conceptual work · Open to critique</div>

            <h1 id="hero-title">What if competition stopped selecting <em>students</em> and started selecting <em>ideas</em>?</h1>

            <p className="hero-lede">
              <strong>Cognitive Intraspecific Selection in Education</strong> is a conceptual framework by Fabrizio Terzi that explores whether variation, selection, retention and adaptation can operate on ideas while learners remain collaborators in a shared cognitive system.
            </p>

            <div className="hero-actions">
              <a className="action action-primary" href={thesisUrl} target="_blank" rel="noreferrer"><BookOpen /> Read the thesis <ArrowUpRight /></a>
              <a className="action action-secondary" href={thesisUrl} download><Download /> Download PDF</a>
            </div>

            <dl className="artifact-meta">
              <div><dt>Author</dt><dd>Fabrizio Terzi</dd></div>
              <div><dt>Published</dt><dd>2025</dd></div>
              <div><dt>Status</dt><dd>Conceptual / exploratory</dd></div>
              <div><dt>License</dt><dd>CC BY 4.0</dd></div>
            </dl>
          </div>

          <aside className="hero-thesis-card" aria-label="Thesis identity">
            <div className="card-index">THESIS / 001</div>
            <div className="thesis-mark"><span>IDEA</span><div className="selection-axis"><i /><i /><i /><i /></div><span>FIT</span></div>
            <div><p className="kicker">THE PROPOSED SHIFT</p><p className="big-statement">People cooperate.<br />Ideas compete.</p></div>
            <p className="card-note">Not a claim of biological equivalence. A deliberately testable transposition intended to expose useful mechanisms—and its own failure points.</p>
            <ArrowDown className="card-arrow" />
          </aside>
        </section>

        <section id="premise" className="section section-premise">
          <div className="section-number">01</div>
          <div className="section-heading"><p className="kicker">THE PREMISE</p><h2>Change the target of competition, not the existence of difference.</h2></div>

          <div className="premise-layout">
            <div className="prose">
              <p className="lead">Traditional educational competition often binds performance to the person: grades, ranking, prestige and access accumulate around individuals.</p>
              <p>This work asks whether part of that competitive pressure can be displaced onto the cognitive objects produced by a group—ideas, explanations, strategies, models and hypotheses.</p>
              <p>The biological language is used as a conceptual instrument, not as proof. The value of the framework depends on whether the transposition produces better questions, better designs and eventually better evidence.</p>
            </div>

            <div className="before-after" aria-label="Conceptual shift">
              <div className="model model-old">
                <span className="model-label">INDIVIDUALISTIC DEFAULT</span>
                <div className="people-row"><b>A</b><b>B</b><b>C</b><b>D</b></div>
                <div className="rank-line" />
                <p>People are compared.<br />Knowledge becomes a differentiator.</p>
              </div>
              <div className="shift-arrow">→</div>
              <div className="model model-new">
                <span className="model-label">PROPOSED TRANSPOSITION</span>
                <div className="people-row collaborative"><b>A</b><b>B</b><b>C</b><b>D</b></div>
                <div className="idea-cloud"><i>α</i><i>β</i><i>γ</i><i>δ</i><i>ε</i></div>
                <p>People collaborate.<br />Ideas face selection pressure.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="mechanism" className="section section-dark">
          <div className="section-number">02</div>
          <div className="section-heading light">
            <p className="kicker">THE MECHANISM</p><h2>A four-stage loop for idea evolution.</h2>
            <p className="section-intro">The framework maps four evolutionary operations onto an epistemic process. The analogy is useful only where the mapping remains explicit and criticisable.</p>
          </div>

          <div className="loop-grid">
            {loop.map((item, index) => (
              <article className="loop-card" key={item.title}>
                <div className="loop-top"><span>{item.step}</span>{index < loop.length - 1 && <span className="loop-arrow">↗</span>}</div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mechanism-note"><ShieldCheck /><p><strong>Epistemic constraint:</strong> survival inside the learning system is not evidence of truth. A retained idea still needs provenance, independent evidence, known boundary conditions and a route to falsification.</p></div>
        </section>

        <section id="claims" className="section">
          <div className="section-number">03</div>
          <div className="section-heading">
            <p className="kicker">CORE PROPOSITIONS</p><h2>Four claims the framework puts on the table.</h2>
            <p className="section-intro">These are propositions to inspect and operationalize—not conclusions protected by the language of a finished theory.</p>
          </div>

          <div className="proposition-grid">
            {propositions.map(({ icon: Icon, label, title, text }) => (
              <article className="proposition" key={title}>
                <div className="proposition-icon"><Icon /></div><p className="kicker">{label}</p><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="limits" className="section section-limits">
          <div className="section-number">04</div>
          <div className="section-heading">
            <p className="kicker">WHERE IT CAN BREAK</p><h2>A framework becomes research when it can lose.</h2>
            <p className="section-intro">The thesis is more useful when its failure modes are visible. These are candidate falsifiers and boundary conditions, not defensive footnotes.</p>
          </div>

          <div className="limits-grid">
            <div className="falsifier-list">
              {falsifiers.map((item, index) => <div className="falsifier" key={item}><span>F{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
            </div>

            <aside className="open-questions">
              <div className="open-icon"><Sparkles /></div><p className="kicker">OPEN QUESTIONS</p><h3>What still needs to be earned by evidence?</h3>
              <ol>{openQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
            </aside>
          </div>
        </section>

        <section id="research" className="section section-research">
          <div className="section-number">05</div>
          <div className="section-heading"><p className="kicker">THE RESEARCH OBJECT</p><h2>Read it, cite it, inspect the source, disagree with it.</h2></div>

          <div className="resource-grid">
            <a className="resource resource-featured" href={thesisUrl} target="_blank" rel="noreferrer">
              <div><FileText /><span>PRIMARY SOURCE</span></div><h3>Full thesis</h3><p>The complete conceptual work in PDF.</p><span className="resource-link">Open PDF <ArrowUpRight /></span>
            </a>
            <a className="resource" href={repoUrl} target="_blank" rel="noreferrer">
              <div><Github /><span>SOURCE</span></div><h3>GitHub repository</h3><p>Website source, machine-readable metadata and revision history.</p><span className="resource-link">Inspect repo <ArrowUpRight /></span>
            </a>
            <a className="resource" href="/llms.txt" target="_blank" rel="noreferrer">
              <div><Brain /><span>GEO / AI</span></div><h3>llms.txt</h3><p>Canonical context, epistemic status and guidance for machine summaries.</p><span className="resource-link">Read context <ArrowUpRight /></span>
            </a>
            <a className="resource" href={orcidUrl} target="_blank" rel="noreferrer">
              <div><Network /><span>IDENTITY</span></div><h3>ORCID</h3><p>Persistent researcher identifier for Fabrizio Terzi.</p><span className="resource-link">View ORCID <ArrowUpRight /></span>
            </a>
          </div>

          <div className="citation-strip">
            <div><p className="kicker">SUGGESTED CITATION</p><p>Terzi, F. (2025). <em>Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength — A Framework for Educational Evolution.</em> Pyragogy Research Initiative.</p></div>
            <a href="/CITATION.cff" target="_blank" rel="noreferrer">Machine-readable citation <ArrowUpRight /></a>
          </div>
        </section>

        <section className="closing">
          <p className="kicker">ONE SENTENCE TO KEEP</p>
          <blockquote>“A learning system should make it safer for an idea to fail than for a person to stay silent.”</blockquote>
          <p className="closing-note">A synthesis of the framework's design intent, not a quotation from an external source.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img src={logoFull} alt="" /><div><strong>Pyragogy Research</strong><span>Keep knowledge alive.</span></div></div>
        <div className="footer-links"><a href={repoUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={orcidUrl} target="_blank" rel="noreferrer">ORCID <ArrowUpRight /></a><a href={thesisUrl} target="_blank" rel="noreferrer">PDF <ArrowUpRight /></a></div>
        <p>© 2025–2026 Fabrizio Terzi · Research artifact licensed CC BY 4.0</p>
      </footer>
    </div>
  );
}

export default IndexPage;
