// src/app/page.tsx
"use client";

import { useState } from "react";
import { RESUME_DATA } from "@/data/resume";
import BrainGraph from "@/components/BrainGraph";
import { motion, AnimatePresence } from "framer-motion";
import AboutMyself from "@/components/AboutMyself";
import EducationConnectome from "@/components/EducationConnectome";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const THEME_STYLES: Record<string, { border: string; bg: string; text: string; tag: string }> = {
  blue: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/20",
    text: "text-cyan-400",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-950/20",
    text: "text-purple-400",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/20",
    text: "text-emerald-400",
    tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-950/20",
    text: "text-amber-400",
    tag: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  rose: {
    border: "border-rose-500/30",
    bg: "bg-rose-950/20",
    text: "text-rose-400",
    tag: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
  indigo: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-950/20",
    text: "text-indigo-400",
    tag: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },
};

export default function Home() {
  const [eduIndex, setEduIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevEdu = () => {
    setEduIndex((prev) => (prev > 0 ? prev - 1 : RESUME_DATA.education.length - 1));
  };

  const activeWork = RESUME_DATA.internships[workIndex];

  const nextEdu = () => {
    setEduIndex((prev) => (prev < RESUME_DATA.education.length - 1 ? prev + 1 : 0));
  };

  const activeEdu = RESUME_DATA.education[eduIndex];

  // 4 modules abstraits reliés selon une topologie de graphe
  const abstractNodes = [
    { x: 30, y: 25, label: "NOD 01" }, // M2 Info
    { x: 70, y: 32, label: "NOD 02" }, // M2 Neuro
    { x: 62, y: 72, label: "NOD 03" }, // L3 Psycho
    { x: 25, y: 68, label: "NOD 04" }, // MPSI
  ];

  const skillGroups = [
    {
      title: "Software & Data Engineering",
      theme: "blue" as const,
      items: ["TypeScript", "Angular", "RxJS", "Java", "Python", "SQL", "Git"],
    },
    {
      title: "Neuroimaging & Signal Analysis",
      theme: "purple" as const,
      items: ["fMRI", "SPM12", "EEG", "MATLAB", "Time-Series", "Connectomics"],
    },
    {
      title: "Clinical & Translational Research",
      theme: "emerald" as const,
      items: ["Biomarkers", "MSD Assays", "Exosome Extraction", "FACS", "Behavioral Testing"],
    },
    {
      title: "Research Methods",
      theme: "amber" as const,
      items: ["Experimental Design", "Statistics", "Machine Learning", "Protocol Design", "Data Cleaning"],
    },
  ];

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#060709] text-zinc-100 scroll-smooth selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation fixe */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#060709]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-100">
              {RESUME_DATA.name}
            </span>
          </div>

          <nav className="flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <a href="#hero" className="hover:text-cyan-400 transition">Intro</a>
            <a href="#education" className="hover:text-cyan-400 transition">Connectome Path</a>
            <a href="#internships" className="hover:text-cyan-400 transition">Experience</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Stack</a>
          </nav>

          <a
            href={`mailto:${RESUME_DATA.contact.email}`}
            className="rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ================= SECTION 1 : HERO SLIDE ================= */}
      <section
        id="hero"
        className="relative h-screen w-full snap-start flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <BrainGraph />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#060709_90%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl text-center space-y-6 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs text-zinc-300 backdrop-blur-md pointer-events-auto">
            <Sparkles className="size-3.5 text-cyan-400" />
            <span>Connectomics · Software Architecture · Neural Data</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white font-sans bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {RESUME_DATA.name}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            {RESUME_DATA.headline}
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 pointer-events-auto">
            <a
              href={`mailto:${RESUME_DATA.contact.email}`}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition shadow-lg"
            >
              <Mail className="size-4" />
              <span>Get in touch</span>
            </a>
            <a
              href={RESUME_DATA.contact.social.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-zinc-900/80 p-2.5 text-zinc-300 hover:border-cyan-500/50 hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={RESUME_DATA.contact.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-zinc-900/80 p-2.5 text-zinc-300 hover:border-cyan-500/50 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </motion.div>

        <a
          href="#education"
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-xs text-zinc-500 hover:text-cyan-400 transition"
        >
          <span className="tracking-widest uppercase text-[10px]">Explore Academic Path</span>
          <ArrowDown className="size-4 animate-bounce text-cyan-400" />
        </a>
      </section>

      {/* ================= SECTION 2 : ABOUT MYSELF ================= */}
      <AboutMyself />

      {/* ================= SECTION 2 : EDUCATION CONNECTOME SLIDER ================= */}
      <EducationConnectome />

      {/* ================= SECTION 3 : RESEARCH & INDUSTRY TERMINAL ================= */}
      <section
        id="internships"
        className="relative h-screen w-full snap-start flex items-center justify-center px-6 bg-[#060709] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-12">
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
                [ Career Trajectory ]
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                0{workIndex + 1} / 0{RESUME_DATA.internships.length}
              </span>
            </div>

            <div className="space-y-2 max-h-[58vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {RESUME_DATA.internships.map((job, idx) => {
                const isSelected = workIndex === idx;
                return (
                  <button
                    key={job.id}
                    onClick={() => setWorkIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                        : "border-white/5 bg-zinc-950/50 hover:border-white/15 hover:bg-zinc-900/40"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {job.start} — {job.end}
                      </span>
                      <h4
                        className={`text-sm font-semibold transition ${
                          isSelected ? "text-cyan-300" : "text-zinc-200"
                        }`}
                      >
                        {job.company}
                      </h4>
                      <p className="text-xs text-zinc-400 truncate max-w-[220px]">
                        {job.role}
                      </p>
                    </div>

                    <div
                      className={`size-2 rounded-full transition ${
                        isSelected ? "bg-cyan-400 shadow-[0_0_8px_#38bdf8]" : "bg-zinc-700"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={workIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/90 to-[#060709] p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-950/30 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                      {activeWork.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">{activeWork.role}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 flex items-center gap-2 mt-1">
                      <span className="font-medium text-zinc-200">{activeWork.company}</span>
                      <span>·</span>
                      <MapPin className="size-3 text-zinc-500" />
                      <span>{activeWork.location}</span>
                      <span>·</span>
                      <span className="font-mono text-zinc-400">
                        {activeWork.start} — {activeWork.end}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 italic border-l-2 border-cyan-500/40 pl-3.5 leading-relaxed">
                  {activeWork.tagline}
                </p>

                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
                    Key Responsibilities & Deliverables
                  </span>
                  <ul className="space-y-2">
                    {activeWork.achievements.map((ach, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        <span className="size-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#38bdf8]" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
                    Technical & Methodological Toolkit
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeWork.toolkit.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4 : TECHNICAL STACK & CAPABILITY MATRIX ================= */}
      <section
        id="skills"
        className="relative h-screen w-full snap-start flex items-center justify-center px-6 bg-[#060709] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_55%)] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-6xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.28em] text-cyan-400 font-mono">
                [ Core Stack ]
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
                Technical Stack & Research Toolkit
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/90 to-[#060709] p-6 shadow-2xl">
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
                    Profile
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    Software engineering and neuroscience research applied to data pipelines,
                    neuroimaging, and experimental workflows.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
                    Main domains
                  </span>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    <li>• Web & software engineering</li>
                    <li>• Neuroimaging and signal processing</li>
                    <li>• Translational and clinical research</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((group) => {
                const theme = THEME_STYLES[group.theme] || THEME_STYLES.blue;
                return (
                  <div
                    key={group.title}
                    className={`rounded-2xl border ${theme.border} ${theme.bg} p-4 shadow-lg`}
                  >
                    <h3 className={`text-sm font-semibold ${theme.text}`}>{group.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className={`rounded-md border px-2 py-1 text-[10px] font-mono ${theme.tag}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODALE GRAND FORMAT (ZOOM FLUIDE + BLOCS COLORÉS) ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 280,
                mass: 0.7,
              }}
              className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#090a0f] p-6 sm:p-9 shadow-[0_0_60px_rgba(0,0,0,0.9)] text-zinc-100 z-10 space-y-8 will-change-transform"
            >
              {/* En-tête : Logo Université + Intitulé */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden flex items-center justify-center shrink-0 p-2 shadow-inner">
                    <img
                      src={activeEdu.logo}
                      alt={activeEdu.school}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <span className="text-xs font-bold text-zinc-400 absolute pointer-events-none">
                      {activeEdu.school.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-cyan-400">
                      {activeEdu.start} — {activeEdu.end}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {activeEdu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {activeEdu.school} · {activeEdu.faculty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              <p className="text-sm text-zinc-300 italic border-l-2 border-cyan-500/50 pl-3">
                {activeEdu.headline}
              </p>

              {/* 1. Grille des Modules / Syllabus avec Blocs Colorés */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono flex items-center gap-2">
                  <span>Core Modules & Syllabus</span>
                  <span className="h-px flex-1 bg-white/5" />
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeEdu.modules.map((m, idx) => {
                    const theme = THEME_STYLES[m.theme] || THEME_STYLES.blue;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 backdrop-blur-sm space-y-3.5`}
                      >
                        <h4 className={`text-sm font-semibold ${theme.text}`}>
                          {m.title}
                        </h4>

                        <div className="flex flex-wrap gap-1.5">
                          {m.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`rounded-md border px-2 py-0.5 text-[10px] font-mono ${theme.tag}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <ul className="space-y-1.5 pt-1">
                          {m.courses.map((course, cIdx) => (
                            <li
                              key={cIdx}
                              className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                            >
                              <span className="size-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Projets et Recherches réalisés durant ce diplôme */}
              {activeEdu.projects.length > 0 && (
                <div className="space-y-4 pt-2">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono flex items-center gap-2">
                    <span>Academic Projects & Research Focus</span>
                    <span className="h-px flex-1 bg-white/5" />
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeEdu.projects.map((p, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4 space-y-2 hover:border-white/20 transition"
                      >
                        <h5 className="text-xs font-semibold text-white">
                          {p.title}
                        </h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {p.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}