# Miguel De Julio Website Adaptation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all of Marcos Rodrigo's personal content in `index.html` with Miguel De Julio's CV data, keeping the same HTML/CSS structure.

**Architecture:** Single-file content swap on `index.html` (896 lines). No structural changes, no new files. Each task targets a specific section by line range.

**Tech Stack:** HTML only — no build step needed. Verify by opening `index.html` in a browser.

---

## Chunk 1: Head, Header, Navbar

### Task 1: Update `<head>` meta tags

**Files:**
- Modify: `index.html:1-44`

- [ ] **Step 1: Remove Google Analytics**

Replace lines 5–12:
```html
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VRL7V3HYFP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VRL7V3HYFP');
    </script>
```
With: *(delete entirely — no replacement)*

- [ ] **Step 2: Update meta tags and title**

Replace:
```html
    <meta name="description" content="Marcos Rodrigo — Ph.D. Telecommunication Engineer and AI Researcher specializing in deep learning, computer vision, and neural architectures.">
    <meta name="author" content="Marcos Rodrigo">
    <title>Marcos Rodrigo</title>
```
With:
```html
    <meta name="description" content="Miguel De Julio — Estudiante de Biología en la Universidad Complutense de Madrid.">
    <meta name="author" content="Miguel De Julio">
    <title>Miguel De Julio</title>
```

- [ ] **Step 3: Update Open Graph and Twitter Card tags**

Replace:
```html
    <meta property="og:url" content="https://marcosrodrigot.github.io/">
    <meta property="og:title" content="Marcos Rodrigo — AI Researcher & Engineer">
    <meta property="og:description" content="Ph.D. Telecommunication Engineer specializing in deep learning, computer vision, and neural architectures.">
    <meta property="og:image" content="https://marcosrodrigot.github.io/assets/imgs/Marcos.jpg">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Marcos Rodrigo — AI Researcher & Engineer">
    <meta name="twitter:description" content="Ph.D. Telecommunication Engineer specializing in deep learning, computer vision, and neural architectures.">
    <meta name="twitter:image" content="https://marcosrodrigot.github.io/assets/imgs/Marcos.jpg">
```
With:
```html
    <meta property="og:url" content="">
    <meta property="og:title" content="Miguel De Julio — Estudiante de Biología">
    <meta property="og:description" content="Estudiante universitario de biología en la Universidad Complutense de Madrid.">
    <meta property="og:image" content="assets/imgs/miguel.png">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Miguel De Julio — Estudiante de Biología">
    <meta name="twitter:description" content="Estudiante universitario de biología en la Universidad Complutense de Madrid.">
    <meta name="twitter:image" content="assets/imgs/miguel.png">
```

- [ ] **Step 4: Remove Chessboard CSS import**

Delete:
```html
    <!-- Chessboard.js styles -->
    <link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css">
```

- [ ] **Step 5: Verify CV file exists**

```bash
ls "CV Miguel De Julio.pdf"
```
Expected: file listed (no "No such file" error).

- [ ] **Step 6: Verify**

Open `index.html` in browser. Page title in tab should read "Miguel De Julio".

- [ ] **Step 7: Commit**
```bash
git add index.html
git commit -m "feat: update head meta tags for Miguel De Julio"
```

---

### Task 2: Update Header section (lines 49–65)

**Files:**
- Modify: `index.html:49-65`

- [ ] **Step 1: Update social links**

Replace:
```html
                <li class="social-item"><a class="social-link text-light" href="mailto:marcosrodrigo5@hotmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                <li class="social-item"><a class="social-link text-light" href="https://www.linkedin.com/in/marcos-rodrigo-talavera/" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
                <li class="social-item"><a class="social-link text-light" href="https://github.com/MarcosRodrigoT" target="_blank"><i class="ti-github" aria-hidden="true"></i></a></li>
```
With:
```html
                <li class="social-item"><a class="social-link text-light" href="mailto:migueldejuliocostas@gmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                <li class="social-item"><a class="social-link text-light" href="https://www.linkedin.com/in/miguel-de-julio-costas" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
```

