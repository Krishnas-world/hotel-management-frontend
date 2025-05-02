"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import BookingForm from "./BookingForm";

export default function HeroSection() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      title: "LUXURY ACCOMMODATIONS",
      subtitle: "Experience the pinnacle of comfort and elegance",
    },
    {
      image:
        "https://images.unsplash.com/photo-1561501878-aabd62634533?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "STUNNING OCEAN VIEWS",
      subtitle: "Wake up to breathtaking panoramas of the Arabian Sea",
    },
    {
      image:
        "https://images.unsplash.com/photo-1584132869994-873f9363a562?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVnfDB8fHx8fA%3D%3D",
      title: "EXQUISITE DINING",
      subtitle: "Savor culinary masterpieces from world-class chefs",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 500);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(true);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true);
    }, 500);
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>{" "}
        {/* Made overlay darker */}
      </div>
      <Navbar />
      <div className="absolute inset-0 flex flex-col items-center z-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white px-4 md:px-6 lg:px-8 pt-20 pb-32">
          <div
            className={`max-w-5xl mx-auto transition-opacity duration-700 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-8 opacity-90">
              <div className="bg-amber-500 h-1 w-20 mx-auto mb-6"></div>
              <h3 className="text-sm md:text-base font-normal tracking-widest text-gray-200 mb-4 uppercase"></h3>
            </div>
            <div className="mb-10">
              {" "}
              {/* Adjusted margin */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto drop-shadow-md">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              {" "}
              {/* Adjusted gap */}
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition-all duration-300 text-base font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {" "}
                {/* Rounded full, reduced py */}
                BOOK NOW
              </Button>
              <Button className="bg-transparent hover:bg-white/10 text-white border border-white hover:border-amber-500 hover:text-amber-500 px-8 py-3 rounded-full transition-all duration-300 text-base font-medium tracking-wider">
                {" "}
                {/* Rounded full, reduced py, improved hover color */}
                EXPLORE AMENITIES
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-6 lg:px-8 z-20">
          {" "}
          {/* Adjusted z-index */}
          {/* BookingForm component will be rendered here */}
          <BookingForm />
        </div>
      </div>
      {/* Slider Navigation Dots */}{" "}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-4 z-10">
        {" "}
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-amber-500 w-10"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
             {" "}
      </div>
      {/* Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-all duration-300 backdrop-blur-sm" // Slightly increased background opacity
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} /> {/* Slightly larger icons */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-all duration-300 backdrop-blur-sm" // Slightly increased background opacity
        aria-label="Next slide"
      >
        <ChevronRight size={28} /> {/* Slightly larger icons */}
      </button>
    </div>
  );
}
