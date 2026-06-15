import React, { useState, useMemo } from 'react';
import { Film, Image, Upload, AlertCircle, Sparkles, FolderPlus, ArrowUpCircle } from 'lucide-react';
import { allPosters, allScreenshots } from './imageRegistry';
import { ImageItem } from './types';
import HeroSection from './components/HeroSection';
import SectionHeader from './components/SectionHeader';
import ImageCard from './components/ImageCard';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);

  // Filter posters by filename/name search
  const filteredPosters = useMemo(() => {
    if (!searchQuery.trim()) return allPosters;
    const query = searchQuery.toLowerCase();
    return allPosters.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.filename.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter screenshots by filename/name search
  const filteredScreenshots = useMemo(() => {
    if (!searchQuery.trim()) return allScreenshots;
    const query = searchQuery.toLowerCase();
    return allScreenshots.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.filename.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleOpenLightbox = (item: ImageItem) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black text-gray-100 flex flex-col relative selection:bg-cinema-amber selection:text-cinema-black">
      {/* Dynamic Background Spotlight */}
      <div className="absolute top-0 inset-x-0 h-[600px] ambient-cinema-radial pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[400px] ambient-cinema-bottom pointer-events-none" />

      {/* Navigation Header */}
      <nav id="site-nav" className="sticky top-0 z-40 bg-cinema-black/85 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cinema-amber to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-cinema-amber/15">
              <div className="h-full w-full bg-cinema-black rounded-[10px] flex items-center justify-center">
                <Film className="h-4.5 w-4.5 text-cinema-amber" />
              </div>
            </div>
            <div>
              <span className="font-display font-black tracking-tight text-white text-base">
                CINEMOOD <span className="text-cinema-amber text-glow">DRIVE</span>
              </span>
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">STATIC HOST</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('posters-section')}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              /POSTERS
            </button>
            <button
              onClick={() => scrollToSection('ss-section')}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              /SCREENSHOTS
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono bg-cinema-gray text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-all"
            >
              <span>DOCS</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          postersCount={filteredPosters.length}
          ssCount={filteredScreenshots.length}
          totalCount={filteredPosters.length + filteredScreenshots.length}
        />

        {/* Section 1: Posters */}
        <section id="posters-section" className="pt-16">
          <SectionHeader
            id="posters-header"
            title="POSTERS"
            subtitle="Browse and share portrait film posters saved directly on the host drives."
            count={filteredPosters.length}
            icon={Image}
          />
          
          {filteredPosters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {filteredPosters.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cinema-dark/40 border border-dashed border-white/5 rounded-2xl">
              <AlertCircle className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-display font-bold text-gray-400">No posters found matching "{searchQuery}"</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Upload image files to <code className="text-gray-400 font-mono">/public/posters/</code> to catalog them instantly.
              </p>
            </div>
          )}
        </section>

        {/* Section 2: Screenshots (Strictly Separated) */}
        <section id="ss-section" className="pt-20">
          <SectionHeader
            id="ss-header"
            title="SCREENSHOTS"
            subtitle="Raw high-definition widescreen cinematic video captures."
            count={filteredScreenshots.length}
            icon={Film}
          />
          
          {filteredScreenshots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScreenshots.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cinema-dark/40 border border-dashed border-white/5 rounded-2xl">
              <AlertCircle className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-display font-bold text-gray-400">No screenshots found matching "{searchQuery}"</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Upload image files to <code className="text-gray-400 font-mono">/public/ss/</code> to register screen captures.
              </p>
            </div>
          )}
        </section>

        {/* Sync Manual Guide Card */}
        <section id="disk-sync-guide" className="mt-28 bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cinema-amber/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-cinema-amber" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-amber font-bold">Zero-Configuration Autoloader</span>
            </div>
            <h3 className="font-display font-extrabold text-white text-xl md:text-2xl mb-2">
              Ready to Expand your Drive?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Cinemood Drive uses static analysis and automated globbing patterns. Simply dump new posters inside your <code className="bg-white/5 text-white font-mono px-1 py-0.5 rounded text-xs">/public/posters/</code> directory or screen frames into <code className="bg-white/5 text-white font-mono px-1 py-0.5 rounded text-xs">/public/ss/</code>. Your gallery adapts instantly upon deployment!
            </p>
          </div>
          <div className="flex items-center justify-center shrink-0 w-full md:w-auto">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-cinema-gray text-white hover:bg-cinema-amber hover:text-cinema-black font-mono font-bold text-xs rounded-xl cursor-pointer border border-white/10 hover:border-cinema-amber transition-all"
            >
              <ArrowUpCircle className="h-4.5 w-4.5" />
              GO TO SEARDSCH PANEL
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="site-footer" className="bg-cinema-black border-t border-white/5 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-cinema-amber"></div>
            <span>CINEMOOD DRIVE v1.0.0 — STATIC MEDIA INDEX</span>
          </div>

          <div className="flex items-center gap-6">
            <span>FILESYSTEM: READONLY</span>
            <span>ENGINES: VITE GLOBBING</span>
            <span>THEME: OBSIDIAN DARK</span>
          </div>

          <div className="text-gray-600 text-center md:text-right">
            &copy; 2026 Cinemood Labs. All screenshots belong to respectful authors.
          </div>
        </div>
      </footer>

      {/* Lightbox Modal display */}
      <LightboxModal
        item={selectedItem}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