- [ ] **Step 2: Update header content**

Replace:
```html
                <img src="assets/imgs/Marcos.jpg" alt="Marcos Rodrigo" class="header-profile-img d-lg-none">
                <h4 class="header-subtitle" >Hello, I am</h4>
                <h1 class="header-title">Marcos&nbsp;Rodrigo</h1>
                <h6 class="header-mono" >Ph.D. Telecommunication Engineer | AI Researcher</h6>
                <a href="assets/docs/CV_Marcos_Rodrigo_EN.pdf" download class="btn btn-primary btn-rounded"><i class="ti-download pr-2"></i>Download CV</a>
```
With:
```html
                <img src="assets/imgs/miguel.png" alt="Miguel De Julio" class="header-profile-img d-lg-none">
                <h4 class="header-subtitle">Hola, soy</h4>
                <h1 class="header-title">Miguel&nbsp;De&nbsp;Julio</h1>
                <h6 class="header-mono">Estudiante de Biología</h6>
                <a href="CV Miguel De Julio.pdf" download class="btn btn-primary btn-rounded"><i class="ti-download pr-2"></i>Descargar CV</a>
```

- [ ] **Step 3: Verify**

Reload page. Header should show Miguel's name, "Estudiante de Biología", email + LinkedIn icons only.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "feat: update header for Miguel De Julio"
```

---

### Task 3: Update Navbar (lines 66–109)

**Files:**
- Modify: `index.html:66-109`

- [ ] **Step 1: Update left nav links (Spanish)**

Replace:
```html
                    <li class="nav-item">
                        <a href="#home" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="#about" class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="#resume" class="nav-link">Resume</a>
                    </li>
```
With:
```html
                    <li class="nav-item">
                        <a href="#home" class="nav-link">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a href="#about" class="nav-link">Sobre mí</a>
                    </li>
                    <li class="nav-item">
                        <a href="#resume" class="nav-link">Currículum</a>
                    </li>
```

- [ ] **Step 2: Update brand**

Replace:
```html
                    <img src="assets/imgs/Marcos.jpg" alt="" class="brand-img">
                    <li class="brand-txt">
                        <h5 class="brand-title">Marcos Rodrigo</h5>
                        <div class="brand-subtitle">Ph.D. Telecommunication Engineer | AI Researcher</div>
                    </li>
```
With:
```html
                    <img src="assets/imgs/miguel.png" alt="" class="brand-img">
                    <li class="brand-txt">
                        <h5 class="brand-title">Miguel De Julio</h5>
                        <div class="brand-subtitle">Estudiante de Biología</div>
                    </li>
```

- [ ] **Step 3: Update right nav links (Spanish)**

Replace:
```html
                    <li class="nav-item">
                        <a href="#portfolio" class="nav-link">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a href="#coming-soon" class="nav-link">Coming Soon</a>
                    </li>
                    <li class="nav-item last-item">
                        <a href="#contact" class="nav-link">Contact</a>
                    </li>
```
With:
```html
                    <li class="nav-item">
                        <a href="#portfolio" class="nav-link">Portafolio</a>
                    </li>
                    <li class="nav-item">
                        <a href="#coming-soon" class="nav-link">Próximamente</a>
                    </li>
                    <li class="nav-item last-item">
                        <a href="#contact" class="nav-link">Contacto</a>
                    </li>
```

- [ ] **Step 4: Verify theme toggle is untouched**

Confirm the `<button id="theme-toggle" ...>` block is still present in the right nav `<ul>` and the dark/light mode toggle still works on click.

- [ ] **Step 5: Verify**

Reload. Navbar should show: Inicio · Sobre mí · Currículum · Portafolio · Próximamente · Contacto.

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "feat: translate navbar to Spanish for Miguel De Julio"
```

---

