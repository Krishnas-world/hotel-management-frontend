import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react"

export function UpcomingStay() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white">
      <div className="relative h-48 w-full">
        <img src="/placeholder.svg?height=300&width=800" alt="Resort view" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="inline-block rounded-lg bg-[#9C6D3E]/90 px-3 py-1 text-xs font-medium">Upcoming Stay</div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-medium text-[#3F3121]">Riverside Villa</h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-[#7D7259]">
            <Calendar className="h-4 w-4 text-[#9C6D3E]" />
            <span>June 15 - June 20, 2025</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#7D7259]">
            <Users className="h-4 w-4 text-[#9C6D3E]" />
            <span>2 Adults</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#7D7259]">
            <MapPin className="h-4 w-4 text-[#9C6D3E]" />
            <span>Riverside View</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="bg-[#9C6D3E] text-white hover:bg-[#8A5F36]">Manage Booking</Button>
          <Button variant="outline" className="border-[#E5E1D8] text-[#3F3121] hover:bg-[#F4EFE6] hover:text-[#9C6D3E]">
            View Details
          </Button>
        </div>

        <div className="mt-6 rounded-xl bg-[#F4EFE6] p-4">
          <h3 className="text-sm font-medium text-[#3F3121]">Your Check-in Details</h3>
          <p className="mt-1 text-sm text-[#7D7259]">
            Check-in time starts at 2:00 PM. Early check-in available upon request.
          </p>
          <Button variant="link" className="mt-2 h-auto p-0 text-[#9C6D3E]">
            <span>View check-in instructions</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
