"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  // Updated links for smooth scrolling to sections
  { href: "#rooms", label: "Rooms" },

  // Add other top-level links like Contact, Gallery, etc. here if needed
  // { href: "#contact", label: "Contact" },
  // { href: "#gallery", label: "Gallery" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Canara Resort Logo"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto transition-transform duration-200 hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            {/* Simplified: Map all links directly */}
            <NavigationMenuList className="flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {/* Use legacyBehavior and passHref with NavigationMenuLink */}
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(), // Base shadcn trigger styles
                      "bg-transparent text-white hover:text-amber-300 hover:bg-white/10 rounded-full transition-colors duration-200 ease-in-out" // Refined colors and transitions
                    )}>
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/login" passHref>
            <Button className="ml-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full transition-colors duration-200 ease-in-out">
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-amber-600 hover:bg-amber-700 border-none text-white rounded-full transition-colors duration-200">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          {/* Mobile Sheet Content */}
          <SheetContent side="right" className="bg-black/95 text-white p-6 w-64 sm:w-72 border-l border-amber-700 overflow-y-auto">
            {/* Mobile Logo in Sheet Header */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                alt="Canara Resort Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            {/* Mobile Navigation Links */}
            {/* Simplified: Map all links directly */}
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                 <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)} // Close sheet on link click
                    className="text-lg font-medium hover:text-amber-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
              ))}
              {/* Mobile Login Button */}
              <Link href="/login" passHref>
                 <Button
                   onClick={() => setOpen(false)}
                   className="mt-6 bg-amber-600 hover:bg-amber-700 text-white w-full rounded-full py-3 transition-colors duration-200"
                 >
                   <User className="mr-2 h-4 w-4" />
                   Login
                 </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}