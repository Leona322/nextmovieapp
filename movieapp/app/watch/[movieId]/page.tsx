import { API } from "@/lib/const";
import axios from "axios";
import { notFound } from "next/navigation";
import ClientVideoPlayer from "@/components/clientvideoplayer"; // Adjust import path as needed

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

    return <ClientVideoPlayer movieId={movieId} movieTitle={movie.title} />;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    notFound();
  }
}