import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function BookingOverview() {
  const bookings = {
    upcoming: 1,
    completed: 2,
    total: 3,
  }

  return (
    <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6">
      <h2 className="text-lg font-medium text-[#3F3121]">My Bookings</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#F4EFE6] p-4">
          <div className="text-3xl font-medium text-[#9C6D3E]">{bookings.upcoming}</div>
          <div className="mt-1 text-sm text-[#7D7259]">Upcoming</div>
        </div>
        <div className="rounded-xl bg-[#F4EFE6] p-4">
          <div className="text-3xl font-medium text-[#9C6D3E]">{bookings.completed}</div>
          <div className="mt-1 text-sm text-[#7D7259]">Completed</div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#E5E1D8] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-[#3F3121]">Total Stays</div>
            <div className="text-2xl font-medium text-[#9C6D3E]">{bookings.total}</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-[#9C6D3E] hover:bg-[#F4EFE6]">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Button variant="link" className="mt-4 h-auto w-full justify-between p-0 text-[#9C6D3E]">
        <span>View all bookings</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
