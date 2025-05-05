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
  { href: "#rooms", label: "Rooms" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out">
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
            <NavigationMenuList className="flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white hover:text-amber-500 hover:bg-amber-400/10 rounded-full transition-colors duration-200 ease-in-out" // Refined colors and transitions
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
          <SheetContent side="right" className="bg-black/95 text-white p-6 w-64 sm:w-72 border-l border-amber-700 overflow-y-auto">
        
            <div className="flex justify-center mb-8">
            </div>
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                 <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)} 
                    className="text-lg font-medium hover:text-amber-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
              ))}
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