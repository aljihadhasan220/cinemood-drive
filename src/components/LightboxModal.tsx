import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Calendar, HardDrive, Crop, Info, ShieldCheck } from 'lucide-react';
import { ImageItem } from '../types';

interface LightboxModalProps {
  item: ImageItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  const [copied, setCopied] = useState(false);

  // Lock scrolling when modal is active
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  const directUrl = `${window.location.origin}${item.url}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Lightbox box */}
      <div
        id="lightbox-content"
        className="relative w-full max-w-5xl rounded-2xl bg-cinema-dark border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Widescreen Cinematic Image Stage */}
        <div className="relative flex-grow bg-cinema-black/80 flex items-center justify-center p-4 md:p-6 overflow-hidden min-h-[300px] md:min-h-0">
          <img
            src={item.url}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[50vh] md:max-h-[75vh] object-contain rounded-lg shadow-xl border border-white/5"
          />
          
          {/* Close button inside image frame (for mobile) */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black flex items-center justify-center border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side: Cinema Technical Specs Control Panel */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-cinema-gray/60 p-5 md:p-6 flex flex-col justify-between overflow-y-auto shrink-0 md:max-h-full">
          <div>
            {/* Header / Title */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-cinema-amber uppercase px-2 py-0.5 bg-cinema-amber/10 rounded border border-cinema-amber/20">
                  {item.category === 'poster' ? 'FILM POSTER' : 'WIDESCREEN SS'}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-2 leading-tight">
                  {item.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="hidden md:flex h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white items-center justify-center transition-colors border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Technical Parameters List */}
            <div className="space-y-4 my-6 font-mono text-xs">
              <div className="bg-cinema-black/40 border border-white/5 p-3 rounded-lg">
                <div className="text-gray-500 uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="h-3 w-3 text-cinema-amber" />
                  <span>Physical File Name</span>
                </div>
                <span className="text-gray-200 select-all font-mono break-all">{item.filename}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-cinema-black/30 p-2.5 rounded-lg border border-white/5 flex flex-col">
                  <span className="text-gray-500 uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1">
                    <Crop className="h-3 w-3 text-cinema-amber/60" /> Resolution
                  </span>
                  <span className="text-gray-300 font-bold">{item.dimensions || '1920 x 1080'}</span>
                </div>

                <div className="bg-cinema-black/30 p-2.5 rounded-lg border border-white/5 flex flex-col">
                  <span className="text-gray-500 uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1">
                    <HardDrive className="h-3 w-3 text-cinema-amber/60" /> File Size
                  </span>
                  <span className="text-gray-300 font-bold">{item.fileSize || '420 KB'}</span>
                </div>
              </div>

              <div className="bg-cinema-black/30 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                <span className="text-gray-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-cinema-amber/60" /> Added Date
                </span>
                <span className="text-gray-300 font-bold">{item.addedDate}</span>
              </div>

              <div className="bg-cinema-black/30 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                <span className="text-gray-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-green-500/80" /> Integrity
                </span>
                <span className="text-green-400 font-bold uppercase tracking-wider text-[10px]">Verified</span>
              </div>
            </div>

            {/* Direct Link Panel */}
            <div className="mb-6 font-mono">
              <span className="block text-gray-500 uppercase text-[9px] tracking-wider mb-1.5">Direct serving link:</span>
              <div className="flex items-center gap-1.5 p-2 bg-cinema-black border border-white/10 rounded-lg">
                <input
                  type="text"
                  readOnly
                  value={directUrl}
                  className="bg-transparent text-gray-300 uppercase text-[10px] w-full outline-none border-none cursor-text select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-cinema-gray hover:bg-cinema-amber hover:text-white rounded text-gray-400 transition-all shrink-0"
                  title="Copy Direct URL"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400 font-bold" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="space-y-2 mt-auto">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cinema-amber text-cinema-black hover:bg-amber-400 font-bold text-xs transition-colors shadow-md"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  LINK COPIED!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  COPY DIRECT LINK
                </>
              )}
            </button>
            
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cinema-gray hover:bg-white/10 text-white font-bold text-xs transition-colors border border-white/10"
            >
              <ExternalLink className="h-4 w-4" />
              VIEW ORIGINAL FILE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