## Chunk 2: About & Resume Sections

### Task 4: Update About section — columns 1 & 2 (lines 110–133)

**Files:**
- Modify: `index.html:110-133`

- [ ] **Step 1: Update "Who am I" column**

Replace:
```html
                <h3 class="font-weight-light">Who am I ?</h3>
                <span class="line mb-5"></span>
                <h5 class="mb-3">A Telecommunication Engineer & AI Researcher from Spain</h5>
                <p class="mt-20">Post-graduate researcher at Universidad Politecnica de Madrid, specializing in deep learning for computer vision. I design and implement neural networks for person detection, face recognition, and video event recognition, collaborating with industry leaders like Nokia and Airbus.</p>
                <a href="assets/docs/CV_Marcos_Rodrigo_EN.pdf" download class="btn btn-outline-danger"><i class="ti-download"></i> Download My CV</a>
```
With:
```html
                <h3 class="font-weight-light">¿Quién soy?</h3>
                <span class="line mb-5"></span>
                <h5 class="mb-3">Estudiante de Biología en Madrid</h5>
                <p class="mt-20">Estudiante universitario de biología altamente motivado, en busca de oportunidades de empleo para complementar mis estudios y adquirir nuevas habilidades y experiencias.</p>
                <a href="CV Miguel De Julio.pdf" download class="btn btn-outline-danger"><i class="ti-download"></i> Descargar mi CV</a>
```

- [ ] **Step 2: Update Personal Info column**

Replace:
```html
                <h3 class="font-weight-light">Personal Info</h3>
                <span class="line mb-5"></span>
                <ul class="mt40 info list-unstyled">
                    <li><span>Birthdate</span> : 14/03/1993</li>
                    <li><span>Email</span> : marcosrodrigo5@hotmail.com</li>
                    <li><span>Phone</span> : + (34) 618-382-472</li>
                    <li><span>Address</span> : Madrid, Spain</li>
                </ul>
                <ul class="social-icons pt-3">
                    <li class="social-item"><a class="social-link" href="mailto:marcosrodrigo5@hotmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                    <li class="social-item"><a class="social-link" href="https://www.linkedin.com/in/marcos-rodrigo-talavera/" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
                    <li class="social-item"><a class="social-link" href="https://github.com/MarcosRodrigoT" target="_blank"><i class="ti-github" aria-hidden="true"></i></a></li>
                </ul>
```
With:
```html
                <h3 class="font-weight-light">Información Personal</h3>
                <span class="line mb-5"></span>
                <ul class="mt40 info list-unstyled">
                    <li><span>Fecha de nacimiento</span> : 13/02/2003</li>
                    <li><span>Email</span> : migueldejuliocostas@gmail.com</li>
                    <li><span>Teléfono</span> : +34 690 82 98 58</li>
                    <li><span>Dirección</span> : Madrid, España</li>
                </ul>
                <ul class="social-icons pt-3">
                    <li class="social-item"><a class="social-link" href="mailto:migueldejuliocostas@gmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                    <li class="social-item"><a class="social-link" href="https://www.linkedin.com/in/miguel-de-julio-costas" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
                </ul>
```

- [ ] **Step 3: Verify**

Reload. About section columns 1–2 should show Miguel's info.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "feat: update about section personal info for Miguel De Julio"
```

---

### Task 5: Update About section — column 3 "My Expertise" (lines 134–162)

**Files:**
- Modify: `index.html:134-162`

- [ ] **Step 1: Replace technical expertise rows with soft skills**

Replace the entire third column content (from `<h3 class="font-weight-light">My Expertise</h3>` to the closing `</div>` of that column):
```html
            <div class="col-lg-4 about-card">
                <h3 class="font-weight-light">My Expertise</h3>
                <span class="line mb-5"></span>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-widget icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>AI & Neural Architectures</h6>
                        <p class="subtitle">CNNs, Transformers, Vision Transformers, LLMs, VLMs, Diffusion Models, GANs, MoEs.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-package icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>ML Frameworks & Libraries</h6>
                        <p class="subtitle">PyTorch, TensorFlow, HuggingFace, OpenCV, CLIP, Stable Diffusion, Llama, Gradio.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-server icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>MLOps & Infrastructure</h6>
                        <p class="subtitle">Docker, Kubernetes, AWS SageMaker, Linux, GPU Clusters, Python, Bash, Git.</p>
                        <hr>
                    </div>
                </div>
            </div>
