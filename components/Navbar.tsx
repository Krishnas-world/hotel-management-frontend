"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, LogOut } from "lucide-react"
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
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

// Define type for user data based on backend response
interface UserData {
  fullName: string;
  email: string;
  // Add any other non-sensitive user properties returned by the backend
}

export default function Navbar() {
  const [open, setOpen] = useState(false) // State for mobile sheet
  const [user, setUser] = useState<UserData | null>(null) // State to store user data
  const [loading, setLoading] = useState(true); // State to indicate loading auth status

  // --- Effect to check auth status on mount ---
  useEffect(() => {
    console.log("Navbar: Checking authentication status by calling API route...");
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/user/me',{
          method: 'GET', 
          credentials: 'include',
        });
        const data = await response.json();
        console.log("Navbar: Auth status response:", data);
        if (response.ok&& data) {
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
  const userInitial = (user?.email?.charAt(0)?.toUpperCase() || 'U');
  console.log("User initial for avatar:", user?.email);
  const userName = user?.fullName || user?.email || 'User';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-md transition-all">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
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
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white hover:text-amber-500 hover:bg-amber-400/10 rounded-full transition"
                    )}
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* --- Conditional Rendering: Loading, Login Button, or Avatar/Dropdown --- */}
          {loading ? (
            <div className="ml-4 h-10 w-10 rounded-full bg-gray-700 animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ml-4 border border-amber-500">
                  <AvatarFallback className="bg-amber-600 text-white font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 bg-white rounded-md shadow-lg p-1">
                <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-gray-900">{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-[1px] bg-gray-200" />
                <DropdownMenuItem asChild className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer transition-colors">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer transition-colors">
                  <Link href="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer transition-colors">
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 h-[1px] bg-gray-200" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center px-2 py-1.5 text-sm text-red-600 hover:bg-red-100 rounded-sm cursor-pointer transition-colors">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
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
          <SheetContent side="right" className="bg-black/95 text-white p-6 w-64 border-l border-amber-700 overflow-y-auto">
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
              {/* Conditional Rendering for Mobile Sheet */}
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