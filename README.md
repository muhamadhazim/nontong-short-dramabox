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
│   ├── page.tsx           # Home page
│   ├── explore/           # Explore page
│   └── profile/           # Profile page
├── components/
│   ├── layout/            # Layout components
│   │   ├── MobileWrapper.tsx
│   │   └── BottomNav.tsx
│   ├── home/              # Home page components
│   │   └── HeroBanner.tsx
│   └── shared/            # Shared components
│       └── DramaCard.tsx
└── lib/                   # Utilities
    └── utils.ts
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
- **Explore (/explore)**: Coming soon
- **Profile (/profile)**: Coming soon

## 🔧 Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: shadcn/ui patterns
- **Font**: Inter (Google Fonts)

## 📝 Development Status

✅ Phase 1: Project setup & design system  
✅ Phase 2: Core components (MobileWrapper, BottomNav, HeroBanner)  
✅ Phase 3: Home page UI with dummy data  
⏳ Phase 4: API integration (DramaBox API)  
⏳ Phase 5: Player page  
⏳ Phase 6: Search & Explore features  

---

Built with ❤️ using Next.js and Tailwind CSS
