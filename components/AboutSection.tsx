import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <div className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 flex items-center">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <div className="bg-blue-500 rounded-full p-1 -ml-2">
              <Image
                src="/placeholder.svg?height=30&width=30"
                alt="Hotel Icon"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Luxury Hotel Room"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
        <div className="pl-0 md:pl-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <div className="text-blue-500 font-medium mb-2">LUXURY SUITE COMFORT</div>
            <h2 className="text-2xl font-bold mb-4">
              LUXURY BEST HOTEL IN CITY
              <br />
              MANGALORE, KARNATAKA
            </h2>
          </div>
          <p className="text-gray-600 mb-8">
            Significantly Streamlined Cross-platform Intellectual Capital After Marketing Model. Appropriately Create
            Extensive Interfaces After Maintainable Architectures. Distinctly Facilitate Timely Ideas Before
            Integrated Consultants. Collaboratively Enhance Visionary Scenarios Economically.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2">READ MORE</Button>
        </div>
      </div>
    </div>
  )
} 