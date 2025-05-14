"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Calendar, Compass, Utensils, MessageSquare, Settings, LogOut, HelpCircle } from "lucide-react"

export function DashboardNav() {
  const [activeItem, setActiveItem] = useState("dashboard")

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "bookings", label: "My Bookings", icon: Calendar, href: "/bookings" },
    { id: "experiences", label: "Experiences", icon: Compass, href: "/experiences" },
    { id: "dining", label: "Dining", icon: Utensils, href: "/dining" },
    { id: "support", label: "Support", icon: MessageSquare, href: "/support" },
  ]

  const bottomNavItems = [
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
    { id: "help", label: "Help", icon: HelpCircle, href: "/help" },
    { id: "logout", label: "Logout", icon: LogOut, href: "/logout" },
  ]

  return (
    <aside className="hidden w-64 flex-col border-r border-[#E5E1D8] bg-white md:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-[#E5E1D8] p-6">
        <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-10" />
        <span className="text-lg font-medium text-[#3F3121]">Canara Resorts</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                activeItem === item.id
                  ? "bg-[#F4EFE6] text-[#9C6D3E] font-medium"
                  : "text-[#7D7259] hover:bg-[#F4EFE6] hover:text-[#9C6D3E]",
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="space-y-1 pt-4">
          {bottomNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                activeItem === item.id
                  ? "bg-[#F4EFE6] text-[#9C6D3E] font-medium"
                  : "text-[#7D7259] hover:bg-[#F4EFE6] hover:text-[#9C6D3E]",
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}
