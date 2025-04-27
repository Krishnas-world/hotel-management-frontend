import HeroSection from "./HeroSection"
import BookingForm from "./BookingForm"
import RoomsSection from "./RoomsSection"
import AboutSection from "./AboutSection"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section with Booking Form */}
      <div className="relative h-screen w-full">
        <HeroSection />
        <div className="absolute bottom-0 w-full">
          <BookingForm />
        </div>
      </div>
      {/* Rooms Section */}
      <RoomsSection />
      {/* About Hotel Section */}
      <AboutSection />
    </div>
  )
}
