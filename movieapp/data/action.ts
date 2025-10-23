"use server";

import { EndpointProps } from "@/app/movies/page";
import { S_URL, URL } from "@/lib/const";
import { db } from "@/lib/db";

export async function addFavourite(movie: EndpointProps) {
  try {
    // Check if already exists
    const existing = await db.favourite.findFirst({
      where: { tmdb_id: movie.id },
    });

    if (existing) {
      console.log(`Movie ${movie.id} is already in favourites`);
      return { success: true, message: "Already in favourites" };
    }

    await db.favourite.create({
      data: {
        tmdb_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
        genre_ids: JSON.stringify(movie.genre_ids),
        
        // Store additional fields for completeness
        adult: movie.adult,
        original_language: movie.original_language,
        original_title: movie.original_title,
        popularity: movie.popularity,
        video: movie.video,
        vote_count: movie.vote_count,
      },
    });

    console.log(`✅ Successfully added favourite: ${movie.title}`);
    return { success: true, message: "Added to favourites" };
    
  } catch (error) {
    console.error("❌ Error adding favourite:", error);
    return { success: false, message: "Failed to add favourite" };
  }
}
// ✅ Remove movie by ID
// data/action.ts

// ✅ Safer approach using deleteMany (won't throw error if record doesn't exist)
export async function removeFavourite(tmdbId: number) {
  try {
    const result = await db.favourite.deleteMany({
      where: { tmdb_id: tmdbId },
    });

    if (result.count === 0) {
      console.log(`No favourite found with tmdb_id: ${tmdbId}`);
      return { success: true, message: "Favourite not found or already removed" };
    }

    console.log(`Successfully removed ${result.count} favourite(s) with tmdb_id: ${tmdbId}`);
    return { success: true, message: "Favourite removed successfully" };
    
  } catch (error) {
    console.error("Error removing favourite:", error);
    return { success: false, message: "Failed to remove favourite" };
  }
}

// ✅ Fetch all favourites
// In your getFavourites function in data/action.ts
// ✅ Fetch all favourites
export async function getFavourites(): Promise<EndpointProps[]> {
  try {
    const favourites = await db.favourite.findMany()

    // Define a local type for safety
    type Favourite = {
      tmdb_id: number
      title: string
      poster_path: string | null
      backdrop_path: string | null
      release_date?: string | null
      vote_average?: number | null
      overview?: string | null
      genre_ids?: string | null
      createdAt?: Date
      updatedAt?: Date
    }

    // ✅ Explicitly type "fav" to fix TS error
    const mappedFavourites = favourites.map((fav: Favourite) => ({
      id: fav.tmdb_id,
      title: fav.title,
      poster_path: fav.poster_path,
      backdrop_path: fav.backdrop_path,
      release_date: fav.release_date || "",
      vote_average: fav.vote_average || 0,
      overview: fav.overview || "",
      genre_ids: fav.genre_ids ? (JSON.parse(fav.genre_ids) as number[]) : [],

      // Default values for missing fields
      adult: false,
      original_language: "en",
      original_title: fav.title,
      popularity: 0,
      video: false,
      vote_count: 0,
      createdAt: fav.createdAt || new Date(),
      updatedAt: fav.updatedAt || new Date(),
    }))

    console.log(`✅ Successfully fetched ${mappedFavourites.length} favourites`)
    return mappedFavourites
  } catch (error) {
    console.error("❌ Error fetching favourites:", error)
    return []
  }
}


// data/action.ts
export const getMovies = async (page: number = 1) => {
  // Construct the URL properly
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  const url = `${baseUrl}?page=${page}`;
  
  const bearer_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    console.log(`Making API request to: ${url.replace(bearer_token!, '***')}`); // Hide token in logs
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
      cache: 'no-store' // Prevent caching
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    console.log(`API Response - Page: ${data.page}, Total Pages: ${data.total_pages}, Results: ${data.results.length}`);

    return {
      page: data.page,
      movieResult: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
    
  } catch (e: any) {
    console.log("Error fetching movies", e);
    return null;
  }
};
export const searchMovies = async (query: string, currentPage: number,) => {
    const url = `${S_URL}&query=${encodeURIComponent(query)}`;
  const bearer_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    });
    // console.log({res})

    const data = await res.json();
    const page = data.page;
    console.log({ data });
    const movieResult = data.results;
    const totalPages = data.total_pages;
    const totalResults = data.total_results;

    if (res.ok) {
      return {
        page,
        movieResult,
        totalPages,
        totalResults,
      };
    } else {
      return null;
    }
  } catch (e: any) {
    console.log("Error gotten from fetching movies", e);
    return null;
  }
  }