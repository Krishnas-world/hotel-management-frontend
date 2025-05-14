"use client"
import React from 'react'
import { MobileMenu } from './MobileMenu'
import { DashboardNav } from './DashboardNav'
import { UserProfile } from './UserProfile'
import { UpcomingStay } from './UpcomingStay'
import { BookingOverview } from './BookingOverview'
import { ExperiencesList } from './ExperiencesList'

export default function Dashboard() {
  return (
    <div>
      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-white p-4 md:hidden">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-medium text-[#3F3121]">Canara Resorts</span>
          </div>
          <MobileMenu />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <DashboardNav />

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 lg:p-10">
            <div className="mx-auto max-w-7xl">
              {/* Welcome Section */}
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="text-2xl font-medium text-[#3F3121] md:text-3xl">Welcome back, John</h1>
                  <p className="text-[#7D7259]">Your upcoming stay is just around the corner</p>
                </div>
                <UserProfile />
              </div>

              {/* Main Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <UpcomingStay />
                </div>
                <div>
                  <BookingOverview />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <ExperiencesList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
