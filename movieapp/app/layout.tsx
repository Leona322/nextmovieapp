// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4 bg-gray-900 text-white">
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/favourites">Favourites</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}