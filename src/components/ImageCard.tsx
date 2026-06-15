import React, { useState } from 'react';
import { Copy, Check, Maximize2, FileImage, Link } from 'lucide-react';
import { ImageItem } from '../types';

interface ImageCardProps {
  key?: string | number;
  item: ImageItem;
  onOpenLightbox: (item: ImageItem) => void;
}

export default function ImageCard({ item, onOpenLightbox }: ImageCardProps) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const displayAspect = 'aspect-[3/4]';

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Copy the fully qualified URL so that it is instantly shareable and usable
    const fullUrl = `${window.location.origin}${item.url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      id={`card-${item.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-cinema-dark border border-white/5 hover:border-cinema-amber/40 shadow-lg hover:shadow-2xl hover:shadow-cinema-amber/5 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpenLightbox(item)}
    >
      {/* Aspect Container */}
      <div className={`relative ${displayAspect} w-full bg-cinema-black/80 overflow-hidden`}>
        {/* Loading placeholder skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse bg-cinema-gray/80">
            <FileImage className="h-8 w-8 text-white/10 mb-2" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">LOADING FILM</span>
          </div>
        )}

        <img
          src={item.url}
          alt={item.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Ambient Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-350" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className={`rounded-md px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border ${
            item.path === 'remote' 
              ? 'bg-cinema-gray/90 text-gray-400 border-white/5' 
              : 'bg-cinema-amber/20 text-cinema-amber border-cinema-amber/30'
          }`}>
            {item.path === 'remote' ? 'PRESET' : 'LOC_INDEX'}
          </span>

          <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono text-gray-400 border border-white/5">
            {item.dimensions}
          </span>
        </div>

        {/* Action Controls Overlay (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onOpenLightbox(item)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-cinema-black hover:bg-cinema-amber hover:text-white transition-colors duration-200 shadow-xl"
            title="Open Fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleCopyLink}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-cinema-gray/90 border border-white/10 text-white hover:bg-cinema-amber hover:text-white hover:border-cinema-amber transition-colors duration-200 shadow-xl"
            title="Copy Direct URL"
          >
            {copied ? <Check className="h-5 w-5 text-green-400" /> : <Link className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Description / Info Strip */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-display font-bold text-sm text-white group-hover:text-cinema-amber transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-gray-500 line-clamp-1" title={item.filename}>
            {item.filename}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span className="text-gray-500">{item.fileSize}</span>
          <span>{item.addedDate}</span>
        </div>
      </div>
    </div>
  );
}
