import { API } from "@/lib/const";
import axios from "axios";
import { notFound } from "next/navigation";
import ClientVideoPlayer from "@/components/clientvideoplayer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface WatchPageProps {
  params: {
    movieId: string;
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const movieId = params.movieId;
  const apiKey = API;

  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movie = res.data;

    return (
      <div className="min-h-screen bg-gray-900">
        {/* Mobile Back Button */}
        <div className="fixed top-4 left-4 z-50 sm:hidden">
          <Link 
            href={`/movies`}
            className="flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-black transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>

        {/* Desktop Back Button */}
        <div className="hidden sm:block fixed top-6 left-6 z-50">
          <Link 
            href={`/movies`}
            className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Movie</span>
          </Link>
        </div>

        {/* Movie Info Banner - Mobile Only */}
        <div className="sm:hidden bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 p-4 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-lg font-bold text-white line-clamp-1">
              {movie.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Now Playing
            </p>
          </div>
        </div>

        <ClientVideoPlayer movieId={movieId} movieTitle={movie.title} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching movie data:", error);
    notFound();
  }
}