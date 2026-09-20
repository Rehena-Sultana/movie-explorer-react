# Movie Explorer Application

A responsive Movie Explorer web application built with React and plain CSS. It allows users to browse movies and TV shows, search for specific titles, filter by genres/ratings, and view detailed information with cast details in an interactive modal.

---

## Features

### 1. Home Page
- **Navbar**: Brand logo, navigation links (Home, Explore Shows, Watchlist), and a button navigating to the Movie Listing page.
- **Hero Banner**: Eye-catching background, title, description, quick search bar, and Call-To-Action button.
- **Trending Shows**: Spotlight showcase of top-rated series.
- **Genre Discovery**: Quick-access cards to jump directly to specific genres.
- **Footer**: Branding, navigation links, copyright, and TVMaze API attribution.

### 2. Movie Listing Page
- **Search Bar**: Search movies and shows dynamically by title with real-time updates.
- **Filters & Sorting**:
  - Filter by Genre (Drama, Action, Sci-Fi, Comedy, etc.)
  - Filter by Status (Running / Ended)
  - Filter by Minimum Rating
  - Sort by Rating, Release Date, or Title (A-Z)
- **Movie Cards**: Poster image, title, release year, rating (e.g. ⭐ 8.5), and "See Details" button.
- **Responsive Layout**: CSS Grid that adjusts from 1 column on mobile to multi-column on desktop.
- **Pagination**: "Load More Shows" button to browse further pages.

### 3. Movie Details Modal
- Opens upon clicking "See Details".
- Displays backdrop image, title, clean summary/overview, rating, premiered date, runtime, genres, language, and network.
- Displays starring cast with photos and character names using TVMaze embedded cast data.
- External links to official site and IMDb.
- Closable via the top `✕` button, the bottom close button, clicking outside the modal, or pressing the `Escape` key.

### 4. Watchlist / Favorites
- Add and remove shows from your personal watchlist with the heart button.
- Saved in browser `localStorage`.
- Live badge counter in the navbar and toast notifications.

---

## Technology Stack

- **Frontend**: React (Vite)
- **Styling**: Plain CSS (CSS Variables, Flexbox, Grid)
- **API**: [TVMaze API](https://www.tvmaze.com/api)

---

## Project Structure

```text
movie-explorer-react/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── services/
    │   └── api.js
    ├── hooks/
    │   └── useFavorites.js
    └── components/
        ├── Navbar.jsx
        ├── HeroBanner.jsx
        ├── FeaturedSection.jsx
        ├── SearchBar.jsx
        ├── FilterBar.jsx
        ├── MovieCard.jsx
        ├── MovieGrid.jsx
        ├── MovieModal.jsx
        ├── FavoritesView.jsx
        ├── Footer.jsx
        └── Toast.jsx
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
