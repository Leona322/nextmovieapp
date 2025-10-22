"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/movie-card";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  getMovies,
  searchMovies
} from "@/data/action";

export interface EndpointProps {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string ;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<EndpointProps[]>([]);
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState<EndpointProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Load favourites - CRITICAL: This must run on every page load
  // Load favourites - FIXED version that runs on every navigation
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        console.log("🔄 Loading favourites from database...");
        const favs = await getFavourites();
        console.log("✅ Loaded favourites:", favs?.length || 0, "movies");
        console.log("✅ Favourites IDs:", favs?.map((f) => f.id) || []);
        setFavourites(favs || []);
        setFavouritesLoaded(true);
      } catch (error) {
        console.error("❌ Failed to load favourites:", error);
        setFavourites([]);
        setFavouritesLoaded(true);
      }
    };

    loadFavourites();
  }, []); // Keep empty dependency array

  // ADD THIS: Force favourites reload when the page becomes visible
  useEffect(() => {
    const handleFocus = () => {
      console.log("🔍 Page focused, reloading favourites...");
      const reloadFavourites = async () => {
        const favs = await getFavourites();
        setFavourites(favs || []);
      };
      reloadFavourites();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Load movies with pagination
  // Load movies with pagination
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log(`Fetching movies for page: ${currentPage}`); // Debug log

      const movieData = await getMovies(currentPage);

      if (movieData) {
        console.log(`Received data for page: ${movieData.page}`); // Debug log

        setMovies(movieData.movieResult || []);
        setTotalPages(movieData.totalPages || 1);
        setTotalResults(movieData.totalResults || 0);
      } else {
        console.log("No movie data received"); // Debug log
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!search.trim()) return
    if(isLoading) return

    setIsLoading(true);
    try {
      const searchData = await searchMovies(search, currentPage);
      setMovies(searchData?.movieResult || []);
    }
    catch(error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }  
};
  // Improved favourite toggle with proper error handling
  const handleToggleFavourite = async (movie: EndpointProps) => {
    console.log("Toggling favourite for movie:", movie.id, movie.title);

    const isFav = favourites.some((fav) => fav.id === movie.id);
    console.log("Is currently favourite:", isFav);

    try {
      if (isFav) {
        const result = await removeFavourite(movie.id);
        if (result.success) {
          setFavourites((prev) => {
            const newFavs = prev.filter((fav) => fav.id !== movie.id);
            console.log("Favourites after removal:", newFavs);
            return newFavs;
          });
        } else {
          console.error("Failed to remove favourite:", result.message);
        }
      } else {
        await addFavourite(movie);
        setFavourites((prev) => {
          const newFavs = [...prev, movie];
          console.log("Favourites after addition:", newFavs);
          return newFavs;
        });
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  // Pagination functions
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Don't render movie cards until favourites are loaded
  if (!favouritesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl text-white font-semibold">
              Loading favourites...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Discover Movies
          </h1>
          <p className="text-gray-300 text-lg">Browse through our collection</p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-3 shadow-2xl rounded-2xl bg-white/10 backdrop-blur-sm p-2 border border-white/20">
              <input
                type="text"
                placeholder="Search for movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-4 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        {!isLoading && (
          <div className="mb-6 flex justify-between items-center">
            <div className="text-white">
              Page{" "}
              <span className="text-purple-400 font-bold">{currentPage}</span>{" "}
              of <span className="text-purple-400 font-bold">{totalPages}</span>
              {totalResults > 0 && (
                <span>
                  {" "}
                  •{" "}
                  <span className="text-yellow-400 font-bold">
                    {totalResults}
                  </span>{" "}
                  total movies
                </span>
              )}
            </div>
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Show Popular Movies
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl text-white font-semibold">
              Loading movies...
            </div>
          </div>
        )}

        {/* Movie Grid with consistent alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {movies?.map((movie) => {
            const isFav = favourites.some((fav) => fav.id === movie.id);
            console.log(`Rendering movie ${movie.id}: isFavourite = ${isFav}`);

            return (
              <div key={movie.id} className="h-full">
                <MovieCard
                  movie={movie}
                  isFavourite={isFav}
                  onToggleFavourite={handleToggleFavourite}
                />
              </div>
            );
          })}
        </div>

        {/* Pagination Component */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && movies.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {search
                ? `No movies found for "${search}"`
                : "No movies available"}
            </h3>
            <p className="text-gray-400 text-lg">
              {search
                ? "Try searching with different keywords"
                : "Check back later for new movies"}
            </p>
          </div>
        )}

        {/* Favourites Count */}
        {favourites.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
            ❤️ {favourites.length} Favourites
          </div>
        )}
      </div>
    </div>
  );
}
