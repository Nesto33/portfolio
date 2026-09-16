// src/components/BrainGraph.tsx
"use client";

import React, { useEffect, useRef } from "react";

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

export default function BrainGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGraph();
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Couleurs très vives & pures (style néon de l'image de référence)
    const clusterColors = [
      { node: "rgba(56, 189, 248, 1)", raw: "56, 189, 248" },   // 0: Cyan électrique
      { node: "rgba(244, 63, 94, 1)", raw: "244, 63, 94" },     // 1: Rose néon
      { node: "rgba(251, 146, 60, 1)", raw: "251, 146, 60" },    // 2: Ambre éclatant
      { node: "rgba(74, 222, 128, 1)", raw: "74, 222, 128" },    // 3: Vert émeraude
    ];

    let nodes: Node[] = [];
    let interClusterLinks: InterLink[] = [];

    const initGraph = () => {
      nodes = [];
      interClusterLinks = [];
      const numClusters = 4;
      const nodesPerCluster = 28; // Plus dense

      // Centres espacés et plus larges
      const centers = [
        { x: width * 0.24, y: height * 0.32 }, // Haut gauche
        { x: width * 0.76, y: height * 0.28 }, // Haut droite
        { x: width * 0.30, y: height * 0.72 }, // Bas gauche
        { x: width * 0.78, y: height * 0.70 }, // Bas droite
      ];

      for (let c = 0; c < numClusters; c++) {
        const center = centers[c];
        for (let i = 0; i < nodesPerCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          // Rayon étendu à 135px pour des modules plus imposants
          const dist = Math.pow(Math.random(), 0.7) * 135;
          const x = center.x + Math.cos(angle) * dist;
          const y = center.y + Math.sin(angle) * dist;

          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            // Nœuds plus visibles : 4.5px pour les hubs, 2.8px pour les autres
            radius: i < 4 ? 4.8 : 2.8,
            cluster: c,
          });
        }
      }

      // Connexions explicites entre chaque paire de clusters
      const clusterPairs = [
        [0, 1], // Cyan <-> Rose
        [0, 2], // Cyan <-> Ambre
        [1, 3], // Rose <-> Vert
        [2, 3], // Ambre <-> Vert
        [0, 3], // Diagonale longue Cyan <-> Vert
        [1, 2], // Diagonale Rose <-> Ambre
      ];

      clusterPairs.forEach(([c1, c2]) => {
        const nodesC1 = nodes.filter((n) => n.cluster === c1);
        const nodesC2 = nodes.filter((n) => n.cluster === c2);

        // 4 faisceaux par liaison
        for (let k = 0; k < 4; k++) {
          const idx1 = nodes.indexOf(nodesC1[Math.floor(Math.random() * nodesC1.length)]);
          const idx2 = nodes.indexOf(nodesC2[Math.floor(Math.random() * nodesC2.length)]);
          if (idx1 !== -1 && idx2 !== -1) {
            interClusterLinks.push({
              from: idx1,
              to: idx2,
              // Déviation forte (positive ou négative) pour bien courber les arcs
              curveOffset: (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 80),
            });
          }
        }
      });
    };

    initGraph();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Physique & interaction souris
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        const dxBase = n.baseX - n.x;
        const dyBase = n.baseY - n.y;
        n.vx += dxBase * 0.0012;
        n.vy += dyBase * 0.0012;

        n.vx *= 0.98;
        n.vy *= 0.98;

        const dxMouse = mouse.x - n.x;
        const dyMouse = mouse.y - n.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 2;
          n.x -= (dxMouse / distMouse) * force;
          n.y -= (dyMouse / distMouse) * force;
        }
      }

      // 2. Connexions intra-cluster (plus nettes et lumineuses)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          if (n1.cluster === n2.cluster) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 135) {
              const alpha = (1 - dist / 135) * 0.45; // Opacité accrue
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(${clusterColors[n1.cluster].raw}, ${alpha.toFixed(3)})`;
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Connexions inter-clusters (arcs largement courbés et bicolores)
      interClusterLinks.forEach(({ from, to, curveOffset }) => {
        const n1 = nodes[from];
        const n2 = nodes[to];
        if (!n1 || !n2) return;

        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        grad.addColorStop(0, `rgba(${clusterColors[n1.cluster].raw}, 0.55)`);
        grad.addColorStop(1, `rgba(${clusterColors[n2.cluster].raw}, 0.55)`);

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);

        // Calcul du point de contrôle perpendiculaire au vecteur reliant les deux nœuds
        const midX = (n1.x + n2.x) / 2;
        const midY = (n1.y + n2.y) / 2;
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        // Déport perpendiculaire fort pour une vraie trajectoire courbe
        const normalX = -dy / len;
        const normalY = dx / len;
        const ctrlX = midX + normalX * curveOffset;
        const ctrlY = midY + normalY * curveOffset;

        ctx.quadraticCurveTo(ctrlX, ctrlY, n2.x, n2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      // 4. Dessin des nœuds avec halo néon (glow)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const color = clusterColors[n.cluster];

        // Halo plus étendu
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.raw}, 0.22)`;
        ctx.fill();

        // Cœur du nœud bien opaque
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.node;
        ctx.shadowColor = `rgba(${color.raw}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Réinitialisation
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full opacity-100 transition-opacity duration-700"
    />
  );
}