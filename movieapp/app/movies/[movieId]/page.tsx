import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function MovieDetails({ params }: { params: { movieId: string } }) {
  const movieId = params.movieId;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movie = res.data;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        {/* Background Banner */}
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-movie.jpg"
                }
                alt={movie.title}
                className="w-80 h-auto rounded-xl shadow-2xl border-4 border-white border-opacity-20"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 py-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-6">"{movie.tagline}"</p>
              )}

              {/* Rating and Basic Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>
                  <span className="text-gray-300 text-sm">({movie.vote_count} votes)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                  <span>•</span>
                  <span>⏱️ {movie.runtime} min</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600 bg-opacity-50 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Production</h3>
                    <p className="text-white">
                      {movie.production_companies.map((company: any) => company.name).join(', ')}
                    </p>
                  </div>
                )}
                
                {movie.budget > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Budget</h3>
                    <p className="text-white">
                      ${movie.budget.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Revenue</h3>
                    <p className="text-white">
                      ${movie.revenue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Watch Button */}
              <Link href={`/watch/${movie.id}`}>
                <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center gap-3">
                  <span>🎬</span>
                  Watch Movie
                  <span>▶</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Status */}
            <div className="text-center p-6 bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-2">Status</h3>
              <p className="text-white text-lg">{movie.status}</p>
            </div>
            
            {/* Original Language */}
            <div className="text-center p-6 bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-2">Language</h3>
              <p className="text-white text-lg uppercase">{movie.original_language}</p>
            </div>
            
            {/* Popularity */}
            <div className="text-center p-6 bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-2">Popularity</h3>
              <p className="text-white text-lg">{movie.popularity?.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}