// app/movies/page.tsx
"use client"

import { useState, useEffect } from "react"
import MovieCard from "@/components/movie-card"
import { getFavourites, addFavourite, removeFavourite } from "@/data/action"

type Movie = {
  id: number
  title: string
  url: string
  release_date: string
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState("")
  const [favourites, setFavourites] = useState<Movie[]>([])
  const handleSearch = (e:React.FormEvent) => {
    e.preventDefault();
    setSearch("");
    
  }

  // ✅ Load favourites from DB on mount
  useEffect(() => {
    (async () => {
      const favs = await getFavourites()
      setFavourites(favs)
    })()
  }, [])

  // ✅ Fetch movies from TMDB (popular or search)
  useEffect(() => {
    const fetchMovies = async () => {
       const url = `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_TMDB_KE`
      const res = await fetch(url)
      const data = await res.json()

      if (data.results) {
        const mapped = data.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          url: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          release_date: m.release_date,
        }))
        setMovies(mapped)
      }
    }
    fetchMovies()
  }, [search])

  // ✅ Toggle favourite (DB + UI)
  async function handleToggleFavourite(movie: Movie) {
    const isFav = favourites.find((fav) => fav.id === movie.id)
    if (isFav) {
      await removeFavourite(movie.id) // remove from DB
      setFavourites(favourites.filter((fav) => fav.id !== movie.id)) // remove instantly from UI
    } else {
      await addFavourite(movie) // add to DB
      setFavourites([...favourites, movie]) // add instantly to UI
    }
  }

  return (
    <div className="p-6">
      {/* ✅ Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type = "submit" className="search-button">Search</button>
      </form>

      {/* ✅ Movie grid */}
      <div className="grid grid-cols-3 gap-6">
        {movies.map((movie) => (
          movie.title.toLowerCase().startsWith(search) && <MovieCard
            key={movie.id}
            movie={movie}
            isFavourite={!!favourites.find((fav) => fav.id === movie.id)}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  )
}
