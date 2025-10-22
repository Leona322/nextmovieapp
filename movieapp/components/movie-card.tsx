"use client";

import { EndpointProps } from "@/app/movies/page";
import Link from "next/link";

type Props = {
  movie: EndpointProps;
  isFavourite: boolean;
  onToggleFavourite: (movie: EndpointProps) => void;
};

export default function MovieCard({
  movie,
  isFavourite,
  onToggleFavourite,
}: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <Link href={`/movies/${movie.id}`} className="flex-shrink-0">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder-movie.jpg"
          }
          alt={movie.title}
          className="w-full h-80 object-cover hover:opacity-90 transition-opacity duration-300"
        />
      </Link>

      {/* Content Container - flex-grow to take remaining space */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-3 flex-grow">
          {/* Movie Info - takes available space */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>

          {/* Favourite Button - fixed width */}
          <button
            className={`text-2xl transition-all duration-300 flex-shrink-0 hover:scale-110 active:scale-95 ${
              isFavourite ? 'text-red-500' : 'text-gray-400'
            }`}
            onClick={() => onToggleFavourite(movie)}
            title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            {isFavourite ? "❤️" : "🤍"}
          </button>
        </div>
        
        {/* Rating - aligned at bottom */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
          <span className="flex items-center gap-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            isFavourite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {isFavourite ? 'Favourited' : 'Add to favourites'}
          </span>
        </div>
      </div>
    </div>
  );
}