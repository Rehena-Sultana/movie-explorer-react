# 🎬 CinePulse | Movie Explorer

> A modern, responsive **Movie Explorer Application** built with **React** and **Pure Plain CSS**, powered by the free **TVMaze API**. Browse trending shows, search dynamically by title, filter across multiple genres and ratings, and view in-depth details with cast profiles inside an interactive modal.

---

## 📸 Overview & Preview

| Home Showcase | Search & Filters | Details Modal |
| :---: | :---: | :---: |
| Hero banner with stats & trending titles | Live dynamic search with multi-criteria filters | Backdrop, star rating, cast avatars & IMDb links |

---

## ✨ Features & Capabilities

### 1. 🏠 Landing / Home Page
* **Cinematic Navbar**:
  * Brand logo (`🎬 MovieExplorer`) with glowing gradient highlights.
  * Navigation links (`Home`, `Explore Shows`, `Watchlist` with live badge counter).
  * Prominent **"Browse Catalog"** Call-To-Action button.
  * Responsive mobile navigation drawer with hamburger toggle.
* **Hero Banner**:
  * Ambient dark cinema gradient background with glowing radial highlights.
  * Animated title: `DISCOVER MOVIES & SHOWS`.
  * Value proposition and key statistics badges (`50K+ Titles`, `⭐ 8.9+ Ratings`, `🎭 Cast & Crew`, `⚡ 100% Free`).
  * Quick search input directly on the hero with an instant **"Explore Now →"** CTA.
* **Trending Masterpieces Spotlight**:
  * Curated showcase cards of top-rated classic and modern series.
* **Genre Discovery Grid**:
  * Quick-access visual cards for popular genres (*Drama, Action, Sci-Fi, Comedy, Thriller, Animation, Crime, Mystery*).
  * Clicking any genre instantly navigates to the catalog with that genre filtered.
* **Value Proposition ("Why Movie Explorer")**:
  * Highlighting instant search, community ratings, cast profiles, and watchlist persistence.
* **Comprehensive Footer**:
  * Brand identity, copyright notice, TVMaze API credit, social links, and smooth "Back to Top" scrolling.

---

### 2. 🔍 Dedicated Movie Listing Page
* **Live Dynamic Search**:
  * Real-time debounced search by movie/show title (`GET /search/shows?q=:query`).
  * Visual search spinner and results counter indicator.
  * Instant query clear button (`✕`) and search reset.
* **Multi-Criteria Filter & Sort Bar**:
  * **Genre Selector**: Filter across 24+ genres (*Science-Fiction, Drama, Action, Comedy, Romance, Thriller, etc.*).
  * **Status Selector**: Filter by *All*, *Currently Running*, or *Ended*.
  * **Minimum Rating Filter**: Filter by *8.5+ Masterpiece*, *8.0+ Great*, *7.0+ Good*, *6.0+ Average*.
  * **Sort Order**: Sort by *⭐ Rating (High to Low)*, *📅 Release Date (Newest/Oldest)*, or *🔤 Title (A→Z, Z→A)*.
  * **Active Filter Badges**: Real-time counter of applied filters with a single-click **"Reset Filters ↺"** button.
* **Responsive CSS Grid Layout**:
  * Fluid responsive wrapping (1 column on mobile, 2–3 on tablets, 4–5 on desktop).
  * Skeleton shimmer loading cards during data fetching.
  * User-friendly empty state with query suggestions when no titles match.
  * **"Load More Shows"** button for paginated catalog browsing.

---

### 3. 🎴 Reusable Movie Card Components
* High-resolution poster with fallback image handling.
* Floating star rating badge (`⭐ 8.5 / 10`).
* Premiere release year (`📅 2024`).
* Genre tags and status pills (*Running / Ended*).
* Interactive **Watchlist Heart Toggle** (`❤️` / `🤍`) with pop animation.
* **"See Details"** button with glowing hover micro-interactions.

---

### 4. 🎞️ Interactive Movie Details Modal
* **Cinematic Overlay**:
  * Deep dark backdrop overlay with heavy backdrop blur (`14px`).
  * High-res backdrop banner image with smooth gradient overlay.
* **Comprehensive Show Metadata**:
  * Poster thumbnail, title, rating score gauge (`⭐ 8.9 / 10`), release date, runtime, running status, and full genre pills.
  * Detail grid for *Language*, *Network / Channel*, *Show Type*, and *Broadcast Schedule*.
  * Clean, formatted overview synopsis (HTML tags cleanly sanitized).
