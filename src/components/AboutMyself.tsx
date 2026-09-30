// src/components/AboutMyself.tsx
"use client";

import { motion } from "framer-motion";
import { RESUME_DATA } from "@/data/resume";
import { BookOpen, Clapperboard, Headphones, User, Quote, Sparkles } from "lucide-react";

export default function AboutMyself() {
  const { personal } = RESUME_DATA;

  return (
    <section
      id="about"
      className="relative h-screen w-full snap-start flex items-center justify-center px-6 bg-[#060709] overflow-hidden"
    >
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col justify-center h-full pt-16 pb-8 space-y-6">
        
        {/* En-tête de section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              [ 01 // Persona & Interests ]
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
            Curiosity · Aesthetics · Soundscapes
          </span>
        </div>

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[72vh] max-h-[640px]">
          
          {/* Bloc 1 : Bio & Perspective (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/60 via-zinc-950/80 to-[#060709] p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-36 w-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <User className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider">About Me</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Software architect by training, brain explorer by fascination.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                {personal.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              <span className="rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-1 text-[11px] font-mono text-cyan-300">
                #Connectomics
              </span>
              <span className="rounded-lg border border-purple-500/20 bg-purple-950/20 px-2.5 py-1 text-[11px] font-mono text-purple-300">
                #FullStackEngineering
              </span>
              <span className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
                #ComplexSystems
              </span>
            </div>
          </motion.div>

          {/* Bloc 2 : Spotify Card Calibrée */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl border border-white/10 bg-zinc-950/80 p-4 backdrop-blur-xl flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 px-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <Headphones className="size-4 animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-wider">Soundtrack</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">The Killing Moon</span>
            </div>

            <div className="w-full flex-1 flex items-center justify-center">
              <iframe
                src={personal.spotifyEmbedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-2xl border-0 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Bloc 3 : Livre Favori avec Couverture (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 rounded-3xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-2 text-amber-400 pb-2">
              <BookOpen className="size-4" />
              <span className="text-xs uppercase font-mono tracking-wider">Essential Reading</span>
            </div>

            <div className="flex items-center gap-4 my-auto">
              {/* Couverture du livre */}
              <div className="relative h-28 w-20 shrink-0 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-lg">
                <img
                  src={personal.book.cover}
                  alt={personal.book.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white leading-tight">
                  {personal.book.title}
                </h4>
                <p className="text-xs font-mono text-amber-300/80">
                  {personal.book.author}
                </p>
                <p className="text-[11px] text-zinc-400 leading-snug pt-1 italic flex items-start gap-1">
                  <Quote className="size-2.5 text-amber-400/50 shrink-0 mt-0.5" />
                  <span>{personal.book.takeaway}</span>
                </p>
              </div>
            </div>

            <div className="text-[10px] font-mono text-zinc-600 pt-2 border-t border-white/5">
              Reframing intelligence & strange loops
            </div>
          </motion.div>

          {/* Bloc 4 : Cinéma Favori avec Affiches (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-7 rounded-3xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2 text-rose-400">
                <Clapperboard className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider">Cinematic Influences</span>
              </div>
              <Sparkles className="size-3 text-zinc-600" />
            </div>

            {/* Affiches des 3 films */}
            <div className="grid grid-cols-3 gap-2.5 my-auto">
              {personal.movies.map((movie, idx) => (
                <div
                  key={idx}
                  className="group relative h-36 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-md cursor-pointer"
                >
                  {/* Image d'affiche avec zoom léger */}
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  {/* Dégradé sombre pour lisibilité du titre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Contenu textuel superposé */}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 space-y-0.5">
                    <span className="inline-block text-[8px] font-mono text-rose-300 bg-rose-950/70 px-1.5 py-0.5 rounded border border-rose-500/30">
                      {movie.tag}
                    </span>
                    <h5 className="text-xs font-semibold text-white truncate">
                      {movie.title}
                    </h5>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {movie.director}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-zinc-600 pt-2 border-t border-white/5">
              Narratives exploring cognition, spacetime & artificial minds
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}