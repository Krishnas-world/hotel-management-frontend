"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, LogOut, ChevronDown, X, Home, Users, Phone, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { toast } from "sonner"

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/rooms", label: "Rooms", icon: Users },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
]

interface UserData {
  fullName: string;
  email: string;
  profileImage?: string;
}

// Mobile Menu Component (similar to dashboard)
const MobileMenu = ({ isOpen, setIsOpen, user, loading, handleLogout, userInitial, userName }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Profile Section */}
          {!loading && user && (
            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{userInitial}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400">Welcome back!</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <div className="flex-1 p-4">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Navigation
              </div>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  <link.icon className="h-5 w-5 text-amber-500" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-amber-200 dark:border-gray-700">
            {loading ? (
              <div className="w-full h-12 bg-gray-800/60 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex flex-col space-y-4">
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Account</div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-400 transition-colors flex items-center py-2"
                >
                  <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-400 transition-colors flex items-center py-2"
                >
                  <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  My Bookings
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-400 transition-colors flex items-center py-2"
                >
                  <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mt-4 text-white bg-red-600 hover:bg-red-700 rounded-full py-2.5 px-4 text-center flex items-center justify-center w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="block">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full rounded-full h-12 font-medium">
                  <User className="mr-2 h-5 w-5" />
                  Login to Your Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) 
  const [user, setUser] = useState<UserData | null>(null) 
  const [loading, setLoading] = useState(true); 
  const [scrolled, setScrolled] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Authentication check
  useEffect(() => {
    console.log("Navbar: Checking authentication status by calling API route...");
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/user/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log("Navbar: Auth status response:", data);
        if (response.ok && data) {
          setUser(data);
          console.log("Navbar: User is authenticated.", data.email);
        } else {
          setUser(null);
          console.log("Navbar: User is not authenticated.");
        }
      } catch (error) {
        console.error("Navbar: Error checking auth status:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    console.log("Attempting to log out...");
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Logout successful.");
        toast.success("Logout Successful")
        setUser(null);
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
        toast.error("Logout Failed")
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      toast.error("Network error during logout")
    }
  };

  // Get the first letter for the avatar
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'K';
  const userName = user?.fullName || user?.email?.split('@')[0] || 'User';
  const displayName = userName.length > 15 ? `${userName.substring(0, 12)}...` : userName;

  return (
    <>
      <header className={cn(
        "relative w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-lg shadow-black/10"
          : "bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm border-b border-amber-200/50 dark:border-gray-800"
      )}>
        <style jsx global>{`
          body.overflow-hidden {
            overflow: hidden;
          }
        `}</style>
        
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10 flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Canara Resorts
              </h1>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium flex items-center gap-2"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className="ml-4">
              {loading ? (
                <div className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              ) : user ? (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center rounded-full px-3 py-1 h-10 transition-all duration-200",
                        dropdownOpen
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:shadow-md"
                      )}
                    >
                      <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-medium text-sm">{userInitial}</span>
                      </div>
                      <span className="ml-2 hidden lg:inline font-medium">{displayName}</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-0 w-64 border border-amber-200/50 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200/50 dark:border-amber-500/20">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{userName}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer flex items-center">
                        <Link href="/dashboard">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer flex items-center">
                        <Link href="/bookings">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer flex items-center">
                        <Link href="/profile">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator className="h-px bg-amber-200/50 dark:bg-gray-700 my-0" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 cursor-pointer flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2 rounded-full h-10 shadow-lg hover:shadow-xl transition-all duration-200">
                    <User className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden bg-gradient-to-r from-amber-500 to-orange-500 border-none text-white rounded-full h-9 w-9 hover:from-amber-600 hover:to-orange-600 hover:shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen}
        user={user}
        loading={loading}
        handleLogout={handleLogout}
        userInitial={userInitial}
        userName={userName}
      />
    </>
  )
}