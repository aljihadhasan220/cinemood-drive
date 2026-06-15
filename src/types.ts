export interface ImageItem {
  id: string;
  url: string;
  name: string;
  filename: string;
  path: string;
  category: 'poster' | 'screenshot';
  dimensions?: string;
  fileSize?: string;
  addedDate?: string;
}

export type GallerySection = 'all' | 'posters' | 'screenshots';