```
With:
```html
            <div class="col-lg-4 about-card">
                <h3 class="font-weight-light">Mis Competencias</h3>
                <span class="line mb-5"></span>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-user icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>Trabajo en equipo</h6>
                        <p class="subtitle">Capacidad para colaborar y contribuir activamente en entornos de trabajo colectivo.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-bolt icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>Proactividad</h6>
                        <p class="subtitle">Iniciativa para anticipar necesidades y proponer soluciones sin esperar instrucciones.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-check-box icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>Responsabilidad</h6>
                        <p class="subtitle">Compromiso con el cumplimiento de tareas y obligaciones con rigor y puntualidad.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-comment icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>Comunicación</h6>
                        <p class="subtitle">Habilidad para expresarse con claridad y escuchar activamente en distintos contextos.</p>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1 text-danger pt-1"><i class="ti-car icon-lg"></i></div>
                    <div class="col-10 ml-auto mr-3">
                        <h6>Carnet de conducir</h6>
                        <p class="subtitle">Permiso de conducción de vehículos.</p>
                        <hr>
                    </div>
                </div>
            </div>
```

- [ ] **Step 2: Verify**

Reload. Third column should show the five soft skills with icons and descriptions (Trabajo en equipo, Proactividad, Responsabilidad, Comunicación, Carnet de conducir).

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: replace expertise column with Miguel's soft skills"
```

---

### Task 6: Update Resume section — Expertise card → Experiencia (lines 170–195)

**Files:**
- Modify: `index.html:170-280`

- [ ] **Step 1: Update Resume section heading**

Replace:
```html
            <h2 class="mb-5"><span class="text-danger">My</span> Resume</h2>
```
With:
```html
            <h2 class="mb-5"><span class="text-danger">Mi</span> Currículum</h2>
```

- [ ] **Step 2: Replace Expertise card with Experiencia**

Replace the entire first card (lines ~175–195):
```html
                        <div class="card-header">
                            <div class="mt-2">
                                <h4>Expertise</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="title text-danger">2020 - Present</h6>
                            <P><strong>Post-graduate Researcher</strong><br><span class="university">Universidad Politecnica de Madrid</span></P>
                            <P class="subtitle">Deep learning for computer vision: person detection, face recognition, and video highlight detection. R&D collaboration with Nokia and Airbus.</P>
                            <hr>
                            <h6 class="title text-danger">2017 - 2018</h6>
                            <P><strong>Junior Programmer</strong><br><span class="university">Indra Sistemas S.A.</span></P>
                            <P class="subtitle">VoIP systems development for air traffic management. Network configuration, task automation, Scrum methodology.</P>
                            <hr>
                            <h6 class="title text-danger">2016 - 2017</h6>
                            <P><strong>Data Coder & Trainee Programmer</strong><br><span class="university">DEYDE Calidad de Datos S.L.</span></P>
                            <P class="subtitle">Expert systems development for postal address coding and verification. Database management.</P>
                        </div>
```
With:
```html
                        <div class="card-header">
                            <div class="mt-2">
                                <h4>Experiencia</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="title text-danger">Feb 2025 - Jun 2025</h6>
                            <P><strong>Prácticas de Empresa Externas</strong><br><span class="university">Enara E.A.</span></P>
                            <P class="subtitle">Prácticas externas realizadas del 24 de febrero al 9 de junio de 2025.</P>
                            <hr>
                            <h6 class="title text-danger">2023 / 2024</h6>
                            <P><strong>Colaborador y Asistente en Congresos</strong><br><span class="university">Universidad Complutense de Madrid</span></P>
                            <P class="subtitle">XVI Congreso de Investigación de Estudiantes de Grado en Ciencias de la Salud, XX Congreso de Ciencias Veterinarias y Biomédicas, I Congreso de Ciencias Experimentales en el Campo de la Salud.</P>
                            <hr>
                            <h6 class="title text-danger">2022 / 2023</h6>
                            <P><strong>Colaborador y Asistente en Congresos</strong><br><span class="university">Universidad Complutense de Madrid</span></P>
                            <P class="subtitle">XV Congreso de Investigación de Estudiantes de Grado en Ciencias de la Salud. XIX Congreso de Ciencias Veterinarias y Biomédicas.</P>
                            <hr>
                            <h6 class="title text-danger">Jun 2024</h6>
                            <P><strong>Curso Extracurricular</strong><br><span class="university">Cátedra Almirante Don Juan de Borbón — UCM</span></P>
                            <P class="subtitle">IX Seminario sobre Prevención y Defensa frente al uso de agentes biológicos como armas de destrucción masiva (3 y 27 de junio de 2024).</P>
                        </div>
```

