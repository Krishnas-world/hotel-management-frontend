"use client";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Send
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 border-b border-gray-700 pb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-white text-3xl font-bold mb-3 flex items-center">
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 h-8 w-2 mr-3 rounded-full"></span>
              Canara Resorts
            </h2>
            <p className="text-sm max-w-md">
              Escape to paradise with our luxury beachfront rooms and warm Indian hospitality.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h3 className="text-white font-semibold mb-4">Subscribe for Special Offers</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-r-md flex items-center transition-colors duration-300"
              >
                <Send size={16} className="mr-2" /> Join
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="bg-amber-500 h-1 w-6 mr-2 rounded-full"></span>
              About Us
            </h3>
            <p className="text-sm">
              Nestled on the pristine shores of Mangalore, Canara Resorts offers a perfect blend of luxury, 
              comfort and authentic coastal experiences. Our resort is designed to provide an unforgettable 
              retreat for travelers seeking both relaxation and adventure.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" aria-label="Facebook" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" aria-label="Instagram" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" aria-label="Twitter" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="bg-orange-500 h-1 w-6 mr-2 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Rooms & Suites</span>
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Dining</span>
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Amenities</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="bg-amber-500 h-1 w-6 mr-2 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-amber-400 flex-shrink-0" />
                <span>Canara Resorts, Beach Road, Mangalore, Karnataka, India – 575001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <Link href="tel:+919000000000" className="hover:text-white transition-colors">
                  +91 9000 000 000
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <Link href="mailto:info@canararesorts.in" className="hover:text-white transition-colors">
                  info@canararesorts.in
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-amber-400 flex-shrink-0" />
                <span>24/7 Guest Services</span>
              </li>
            </ul>
          </div>

          {/* Gallery */}
            <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="bg-orange-500 h-1 w-6 mr-2 rounded-full"></span>
              Resort Gallery
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
              "https://images.unsplash.com/photo-1689729738920-edea97589328?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1551530417-b5695ae086e5?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1668435528344-b70cedd6df88?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1630999295881-e00725e1de45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1631048730670-ff5cd0d08f15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              ].map((url, index) => (
              <Link href="/gallery" key={index} className="overflow-hidden rounded-md group block">
                <img 
                src={url} 
                alt={`Resort gallery thumbnail ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </Link>
              ))}
            </div>
            <Link 
              href="/gallery" 
              className="mt-3 text-sm flex items-center text-amber-400 hover:text-amber-300"
            >
              View Full Gallery
              <ChevronRight size={14} className="ml-1" />
            </Link>
            </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 flex flex-col">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">Find Us</h3>
          <div className="w-full h-64 sm:h-72 overflow-hidden rounded-lg border border-gray-700 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.019123456789!2d74.85603231483012!3d12.9172308908924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b123456789%3A0xabcdef123456789!2sFake%20Location!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Canara Resorts Location"
            ></iframe>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Canara Resorts. All rights reserved. | 
            <span className="ml-1">Designed with ❤️ in 🇮🇳</span>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}