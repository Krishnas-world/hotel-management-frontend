
import {
    Facebook,
    Instagram,
    Twitter,
    MapPin,
    Phone,
    Mail,
  } from "lucide-react";
  import Link from "next/link";
  
  export const Footer = () => {
    return (
      <footer className="bg-black text-gray-300 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Blue Lagoon Resort</h2>
            <p className="text-sm">
              Escape to paradise with our luxury beachfront rooms and warm Indian hospitality.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/rooms" className="hover:text-white">Rooms</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Blue Lagoon Beach Road, Goa, India – 403001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <Link href="tel:+919876543210" className="hover:text-white">+91 98765 43210</Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <Link href="mailto:info@bluelagoonresort.in" className="hover:text-white">info@bluelagoonresort.in</Link>
              </li>
            </ul>
          </div>
  
          {/* Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-white"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-white"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs sm:text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Blue Lagoon Resort. All rights reserved. | Designed in 🇮🇳
        </div>
      </footer>
    );
  };
  