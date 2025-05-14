import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function ExperiencesList() {
  const experiences = [
    {
      id: "1",
      title: "River Kayaking Adventure",
      description: "Explore the serene backwaters with our guided kayaking tour.",
      image: "/placeholder.svg?height=200&width=300",
      duration: "2 hours",
      price: "₹1,200 per person",
    },
    {
      id: "2",
      title: "Spice Plantation Tour",
      description: "Discover the aromatic world of spices in our guided plantation walk.",
      image: "/placeholder.svg?height=200&width=300",
      duration: "3 hours",
      price: "₹900 per person",
    },
    {
      id: "3",
      title: "Sunset Riverside Yoga",
      description: "Rejuvenate with yoga sessions by the peaceful riverside.",
      image: "/placeholder.svg?height=200&width=300",
      duration: "1 hour",
      price: "₹800 per person",
    },
  ]

  return (
    <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#3F3121]">Recommended Experiences</h2>
        <Button variant="ghost" size="sm" className="text-[#9C6D3E] hover:bg-[#F4EFE6]">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="overflow-hidden rounded-xl border border-[#E5E1D8] bg-white transition-all hover:shadow-md"
          >
            <div className="relative h-48">
              <img
                src={experience.image || "/placeholder.svg"}
                alt={experience.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-[#3F3121]">{experience.title}</h3>
              <p className="mt-1 text-sm text-[#7D7259]">{experience.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#7D7259]">{experience.duration}</div>
                  <div className="text-sm font-medium text-[#9C6D3E]">{experience.price}</div>
                </div>
                <Button size="sm" className="bg-[#9C6D3E] text-white hover:bg-[#8A5F36]">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