- [ ] **Step 3: Verify**

Reload. First resume card should show "Experiencia" with the four entries.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "feat: replace expertise resume card with Miguel's experience"
```

---

### Task 7: Update Resume section — Education card (lines 197–219)

**Files:**
- Modify: `index.html:197-219`

- [ ] **Step 1: Replace Education card content**

Replace:
```html
                        <div class="card-header">
                            <div class="mt-2">
                                <h4>Education</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="title text-danger">2020 - 2025</h6>
                            <P><strong>Ph.D. in Communication Technologies and Systems</strong><br><span class="university">Universidad Politecnica de Madrid, UPM</span></P>
                            <P class="subtitle">Deep learning research for computer vision applications.</P>
                            <hr>
                            <h6 class="title text-danger">2018 - 2020</h6>
                            <P><strong>M.S. in Telecommunication Engineering</strong><br><span class="university">Universidad Politecnica de Madrid, UPM</span></P>
                            <P class="subtitle">Master's Thesis grade: Distinction (10/10)</P>
                            <hr>
                            <h6 class="title text-danger">2013 - 2018</h6>
                            <P><strong>B.S. in Telecommunication Systems Engineering</strong><br><span class="university">Universidad de Alcala de Henares, UAH</span></P>
                            <P class="subtitle">Bachelor's Thesis grade: Excellent (9/10)</P>
                        </div>
```
With:
```html
                        <div class="card-header">
                            <div class="mt-2">
                                <h4>Formación</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="title text-danger">2021 - 2025</h6>
                            <P><strong>Grado en Ciencias Biológicas</strong><br><span class="university">Universidad Complutense de Madrid</span></P>
                            <P class="subtitle">Formación universitaria en ciencias biológicas.</P>
                            <hr>
                            <h6 class="title text-danger">2019 - 2021</h6>
                            <P><strong>Bachillerato de Ciencias</strong><br><span class="university">IES José García Nieto</span></P>
                            <P class="subtitle">Bachillerato científico con orientación a ciencias de la salud y naturales.</P>
                        </div>
```

- [ ] **Step 2: Verify**

Reload. Second resume card should show "Formación" with two education entries.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: update education resume card for Miguel De Julio"
```

---

### Task 8: Update Resume section — Skills & Languages cards (lines 220–277)

The source HTML has two separate cards in the third resume column: a "Skills" card (progress bars for tech tools) and a "Languages" card (progress bars for languages). Both are preserved as two cards — renamed to "Herramientas" and "Idiomas" respectively.

**Files:**
- Modify: `index.html:220-277`

- [ ] **Step 1: Replace Skills card (header + body together)**

