// src/data/resume.ts

export const RESUME_DATA = {
  name: "Thomas Baillot",
  headline: "Software Engineer & Computational Neuroscientist",
  location: "Marseille / Rousset, France",
  about:
    "Engineering robust full-stack systems and automated data pipelines at the confluence of software architecture, neuroimaging, and biosignal processing.",
  contact: {
    email: "thomasbit@icloud.com",
    tel: "+33 7 81 52 09 61",
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/thomas-baillot-255517242",
    },
  },
  // À insérer dans RESUME_DATA dans src/data/resume.ts

  // Dans src/data/resume.ts, section personal :

  personal: {
    bio: "Passionate about understanding cognitive dynamics through code. When I am not modeling brain connectivity matrices or writing fullstack architectures, I explore complex systems in literature, cinema, and music.",
    book: {
      title: "Le soleil des Scortas",
      author: "Laurent Gaudé",
      takeaway: "A deep dive into self-reference, strange loops, minds, and computation.",
      cover: "/images/scortas.jpg", // ou URL directe d'une couverture
    },
    movies: [
      {
        title: "Incendies",
        director: "Denis Villeneuve",
        tag: "Cognition & Time",
        poster: "/images/incendies.jpe", // ou URL directe
      },
      {
        title: "Juste la fin du monde",
        director: "Xavier Dolan",
        tag: "Physics & Scale",
        poster: "/images/juste_fin_du_monde.jpg",
      },
      {
        title: "Isle of dogs",
        director: "Wes Anderson",
        tag: "AI & Consciousness",
        poster: "/images/dogs.jpg",
      },
    ],
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/34pZXHHcMlYTXVeL41Bwgo?utm_source=generator&si=de568e28e09e4170",
  },

  education: [
    {
      id: "amu-cs",
      school: "Aix-Marseille Université",
      faculty: "Faculté des Sciences",
      logo: "/images/amu.png", // Dépose ton logo dans public/logos/amu.png
      degree: "Master's Degree, Computer Science (CCI)",
      start: "Sept 2025",
      end: "Sept 2026",
      headline:
        "Object-Oriented Programming, Full-Stack Architecture, Database Modeling & Mobile Systems.",
      // Blocs thématiques colorés du syllabus
      modules: [
        {
          title: "Core Software Engineering & OOP",
          theme: "blue", // cyan / blue
          skills: ["Java", "Python", "OOP", "Design Patterns", "Git/GitLab"],
          courses: [
            "Advanced Java: Encapsulation, polymorphism, collections, multithreading.",
            "Python: Algorithmic complexity, data structures, dynamic programming.",
            "Software architecture: MVC decoupling, unit testing, continuous integration.",
          ],
        },
        {
          title: "Full-Stack Web Engineering",
          theme: "indigo",
          skills: ["Spring Boot", "Angular", "TypeScript", "REST APIs"],
          courses: [
            "Back-end systems: Spring MVC, Spring Data JPA, microservices basics.",
            "Client-side: Angular architecture, RxJS reactive patterns, state handling.",
            "Linux system scripting, automated environments, and network tunneling.",
          ],
        },
        {
          title: "Native Mobile & Systems",
          theme: "emerald",
          skills: ["Kotlin", "Swift", "Android SDK", "iOS"],
          courses: [
            "Native Android development with Kotlin & jetpack patterns.",
            "iOS ecosystem and mobile user experience paradigms with Swift.",
          ],
        },
        {
          title: "Data Architecture & Storage",
          theme: "amber",
          skills: ["SQL", "Relational Modeling", "PostgreSQL", "MCD/MLD"],
          courses: [
            "Conceptual and logical database modeling (MCD/MLD).",
            "Relational databases: Query tuning, schema optimization, and transaction safety.",
          ],
        },
      ],
      // Projets réalisés durant ce diplôme
      projects: [
        {
          title: "Distributed 2D Multiplayer Game Engine",
          tags: ["Java", "JavaFX", "ngrok", "Sockets"],
          desc: "Concurrent 2D engine featuring strict MVC separation and network tunneling.",
        },
        {
          title: "OOP Systems & Desktop Classic Engines",
          tags: ["Java", "Design Patterns", "Algorithms"],
          desc: "Set of 4 decoupled desktop applications prioritizing memory efficiency.",
        },
      ],
    },
    {
      id: "unistra-neuro",
      school: "Université de Strasbourg",
      faculty: "Faculté des Sciences de la Vie",
      logo: "/images/unistra.png", // Dépose ton logo dans public/logos/unistra.png
      degree: "Master's Degree, Cognitive Neurosciences",
      start: "Sept 2023",
      end: "Jun 2025",
      headline:
        "Computational neurosciences, dynamic connectomics, biological signal preprocessing, and translational models.",
      modules: [
        {
          title: "Computational Neuroscience & Quantitative Methods",
          theme: "purple",
          skills: ["Python", "MATLAB", "Neural Networks", "Time-Series"],
          courses: [
            "Computational modeling: Biophysical neural networks and attractor dynamics.",
            "Quantitative data processing: High-dimensional matrix manipulation and signal filtering.",
          ],
        },
        {
          title: "Advanced Neuroimaging & Connectomics",
          theme: "rose",
          skills: ["fMRI", "SPM12", "Dynamic Connectivity", "Brain Graph Theory"],
          courses: [
            "Preclinical functional MRI acquisitions and motion/slice timing correction.",
            "Dynamic functional connectivity (dFC) matrices and graph metrics.",
          ],
        },
        {
          title: "Clinical Neuroscience & Psychiatry",
          theme: "amber",
          skills: ["Addiction Models", "Psychiatry", "Genomics", "Pharmacology"],
          courses: [
            "Neurobiology of psychiatric and neurodegenerative pathologies.",
            "Epigenetics of vulnerabilities, drug addiction, and nociceptive circuitry.",
          ],
        },
      ],
      projects: [
        {
          title: "Thesis: Preclinical Binge Drinking Connectomics",
          tags: ["fMRI", "MATLAB", "SPM12", "Machine Learning"],
          desc: "Investigated neural network plasticity in mice models under the DID paradigm.",
        },
        {
          title: "IDSN Research Project: Microbiota-Brain Axis",
          tags: ["Translational", "Multi-omics", "Addiction"],
          desc: "Explored interactions between gut microbiome dysbiosis and addiction trajectories.",
        },
      ],
    },
    {
      id: "unistra-psycho",
      school: "Université de Strasbourg",
      faculty: "Faculté de Psychologie",
      logo: "/images/unistra.png",
      degree: "Bachelor's Degree, Psychology & Cognitive Sciences",
      start: "2021",
      end: "2023",
      headline:
        "Pre-med curriculum foundation, neuropsychology, cognitive architecture, and behavioral assessment.",
      modules: [
        {
          title: "Biological & Pre-Med Foundations (PASS / L1)",
          theme: "emerald",
          skills: ["Epigenetics", "Cell Signaling", "Neurology", "Biochemistry"],
          courses: [
            "First year health foundation: Cell communication, histology, and embryology.",
            "Molecular and neurobiological bases of central nervous system function.",
          ],
        },
        {
          title: "Cognitive Science & Experimental Protocols",
          theme: "blue",
          skills: ["Experimental Design", "Psychometrics", "Behavioral Testing"],
          courses: [
            "Executive functions, decision making, memory consolidation frameworks.",
            "Psychometrics, statistical inference, and standardized observation protocols.",
          ],
        },
      ],
      projects: [
        {
          title: "TER Research Project: Spatial Memory in Rodents",
          tags: ["Morris Water Maze", "Psychobiology", "Telemetry"],
          desc: "Investigated spatial navigation retrieval using the Morris Water Maze protocol.",
        },
      ],
    },
    {
      id: "kleber-mpsi",
      school: "Lycée Kléber, Strasbourg",
      faculty: "CPGE (Classes Préparatoires aux Grandes Écoles)",
      logo: "/images/unistra.png", // Dépose ton logo dans public/logos/kleber.png
      degree: "CPGE MPSI (Intensive Mathematics & Physics)",
      start: "Sept 2019",
      end: "Jun 2020",
      headline:
        "Intensive national preparatory curriculum in abstract algebra, mathematical analysis, and algorithmic logic.",
      modules: [
        {
          title: "Pure Mathematics",
          theme: "indigo",
          skills: ["Linear Algebra", "Real Analysis", "Differential Equations"],
          courses: [
            "Vector spaces, matrix decomposition, spectral theorem, algebraic structures.",
            "Series convergence, topology of normed vector spaces, differential calculus.",
          ],
        },
        {
          title: "Computer Science & Engineering Physics",
          theme: "amber",
          skills: ["Algorithmic Complexity", "Recursion", "System Modeling"],
          courses: [
            "Algorithmic design, computational logic, dynamic storage structures.",
            "Engineering science: State-space modeling, feedback loops, and electrical logic.",
          ],
        },
      ],
      projects: [],
    },
  ],
  internships: [
    {
      id: "stmicro",
      company: "STMicroelectronics",
      role: "Software Engineering Intern",
      location: "Rousset, France",
      start: "Jun 2026",
      end: "Present",
      category: "Industry & Web Engineering",
      logo: "/logos/st.png",
      tagline: "Industrial inspection equipment automation & monitoring interfaces.",
      achievements: [
        "Architected and integrated responsive web telemetry dashboards using Angular, TypeScript, and RxJS.",
        "Automated optical inspection workflows, eliminating operational latency and standardizing semiconductor batch tracing.",
      ],
      toolkit: ["Angular", "TypeScript", "RxJS", "Industrial Automation", "Linux"],
      theme: "blue",
    },
    {
      id: "icube",
      company: "ICube Laboratory",
      role: "fMRI & Neuroimaging Data Analyst",
      location: "Strasbourg, France",
      start: "Jan 2025",
      end: "Jun 2025",
      category: "Neuroimaging & Machine Learning",
      logo: "/logos/icube.png",
      tagline: "Sex, profiles, and consumption trajectories: study of binge drinking in mice via fMRI connectomics.",
      achievements: [
        "Pre-processed high-resolution preclinical functional MRI datasets using SPM12 and customized MATLAB/Python pipelines.",
        "Computed dynamic functional connectivity (dFC) parcellation matrices to trace brain plasticity alterations.",
        "Engineered predictive Machine Learning classification routines identifying high-risk behavioral phenotypes under the DID paradigm.",
      ],
      toolkit: ["fMRI", "SPM12", "Python", "MATLAB", "Scikit-Learn", "Connectomics"],
      theme: "purple",
    },
    {
      id: "chu-quebec",
      company: "CHU de Québec (Laval University)",
      role: "Psychiatry & Biomarker Data Analyst",
      location: "Quebec, Canada",
      start: "Jun 2024",
      end: "Aug 2024",
      category: "Translational Psychiatry & Automation",
      logo: "/logos/chuq.png",
      tagline: "Translational research on PTSD susceptibility towards personalized medicine.",
      achievements: [
        "Coded automated Python software ingestion pipelines for inflammatory biomarker quantification, removing manual spreadsheet bottleneck.",
        "Conducted exosome extraction (ExoFlow Kit) and multiplexed Meso Scale Discovery (MSD) assays across human plasma and animal models.",
        "Supervised preclinical behavioral anxiety test batteries (Open Field, Light-Dark Box, Recall protocols).",
      ],
      toolkit: ["Python (Automation)", "MSD Assays", "Exosome Extraction", "FACS", "Translational Bio"],
      theme: "emerald",
    },
    {
      id: "cnrs-lnca",
      company: "CNRS — LNCA UMR 7364",
      role: "Behavioral Neuroscience Research Intern",
      location: "Strasbourg, France",
      start: "Jan 2023",
      end: "Apr 2023",
      category: "Neural Circuits & Systems",
      logo: "/logos/cnrs.png",
      tagline: "Cortico-thalamo-hippocampal circuitry in remote memory persistence and consolidation.",
      achievements: [
        "Mapped stereotaxic coordinates and performed rodent brain slicing using Paxinos & Watson atlases.",
        "Administered Morris Water Maze (MWM) experimental paradigms assessing spatial reference learning and retrieval.",
        "Conducted immunohistochemistry (IHC) staining and assisted in stereotaxic surgical electrode implantation.",
      ],
      toolkit: ["Stereotaxy", "Morris Water Maze", "Histology (IHC)", "Neural Circuit Mapping"],
      theme: "amber",
    },
    {
      id: "inserm-1114",
      company: "INSERM U1114",
      role: "Clinical Neuroscience Research Intern",
      location: "Strasbourg, France",
      start: "Feb 2023",
      end: "Mar 2023",
      category: "Clinical Neurobiology & EEG",
      logo: "/logos/inserm.png",
      tagline: "Cognitive and neural mechanisms of multidimensional apathy in schizophrenia and depression.",
      achievements: [
        "Acquired high-density physiological EEG signals using the BIOSEMI system (electrode placement, montage impedance checks).",
        "Engineered automated data collation routines processing clinical reaction times and error-rate task outputs (MID, DPX, DET).",
      ],
      toolkit: ["BIOSEMI EEG", "Time-Series", "Data Processing", "Psychiatry (DAS/LARS)"],
      theme: "rose",
    },
    {
      id: "inserm-addict",
      company: "INSERM U1114 (Addictology Unit)",
      role: "Epigenetics & Clinical Observer",
      location: "Strasbourg, France",
      start: "Jun 2022",
      end: "Jun 2022",
      category: "Epigenetics & Clinical Addiction",
      logo: "/logos/inserm.png",
      tagline: "EBIOMUD project: DNA methylation indicators of Opioid Use Disorder severity.",
      achievements: [
        "Evaluated translational protocol viability comparing capillary finger-prick vs. venous blood DNA methylation profiles.",
        "Immersed in low-threshold consumption facilities (ARGOS) and monitored patient inclusion workflows.",
      ],
      toolkit: ["DNA Methylation", "RRBS-seq", "Translational Protocols", "Addiction Medicine"],
      theme: "indigo",
    },
  ],
};