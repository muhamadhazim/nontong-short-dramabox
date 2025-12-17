# 🎬 NONGTON - Short Drama Streaming App

Mobile-first web application untuk streaming short drama dengan Netflix-style UI.

## ✨ Features

- 🎨 Netflix Dark Theme
- 📱 Mobile-First Responsive Design
- ⚡ Next.js 14+ with App Router
- 🎯 TypeScript Strict Mode
- 💅 Tailwind CSS + shadcn/ui components
- 🎭 Lucide React Icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
nongton-app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── explore/           # Explore page
│   ├── search/            # Search page
│   ├── watch/             # Watch page (Dynamic routes)
│   └── page.tsx           # Home page
├── components/
│   ├── home/              # Home page sections
│   │   ├── HeroBanner.tsx
│   │   ├── RecommendedSection.tsx
│   │   ├── TrendingSection.tsx
│   │   └── LatestSection.tsx
│   ├── layout/            # Layout components
│   │   ├── AppHeader.tsx
│   │   ├── BottomNav.tsx
│   │   └── MobileWrapper.tsx
│   ├── shared/            # Shared components
│   │   ├── DramaCardComponent/ # Refactored DramaCard
│   │   │   ├── index.tsx
│   │   │   ├── DramaCardStandard.tsx
│   │   │   ├── DramaCardLarge.tsx
│   │   │   ├── DramaCardRanked.tsx
│   │   │   └── types.ts
│   │   ├── DramaCard.tsx     # Re-export for compatibility
│   │   ├── DramaCarousel.tsx
│   │   └── ModernDramaCard.tsx
│   ├── watch/             # Watch page components
│   │   ├── controls/
│   │   │   └── MobileControls.tsx
│   │   ├── EpisodeList.tsx
│   │   ├── VideoControls.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── WatchClient.tsx
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React Hooks
│   ├── useDeviceDetection.ts
│   ├── usePlayerControls.ts
│   ├── usePlayerPersistence.ts
│   ├── useVideoPlayer.ts
│   ├── useVideoState.ts
│   └── useWatchData.ts
├── lib/                   # Utilities & API
│   ├── api.ts             # API client functions
│   ├── constants.ts       # App constants
│   ├── headers.ts         # Server/Client headers helper
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript interfaces
```

## 🎨 Design System

### Color Palette (Netflix Theme)

| Color Name      | Hex Code  | Usage                     |
|----------------|-----------|---------------------------|
| `nongton-red`   | `#db0000` | Primary Brand, CTAs       |
| `nongton-black` | `#000000` | Main Background           |
| `nongton-card`  | `#141414` | Card Backgrounds          |
| `nongton-gray`  | `#b3b3b3` | Secondary Text            |
| `nongton-white` | `#ffffff` | Primary Text              |

### Responsive Strategy

- **Mobile (<768px)**: Full width, 100dvh
- **Desktop (≥768px)**: Max width 430px, centered with border & shadow

## 📱 Pages

- **Home (/)**: Hero banner, Top 10 Trending, Latest Releases, For You sections
- **Explore (/explore)**: Browse genres, trending searches, and top dramas
- **Search (/search)**: Search functionality for dramas

## 🔧 Tech Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: shadcn/ui patterns
- **Font**: Inter (Google Fonts)

## 📝 Development Status

✅ Phase 1: Project setup & design system  
✅ Phase 2: Core components (MobileWrapper, BottomNav, HeroBanner)  
✅ Phase 3: Home page UI  
✅ Phase 4: API integration (DramaBox API)  
✅ Phase 5: Search & Explore features  
⏳ Phase 6: Player page  

---

Built with ❤️ using Next.js and Tailwind CSS
