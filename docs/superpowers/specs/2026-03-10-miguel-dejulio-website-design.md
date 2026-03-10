# Design: Adapt Personal Website for Miguel De Julio

**Date:** 2026-03-10
**Approach:** Option A — Direct content swap (same HTML structure, replace all content)
**Language:** Spanish throughout

---

## Source

CV: `CV Miguel De Julio.pdf` (in repo root)

Key data extracted:
- **Name:** Miguel De Julio Costas
- **Title:** Estudiante de Biología
- **DOB:** 13/02/2003
- **Phone:** +34 690 82 98 58
- **Email:** migueldejuliocostas@gmail.com
- **Address:** 28232, Madrid
- **LinkedIn:** www.linkedin.com/in/miguel-de-julio-costas
- **Photo:** `assets/imgs/miguel.png`

---

## Section-by-Section Changes

### Head / Meta
- Title: `Miguel De Julio`
- Meta description: Biology student, Madrid
- og:title, og:description, og:image → Miguel's data
- Remove Google Analytics script block

### Header
- Name: `Miguel De Julio`
- Subtitle: `Estudiante de Biología`
- Social icons: email + LinkedIn only (remove GitHub)
- Profile photo: `assets/imgs/miguel.png`
- CV download button → `CV Miguel De Julio.pdf`
- Keep neural network canvas background

### Navbar
- Links (Spanish): Inicio, Sobre mí, Currículum, Portafolio, Próximamente, Contacto
- Brand image: `miguel.png`, brand title: `Miguel De Julio`, subtitle: `Estudiante de Biología`
- Keep theme toggle

### About Section
Column 1 — *¿Quién soy?*
- Heading: `Estudiante de Biología`
- Body: "Estudiante universitario de biología altamente motivado, en busca de oportunidades de empleo para complementar mis estudios y adquirir nuevas habilidades y experiencias."
- CV download button

Column 2 — *Información Personal*
- Birthdate: 13/02/2003
- Email: migueldejuliocostas@gmail.com
- Phone: +34 690 82 98 58
- Address: Madrid, España
- Social icons: email + LinkedIn

Column 3 — *Mis Competencias*
- Replace technical expertise rows with soft skills using same icon+row layout:
  - Trabajo en equipo
  - Proactividad
  - Responsabilidad
  - Comunicación
  - Carnet de conducir

### Resume Section
Card 1 — *Experiencia*
- Prácticas de Empresa Externas en Enara E.A. (24-2-2025 → 9-6-2025)
- Colaborador y Asistente en Congresos: XVI Congreso de Investigación de Estudiantes de Grado en CC. de la Salud, XX Congreso de CC. Veterinarias y Biomédicas, I Congreso de CC. Experimentales (2023/24)
- Colaborador en XV Congreso de Investigación / XIX Congreso de CC. Veterinarias y Biomédicas (2022/23)
- Curso Extracurricular: IX Seminario sobre Prevención y Defensa frente al uso de agentes biológicos como armas de destrucción masiva (UCM, jun 2024)

Card 2 — *Formación*
- Grado en Ciencias Biológicas (2021–2025) — Universidad Complutense de Madrid
- Bachillerato de Ciencias (2019–2021) — IES José García Nieto

Card 3 — *Idiomas y Herramientas* (progress bars)
- Español — Nativo (100%)
- Inglés — B2 (65%)
- Microsoft Office — Avanzado (80%)
- QGIS — Básico (30%)

Soft skills card (below):
- Trabajo en equipo, Proactividad, Responsabilidad, Comunicación

### Portfolio Section
- Keep section structure and nav link
- Remove all flip-card items
- Show a "Próximamente" placeholder message in the empty container

### Coming Soon Section
- Keep section
- Remove chess puzzle widget (HTML, JS libraries, JS file reference)
- Replace Marcos's hobbies list with a generic placeholder

### Contact Section
- Phone: +34 690 82 98 58
- Address: Madrid, España
- Email: migueldejuliocostas@gmail.com
- Social icons: email + LinkedIn only
- Keep form HTML but clear the `action` attribute on the form (Formspree endpoint was Marcos's)

### Scripts / Footer
- Remove Google Analytics block
- Remove Google Maps script
- Remove chess library scripts (chessboard.js, chess.js)
- Remove `assets/js/chess-puzzle.js` reference
- Keep jQuery, Bootstrap, Isotope, neural-network.js, marcosrodrigo.js

---

## Files Changed
- `index.html` — all changes above (single file)

## Files Not Changed
- All CSS/SCSS
- All JS files except removing chess-puzzle.js reference
- All vendor assets
