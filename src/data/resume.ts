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
      linkedin: "https://linkedin.com/in/",
    },
  },
  education: [
    {
      id: "amu-cs",
      school: "Aix-Marseille Université",
      faculty: "Faculté des Sciences",
      logoText: "AMU",
      logoColor: "from-blue-600 to-cyan-500",
      degree: "Master's Degree, Computer Science (CCI)",
      start: "Sept 2025",
      end: "Sept 2026",
      headline:
        "Object-Oriented Programming, Full-Stack Architecture, Database Modeling & Mobile Engineering.",
      coreCurriculum: [
        {
          title: "1. Software Engineering & OOP",
          items: [
            "Languages: Java (Core & Back-end), Python (Advanced Algorithmics).",
            "Methodologies: Object-Oriented Design, Refactoring, Design Patterns.",
            "Tools: Git, GitLab, Version Control.",
          ],
        },
        {
          title: "2. Full-Stack Development & Frameworks",
          items: [
            "Back-end: Spring Framework (Spring Boot).",
            "Front-end: Angular, JavaScript, TypeScript.",
            "Environment: Linux environment & Bash scripting.",
          ],
        },
        {
          title: "3. Mobile & Native Engineering",
          items: [
            "Android: Native Kotlin development.",
            "iOS: Native Swift development.",
            "Cross-platform integration and mobile architectural patterns.",
          ],
        },
        {
          title: "4. Data Management",
          items: [
            "Relational Databases: SQL (Modeling MCD/MLD, Querying, Indexing).",
          ],
        },
      ],
    },
    {
      id: "unistra-neuro",
      school: "Université de Strasbourg",
      faculty: "Faculté des Sciences de la Vie",
      logoText: "UNISTRA",
      logoColor: "from-rose-500 to-amber-500",
      degree: "Master's Degree, Cognitive Neurosciences",
      start: "Sept 2023",
      end: "Jun 2025",
      headline:
        "Computational neurosciences, neuroimaging (fMRI connectomics), and psychiatric preclinical models.",
      coreCurriculum: [
        {
          title: "1. Computational & Quantitative Neurosciences",
          items: [
            "Computational Neuroscience: Neural network modeling and biophysical simulations.",
            "Statistical Methods: Advanced statistical methodologies for high-dimensional neuro-datasets.",
            "Neuroimaging: Analysis and multi-stage preprocessing of complex brain imaging (fMRI / SPM12).",
          ],
        },
        {
          title: "2. Clinical & Behavioral Research",
          items: [
            "Preclinical Models: Modeling cognitive disorders (schizophrenia, addiction, dementia) in rodents.",
            "Clinical Neuroscience: Neuropathologies, pain circuits, and neuropharmacology.",
            "Genetics: Applied genomics and genetics in the context of brain network plasticity.",
          ],
        },
        {
          title: "3. Thesis & Major Research Projects",
          items: [
            "Thesis Project: Sex, profiles, and consumption trajectories — functional MRI study of binge drinking in mice.",
            "IDSN Project: Multi-omic investigation of gut microbiota and addiction vulnerability.",
          ],
        },
      ],
    },
    {
      id: "unistra-psycho",
      school: "Université de Strasbourg",
      faculty: "Faculté de Psychologie",
      logoText: "UNISTRA",
      logoColor: "from-emerald-500 to-teal-500",
      degree: "Bachelor's Degree, Psychology & Cognitive Sciences",
      start: "2021",
      end: "2023",
      headline:
        "Neuropsychology, pre-med foundations, behavioral physiology, and cognitive assessment.",
      coreCurriculum: [
        {
          title: "1. Biological & Neurosciences Foundation",
          items: [
            "Pre-med curriculum (2020-2021): Epigenetics, cell signaling, neurology, embryology, and gene biochemistry.",
            "Behavioral Neurobiology: Neural basis of memory, emotional regulation, and neurophysiology.",
            "TER Research Project: Psychobiology and spatial memory consolidation using the Morris Water Maze (MWM).",
          ],
        },
        {
          title: "2. Cognitive Science & Clinical Methodologies",
          items: [
            "Executive functions, language architecture, and developmental cognitive frameworks.",
            "CBT foundations, psychopathology, semiology, and psychometrics.",
            "Options: Experimental Psychology, Cognitive Ethology, and Translational Neuropsychology.",
          ],
        },
      ],
    },
    {
      id: "kleber-mpsi",
      school: "Lycée Kléber, Strasbourg",
      faculty: "Classes Préparatoires aux Grandes Écoles",
      logoText: "KLÉBER",
      logoColor: "from-zinc-500 to-stone-400",
      degree: "CPGE MPSI (Intensive Mathematics & Physics)",
      start: "Sept 2019",
      end: "Jun 2020",
      headline:
        "National preparatory curriculum in pure mathematics, algorithmic foundations, and system logic.",
      coreCurriculum: [
        {
          title: "1. Core Mathematical Sciences",
          items: [
            "Linear Algebra, Group Theory, Polynomial Spaces, and Vector Calculus.",
            "Real Analysis: Differential calculus, series convergence, and integration theory.",
          ],
        },
        {
          title: "2. Physics & Engineering Fundamentals",
          items: [
            "Algorithmic Logic: Computational theory, structured programming, and recursion.",
            "Engineering Science: System modeling, electrical state-space, and logic mechanics.",
          ],
        },
      ],
    },
  ],
};