"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Film, Home, Heart, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      {/* Fixed Navbar - True overlay with no space */}
      <nav className="border-b border-white/10 bg-gray-900/95 backdrop-blur-xl fixed top-0 left-0 right-0 w-full z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MovieApp
                </span>
                <span className="text-xs text-gray-400 -mt-1 hidden sm:block">Premium Experience</span>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex gap-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 mr-20 border border-white/10">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 relative group",
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                U
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu - Fixed positioning */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-800/95 backdrop-blur-lg border border-white/10 rounded-lg absolute left-4 right-4 top-16 z-50 shadow-2xl">
              <div className="py-2 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300",
                        "hover:bg-white/5 hover:scale-105",
                        isActive
                          ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20"
                          : "text-gray-400 hover:text-white"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        isActive && "scale-110"
                      )} />
                      <span className="font-semibold text-base">{label}</span>
                      
                      {/* Active indicator for mobile */}
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile User Action */}
              <div className="border-t border-white/10 mt-2 pt-3 pb-2 px-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    U
                  </div>
                  <span className="text-sm">User Profile</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* NO SPACER - Let the content flow naturally underneath */}
    </>
  );
};

export default Navigation;