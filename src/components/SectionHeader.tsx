import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  icon: LucideIcon;
}

export default function SectionHeader({ id, title, subtitle, count, icon: Icon }: SectionHeaderProps) {
  return (
    <div id={id} className="relative mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-cinema-gray/60 pb-5">
      <div className="flex items-start gap-4">
        <div className="mt-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-cinema-gray/80 text-cinema-amber border border-white/5 shadow-inner">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              {title}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cinema-amber/10 px-2.5 py-0.5 text-xs font-medium text-cinema-amber border border-cinema-amber/20">
              <span className="h-1.5 w-1.5 rounded-full bg-cinema-amber animate-pulse"></span>
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400 font-sans">
            {subtitle}
          </p>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-gray-500">
        <span className="text-cinema-amber/60">AUTODISK_DISCOVER_ON</span>
        <span className="text-gray-700">•</span>
        <span>PATH: /public/{title.toLowerCase()}/</span>
      </div>
    </div>
  );
}
