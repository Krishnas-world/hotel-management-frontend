"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"
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

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

// Define type for user data based on backend response
interface UserData {
  fullName: string;
  email: string;
  profileImage?: string;
  // Add any other non-sensitive user properties returned by the backend
}

export default function Navbar() {
  const [open, setOpen] = useState(false) // State for mobile sheet
  const [user, setUser] = useState<UserData | null>(null) // State to store user data
  const [loading, setLoading] = useState(true); // State to indicate loading auth status
  const [scrolled, setScrolled] = useState(false); // Track scroll for navbar styling
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state

  // --- Effect to handle scroll behavior ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Effect to check auth status on mount ---
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

  // --- Logout Handler ---
  const handleLogout = async () => {
    console.log("Attempting to log out...");
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Logout successful.");
        setUser(null);
        window.location.href = '/login';
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };

  // Get the first letter for the avatar
  const userInitial = user?.email?.charAt(0)?.toUpperCase() || 'K';
  const userName = user?.fullName || user?.email?.split('@')[0] || 'User';
  const displayName = userName.length > 15 ? `${userName.substring(0, 12)}...` : userName;

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-black/90 shadow-md" 
        : "bg-black/80"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Canara Resort Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <nav className="flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-white hover:text-amber-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="ml-4">
            {loading ? (
              <div className="h-10 w-10 rounded-full bg-gray-700/60 animate-pulse"></div>
            ) : user ? (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "flex items-center text-white rounded-full p-1 h-10 transition-colors",
                      dropdownOpen ? "bg-amber-500 text-black" : "hover:bg-amber-500 hover:text-black"
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-amber-500 text-black font-medium">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden lg:inline">{displayName}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  sideOffset={5} 
                  className="bg-white rounded-md shadow-lg p-0 w-64 border-0 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <DropdownMenuItem asChild className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Link href="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="h-px bg-gray-200 my-0" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full h-10 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-amber-500 border-none text-black rounded-full h-9 w-9 hover:bg-amber-600"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 text-white p-0 w-full sm:max-w-xs border-l-0 overflow-y-auto">
            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full">
              {/* User Profile Section for Mobile */}
              {!loading && user && (
                <div className="p-4 bg-amber-500/10">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-amber-500 text-black font-medium">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white truncate max-w-[200px]">{userName}</span>
                      <span className="text-xs text-gray-400 truncate max-w-[200px]">{user.email}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Links */}
              <div className="p-4 flex flex-col space-y-3">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-gray-100 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="mt-auto p-4 border-t border-gray-800">
                {loading ? (
                  <div className="w-full h-12 bg-gray-800/60 rounded-full animate-pulse"></div>
                ) : user ? (
                  <div className="flex flex-col space-y-3">
                    <SheetClose asChild>
                      <Link 
                        href="/dashboard" 
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/bookings" 
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        My Bookings
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/profile" 
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        Profile
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        onClick={handleLogout}
                        className="mt-2 text-red-400 hover:text-red-300 text-left flex items-center py-1"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </SheetClose>
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Link href="/login" className="block">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full rounded-full h-12 transition-colors font-medium">
                        <User className="mr-2 h-5 w-5" />
                        Login to Your Account
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}