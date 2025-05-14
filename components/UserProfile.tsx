"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle, LogOut } from "lucide-react"

export function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#F4EFE6]">
          <Avatar className="h-8 w-8 border border-[#E5E1D8]">
            <AvatarImage src="/placeholder.svg" alt="@user" />
            <AvatarFallback className="bg-[#F4EFE6] text-[#9C6D3E]">JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[#3F3121]">John Doe</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-[#E5E1D8]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-[#3F3121]">John Doe</p>
            <p className="text-xs text-[#7D7259]">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#E5E1D8]" />
        <DropdownMenuItem className="text-[#3F3121] focus:bg-[#F4EFE6] focus:text-[#9C6D3E]">
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[#3F3121] focus:bg-[#F4EFE6] focus:text-[#9C6D3E]">
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[#3F3121] focus:bg-[#F4EFE6] focus:text-[#9C6D3E]">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#E5E1D8]" />
        <DropdownMenuItem className="text-[#3F3121] focus:bg-[#F4EFE6] focus:text-[#9C6D3E]">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
