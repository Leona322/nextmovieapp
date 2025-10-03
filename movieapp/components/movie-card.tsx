"use client"

type Movie = {
  id: number
  title: string
  url: string
  release_date: string
}

type Props = {
  movie: Movie
  isFavourite: boolean
  onToggleFavourite: (movie: Movie) => void
}

export default function MovieCard({ movie, isFavourite, onToggleFavourite }: Props) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img src={movie.url} alt={movie.title} className="w-full h-80 object-cover" />

      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </div>

        {/* ❤️ / 🤍 button */}
        <button
          className="mt-2 text-xl transition-transform transform active:scale-125"
          onClick={() => onToggleFavourite(movie)}
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  )
}
