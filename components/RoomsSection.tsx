import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export default function RoomsSection() {
  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-8">CHECKING OUR ROOMS & SUITES</h2>
        <p className="max-w-3xl mx-auto text-gray-600 uppercase text-sm tracking-wide">
          PRODUCTIVITY THROUGH OPTIMAL INFORMATION SHARING RATHER THAN ACCURATE EXPERTISE. LEVERAGE ALL PROGRESSIVE
          RESOURCES RATHER THAN RESOURCE-CENTRIC.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Room Card 1 */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 flex items-center">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <div className="bg-blue-500 rounded-full p-1 -ml-2">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="Room Icon"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Delux Family Room"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="text-blue-500 font-medium mb-2">LUXURY ROOM</div>
            <CardTitle className="mb-4">Delux Family Rooms</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Bed Icon" width={20} height={20} />
                <span className="text-sm text-gray-500">2 King Bed</span>
              </div>
              <Link href="#" className="text-blue-500">
                <ChevronRight />
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* Room Card 2 */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Superior Family Room"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="text-blue-500 font-medium mb-2">LUXURY ROOM</div>
            <CardTitle className="mb-4">Superior Family Rooms</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Bed Icon" width={20} height={20} />
                <span className="text-sm text-gray-500">2 King Bed</span>
              </div>
              <Link href="#" className="text-blue-500">
                <ChevronRight />
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* Room Card 3 */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Double Suite Room"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="text-blue-500 font-medium mb-2">LUXURY ROOM</div>
            <CardTitle className="mb-4">Double Suite Rooms</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Bed Icon" width={20} height={20} />
                <span className="text-sm text-gray-500">2 King Bed</span>
              </div>
              <Link href="#" className="text-blue-500">
                <ChevronRight />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 