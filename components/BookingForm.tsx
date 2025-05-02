"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Search, User, BedDouble } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInDays, isBefore } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

export default function BookingForm({ className }: any) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [rooms, setRooms] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [isRoomsPopoverOpen, setIsRoomsPopoverOpen] = useState(false);
  const [isGuestsPopoverOpen, setIsGuestsPopoverOpen] = useState(false);

  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  function handleBookNow() {
    alert(
      `Booking Details:\nCheck In: ${dateRange?.from ? format(dateRange.from, "dd MMM yyyy") : "Not selected"
      }\nCheck Out: ${dateRange?.to ? format(dateRange.to, "dd MMM yyyy") : "Not selected"
      }\nNights: ${nights}\nRooms: ${rooms || "Not selected"}\nGuests: ${guests || "Not selected"
      }`
    );
  }

  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 0,
    Infants: 0,
  });
  type GuestType = "Adults" | "Children" | "Infants";

  function adjustGuest(type: GuestType, change: number) {
    setGuestCounts((prev) => {
      const newCount = Math.max(0, prev[type] + change);
      if (type === "Adults" && newCount === 0 && (prev.Children > 0 || prev.Infants > 0)) return prev;
      if (type === "Adults" && newCount === 0 && prev.Children === 0 && prev.Infants === 0) {
        return { ...prev, Adults: 1 };
      }

      const updated = { ...prev, [type]: newCount };
      updateGuestsText(updated);
      return updated;
    });
  }
  const handleRoomSelect = (num: number) => {
    const roomText = `${num} Room${num > 1 ? 's' : ''}`;
    setRooms(roomText);
    setIsRoomsPopoverOpen(false);
  };


  const updateGuestsText = (counts: { Adults: number, Children: number, Infants: number }) => {
    const summary = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${count} ${type}`)
      .join(", ");
    setGuests(summary || "Select guests");
  };

  useEffect(() => {
    updateGuestsText(guestCounts);
  }, []);


  function handleGuestsApply() {
    updateGuestsText(guestCounts);
    setIsGuestsPopoverOpen(false); // Close popover on apply
  }


  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-950 shadow-lg lg:rounded-full rounded-xl max-w-5xl w-full mx-auto",
        "border border-gray-200 dark:border-gray-800 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <div className="w-full md:flex-grow">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-16 justify-start hover:bg-gray-100 dark:hover:bg-gray-800/50 px-4 text-left",
                  "rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                )}
              >

                <div className="flex w-full items-center">
                  <CalendarIcon className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
                  <div className="flex flex-col w-full overflow-hidden"> {/* Added overflow hidden */}
                    <div className="flex justify-between w-full">
                      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Check In</span>
                      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 pr-4">Check Out</span>
                    </div>
                    <div className="flex justify-between w-full mt-1">
                      <span className="text-sm font-medium truncate">
                        {dateRange?.from
                          ? format(dateRange.from, "dd MMM")
                          : "Select"}
                      </span>
                      <span className="mx-2 text-gray-400 flex-shrink-0">→</span>
                      <span className="text-sm font-medium truncate pr-4">
                        {dateRange?.to
                          ? format(dateRange.to, "dd MMM")
                          : "Select"}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl"
              align="start"
            >
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))} // Disable past dates precisely
                initialFocus
                className="p-3"
              />
              <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700">
                {nights > 0 ? (
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-amber-600">{nights}</span>{" "}
                    night{nights > 1 ? "s" : ""} selected
                  </p>
                ) : <div />}
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  size="sm"
                >
                  Done
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="horizontal" className="block md:hidden" />
        <Separator orientation="vertical" className="h-10 hidden md:block" />

        <div className="w-full md:flex-grow-[0.75]">
          <Popover open={isRoomsPopoverOpen} onOpenChange={setIsRoomsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-16 justify-start hover:bg-gray-100 dark:hover:bg-gray-800/50 px-4 text-left",
                  "rounded-none"
                )}
                aria-label="Select number of rooms"
              >
                <div className="flex items-center w-full">
                  <BedDouble className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Rooms</span>
                    <span className="text-sm font-medium truncate">
                      {rooms || "Select"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2" // Added padding
              align="start"
            >
              <p className="text-sm font-semibold mb-2 px-2 text-gray-700 dark:text-gray-300">Select Rooms</p>
              <div className="grid grid-cols-1 gap-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <Button
                    key={num}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded" // Added rounding to buttons
                    onClick={() => handleRoomSelect(num)}
                  >
                    {num} Room{num > 1 ? 's' : ''}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="horizontal" className="block md:hidden" />
        <Separator orientation="vertical" className="h-10 hidden md:block" />


        <div className="w-full md:flex-grow">

          <Popover open={isGuestsPopoverOpen} onOpenChange={setIsGuestsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-16 justify-start hover:bg-gray-100 dark:hover:bg-gray-800/50 px-4 text-left",
                  "rounded-none"
                )}
              >

                <div className="flex items-center w-full">
                  <User className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
                  <div className="flex flex-col overflow-hidden"> {/* Added overflow hidden */}
                    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Guests</span>
                    <span className="text-sm font-medium truncate">
                      {guests || "Select"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 w-72 shadow-lg">
              {(["Adults", "Children", "Infants"] as GuestType[]).map((type) => (
                <div
                  key={type}
                  className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{type}</p>
                    {type === "Children" && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Ages 2-12</p>
                    )}
                    {type === "Infants" && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Under 2</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-50" // Added disabled style
                      onClick={() => adjustGuest(type, -1)}

                      disabled={
                        (type === 'Adults' && guestCounts.Adults <= 1 && (guestCounts.Children > 0 || guestCounts.Infants > 0)) ||
                        (type !== 'Adults' && guestCounts[type] === 0)
                      }
                    >
                      <span className="text-lg font-bold select-none">-</span>
                    </Button>
                    <span className="w-5 text-center font-medium text-sm select-none">
                      {guestCounts[type]}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700"
                      onClick={() => adjustGuest(type, 1)}

                    >
                      <span className="text-lg font-bold select-none">+</span>
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onClick={handleGuestsApply}
                className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              >
                Apply
              </Button>
            </PopoverContent>
          </Popover>
        </div>


        <Separator orientation="horizontal" className="block md:hidden" />


        <div className="w-full md:w-auto md:flex-shrink-0">
          <Button
            aria-label="Search bookings"
            className={cn(
              "w-full md:w-14 h-16 bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center",

              "rounded-b-xl md:rounded-bl-none md:rounded-r-xl"
            )}
            onClick={handleBookNow}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}