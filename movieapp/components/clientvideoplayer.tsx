'use client';

import { useState, useEffect } from 'react';

interface ClientVideoPlayerProps {
  movieId: string;
  movieTitle: string;
}

export default function ClientVideoPlayer({ movieId, movieTitle }: ClientVideoPlayerProps) {
  const [activeSolution, setActiveSolution] = useState<'embeds' | 'direct' | 'external'>('embeds');
  const [loading, setLoading] = useState(true);

  // Enhanced sources with multiple types
  const streamingOptions = {
    embeds: [
      { name: "VidSrc ICU", url: `https://vidsrc.icu/embed/movie/${movieId}` },
      { name: "VidSrc TO", url: `https://vidsrc.to/embed/movie/${movieId}` },
      { name: "2Embed", url: `https://www.2embed.cc/embed/${movieId}` },
      { name: "AutoEmbed", url: `https://autoembed.co/movie/tmdb/${movieId}` },
      { name: "VidSrc PRO", url: `https://vidsrc.pro/embed/movie/${movieId}` },
    ],
    direct: [
      { name: "MovieAPI", url: `https://moviesapi.space/movie/${movieId}` },
      { name: "SuperEmbed", url: `https://multiembed.mov/direct/movie?tmdb=${movieId}` },
    ],
    external: [
      { 
        name: "Search on JustWatch", 
        url: `https://www.justwatch.com/us/search?q=${encodeURIComponent(movieTitle)}` 
      },
      { 
        name: "Google Search", 
        url: `https://www.google.com/search?q=${encodeURIComponent(movieTitle + " watch online free")}` 
      },
      { 
        name: "YouTube Search", 
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " trailer")}` 
      },
    ]
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (activeSolution === 'external') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{movieTitle}</h1>
            <p className="text-gray-400">Streaming Options</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              🔍 Search on Streaming Platforms
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Embed sources are currently unavailable. Search for this movie on popular streaming platforms:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {streamingOptions.external.map((source, index) => (
                <button
                  key={index}
                  onClick={() => openExternalLink(source.url)}
                  className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-semibold"
                >
                  {source.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveSolution('embeds')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              ← Try Embed Sources Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{movieTitle}</h1>
          <p className="text-gray-400">Now Playing</p>
        </div>

        {/* Main Video Area */}
        <div className="bg-black rounded-lg shadow-2xl overflow-hidden mb-6 h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold mb-4">Stream Not Available</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              The embedded stream is not currently available. This could be due to regional restrictions, server issues, or the movie not being available on these platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveSolution('external')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                🔍 Search Streaming Sites
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                🔄 Retry Embedded Sources
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">🎯 Try These Alternatives</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Check if the movie is available on Netflix, Amazon Prime, or Disney+</li>
              <li>• Search for the movie on YouTube for official trailers or rentals</li>
              <li>• Visit JustWatch to see which platforms stream this movie</li>
              <li>• Check your local library for free digital rentals</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">ℹ️ Why This Happens</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Regional licensing restrictions</li>
              <li>• Source servers may be temporarily down</li>
              <li>• Movie might not be available on free platforms</li>
              <li>• Your network may be blocking these sources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}