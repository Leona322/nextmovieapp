import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">🎬 Welcome to MovieApp</h1>
      <p className="mt-4">Browse and favourite movies.</p>

      <div className="mt-6 flex gap-4">
        <Link href="/movies" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Movies
        </Link>
        <Link href="/favourites" className="px-4 py-2 bg-pink-600 text-white rounded">
          View Favourites
        </Link>
      </div>
    </main>
  );
}
