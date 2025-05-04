import Link from "next/link";
import BookingForm from "./BookingForm";
import HeroSection from "./HeroSection";
import { ChevronRight } from "lucide-react";
import { RoomCard } from "./RoomCard";

export default function RoomsSection() {
  const rooms = [
    {
      id: "1",
      type: "LUXURY ROOM",
      name: "Deluxe Family Rooms",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80",
      beds: "1 King Beds",
      capacity: "2 Guests",
      size: "45m²",
      amenities: "Breakfast Included"
    },
    {
      id: "2",
      type: "PREMIUM SUITE",
      name: "Superior Family Rooms",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80",
      beds: "Double Bed",
      capacity: "3 Guests",
      size: "52m²",
      amenities: "Breakfast Included"
    },
    {
      id: "3",
      type: "EXECUTIVE SUITE",
      name: "Double Suite Rooms",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80",
      beds: "2 King Beds",
      capacity: "4 Guests",
      size: "65m²",
      amenities: "Breakfast Included"
    }
  ];

  return (
    <div>
      {/* Hero Section with BookingForm */}
      <div className="relative h-screen w-full">
        <HeroSection />
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-6 lg:px-8 z-10">
          <BookingForm />
        </div>
      </div>


      <div className="px-6 md:px-12 lg:px-24 sm:px-6 bg-gradient-to-b from-white to-gray-50 pt-16 pb-24" id="rooms">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12 md:mb-16 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-1 bg-amber-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 pt-6">Our Elegant Accommodations</h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-xs sm:text-sm md:text-base">
              Experience luxury and comfort in our thoughtfully designed rooms and suites.
              Each space is crafted to provide the perfect balance of elegance and relaxation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="flex justify-center mt-12 sm:mt-16">
            <Link
              href="/rooms"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-amber-600 text-white text-sm sm:text-base rounded-full hover:bg-amber-700 transition-colors duration-300 flex items-center gap-2 shadow-md"
            >
              View All Accommodations
              <ChevronRight size={16} className="flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}