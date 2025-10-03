// app/favourites/page.tsx
import { getFavourites } from "@/data/action";

export default async function FavouritesPage() {
  const favourites = await getFavourites();

  return (
    <div className="p-6">
      {favourites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No favourites yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't added any movies to your favourites. Start exploring and add some movies you love!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {favourites.map((fav) => (
            <div key={fav.id} className="border rounded p-4">
              <img src={fav.url} alt={fav.title} className="w-full h-64 object-cover" />
              <h3 className="mt-2 font-semibold">{fav.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}