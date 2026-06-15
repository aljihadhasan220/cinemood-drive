import React from 'react';
import { Search, Film, Image, Info, Disc, FolderSync, AlertCircle } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  postersCount: number;
  ssCount: number;
  totalCount: number;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  postersCount,
  ssCount,
  totalCount,
}: HeroSectionProps) {
  return (
    <div id="hero-section" className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-cinema-gray/40">
      {/* Decorative Light Rays / Ambient Overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-full max-w-4xl opacity-40 mix-blend-screen pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245, 175, 25, 0.15), transparent 70%)'
           }}
      />
      <div className="absolute top-4 right-10 flex items-center gap-2 px-3 py-1 bg-green-500/15 border border-green-500/20 rounded-full text-[10px] font-mono text-green-400">
        <Disc className="h-3 w-3 animate-spin text-green-400" />
        <span>CINEMOOD DRIVE: RUNNING (PORT: 3000)</span>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cinema-gray border border-white/5 rounded-full text-xs text-gray-400 mb-6 font-mono shadow-md">
          <FolderSync className="h-3.5 w-3.5 text-cinema-amber animate-pulse" />
          <span>REAL-TIME DIRECTORY SYNC ACTIVE</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
          CINEMOOD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-amber to-amber-400 text-glow">DRIVE</span>
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-sans leading-relaxed mb-10">
          A high-contrast cinematic index serving official movie posters and original widescreen screenshots curated for pristine, offline-ready inspiration.
        </p>

        {/* Console / Metric Badges */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto mb-10 text-left font-mono">
          <div className="bg-cinema-dark/80 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Portals</span>
            <span className="text-white font-bold text-lg md:text-2xl font-display flex items-center gap-1.5">
              2 <span className="text-xs font-normal text-gray-500 font-sans">Active</span>
            </span>
          </div>
          
          <div className="bg-cinema-dark/80 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Posters</span>
            <span className="text-cinema-amber font-bold text-lg md:text-2xl font-display flex items-center gap-1.5">
              {postersCount} <span className="text-xs font-normal text-gray-500 font-sans">files</span>
            </span>
          </div>

          <div className="bg-cinema-dark/80 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Screenshots</span>
            <span className="text-sky-400 font-bold text-lg md:text-2xl font-display flex items-center gap-1.5">
              {ssCount} <span className="text-xs font-normal text-gray-500 font-sans">shots</span>
            </span>
          </div>
        </div>

        {/* Search spotlight */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-0 bg-cinema-amber/10 blur-xl rounded-2xl pointer-events-none opacity-50" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-500" />
            <input
              id="search-input"
              type="text"
              placeholder="Search assets by filename (e.g. movie1, 1000059655)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cinema-gray/90 hover:bg-cinema-gray border border-white/10 hover:border-cinema-amber/40 focus:border-cinema-amber focus:ring-1 focus:ring-cinema-amber/30 text-white placeholder-gray-500 px-12 py-3.5 md:py-4 rounded-xl text-sm md:text-base font-sans outline-none transition-all shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-mono text-gray-500 hover:text-white bg-white/5 px-2 py-1 rounded transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Warning notification regarding upload instructions */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 font-sans max-w-md mx-auto justify-center bg-cinema-dark/50 py-2 px-4 rounded-lg border border-white/5">
          <Info className="h-3.5 w-3.5 text-cinema-amber shrink-0" />
          <span>Upload images to <code className="text-gray-300 font-mono">/public/posters/</code> or <code className="text-gray-300 font-mono">/public/ss/</code> to sync automatically.</span>
        </div>
      </div>
    </div>
  );
}
