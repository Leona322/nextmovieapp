import Navigation from "@/components/navigation";
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
        <main className="min-h-screen pt-16 sm:pt-0">{children}</main>
        
        {/* Custom cursor effects - Reduced on mobile */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl -top-24 -left-24 sm:-top-48 sm:-left-48 animate-pulse"></div>
          <div className="absolute w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl -bottom-24 -right-24 sm:-bottom-48 sm:-right-48 animate-pulse delay-1000"></div>
        </div>
      </body>
    </html>
  );
}