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
import { useRouter } from 'next/navigation';

interface BookingData {
  dateRange?: DateRange;
  rooms: string;
  guests: string;
  guestCounts: {
    Adults: number;
    Children: number;
    Infants: number;
  };
}

export default function BookingForm({ className }: any) {
  const router = useRouter();

  // Helper functions for session storage
  const getBookingData = (): BookingData => {
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('bookingData');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        return {
          ...parsed,
          dateRange: parsed.dateRange ? {
            from: parsed.dateRange.from ? new Date(parsed.dateRange.from) : undefined,
            to: parsed.dateRange.to ? new Date(parsed.dateRange.to) : undefined,
          } : undefined
        };
      }
    }
    return {
      dateRange: undefined,
      rooms: "",
      guests: "",
      guestCounts: {
        Adults: 2,
        Children: 0,
        Infants: 0,
      }
    };
  };

  const saveBookingData = (data: BookingData) => {
    if (typeof window !== 'undefined') {
      const dataToStore = {
        ...data,
        dateRange: data.dateRange ? {
          from: data.dateRange.from?.toISOString(),
          to: data.dateRange.to?.toISOString(),
        } : undefined
      };
      sessionStorage.setItem('bookingData', JSON.stringify(dataToStore));
    }
  };

  // Initialize state from session storage
  const initialData = getBookingData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialData.dateRange);
  const [rooms, setRooms] = useState<string>(initialData.rooms);
  const [guests, setGuests] = useState<string>(initialData.guests);
  const [guestCounts, setGuestCounts] = useState(initialData.guestCounts);

  const [isRoomsPopoverOpen, setIsRoomsPopoverOpen] = useState(false);
  const [isGuestsPopoverOpen, setIsGuestsPopoverOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  type GuestType = "Adults" | "Children" | "Infants";

  // Single effect to update session storage whenever any booking data changes
  useEffect(() => {
    const bookingData: BookingData = {
      dateRange,
      rooms,
      guests,
      guestCounts
    };
    saveBookingData(bookingData);
  }, [dateRange, rooms, guests, guestCounts]);

  function handleBookNow() {
    // Construct query parameters for the rooms page
    const queryParams = new URLSearchParams();
    if (dateRange?.from) {
      queryParams.append('checkIn', format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange?.to) {
      queryParams.append('checkOut', format(dateRange.to, 'yyyy-MM-dd'));
    }
    if (rooms) {
      queryParams.append('rooms', rooms.split(' ')[0]); // Store just the number
    }
    queryParams.append('adults', guestCounts.Adults.toString());
    queryParams.append('children', guestCounts.Children.toString());
    queryParams.append('infants', guestCounts.Infants.toString());

    // Redirect to the rooms page with query parameters
    router.push(`/rooms?${queryParams.toString()}`);
  }

  function adjustGuest(type: GuestType, change: number) {
    setGuestCounts((prev:any) => {
      const newCount = Math.max(0, prev[type] + change);
      if (type === "Adults" && newCount === 0 && (prev.Children > 0 || prev.Infants > 0)) return prev;
      if (type === "Adults" && newCount === 0 && prev.Children === 0 && prev.Infants === 0) {
        return { ...prev, Adults: 1 };
      }

      const updated = { ...prev, [type]: newCount };
      return updated;
    });
  }

  const handleRoomSelect = (num: number) => {
    const roomText = `${num} Room${num > 1 ? 's' : ''}`;
    setRooms(roomText);
    setIsRoomsPopoverOpen(false);
  };

  // Function to handle the Done button click in calendar
  const handleDateDone = () => {
    setIsDatePopoverOpen(false);
  };

  const updateGuestsText = (counts: { Adults: number, Children: number, Infants: number }) => {
    const summary = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${count} ${type}`)
      .join(", ");
    setGuests(summary || "Select guests");
  };

  // Initial update of guest text on component mount
  useEffect(() => {
    updateGuestsText(guestCounts);
  }, [guestCounts]);

  function handleGuestsApply() {
    updateGuestsText(guestCounts);
    setIsGuestsPopoverOpen(false);
  }

  // Updated calendar component with proper separator between months in PC view
  // In mobile view, we'll show only one month at a time
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const CalendarWithSeparator = (props: any) => (
    <>
      {/* Desktop view - show both months side by side with separator */}
      <div className="hidden sm:flex sm:flex-row sm:items-start sm:justify-center">
        <div className="flex-1">
          <Calendar
            {...props}
            numberOfMonths={1}
            className="p-3"
          />
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-700 mx-2 self-stretch"></div>
        <div className="flex-1">
          <Calendar
            {...props}
            numberOfMonths={1}
            defaultMonth={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            className="p-3"
          />
        </div>
      </div>

      {/* Mobile view - show only one month at a time */}
      <div className="block sm:hidden">
        <Calendar
          {...props}
          numberOfMonths={1}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="p-3"
        />
      </div>
    </>
  );

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
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
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
                  <div className="flex flex-col w-full overflow-hidden">
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
              className="w-auto p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
              align="center"
            >
              <div className="w-full">
                <CalendarWithSeparator
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={(date: Date) => isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))}
                  initialFocus
                />
              </div>
              <Button
                onClick={handleDateDone}
                className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              >
                Done
              </Button>
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
              className="w-64 p-4 bg-white dark:bg-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
              align="center"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(num => (
                  <Button
                    key={num}
                    variant={rooms === `${num} Room${num > 1 ? 's' : ''}` ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "px-4 py-2 rounded-full",
                      rooms === `${num} Room${num > 1 ? 's' : ''}`
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "border border-gray-300 dark:border-gray-700"
                    )}
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
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Guests</span>
                    <span className="text-sm font-medium truncate">
                      {guests || "Select"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-72" align="center">
              {(["Adults", "Children", "Infants"] as GuestType[]).map((type) => (
                <div
                  key={type}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{type}</p>
                    {type === "Children" && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ages 2-12</p>
                    )}
                    {type === "Infants" && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Under 2</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-50"
                      onClick={() => adjustGuest(type, -1)}
                      disabled={
                        (type === 'Adults' && guestCounts.Adults <= 1 && (guestCounts.Children > 0 || guestCounts.Infants > 0)) ||
                        (type !== 'Adults' && guestCounts[type] === 0)
                      }
                    >
                      <span className="text-lg font-medium select-none">-</span>
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
                      <span className="text-lg font-medium select-none">+</span>
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