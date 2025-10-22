import Navigation from "@/components/navigation";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieApp - Discover Your Next Favorite Movie",
  description: "Browse, search, and save your favourite movies with stunning visuals and seamless experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        
        {/* Custom cursor effects */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>
      </body>
    </html>
  );
}