/**
 * TVMaze API Service Layer
 * API Documentation: https://www.tvmaze.com/api
 */

const BASE_URL = 'https://api.tvmaze.com';

/**
 * Clean HTML strings from summary data safely
 */
export function stripHtml(html) {
  if (!html) return 'No description available for this title.';
  // Replace <p>, <br> with newlines, remove remaining tags
  return html
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Extract 4-digit release year from date string (YYYY-MM-DD)
 */
export function extractYear(dateString) {
  if (!dateString) return 'N/A';
  const match = dateString.match(/^\d{4}/);
  return match ? match[0] : dateString;
}

/**
 * Format rating to one decimal place with fallback
 */
export function formatRating(rating) {
  if (rating && typeof rating === 'object' && rating.average !== null && rating.average !== undefined) {
    return Number(rating.average).toFixed(1);
  }
  if (typeof rating === 'number') {
    return rating.toFixed(1);
  }
  return 'N/A';
}

/**
 * Fallback placeholder image with cinema styling
 */
export const FALLBACK_POSTER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="%23121826"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="48">🎬</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="16">No Poster Available</text></svg>';

/**
 * Fetch all available shows (paginated by TVMaze)
 * Endpoint: GET /shows?page=:page
 */
export async function fetchAllShows(page = 0) {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows (Status: ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error [fetchAllShows]:', error);
    throw error;
  }
}

/**
 * Search shows by title keyword
 * Endpoint: GET /search/shows?q=:query
 */
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return [];
  }
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error(`Failed to search shows (Status: ${response.status})`);
    }
    const data = await response.json();
    // Normalize format: extract nested .show property
    return data.map(item => item.show).filter(Boolean);
  } catch (error) {
    console.error('API Error [searchShows]:', error);
    throw error;
  }
}

/**
 * Fetch comprehensive show details including embedded cast
 * Endpoint: GET /shows/:id?embed[]=cast&embed[]=crew
 */
export async function fetchShowDetails(id) {
  if (!id) throw new Error('Show ID is required');
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}?embed[]=cast&embed[]=crew`);
    if (!response.ok) {
      throw new Error(`Failed to fetch show details (Status: ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error [fetchShowDetails]:', error);
    throw error;
  }
}

/**
 * Popular / Top Rated spotlight titles for Home Showcase
 */
export const SPOTLIGHT_SHOW_IDS = [
  169,   // Breaking Bad
  82,    // Game of Thrones
  2993,  // Stranger Things
  216,   // Rick and Morty
  431,   // Chernobyl
  305,   // Black Mirror
  1871,  // Mr. Robot
  526    // The Office
];

/**
 * Fetch top spotlight shows for landing page
 */
export async function fetchSpotlightShows() {
  try {
    const promises = SPOTLIGHT_SHOW_IDS.map(id =>
      fetch(`${BASE_URL}/shows/${id}`)
        .then(res => (res.ok ? res.json() : null))
        .catch(() => null)
    );
    const results = await Promise.all(promises);
    return results.filter(Boolean);
  } catch (error) {
    console.error('API Error [fetchSpotlightShows]:', error);
    return [];
  }
}

/**
 * Available Genres for filtering
 */
export const ALL_GENRES = [
  'All Genres',
  'Action',
  'Adventure',
  'Animation',
  'Anime',
  'Comedy',
  'Crime',
  'Drama',
  'Espionage',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Legal',
  'Medical',
  'Music',
  'Mystery',
  'Romance',
  'Science-Fiction',
  'Sports',
  'Supernatural',
  'Thriller',
  'War',
  'Western'
];
