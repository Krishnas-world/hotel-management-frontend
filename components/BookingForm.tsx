"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, differenceInDays, isBefore } from "date-fns"
import Image from "next/image"
import type { DateRange } from "react-day-picker"

export default function BookingForm() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [rooms, setRooms] = useState<string>("")
  const [guests, setGuests] = useState<string>("")
  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  function handleBookNow() {
    alert(
      `Booking Details:\nCheck In: ${dateRange?.from ? format(dateRange.from, "dd-MM-yyyy") : "Not selected"}\nCheck Out: ${dateRange?.to ? format(dateRange.to, "dd-MM-yyyy") : "Not selected"}\nNights: ${nights}\nRooms: ${rooms || "Not selected"}\nGuests: ${guests || "Not selected"}`
    )
  }

  return (
    <div className="bg-black text-white grid grid-cols-1 md:grid-cols-5">
      {/* Date Range Picker */}
      <div className="p-4 border-r border-gray-800 flex flex-col col-span-2">
        <span className="text-xs mb-1">Check In & Check Out</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-transparent border-0 text-white hover:bg-gray-900"
            >
              <span>
                {dateRange?.from ? format(dateRange.from, "dd-MM-yyyy") : "DD-MM-YYYY"}
                {dateRange?.to ? ` → ${format(dateRange.to, "dd-MM-yyyy")}` : ""}
              </span>
              <CalendarIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={(date) => isBefore(date, new Date())}
            />
            {dateRange?.from && dateRange?.to && (
              <div className="p-2 text-xs text-gray-300">{nights} night{nights !== 1 ? "s" : ""} selected</div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {/* Rooms with images */}
      <div className="p-4 border-r border-gray-800 flex flex-col">
        <span className="text-xs mb-1">Rooms</span>
        <Select value={rooms} onValueChange={setRooms}>
          <SelectTrigger className="bg-transparent border-0 text-white hover:bg-gray-900">
            <SelectValue placeholder="1-2 Rooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 Room">
              <div className="flex items-center gap-2">
                <Image src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=60&q=80" alt="1 Room" width={40} height={30} className="rounded" />
                1 Room
              </div>
            </SelectItem>
            <SelectItem value="2 Rooms">
              <div className="flex items-center gap-2">
                <Image src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=60&q=80" alt="2 Rooms" width={40} height={30} className="rounded" />
                2 Rooms
              </div>
            </SelectItem>
            <SelectItem value="3 Rooms">
              <div className="flex items-center gap-2">
                <Image src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=60&q=80" alt="3 Rooms" width={40} height={30} className="rounded" />
                3 Rooms
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Guests */}
      <div className="p-4 border-r border-gray-800 flex flex-col">
        <span className="text-xs mb-1">Guests</span>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger className="bg-transparent border-0 text-white hover:bg-gray-900">
            <SelectValue placeholder="1-2 Adults" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 Adult">1 Adult</SelectItem>
            <SelectItem value="2 Adults">2 Adults</SelectItem>
            <SelectItem value="2 Adults, 1 Child">2 Adults, 1 Child</SelectItem>
            <SelectItem value="2 Adults, 2 Children">2 Adults, 2 Children</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Book Now */}
      <div className="p-4 flex items-center justify-center">
        <Button className="bg-blue-500 hover:bg-blue-600 w-full" onClick={handleBookNow}>Book Now</Button>
      </div>
    </div>
  )
} 