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
import { toast } from "sonner"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]
interface UserData {
  fullName: string;
  email: string;
  profileImage?: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false) 
  const [user, setUser] = useState<UserData | null>(null) 
  const [loading, setLoading] = useState(true); 
  const [scrolled, setScrolled] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
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

  useEffect(() => {
    if (open) {
    
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
  }, [open]);

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
    <header className={cn(
      "relative w-full z-50 transition-all duration-300",
      scrolled
        ? "bg-black shadow-lg shadow-black/10"
        : "bg-black border-b-2 border-amber-600 "
    )}>
      <style jsx global>{`
        body.overflow-hidden {
          overflow: hidden;
          /* This prevents the layout shift when scrollbar disappears */
        }
      `}</style>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-10">
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
        <div className="hidden md:flex items-center space-x-6">
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
              <div className="h-10 w-24 rounded-full bg-gray-700/60 animate-pulse"></div>
            ) : user ? (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center text-white rounded-full px-3 py-1 h-10",
                      dropdownOpen
                        ? "bg-amber-500 text-black"
                        : "hover:bg-amber-500 hover:text-black"
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      {user.profileImage && (
                        <AvatarImage src={user.profileImage} alt={userName} />
                      )}
                      <AvatarFallback className="bg-amber-500 text-black font-medium">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden lg:inline font-medium">{displayName}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="bg-white rounded-lg shadow-lg p-0 w-64 border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 cursor-pointer flex items-center">
                      <Link href="/dashboard">
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 cursor-pointer flex items-center">
                      <Link href="/bookings">
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 cursor-pointer flex items-center">
                      <Link href="/profile">
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="h-px bg-gray-200 my-0" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full h-10">
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
              className="md:hidden bg-amber-500 border-none text-black rounded-full h-9 w-9 hover:bg-amber-600 hover:shadow-md hover:shadow-amber-500/20 transition-all"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black/95 text-white p-0 w-full sm:max-w-xs border-l border-amber-500/20 backdrop-blur-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>

              {/* User Profile Section for Mobile */}
              {!loading && user && (
                <div className="p-4 bg-amber-500/10 mb-2 border-b border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-amber-500">
                      {user.profileImage && (
                        <AvatarImage src={user.profileImage} alt={userName} />
                      )}
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
              <div className="p-6 flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-gray-100 hover:text-amber-400 transition-colors flex items-center"
                    >
                      <span className="text-amber-500 mr-3">•</span>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="mt-auto p-6 border-t border-gray-800">
                {loading ? (
                  <div className="w-full h-12 bg-gray-800/60 rounded-full animate-pulse"></div>
                ) : user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Account</div>
                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/bookings"
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        My Bookings
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/profile"
                        className="text-gray-200 hover:text-amber-400 transition-colors flex items-center py-1"
                      >
                        <svg className="mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        onClick={handleLogout}
                        className="mt-4 text-white bg-red-600 hover:bg-red-700 rounded-full py-2.5 px-4 text-center flex items-center justify-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </SheetClose>
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Link href="/login" className="block">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full rounded-full h-12 font-medium">
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