export interface VideoQuality {
  quality: number;
  videoPath: string;
}

export interface Episode {
  chapterId: string;
  chapterIndex: number;
  chapterName: string;
  cdnList?: Array<{
    videoPathList: VideoQuality[];
  }>;
  chapterImg?: string;
  bookName?: string; // Sometimes used
}

export interface DramaDetail {
  bookId: string;
  bookName: string;
  introduction?: string;
  tags?: string[];
  cover?: string;
}

// Added missing interfaces
export interface Drama {
  bookId: string;
  bookName: string;
  coverWap?: string;
  cover?: string;
  tagNames?: string[];
  tags?: string[];
  tagV3s?: Array<{ tagName: string }>;
  chapterCount?: number;
  introduction?: string;
  corner?: { name: string };
  playCount?: number;
}

export interface DramaCard {
  id: string;
  title: string;
  cover: string;
  tags: string[];
  episodes?: number;
  description?: string;
  isNew?: boolean;
  viewCount?: number;
  rating?: number;
  duration?: string;
}
