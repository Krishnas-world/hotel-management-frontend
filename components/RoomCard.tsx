// components/RoomCard.tsx

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Users, Maximize2, Coffee, ChevronRight } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type Room = {
  id: string;
  name: string;
  type: string;
  image: string;
  beds: string;
  capacity: string;
  size: string;
  amenities: string;
};

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <Card className="border-0 rounded-2xl shadow-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl hover:-translate-y-1 p-0">
      {/* Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
        <div className="bg-amber-600 text-white text-xs py-1 px-2 sm:px-3 rounded-full">
          {room.type}
        </div>
      </div>

      <Image
        src={room.image}
        alt={room.name}
        width={500}
        height={300}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />

      {/* Room Content */}
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="text-amber-600 font-medium text-xs sm:text-sm mb-1 sm:mb-2">{room.type}</div>
        <CardTitle className="text-xl sm:text-2xl mb-3 sm:mb-4 font-serif">{room.name}</CardTitle>

        <div className="flex flex-wrap gap-y-2 mb-4 sm:mb-6">
          <Feature icon={<BedDouble size={16} />} label={room.beds} />
          <Feature icon={<Users size={16} />} label={room.capacity} />
          <Feature icon={<Maximize2 size={16} />} label={room.size} />
          <Feature icon={<Coffee size={16} />} label={room.amenities} />
        </div>

        <Link
          href={`/rooms/${room.id}`}
          className="flex justify-between items-center mt-2 sm:mt-4 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors duration-300"
        >
          <span className="text-sm sm:text-base font-medium">View Details</span>
          <ChevronRight size={16} />
        </Link>
      </CardContent>
    </Card>
  );
};

const Feature: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 w-1/2">
    <div className="text-amber-500 flex-shrink-0">{icon}</div>
    <span className="text-xs sm:text-sm text-gray-600 truncate">{label}</span>
  </div>
);