Replace the full Skills card header and body:
```html
                       <div class="card-header">
                            <div class="pull-left">
                                <h4 class="mt-2">Skills</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body pb-2">
                           <h6>Python</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>PyTorch</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>TensorFlow / Keras</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>HuggingFace</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>Docker & Kubernetes</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>OpenCV</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
```
With:
```html
                       <div class="card-header">
                            <div class="pull-left">
                                <h4 class="mt-2">Herramientas</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body pb-2">
                           <h6>Microsoft Office <small class="text-muted">(Word, PowerPoint, Excel)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>QGIS <small class="text-muted">(Nivel básico)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
```

- [ ] **Step 2: Replace Languages card**

Replace the Languages card content:
```html
                           <h6>Spanish <small class="text-muted">(Native)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>English <small class="text-muted">(C1 Certified)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>French <small class="text-muted">(Basic)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
```
With:
```html
                           <h6>Español <small class="text-muted">(Nativo)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6>Inglés <small class="text-muted">(Nivel B2)</small></h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
```

- [ ] **Step 3: Update Languages card header**

Replace:
```html
                                <h4 class="mt-2">Languages</h4>
```
With:
```html
                                <h4 class="mt-2">Idiomas</h4>
```

- [ ] **Step 4: Add soft skills card below Languages card**

After the Languages card's closing `</div></div>` (line ~276) and before the closing `</div>` of the `col-lg-4` column, insert:
```html
                    <div class="card">
                       <div class="card-header">
                            <div class="pull-left">
                                <h4 class="mt-2">Competencias</h4>
                                <span class="line"></span>
                            </div>
                        </div>
                        <div class="card-body pb-2">
                            <ul class="list-unstyled mb-0">
                                <li class="mb-2"><i class="ti-user text-danger mr-2"></i> Trabajo en equipo</li>
                                <li class="mb-2"><i class="ti-bolt text-danger mr-2"></i> Proactividad</li>
                                <li class="mb-2"><i class="ti-check-box text-danger mr-2"></i> Responsabilidad</li>
                                <li class="mb-2"><i class="ti-comment text-danger mr-2"></i> Comunicación</li>
                            </ul>
                        </div>
                    </div>
```

The exact insertion point is after `</div>\n                    </div>` that closes the Languages card and before the closing `</div>\n            </div>\n        </div>\n    </section>` that closes the Resume section column.

- [ ] **Step 5: Verify**

Reload. Third resume column should show: Herramientas (Office, QGIS), Idiomas (Español, Inglés B2), and Competencias (four soft skills as a list).

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "feat: update skills and languages cards for Miguel De Julio"
```

---

## Chunk 3: Portfolio, Coming Soon, Contact, Scripts

### Task 9: Empty the Portfolio section (lines 337–745)

**Files:**
- Modify: `index.html:337-745`

- [ ] **Step 1: Replace portfolio section heading**

Replace:
```html
            <h1 class="mb-5"><span class="text-danger">My</span> Portfolio</h1>
```
With:
```html
            <h1 class="mb-5"><span class="text-danger">Mi</span> Portafolio</h1>
```

- [ ] **Step 2: Remove all filter buttons and portfolio items**

Replace the entire `<div class="portfolio">` block (filters + portfolio-container with all flip-cards) with:
```html
            <div class="portfolio">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center py-5">
                        <p class="lead text-muted">Próximamente...</p>
                    </div>
                </div>
            </div>
```

- [ ] **Step 3: Verify**

Reload. Portfolio section should be empty with just "Próximamente..." text. No flip cards.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "feat: empty portfolio section for Miguel De Julio"
```

---

### Task 10: Update Coming Soon section — remove chess widget (lines 752–791)

**Files:**
- Modify: `index.html:752-791`

- [ ] **Step 1: Update section heading**

Replace:
```html
            <h2 class="mb-5"><span class="text-danger">Coming</span> Soon</h2>
```
With:
```html
            <h2 class="mb-5"><span class="text-danger">Próximamente</span></h2>
```

