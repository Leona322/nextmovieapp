import Link from "next/link";
import { Play, Star, Heart, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Animated Logo/Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 animate-bounce">
                <span className="text-2xl">🎬</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-black fill-current" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MovieApp
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover, explore, and curate your personal collection of amazing movies with stunning visuals and seamless experience.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Trending Movies</h3>
              <p className="text-gray-400 text-sm">Discover what's popular right now</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Save Favourites</h3>
              <p className="text-gray-400 text-sm">Build your personal collection</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300">
              <Play className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Watch Trailers</h3>
              <p className="text-gray-400 text-sm">Preview before you watch</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/movies" 
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              Explore Movies
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link 
              href="/favourites" 
              className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-white/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Heart className="w-5 h-5 text-red-400" />
              View Favourites
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-gray-400 text-sm">Movies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-sm">Genres</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-gray-400 text-sm">Users</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}