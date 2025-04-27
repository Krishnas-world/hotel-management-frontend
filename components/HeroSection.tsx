import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
        alt="Luxury Hotel Room"
        fill
        className="object-cover brightness-75"
        priority
      />
      {/* Top Navigation - LOGIN on right */}
      <div className="absolute top-0 right-0 w-full flex justify-end items-center p-4 z-10">
        <Button className="bg-red-600 hover:bg-red-700 rounded-md px-8 py-2 text-white">LOGIN</Button>
      </div>
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h3 className="text-xl md:text-2xl font-light mb-2">CANARA ROOMS AND RESORT</h3>
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          THE BEST LUXURY HOTEL IN
          <br />
          MANGALORE
        </h1>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6">DISCOVER MORE</Button>
      </div>
    </div>
  )
} 