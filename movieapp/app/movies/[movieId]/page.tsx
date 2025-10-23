import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function MovieDetails({ params }: { params: { movieId: string } }) {
  const movieId = params.movieId;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movie = res.data;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        {/* Back Button - Mobile First */}
        <div className="fixed top-4 left-4 z-50">
          <Link 
            href="/movies"
            className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-black/90 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Movies</span>
          </Link>
        </div>

        {/* Background Banner */}
        <div 
          className="h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 lg:-mt-48 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Poster - Responsive sizing */}
            <div className="flex justify-center lg:justify-start flex-shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-movie.jpg"
                }
                alt={movie.title}
                className="w-48 sm:w-64 md:w-80 h-auto rounded-lg sm:rounded-xl shadow-2xl border-2 sm:border-4 border-white border-opacity-20"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 py-4 sm:py-6 lg:py-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-white text-center lg:text-left">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 italic mb-4 sm:mb-6 text-center lg:text-left">"{movie.tagline}"</p>
              )}

              {/* Rating and Basic Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">({movie.vote_count} votes)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                  <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                  <span>•</span>
                  <span>⏱️ {movie.runtime} min</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start">
                  {movie.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-600 bg-opacity-50 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-center lg:text-left">Overview</h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-center lg:text-left">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Production</h3>
                    <p className="text-white text-sm sm:text-base">
                      {movie.production_companies.slice(0, 2).map((company: any) => company.name).join(', ')}
                      {movie.production_companies.length > 2 && '...'}
                    </p>
                  </div>
                )}
                
                {movie.budget > 0 && (
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Budget</h3>
                    <p className="text-white text-sm sm:text-base">
                      ${movie.budget.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Revenue</h3>
                    <p className="text-white text-sm sm:text-base">
                      ${movie.revenue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Watch Button */}
              <div className="flex justify-center lg:justify-start">
                <Link href={`/watch/${movie.id}`}>
                  <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2 sm:gap-3">
                    <span>🎬</span>
                    Watch Movie
                    <span>▶</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Status */}
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg sm:rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Status</h3>
              <p className="text-white text-base sm:text-lg">{movie.status}</p>
            </div>
            
            {/* Original Language */}
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg sm:rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Language</h3>
              <p className="text-white text-base sm:text-lg uppercase">{movie.original_language}</p>
            </div>
            
            {/* Popularity */}
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg sm:rounded-xl">
              <h3 className="font-semibold text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Popularity</h3>
              <p className="text-white text-base sm:text-lg">{movie.popularity?.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}