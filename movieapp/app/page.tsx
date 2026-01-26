import Link from "next/link";
import { Play, Star, Heart, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          {/* Animated Logo/Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 animate-bounce">
                <span className="text-xl sm:text-2xl">🎬</span>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 sm:w-3 sm:h-3 text-black fill-current" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
              MovieApp
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Discover and explore the community collection of amazing movies with stunning visuals and seamless experience.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Trending Movies</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Discover what's popular right now</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Save Favourites</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Build Community Favourite collection</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
            <Link 
              href="/movies" 
              className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl sm:shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore Movies
              <span className="group-hover:translate-x-1 transition-transform hidden sm:inline">→</span>
            </Link>
            
            <Link 
              href="/favourites" 
              className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border border-white/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              View Community Favourites
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 flex justify-center gap-6 sm:gap-8 text-center px-2">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Movies</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Genres</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">1M+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Users</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}