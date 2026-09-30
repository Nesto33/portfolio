// src/components/EducationConnectome.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { RESUME_DATA } from "@/data/resume";
import THEME_STYLES from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Sparkles } from "lucide-react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  cluster: number;
}

interface InterLink {
  from: number;
  to: number;
  curveOffset: number;
}

// Couleurs calquées sur ton BrainGraph original
const CLUSTER_COLORS = [
  { node: "rgba(56, 189, 248, 1)", raw: "56, 189, 248", name: "Computer Science" },      // 0: M2 Info (AMU)
  { node: "rgba(244, 63, 94, 1)", raw: "244, 63, 94", name: "Neurosciences" },       // 1: M2 Neuro (Unistra)
  { node: "rgba(251, 146, 60, 1)", raw: "251, 146, 60", name: "Psychology" },     // 2: L3 Psycho / PASS (Unistra)
  { node: "rgba(74, 222, 128, 1)", raw: "74, 222, 128", name: "MPSI" },   // 3: CPGE MPSI (Kléber)
];

const CLUSTER_TO_EDU_ID = ["amu-cs", "unistra-neuro", "unistra-psycho", "kleber-mpsi"];

export default function EducationConnectome() {
  const [selectedEduId, setSelectedEduId] = useState<string>("amu-cs");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentEdu =
    RESUME_DATA.education.find((e) => e.id === selectedEduId) ||
    RESUME_DATA.education[0];

  const activeClusterIdx = Math.max(0, CLUSTER_TO_EDU_ID.indexOf(currentEdu.id));

  const activeClusterRef = useRef<number>(activeClusterIdx);
  useEffect(() => {
    activeClusterRef.current = activeClusterIdx;
  }, [activeClusterIdx]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ================= MOTEUR CANVAS (BRAIN GRAPH COMPACT) =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 340);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    let nodes: Node[] = [];
    let interClusterLinks: InterLink[] = [];

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initGraph();
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, radius: 90 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (const n of nodes) {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        if (Math.sqrt(dx * dx + dy * dy) < 28) {
          const eduId = CLUSTER_TO_EDU_ID[n.cluster];
          if (eduId) setSelectedEduId(eduId);
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const initGraph = () => {
      nodes = [];
      interClusterLinks = [];
      const numClusters = 4;
      const nodesPerCluster = 11;

      const centers = [
        { x: width * 0.32, y: height * 0.32 }, // 0: Haut gauche
        { x: width * 0.68, y: height * 0.32 }, // 1: Haut droite
        { x: width * 0.68, y: height * 0.68 }, // 2: Bas droite
        { x: width * 0.32, y: height * 0.68 }, // 3: Bas gauche
      ];

      for (let c = 0; c < numClusters; c++) {
        const center = centers[c];
        for (let i = 0; i < nodesPerCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.pow(Math.random(), 0.7) * 55;
          const x = center.x + Math.cos(angle) * dist;
          const y = center.y + Math.sin(angle) * dist;

          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: i === 0 ? 4.2 : i < 3 ? 3.0 : 2.0,
            cluster: c,
          });
        }
      }

      const clusterPairs = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [0, 2],
        [1, 3],
      ];

      clusterPairs.forEach(([c1, c2]) => {
        const nodesC1 = nodes.filter((n) => n.cluster === c1);
        const nodesC2 = nodes.filter((n) => n.cluster === c2);

        for (let k = 0; k < 2; k++) {
          const idx1 = nodes.indexOf(nodesC1[Math.floor(Math.random() * nodesC1.length)]);
          const idx2 = nodes.indexOf(nodesC2[Math.floor(Math.random() * nodesC2.length)]);
          if (idx1 !== -1 && idx2 !== -1) {
            interClusterLinks.push({
              from: idx1,
              to: idx2,
              curveOffset: (Math.random() > 0.5 ? 1 : -1) * (25 + Math.random() * 35),
            });
          }
        }
      });
    };

    initGraph();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const activeC = activeClusterRef.current;

      // 1. Physique & interaction souris
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        const dxBase = n.baseX - n.x;
        const dyBase = n.baseY - n.y;
        n.vx += dxBase * 0.0015;
        n.vy += dyBase * 0.0015;

        n.vx *= 0.98;
        n.vy *= 0.98;

        const dxMouse = mouse.x - n.x;
        const dyMouse = mouse.y - n.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          n.x -= (dxMouse / distMouse) * force;
          n.y -= (dyMouse / distMouse) * force;
        }
      }

      // 2. Connexions intra-cluster
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          if (n1.cluster === n2.cluster) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 65) {
              const isActive = n1.cluster === activeC;
              const alpha = (1 - dist / 65) * (isActive ? 0.65 : 0.2);
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(${CLUSTER_COLORS[n1.cluster].raw}, ${alpha.toFixed(3)})`;
              ctx.lineWidth = isActive ? 1.4 : 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Connexions inter-clusters
      interClusterLinks.forEach(({ from, to, curveOffset }) => {
        const n1 = nodes[from];
        const n2 = nodes[to];
        if (!n1 || !n2) return;

        const isLinkedToActive = n1.cluster === activeC || n2.cluster === activeC;
        const alpha = isLinkedToActive ? 0.65 : 0.15;

        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        grad.addColorStop(0, `rgba(${CLUSTER_COLORS[n1.cluster].raw}, ${alpha})`);
        grad.addColorStop(1, `rgba(${CLUSTER_COLORS[n2.cluster].raw}, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);

        const midX = (n1.x + n2.x) / 2;
        const midY = (n1.y + n2.y) / 2;
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        const normalX = -dy / len;
        const normalY = dx / len;
        const ctrlX = midX + normalX * curveOffset;
        const ctrlY = midY + normalY * curveOffset;

        ctx.quadraticCurveTo(ctrlX, ctrlY, n2.x, n2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isLinkedToActive ? 1.4 : 0.8;
        ctx.stroke();
      });

      // 4. Dessin des nœuds avec halo
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const color = CLUSTER_COLORS[n.cluster];
        const isActive = n.cluster === activeC;

        const radius = isActive ? n.radius * 1.3 : n.radius;

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * (isActive ? 2.8 : 2.0), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.raw}, ${isActive ? 0.35 : 0.12})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#ffffff" : color.node;
        if (isActive) {
          ctx.shadowColor = `rgba(${color.raw}, 1)`;
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <section
        id="education"
        className="relative h-screen w-full snap-start flex items-center justify-center px-6 bg-[#060709] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col justify-center h-full pt-16 pb-8 space-y-5">
          
          {/* En-tête */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                [ 02 // Academic Curriculum & Connectome Clusters ]
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Sparkles className="size-3 text-cyan-400" />
              <span>Interactive Neural Clusters</span>
            </div>
          </div>

          {/* Grille : Brain Graph Canvas (4 cols) + 4 Diplômes (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Colonne Gauche : Mini BrainGraph Canvas */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-[340px] rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl p-2 shadow-2xl overflow-hidden flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="h-full w-full block cursor-pointer"
                />

                <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-zinc-300 backdrop-blur-md">
                    Active Cluster: <span style={{ color: CLUSTER_COLORS[activeClusterIdx].node }}>{CLUSTER_COLORS[activeClusterIdx].name}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : 4 Cartes Diplômes avec effet de halo lumineux */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {RESUME_DATA.education.map((edu, idx) => {
                const isSelected = edu.id === currentEdu.id;
                const clusterColor = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];

                return (
                  <div
                    key={edu.id}
                    onClick={() => setSelectedEduId(edu.id)}
                    className={`group relative rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                      isSelected
                        ? "bg-zinc-950/90 scale-[1.01]"
                        : "bg-zinc-950/50 hover:bg-zinc-900/60"
                    }`}
                    style={{
                      borderColor: isSelected
                        ? `rgba(${clusterColor.raw}, 0.55)`
                        : `rgba(255, 255, 255, 0.08)`,
                      boxShadow: isSelected
                        ? `0 0 35px rgba(${clusterColor.raw}, 0.2)`
                        : `0 4px 20px rgba(0, 0, 0, 0.4)`,
                    }}
                  >
                    {/* HALO LUMINEUX RADIAL COMME DANS LA SECTION SKILLS */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, rgba(${clusterColor.raw}, ${
                          isSelected ? "0.22" : "0.08"
                        }), transparent 65%)`,
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    />

                    {/* Contenu de la carte */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        {/* Logo d'université */}
                        <div className="relative h-11 w-11 rounded-full border border-white/10 bg-zinc-900 overflow-hidden flex shrink-0 shadow-md">
                          <img
                            src={edu.logo}
                            alt={edu.school}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-zinc-400">
                            {edu.start} — {edu.end}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEduId(edu.id);
                              setIsModalOpen(true);
                            }}
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-zinc-400 hover:text-white transition"
                            title="Open Full Syllabus"
                          >
                            <Maximize2
                              className="size-3 transition-colors"
                              style={{ color: isSelected ? clusterColor.node : undefined }}
                            />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4
                          className="text-sm font-semibold transition-colors"
                          style={{ color: isSelected ? "#ffffff" : "#e4e4e7" }}
                        >
                          {edu.degree}
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {edu.school}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 italic pt-1">
                        {edu.headline}
                      </p>
                    </div>

                    {/* Modules tags et lien syllabus */}
                    <div className="relative z-10 pt-3.5 mt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {edu.modules.slice(0, 2).map((m, mIdx) => (
                          <span
                            key={mIdx}
                            className="rounded px-2 py-0.5 text-[9px] font-mono border"
                            style={{
                              backgroundColor: isSelected
                                ? `rgba(${clusterColor.raw}, 0.12)`
                                : "rgba(255, 255, 255, 0.05)",
                              color: isSelected
                                ? clusterColor.node
                                : "rgba(212, 212, 216, 0.9)",
                              borderColor: isSelected
                                ? `rgba(${clusterColor.raw}, 0.25)`
                                : "rgba(255, 255, 255, 0.08)",
                            }}
                          >
                            {m.title.split(" ")[0]}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEduId(edu.id);
                          setIsModalOpen(true);
                        }}
                        className="text-[10px] font-mono hover:underline flex items-center gap-1 transition-colors"
                        style={{ color: clusterColor.node }}
                      >
                        Syllabus →
                      </button>
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
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full border border-white/10 bg-zinc-900 shrink-0 shadow-lg">
                    <img
                      src={currentEdu.logo}
                      alt={currentEdu.school}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  <div>
                    <span className="font-mono text-xs text-cyan-400">
                      {currentEdu.start} — {currentEdu.end}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {currentEdu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {currentEdu.school} · {currentEdu.faculty}
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
                {currentEdu.headline}
              </p>

              {/* Modules / Syllabus */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono flex items-center gap-2">
                  <span>Core Modules & Syllabus</span>
                  <span className="h-px flex-1 bg-white/5" />
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentEdu.modules.map((m, idx) => {
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

              {/* Projets de recherche et académiques */}
              {currentEdu.projects.length > 0 && (
                <div className="space-y-4 pt-2">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono flex items-center gap-2">
                    <span>Academic Projects & Research Focus</span>
                    <span className="h-px flex-1 bg-white/5" />
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentEdu.projects.map((p, idx) => (
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
    </>
  );
}