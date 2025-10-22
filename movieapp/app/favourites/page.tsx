// app/favourites/page.tsx
"use client"

import { useState, useEffect } from "react"
import { getFavourites, removeFavourite } from "@/data/action"
import { EndpointProps } from "@/app/movies/page"
import Link from "next/link"

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<EndpointProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favourites
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const favs = await getFavourites()
        setFavourites(favs || [])
      } catch (error) {
        console.error("Failed to load favourites:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadFavourites()
  }, [])

  // Remove from favourites function
  const handleRemoveFavourite = async (movieId: number) => {
    try {
      await removeFavourite(movieId)
      setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    } catch (error) {
      console.error("Failed to remove favourite:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl text-white font-semibold">Loading your favourites...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Your Favourites</h1>
          <p className="text-gray-300 text-lg">
            {favourites.length === 0 
              ? "Your curated collection of loved movies"
              : `You have ${favourites.length} favourite movie${favourites.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {favourites.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-8xl mb-6">❤️</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              No favourites yet
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              You haven't added any movies to your favourites. Start exploring and
              add some movies you love!
            </p>
            <Link 
              href="/movies"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          /* Favourites Grid */
          <div>
            {/* Stats Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{favourites.length}</div>
                  <div className="text-sm text-gray-300">Total Movies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {Math.max(...favourites.map(fav => fav.vote_average)).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-300">Highest Rated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {new Date(Math.min(...favourites.map(fav => new Date(fav.release_date).getTime()))).getFullYear()}
                  </div>
                  <div className="text-sm text-gray-300">Oldest Movie</div>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favourites.map((fav) => (
                <div 
                  key={fav.id} 
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Movie Poster - Clickable to Watch Page */}
                  <Link href={`/watch/${fav.id}`} className="relative block overflow-hidden">
                    <img
                      src={
                        fav.poster_path
                          ? `https://image.tmdb.org/t/p/w500${fav.poster_path}`
                          : "/placeholder-movie.jpg"
                      }
                      alt={fav.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ {fav.vote_average.toFixed(1)}
                    </div>
                    {/* Watch Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎬</div>
                        <p className="text-white font-semibold">Watch Movie</p>
                      </div>
                    </div>
                  </Link>

                  {/* Movie Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                          {fav.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>{new Date(fav.release_date).getFullYear()}</span>
                          <span className="flex items-center gap-1 text-red-400">
                            <span>❤️</span>
                            Favourited
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFavourite(fav.id)}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>❌</span>
                      Remove from Favourites
                    </button>

                    {/* Overview */}
                    <div className="mt-3">
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {fav.overview || "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Message */}
            <div className="text-center mt-12">
              <p className="text-gray-400">
                💝 Your personal collection of amazing movies
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}