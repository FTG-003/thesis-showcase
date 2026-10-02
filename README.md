# Cognitive Intraspecific Selection in Education

[![Website](https://img.shields.io/badge/site-intraspecificselection.pyragogy.org-6b46c1)](https://intraspecificselection.pyragogy.org/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0004--7191--0455-a6ce39)](https://orcid.org/0009-0004-7191-0455)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-lightgrey)](https://creativecommons.org/licenses/by/4.0/)

Public web showcase for **Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength — A Framework for Educational Evolution**, a conceptual work by **Fabrizio Terzi** within the Pyragogy research program.

## Research premise

The thesis asks what changes when the unit of selection in an educational system is shifted from **people** to **ideas**.

Instead of organizing learning around competition between learners, the framework explores whether variation, selection, retention, and adaptation can operate on hypotheses, strategies, arguments, and pedagogical patterns while participants remain collaborators in a shared learning environment.

The work connects this premise to:

- Cognitive Reciprocation
- Ritualized Conflict
- collective intelligence
- Educational Quality Intelligence (EQI)
- the IdeoEvo implementation concept
- human–AI facilitation in collaborative learning

## Epistemic status

This repository hosts a **personal conceptual research artifact**. The framework should not be described as an established scientific theory, a validated educational intervention, peer-reviewed consensus, or an empirically confirmed model unless independent evidence supporting those claims is provided.

The intended posture is: **propose → expose → critique → test → falsify/refine**.

## Read the work

- **Canonical website:** https://intraspecificselection.pyragogy.org/
- **Full thesis PDF:** https://intraspecificselection.pyragogy.org/Cognitive_Intraspecific_Selection_EN.pdf
- **LLM-readable context:** https://intraspecificselection.pyragogy.org/llms.txt
- **ORCID:** https://orcid.org/0009-0004-7191-0455

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- GitHub Pages
- Custom domain via `public/CNAME`

## Local development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

The GitHub Actions workflow in `.github/workflows/pages-v2.yml` builds and deploys `dist/` to GitHub Pages on pushes to `main`.

## SEO / GEO

The site includes:

- canonical URL metadata
- Open Graph and social metadata
- academic citation metadata
- Schema.org `ScholarlyArticle` structured data
- `robots.txt`
- `sitemap.xml`
- `llms.txt` with explicit entity, provenance, epistemic-status, citation, and AI-summary guidance

The canonical public identity is **intraspecificselection.pyragogy.org**. Old `blubar.github.io` links should not be used.

## Repository structure

```text
.github/workflows/   GitHub Pages deployment
public/              static assets, PDF, CNAME, SEO/GEO files
src/components/      interface components
src/pages/           page composition
src/                 application entry points and styles
index.html           document metadata + structured data
```

## Author

**Fabrizio Terzi**  
ORCID: [0009-0004-7191-0455](https://orcid.org/0009-0004-7191-0455)

## License

The research artifact is presented under **Creative Commons Attribution 4.0 International (CC BY 4.0)** as stated on the site.

Code licensing is not separately declared in this repository; do not assume that the CC license automatically applies to source code.
