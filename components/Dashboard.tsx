// components/Dashboard.tsx
"use client"
import React, { useState } from 'react'
import {
  Home,
  Calendar,
  Compass,
  Utensils,
  MessageSquare,
  Settings,
  LogOut,
  HelpCircle,
  Menu,
  X,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link';

// Helper function to get initials
const getInitials = (name: string) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Mobile Menu Component (Modified to receive isOpen, setIsOpen, user, and handleLogout)
const MobileMenu = ({ isOpen, setIsOpen, user, handleLogout }: any) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'experiences', label: 'Experiences', icon: Compass },
    { id: 'dining', label: 'Dining', icon: Utensils },
    { id: 'support', label: 'Support', icon: MessageSquare },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
    // For logout, we'll use a special onClick handler
    // { id: 'logout', label: 'Logout', icon: LogOut }, // No href needed here
  ];

  if (!isOpen) return null;

  const displayUserName = user?.fullName || 'Guest';
  const userInitials = user?.fullName ? getInitials(user.fullName) : 'G';

  return (
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{userInitials}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{displayUserName}</span>
                <span className="text-xs text-amber-600 dark:text-amber-400">{user ? 'Premium Member' : 'Guest'}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Main Menu
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === 'dashboard' ? '/dashboard' : `#`} // Assuming dashboard is the only one with a direct link
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-amber-500" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-amber-200 dark:border-gray-700">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Account
              </div>
              {bottomNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={'/'}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${item.id === 'logout'
                      ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400'
                    }`}
                >
                  <item.icon className={`h-5 w-5 ${item.id === 'logout' ? 'text-red-500' : 'text-amber-500'
                    }`} />
                  {item.label}
                </Link>
              ))}
              {/* Logout button with actual handler */}
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 text-red-500" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Navigation Sidebar (Modified to receive user and handleLogout)
const DashboardNav = ({ user, handleLogout }: any) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, href: '/bookings' },
    { id: 'experiences', label: 'Experiences', icon: Compass, href: '/experiences' },
    { id: 'dining', label: 'Dining', icon: Utensils, href: '/dining' },
    { id: 'support', label: 'Support', icon: MessageSquare, href: '/support' },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, href: '/help' },
    // { id: 'logout', label: 'Logout', icon: LogOut, href: '/logout' }, // No href needed here
  ];

  const displayUserName = user?.fullName || 'Guest';
  const userInitials = user?.fullName ? getInitials(user.fullName) : 'G';

  return (
    <aside className="hidden w-64 md:flex md:flex-col md:fixed md:inset-y-0 md:z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-r border-amber-200/50 dark:border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-amber-200/50 dark:border-gray-700">
        <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <div>
          <Link href='/'><h1 className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Canara Resorts
          </h1>
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-400">Guest Portal</p>
        </div>
      </div>

      {/* Navigation Container */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Main Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Main Menu
            </div>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group ${activeItem === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-sm'
                  }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${activeItem === item.id ? '' : 'group-hover:scale-110'
                  }`} />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-amber-200/50 dark:border-gray-700">
          <div className="space-y-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Account
            </div>
            {bottomNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group ${activeItem === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : item.id === 'logout'
                      ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-sm'
                  }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${activeItem === item.id ? '' : 'group-hover:scale-110'
                  }`} />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
            {/* Logout button with actual handler */}
            <button
              onClick={() => handleLogout()} // Call the passed logout function
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700`}
            >
              <LogOut className={`h-5 w-5 flex-shrink-0 transition-transform duration-200`} />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-amber-200/50 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-amber-200/50 dark:border-gray-600 shadow-sm">
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold text-sm">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{displayUserName}</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user ? 'Premium Member' : 'Guest'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Dashboard Components (UserProfile, UpcomingStay, BookingOverview, ExperiencesList are unchanged)
const UserProfile = ({ user }: any) => {
  const displayUserName = user?.fullName || 'Guest';
  const userInitials = user?.fullName ? getInitials(user.fullName) : 'G';

  return (
    <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-700 shadow-sm">
      <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">{userInitials}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{displayUserName}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{user ? 'Premium Member' : 'Guest'}</p>
      </div>
    </div>
  );
};

const UpcomingStay = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Stay</h3>
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">Beachfront Villa</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Goa, India</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Dec 20-25, 2024</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl py-3 font-medium hover:shadow-lg transition-all duration-200">
        View Details
      </button>
    </div>
  </div>
);

const BookingOverview = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Overview</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Check-in</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">Dec 20, 2024</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Check-out</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">Dec 25, 2024</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Guests</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">2 Adults</span>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-amber-200/50 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-900 dark:text-white">Total</span>
        <span className="text-lg font-bold text-amber-600">₹45,000</span>
      </div>
    </div>
  </div>
);

const ExperiencesList = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Experiences</h3>
      <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">View All</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { title: 'Sunset Cruise', price: '₹2,500', rating: 4.8, image: '🌅' },
        { title: 'Spa Treatment', price: '₹3,200', rating: 4.9, image: '💆' },
        { title: 'Beach Yoga', price: '₹800', rating: 4.7, image: '🧘' },
      ].map((experience, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50 dark:border-gray-700 hover:shadow-md transition-all duration-200">
          <div className="text-2xl mb-2">{experience.image}</div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">{experience.title}</h4>
          <div className="flex justify-between items-center">
            <span className="text-amber-600 font-semibold">{experience.price}</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{experience.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


// Main Dashboard Component
export default function Dashboard({ userData, handleLogout }: { userData: any, handleLogout: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derive user-specific display data
  const displayUserName = userData?.fullName || 'Guest';
  // You might want to use userData directly in the children instead of passing parts of it.
  // For clarity, I'm passing userData to child components.

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
      {/* Mobile Header (visible on small screens) */}
      <div className="flex items-center justify-between border-b border-amber-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm p-4 md:hidden shadow-sm relative z-30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Canara Resorts
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-amber-500 border-none text-black rounded-full h-9 w-9 hover:bg-amber-600 hover:shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center z-50 relative"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu (conditionally rendered at a higher level) */}
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} user={userData} handleLogout={handleLogout} />

      <div className="flex">
        {/* Sidebar (visible on medium and larger screens) */}
        <DashboardNav user={userData} handleLogout={handleLogout} />

        {/* Main Content - Add left margin to account for fixed sidebar */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                  Welcome back,
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent ml-2">
                    {displayUserName}
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                  Your upcoming stay is just around the corner
                </p>
              </div>
              <UserProfile user={userData} />
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Stays</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loyalty Points</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">2,450</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <div className="p-6">
                  <UpcomingStay />
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div className="p-6">
                  <BookingOverview />
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="p-6">
                  <ExperiencesList />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="group p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-400 transition-all duration-200 hover:shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Booking</span>
                </div>
              </button>

              <button className="group p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-400 transition-all duration-200 hover:shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-200">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Support</span>
                </div>
              </button>

              <button className="group p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-400 transition-all duration-200 hover:shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-110 transition-transform duration-200">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">History</span>
                </div>
              </button>

              <button className="group p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-400 transition-all duration-200 hover:shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-200">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}