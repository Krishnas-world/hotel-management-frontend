"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User } from "lucide-react"
import Cookies from 'js-cookie' // Add this import for cross-browser cookie handling

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  interface User {
    name: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Function to decode JWT token
    const parseJwt = (token:any) => {
      try {
        // Split the token and get the payload part (second part)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Error parsing JWT token:", error);
        return null;
      }
    };

    // Check for auth token in cookies using multiple methods
    const checkAuthToken = () => {
      // Method 1: Use js-cookie
      const cookieToken = Cookies.get('authToken');
      
      // Method 2: Use document.cookie
      const documentCookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

      // Prioritize js-cookie method
      const token = cookieToken || documentCookieToken;
      
      console.log("Token found:", !!token);
      console.log("Full cookie string:", document.cookie);

      if (token) {
        try {
          // Parse the JWT token to get user info
          const decodedToken = parseJwt(token);
          if (decodedToken && decodedToken.email) {
            console.log("Decoded token:", decodedToken);
            setUser({
              name: decodedToken.email.split('@')[0], // Use part before @ as display name
              email: decodedToken.email
            });
          }
        } catch (error) {
          console.error("Error processing auth token:", error);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    // Call the function to check auth token
    checkAuthToken();
  }, []);

  // Get first character of user's name for avatar
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U"

  // Handle logout
  const handleLogout = async () => {
    try {
      // Get the clientDeviceId from the JWT token
      const getToken = () => {
        return Cookies.get('authToken') || 
               document.cookie
                 .split('; ')
                 .find(row => row.startsWith('authToken='))
                 ?.split('=')[1];
      };
      
      const parseJwt = (token:any) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error("Error parsing JWT token:", error);
          return null;
        }
      };
      
      const token = getToken();
      let clientDeviceId = null;
      if (token) {
        const decodedToken = parseJwt(token);
        clientDeviceId = decodedToken?.clientDeviceId;
      }

      // Call the logout API endpoint
      const response = await fetch('http://localhost:5000/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include', // This is important for cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientDeviceId }),
      });

      if (response.ok) {
        // Clear user state and cookies
        Cookies.remove('authToken');
        setUser(null);
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-md transition-all">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Canara Resort Logo"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:text-amber-500 hover:bg-amber-400/10 rounded-full transition"
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {loading ? (
            // Show a loading placeholder while checking auth status
            <div className="ml-4 w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ml-4 border border-amber-500">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-amber-600 text-white font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2">
                <div className="px-2 py-1.5 text-sm font-medium">{user.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="ml-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden bg-amber-600 hover:bg-amber-700 border-none text-white rounded-full"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white p-6 w-64 border-l border-amber-700">
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg hover:text-amber-400 transition"
                >
                  {link.label}
                </Link>
              ))}
              {loading ? (
                <div className="w-full h-10 bg-gray-700 rounded-full animate-pulse mt-6"></div>
              ) : user ? (
                <>
                  <div className="border-t border-gray-700 pt-4 mt-2"></div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-8 w-8 border border-amber-500">
                      <AvatarFallback className="bg-amber-600 text-white text-sm">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">{user.email}</span>
                  </div>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="text-white hover:text-amber-400">Dashboard</Link>
                  <Link href="/bookings" onClick={() => setOpen(false)} className="text-white hover:text-amber-400">My Bookings</Link>
                  <Link href="/profile" onClick={() => setOpen(false)} className="text-white hover:text-amber-400">Profile</Link>
                  <button 
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }} 
                    className="text-red-400 hover:text-red-300 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="mt-6 bg-amber-600 hover:bg-amber-700 text-white w-full rounded-full">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}