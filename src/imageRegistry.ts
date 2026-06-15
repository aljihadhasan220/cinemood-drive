/// <reference types="vite/client" />
import { ImageItem } from './types';

// Discover all images in posters directory
const postersGlob = import.meta.glob('/public/posters/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', { eager: true });
// Discover all images in screenshots directory
const ssGlob = import.meta.glob('/public/ss/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', { eager: true });

// Helper to convert filename to beautiful title
function formatTitle(filename: string, category: 'poster' | 'screenshot'): string {
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  
  if (/^\d+$/.test(nameWithoutExt)) {
    return category === 'poster' ? `Poster #${nameWithoutExt}` : `Screenshot #${nameWithoutExt}`;
  }
  
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Map the poster files
const discoveredPosters: ImageItem[] = Object.keys(postersGlob).map((key, idx) => {
  const filename = key.split('/').pop() || '';
  const url = `/posters/${filename}`;
  const name = formatTitle(filename, 'poster');
  
  return {
    id: `discovered-poster-${idx}-${name}`,
    url,
    name,
    filename,
    path: key,
    category: 'poster',
    dimensions: '400 x 600',
    fileSize: '320 KB',
    addedDate: '2026-06-15',
  };
});

// Map the screenshot files
const discoveredScreenshots: ImageItem[] = Object.keys(ssGlob).map((key, idx) => {
  const filename = key.split('/').pop() || '';
  const url = `/ss/${filename}`;
  const name = formatTitle(filename, 'screenshot');
  
  return {
    id: `discovered-ss-${idx}-${name}`,
    url,
    name,
    filename,
    path: key,
    category: 'screenshot',
    dimensions: '1920 x 1080',
    fileSize: '1.4 MB',
    addedDate: '2026-06-15',
  };
});

// High-quality cinematic backup/showcase items using stable royalty-free premium CDNs
const backupPosters: ImageItem[] = [
  {
    id: "backup-p1",
    url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    name: "La Cinema Classic",
    filename: "cinema-classic.jpg",
    path: "remote",
    category: "poster",
    dimensions: "1000 x 1500",
    fileSize: "420 KB",
    addedDate: "2026-06-15"
  },
  {
    id: "backup-p2",
    url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    name: "Retro Reel Projector",
    filename: "retro-projector.jpg",
    path: "remote",
    category: "poster",
    dimensions: "1200 x 1800",
    fileSize: "580 KB",
    addedDate: "2026-06-15"
  },
  {
    id: "backup-p3",
    url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    name: "The Velvet Seat",
    filename: "velvet-seat.jpg",
    path: "remote",
    category: "poster",
    dimensions: "900 x 1350",
    fileSize: "390 KB",
    addedDate: "2026-06-15"
  },
  {
    id: "backup-p4",
    url: "https://images.unsplash.com/photo-1542204172-e70528091f50?auto=format&fit=crop&w=800&q=80",
    name: "Neon Marquee Sign",
    filename: "neon-marquee.jpg",
    path: "remote",
    category: "poster",
    dimensions: "1100 x 1650",
    fileSize: "612 KB",
    addedDate: "2026-06-15"
  }
];

const backupScreenshots: ImageItem[] = [
  {
    id: "backup-s1",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    name: "Retro City Grid",
    filename: "neon-grid.jpg",
    path: "remote",
    category: "screenshot",
    dimensions: "1920 x 1080",
    fileSize: "1.1 MB",
    addedDate: "2026-06-15"
  },
  {
    id: "backup-s2",
    url: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1200&q=80",
    name: "The Grand Cinema Theatre",
    filename: "grand-screen.jpg",
    path: "remote",
    category: "screenshot",
    dimensions: "1920 x 1080",
    fileSize: "1.6 MB",
    addedDate: "2026-06-15"
  },
  {
    id: "backup-s3",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    name: "Anamorphic Dust Beam",
    filename: "lens-beam.jpg",
    path: "remote",
    category: "screenshot",
    dimensions: "1920 x 1080",
    fileSize: "1.2 MB",
    addedDate: "2026-06-15"
  }
];

// Combine discovered layout assets with beautiful CDN fallback assets
// If the user uploads new images to `/public/posters` or `/public/ss/`, they have top priority.
export const allPosters: ImageItem[] = [...discoveredPosters, ...backupPosters];
export const allScreenshots: ImageItem[] = [...discoveredScreenshots, ...backupScreenshots];

// Combine all list items
export const allImages: ImageItem[] = [...allPosters, ...allScreenshots];
