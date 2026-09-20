const BASE_URL = 'https://api.tvmaze.com';

export function stripHtml(html) {
  if (!html) return 'No description available for this title.';
  return html
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function extractYear(dateString) {
  if (!dateString) return 'N/A';
  const match = dateString.match(/^\d{4}/);
  return match ? match[0] : dateString;
}

export function formatRating(rating) {
  if (rating && typeof rating === 'object' && rating.average !== null && rating.average !== undefined) {
    return Number(rating.average).toFixed(1);
  }
  if (typeof rating === 'number') {
    return rating.toFixed(1);
  }
  return 'N/A';
}

export const FALLBACK_POSTER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="%23121826"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="48">🎬</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="16">No Poster Available</text></svg>';

export async function fetchAllShows(page = 0) {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
}

export async function searchShows(query) {
  if (!query || !query.trim()) {
    return [];
  }
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    const data = await response.json();
    return data.map(item => item.show).filter(Boolean);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
}

export async function fetchShowDetails(id) {
  if (!id) throw new Error('Show ID required');
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}?embed[]=cast&embed[]=crew`);
    if (!response.ok) {
      throw new Error(`Details fetch failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
}

export const SPOTLIGHT_SHOW_IDS = [169, 82, 2993, 216, 431, 305, 1871, 526];

export async function fetchSpotlightShows() {
  try {
    const requests = SPOTLIGHT_SHOW_IDS.map(id =>
      fetch(`${BASE_URL}/shows/${id}`)
        .then(res => (res.ok ? res.json() : null))
        .catch(() => null)
    );
    const results = await Promise.all(requests);
    return results.filter(Boolean);
  } catch (error) {
    console.error('Error fetching spotlight shows:', error);
    return [];
  }
}

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
