"use server";

import { db } from "@/lib/db";

// ✅ Add movie to favourites (with release_date)
export async function addFavourite(movie: { title: string; url: string; release_date: string }) {
  await db.favourite.create({
    data: { 
      title: movie.title, 
      url: movie.url,
      release_date: movie.release_date,
    },
  });
}

// ✅ Remove movie by ID
export async function removeFavourite(id: number) {
  await db.favourite.delete({
    where: { id },
  });
}

// ✅ Fetch all favourites
export async function getFavourites() {
  return await db.favourite.findMany();
}