* **Starring Cast & Character Profiles**:
  * Real-time fetching of embedded cast members (`GET /shows/:id?embed=cast`).
  * Actor portraits, real names, and character roles.
* **External Links & Actions**:
  * Direct links to **Official Website**, **IMDb page**, and **TVMaze page**.
  * Add/Remove from Watchlist directly inside the modal banner.
* **Multi-Way Modal Close Controls**:
  * `✕` Top-right close button with rotation animation.
  * `[ ✕ Close ]` bottom footer button.
  * Outside click detection (clicking the backdrop).
  * Keyboard `Escape` key shortcut.
  * Automatic body scroll locking (`modal-open`).

---

### 5. 💖 Watchlist / Favorites System
* Stored locally in the user's browser via `localStorage`.
* Instant floating toast notifications on adding/removing items (`✨ Added "..." to Watchlist!`).
* Live badge counter in the top navigation bar.
* Dedicated **Watchlist View** to view, browse, or clear saved titles.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) | Component architecture, state management & custom hooks |
| **Build Tool & Dev Server** | [Vite 5](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundling |
| **Styling** | **Pure Vanilla CSS** | CSS Custom Properties, Glassmorphism, CSS Grid & Flexbox (No Tailwind) |
| **Data Provider** | [TVMaze REST API](https://www.tvmaze.com/api) | Free public endpoints for shows, search, and embedded cast |
| **Typography** | Google Fonts | `Plus Jakarta Sans` (Body) & `Outfit` (Headings) |

---

## 📁 Project Structure

```text
movie-explorer-react/
├── index.html                    # Main HTML entry point with meta tags & fonts
├── package.json                  # Dependencies and build scripts
├── vite.config.js                # Vite configuration
├── README.md                     # Project documentation
└── src/
    ├── main.jsx                  # React DOM mounting
    ├── App.jsx                   # Application controller & state coordinator
    ├── App.css                   # Component styles (pure CSS)
    ├── index.css                 # Design system tokens, variables & resets
    ├── services/
    │   └── api.js                # TVMaze API client & data utilities
    ├── hooks/
    │   └── useFavorites.js       # Custom hook for localStorage Watchlist
    └── components/
        ├── Navbar.jsx            # Responsive header & brand navigation
        ├── HeroBanner.jsx        # Landing hero banner with search & stats
        ├── FeaturedSection.jsx   # Trending spotlight, genres & highlights
        ├── SearchBar.jsx         # Debounced live search input with clear button
        ├── FilterBar.jsx         # Genre, status, rating, and sort controls
        ├── MovieCard.jsx         # Reusable movie card with poster & details
        ├── MovieGrid.jsx         # CSS Grid with skeleton loaders & empty states
        ├── MovieModal.jsx        # Interactive details modal with cast & links
        ├── FavoritesView.jsx     # Saved watchlist view
        ├── Footer.jsx            # App footer with credits and back-to-top
        └── Toast.jsx             # Floating notification alerts
```

---

## 🌐 API Endpoints Used

| Feature | HTTP Method | Endpoint | Description |
| :--- | :---: | :--- | :--- |
| **All Shows** | `GET` | `https://api.tvmaze.com/shows?page=:page` | Fetches paginated list of TV shows |
| **Search Shows** | `GET` | `https://api.tvmaze.com/search/shows?q=:query` | Searches titles matching query string |
| **Show Details + Cast** | `GET` | `https://api.tvmaze.com/shows/:id?embed=cast` | Fetches show metadata with embedded cast list |
| **Single Show** | `GET` | `https://api.tvmaze.com/shows/:id` | Fetches individual show by ID |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)

### Installation & Setup

1. **Clone or navigate to the repository:**
   ```bash
   cd movie-explorer-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:3000/](http://localhost:3000/)

### Production Build

To generate an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📱 Responsive Layout Breakpoints

* **Desktop (1024px+)**: 4–5 column grid for cards, horizontal navigation, side-by-side modal columns.
* **Tablet (768px – 1024px)**: 2–3 column grid, responsive filter grid, optimized touch targets.
* **Mobile (<768px)**: Single column card grid, collapsible mobile drawer navigation, stacked modal layout with full-width buttons.

---

## 📄 License & Credits

* **Data Provider:** Powered by free open TV data from the [TVMaze API](https://www.tvmaze.com/api).
* **License:** Released under the **MIT License**.
* © 2026 MovieExplorer. Built with React & Plain CSS.
