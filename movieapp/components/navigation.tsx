"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Film, Home, Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();

  // 👇 Add all routes where navbar should be hidden
  const hideOnRoutes = ["/login", "/register", "/onboarding"];

  if (hideOnRoutes.includes(pathname)) {
    return null; // 👈 Don't render anything
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/favourites", label: "Favourites", icon: Heart },
  ];

  return (
    <nav className="border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MovieApp
              </span>
              <span className="text-xs text-gray-400 -mt-1">Premium Experience</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex gap-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 relative group",
                    "hover:bg-white/5 hover:scale-105",
                    isActive
                      ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isActive && "scale-110"
                  )} />
                  <span className="font-semibold text-sm">{label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-1 left-1/2 w-1 h-1 bg-purple-400 rounded-full -translate-x-1/2"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>

          {/* User Actions (placeholder for future features) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;