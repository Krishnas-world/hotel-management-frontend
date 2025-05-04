import HeroSection from "./HeroSection"
import RoomsSection from "./RoomsSection"
import AboutSection from "./AboutSection"
import BookingForm from "./BookingForm"
import { Footer } from "./Footer"
import { Facilities } from "./Facilities"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Rooms Section */}
      <RoomsSection />
      {/* About Hotel Section */}
      <AboutSection />
      {/* Facilities */}
      <Facilities />
      {/* Footer Section */}
      <Footer />
    </div>
  )
}