- [ ] **Step 2: Replace coming-soon card content (Marcos's hobbies)**

Replace the list content inside the card:
```html
                        <ul class="list-unstyled text-left" style="max-width: 400px; margin: 0 auto;">
                            <li class="mb-3"><span style="font-size: 1.5rem;">&#127891;</span> <strong>Certificates & Courses</strong></li>
                            <li class="mb-3"><span style="font-size: 1.5rem;">&#127908;</span> <strong>AI Presentations</strong></li>
                            <li class="mb-3"><span style="font-size: 1.5rem;">&#128218;</span> <strong>Books I've Read</strong></li>
                            <li class="mb-3"><span style="font-size: 1.5rem;">&#127947;</span> <strong>Personal Hobbies</strong> <span class="text-muted">(acrobatics, boxing, chess)</span></li>
                        </ul>
                        <p class="mt-4 text-muted"><em>Stay tuned for updates!</em></p>
```
With:
```html
                        <p class="mt-4 text-muted"><em>¡Vuelve pronto para ver más contenido!</em></p>
```

- [ ] **Step 3: Also update the intro text inside the card**

Replace:
```html
                        <h3 class="font-weight-light mb-4">This Section is Under Construction!</h3>
                        <p class="lead text-muted mb-4">I'm working on adding more content to this website. Here's what's coming:</p>
```
With:
```html
                        <h3 class="font-weight-light mb-4">¡Esta sección está en construcción!</h3>
                        <p class="lead text-muted mb-4">Estoy trabajando en añadir más contenido a esta página web.</p>
```

- [ ] **Step 4: Remove chess puzzle block**

Delete this exact block (lines 773–789):
```html
            <!-- Chess Puzzle -->
            <div class="row justify-content-center mt-5">
                <div class="col-lg-6 col-md-8 text-center">
                    <div class="card p-4 chess-puzzle-card">
                        <h4 class="font-weight-light mb-2">
                            <span class="text-danger">&#9823;</span> Chess Puzzle
                        </h4>
                        <div id="chess-info" class="mb-3"></div>
                        <div id="chess-board" style="width: 100%; max-width: 400px; margin: 0 auto;"></div>
                        <div id="chess-feedback" class="mt-3" style="min-height: 40px;"></div>
                        <div class="mt-2">
                            <button id="chess-reset" class="btn btn-outline-danger btn-sm">Reset Puzzle</button>
                            <button id="chess-solution" class="btn btn-outline-secondary btn-sm ml-2">View Solution</button>
                        </div>
                    </div>
                </div>
            </div>
```

- [ ] **Step 5: Verify**

Reload. Coming Soon section shows construction message in Spanish, no chess board.

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "feat: update coming-soon section, remove chess widget"
```

---

### Task 11: Update Contact section (lines 798–856)

**Files:**
- Modify: `index.html:798-856`

- [ ] **Step 1: Update section heading**

Replace:
```html
            <h2 class="mb-5"><span class="text-danger">Contact</span> Me</h2>
```
With:
```html
            <h2 class="mb-5"><span class="text-danger">Contacto</span></h2>
```

- [ ] **Step 2: Translate contact form labels**

Replace:
```html
                        <h4 class="contact-title">Send a message</h4>
```
With:
```html
                        <h4 class="contact-title">Enviar un mensaje</h4>
```

Replace:
```html
                                <button type="submit" class="form-control btn btn-primary">Send Message</button>
```
With:
```html
                                <button type="submit" class="form-control btn btn-primary">Enviar mensaje</button>
```

- [ ] **Step 3: Clear the form action (Formspree endpoint was Marcos's)**
Note: Miguel will need to register a new Formspree account and update the `action` URL before the form can send emails.

Replace:
```html
                        <form action="https://formspree.io/f/xdadqvvj" method="POST">
```
With:
```html
                        <form action="" method="POST">
```

- [ ] **Step 4: Update contact info card**

Replace:
```html
                        <h4 class="contact-title">Get in touch</h4>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-mobile icon-md"></i>
                            </div>
                            <div class="col-10 ">
                                <h6 class="d-inline">Phone : <br> <span class="text-muted">+ (34) 618-382-472</span></h6>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-map-alt icon-md"></i>
                            </div>
                            <div class="col-10">
                                <h6 class="d-inline">Address :<br> <span class="text-muted">Madrid, Spain</span></h6>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-envelope icon-md"></i>
                            </div>
                            <div class="col-10">
                                <h6 class="d-inline">Email :<br> <span class="text-muted">marcosrodrigo5@hotmail.com</span></h6>
                            </div>
                        </div>
                        <ul class="social-icons pt-4">
                            <li class="social-item"><a class="social-link text-dark" href="mailto:marcosrodrigo5@hotmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                            <li class="social-item"><a class="social-link text-dark" href="https://www.linkedin.com/in/marcos-rodrigo-talavera/" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
                            <li class="social-item"><a class="social-link text-dark" href="https://github.com/MarcosRodrigoT" target="_blank"><i class="ti-github" aria-hidden="true"></i></a></li>
                        </ul>
```
With:
```html
                        <h4 class="contact-title">Ponte en contacto</h4>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-mobile icon-md"></i>
                            </div>
                            <div class="col-10 ">
                                <h6 class="d-inline">Teléfono : <br> <span class="text-muted">+34 690 82 98 58</span></h6>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-map-alt icon-md"></i>
                            </div>
                            <div class="col-10">
                                <h6 class="d-inline">Dirección :<br> <span class="text-muted">Madrid, España</span></h6>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-1 pt-1 mr-1">
                                <i class="ti-envelope icon-md"></i>
                            </div>
                            <div class="col-10">
                                <h6 class="d-inline">Email :<br> <span class="text-muted">migueldejuliocostas@gmail.com</span></h6>
                            </div>
                        </div>
                        <ul class="social-icons pt-4">
                            <li class="social-item"><a class="social-link text-dark" href="mailto:migueldejuliocostas@gmail.com"><i class="ti-email" aria-hidden="true"></i></a></li>
                            <li class="social-item"><a class="social-link text-dark" href="https://www.linkedin.com/in/miguel-de-julio-costas" target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a></li>
                        </ul>
```

- [ ] **Step 5: Verify**

Reload. Contact section should show Miguel's phone, address, email, email+LinkedIn icons, and all text in Spanish.

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "feat: update contact section for Miguel De Julio"
```

---

### Task 12: Remove chess script tags (lines 869–894)

**Files:**
- Modify: `index.html:869-894`

- [ ] **Step 1: Remove chess library scripts**

Delete these three lines:
```html
    <!-- Chess libraries (CDN) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
    <script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>

    <!-- Chess Puzzle -->
    <script src="assets/js/chess-puzzle.js"></script>
```

- [ ] **Step 2: Remove Google Maps script**

Delete:
```html
    <!-- Google mpas -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtme10pzgKSPeJVJrG1O3tjR6lk98o4w8&callback=initMap"></script>
```

- [ ] **Step 3: Verify**

Reload. Open browser console — no errors about missing chess scripts or Maps callback.

- [ ] **Step 4: Final full-page verification**

Check all sections top to bottom:
- [ ] Header: Miguel's name, "Estudiante de Biología", email+LinkedIn icons, miguel.png photo
- [ ] Navbar: Spanish labels, Miguel's brand
- [ ] About: Spanish content, Miguel's personal info, soft skills column
- [ ] Resume: Experiencia, Formación, Herramientas, Idiomas — all correct
- [ ] Portfolio: Empty with "Próximamente..." message
- [ ] Coming Soon: Spanish, no chess board
- [ ] Contact: Miguel's phone/email/address, no GitHub icon

- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "feat: remove chess and maps scripts, complete Miguel De Julio adaptation"
```
