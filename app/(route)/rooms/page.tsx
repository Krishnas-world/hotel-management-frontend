"use client"
import { useState, useEffect } from "react";
import { RoomCard } from "@/components/RoomCard";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Grid,
  List,
  Search,
  Calendar,
  Users,
  Bed,
  Bath,
  Coffee,
  Wifi,
  Utensils,
  Mountain,
  Filter,
  SlidersHorizontal,
  X
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

// Sample room data
const roomsData = [
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    type: "Premium Room",
    image: "/images/rooms/deluxe-suite.jpg",
    beds: "1 King Bed",
    capacity: "2 Adults",
    size: "32 sq.m",
    amenities: "Breakfast Included",
    price: 12500,
    view: "Ocean",
    features: ["Breakfast", "WiFi", "Pool Access", "Ocean View", "Balcony"],
    availability: true
  },
  {
    id: "premium-king",
    name: "Premium King Room",
    type: "Luxury Room",
    image: "/images/rooms/premium-king.jpg",
    beds: "1 King Bed",
    capacity: "2 Adults",
    size: "28 sq.m",
    amenities: "WiFi + Breakfast",
    price: 9800,
    view: "Garden",
    features: ["Breakfast", "WiFi", "Garden View", "Balcony"],
    availability: true
  },
  {
    id: "family-suite",
    name: "Family Suite",
    type: "Suite",
    image: "/images/rooms/family-suite.jpg",
    beds: "1 King + 2 Single",
    capacity: "4 Adults",
    size: "45 sq.m",
    amenities: "All Inclusive",
    price: 18500,
    view: "Ocean",
    features: ["All Meals", "WiFi", "Pool Access", "Ocean View", "Balcony", "Family Area"],
    availability: true
  },
  {
    id: "standard-twin",
    name: "Standard Twin Room",
    type: "Classic Room",
    image: "/images/rooms/standard-twin.jpg",
    beds: "2 Double Beds",
    capacity: "2 Adults",
    size: "24 sq.m",
    amenities: "WiFi Included",
    price: 7500,
    view: "City",
    features: ["WiFi", "City View"],
    availability: true
  },
  {
    id: "honeymoon-suite",
    name: "Honeymoon Suite",
    type: "Premium Suite",
    image: "/images/rooms/honeymoon-suite.jpg",
    beds: "1 King Bed",
    capacity: "2 Adults",
    size: "38 sq.m",
    amenities: "Spa + Breakfast",
    price: 16500,
    view: "Ocean",
    features: ["Breakfast", "WiFi", "Pool Access", "Private Spa", "Ocean View", "Private Balcony"],
    availability: true
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    type: "Business Class",
    image: "/images/rooms/executive-suite.jpg",
    beds: "1 King Bed",
    capacity: "2 Adults",
    size: "40 sq.m",
    amenities: "Business Services",
    price: 15000,
    view: "City",
    features: ["Breakfast", "WiFi", "Business Center Access", "Meeting Room", "City View"],
    availability: true
  }
];

const roomTypes = [
  { label: "All Rooms", value: "all" },
  { label: "Suites", value: "Suite" },
  { label: "Premium", value: "Premium" },
  { label: "Luxury", value: "Luxury" },
  { label: "Classic", value: "Classic" },
  { label: "Business", value: "Business" }
];

const RoomsPage = () => {
  const [activeView, setActiveView] = useState("grid");
  const [priceRange, setPriceRange] = useState([5000, 20000]);
  const [activeRoomType, setActiveRoomType] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    breakfast: false,
    wifi: false,
    oceanView: false,
    balcony: false,
    spa: false
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(roomsData);

  // Apply filters
  useEffect(() => {
    let results = roomsData.filter(room => {
      // Price filter
      if (room.price < priceRange[0] || room.price > priceRange[1]) return false;

      // Room type filter
      if (activeRoomType !== "all" && !room.type.includes(activeRoomType)) return false;

      // Amenities filters
      if (filters.breakfast && !room.features.includes("Breakfast")) return false;
      if (filters.wifi && !room.features.includes("WiFi")) return false;
      if (filters.oceanView && !room.features.includes("Ocean View")) return false;
      if (filters.balcony && !room.features.includes("Balcony")) return false;
      if (filters.spa && !room.features.includes("Private Spa")) return false;

      // Search query
      if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !room.type.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    setFilteredRooms(results);
  }, [priceRange, activeRoomType, filters, searchQuery]);

  const handleCheckboxChange = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const clearFilters = () => {
    setPriceRange([5000, 20000]);
    setActiveRoomType("all");
    setFilters({
      breakfast: false,
      wifi: false,
      oceanView: false,
      balcony: false,
      spa: false
    });
    setSearchQuery("");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {/* Room image behind gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1592229505726-ca121723b8ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxurious Room"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Gradient overlay (fading from left to right) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-700/80 via-amber-600/70 to-transparent" />

        {/* Text content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <h1 className="text-3xl md:text-5xl font-serif mb-2 md:mb-4">Our Luxurious Rooms</h1>
          <p className="text-sm md:text-lg max-w-xl mb-6">
            Experience comfort beyond comparison with our thoughtfully designed accommodations
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Ocean Views
            </Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Premium Amenities
            </Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Luxury Experience
            </Badge>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mx-4 md:mx-auto max-w-6xl -mt-10 relative z-20">
        <BookingForm />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Options
              </span>
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showMobileFilters ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-lg shadow-md`}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-800 p-0 h-auto"
                onClick={clearFilters}
              >
                Clear all
              </Button>
              {/* Mobile Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div>
              <Label htmlFor="search" className="text-sm font-medium mb-1 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search rooms..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-1 block">Price Range</Label>
              <div className="px-2">
                <Slider
                  defaultValue={[5000, 20000]}
                  min={5000}
                  max={20000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Room Type</Label>
              <div className="space-y-1">
                {roomTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={activeRoomType === type.value ? "default" : "outline"}
                    size="sm"
                    className={`mr-2 mb-2 ${activeRoomType === type.value ? 'bg-amber-600 hover:bg-amber-700' : 'text-gray-700'}`}
                    onClick={() => setActiveRoomType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Amenities</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="breakfast"
                    checked={filters.breakfast}
                    onCheckedChange={() => handleCheckboxChange('breakfast')}
                  />
                  <label
                    htmlFor="breakfast"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Utensils className="h-4 w-4 mr-2 text-amber-500" />
                    Breakfast Included
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={filters.wifi}
                    onCheckedChange={() => handleCheckboxChange('wifi')}
                  />
                  <label
                    htmlFor="wifi"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Wifi className="h-4 w-4 mr-2 text-amber-500" />
                    Free WiFi
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="oceanView"
                    checked={filters.oceanView}
                    onCheckedChange={() => handleCheckboxChange('oceanView')}
                  />
                  <label
                    htmlFor="oceanView"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Mountain className="h-4 w-4 mr-2 text-amber-500" />
                    Ocean View
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="balcony"
                    checked={filters.balcony}
                    onCheckedChange={() => handleCheckboxChange('balcony')}
                  />
                  <label
                    htmlFor="balcony"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Coffee className="h-4 w-4 mr-2 text-amber-500" />
                    Balcony/Terrace
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="spa"
                    checked={filters.spa}
                    onCheckedChange={() => handleCheckboxChange('spa')}
                  />
                  <label
                    htmlFor="spa"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Bath className="h-4 w-4 mr-2 text-amber-500" />
                    Spa Access
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-serif">
                  {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Available
                </h2>
                <p className="text-sm text-gray-500">
                  for your selected dates
                </p>
              </div>

              <div className="flex items-center mt-4 sm:mt-0 self-end">
                <span className="mr-2 text-sm text-gray-500">View:</span>
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none ${activeView === 'grid' ? 'bg-amber-50 text-amber-600' : ''}`}
                    onClick={() => setActiveView('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none ${activeView === 'list' ? 'bg-amber-50 text-amber-600' : ''}`}
                    onClick={() => setActiveView('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Room Banner */}
            {filteredRooms.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 sm:p-6 rounded-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-1/3 lg:w-1/2">
                  <div
                    className="h-full bg-cover bg-center rounded-r-xl"
                    style={{ backgroundImage: "url('/images/rooms/featured-room.jpg')" }}
                  />
                </div>
                <div className="relative z-10 max-w-md">
                  <Badge className="bg-amber-600 hover:bg-amber-600 mb-2">Featured Offer</Badge>
                  <h3 className="text-xl sm:text-2xl font-serif mb-2">10% Off on Our Premium Suites</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Book any of our premium suites for a minimum of 3 nights and get 10% off on your entire stay.
                  </p>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Book Now
                  </Button>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {filteredRooms.length === 0 && (
              <div className="bg-amber-50 p-8 rounded-lg text-center">
                <Bed className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                <h3 className="text-xl font-medium mb-2">No rooms match your criteria</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or changing your search terms.</p>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-600 hover:bg-amber-100"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Room Listings */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsContent value="all" className="mt-0">
                {activeView === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRooms.map(room => (
                      <div key={room.id} className="relative">
                        <RoomCard room={room} />
                        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md text-amber-600 font-medium text-sm">
                          {formatPrice(room.price)}
                          <span className="text-xs text-gray-500">/night</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredRooms.map(room => (
                      <div key={room.id} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md">
                        <div className="md:w-1/3 relative">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-amber-600 hover:bg-amber-600">{room.type}</Badge>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-xl font-serif mb-2">{room.name}</h3>
                            <div className="flex flex-wrap gap-3 mb-2">
                              {room.features.map((feature, index) => (
                                <span key={index} className="flex items-center text-sm text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6">
                            <div>
                              <span className="text-gray-500 flex items-center">
                                <Bed className="h-4 w-4 mr-1 text-amber-500" />
                                Beds
                              </span>
                              <span className="font-medium">{room.beds}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 flex items-center">
                                <Users className="h-4 w-4 mr-1 text-amber-500" />
                                Capacity
                              </span>
                              <span className="font-medium">{room.capacity}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 flex items-center">
                                <Mountain className="h-4 w-4 mr-1 text-amber-500" />
                                View
                              </span>
                              <span className="font-medium">{room.view}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 flex items-center">
                                <Coffee className="h-4 w-4 mr-1 text-amber-500" />
                                Amenities
                              </span>
                              <span className="font-medium">{room.amenities}</span>
                            </div>
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-medium text-amber-600">{formatPrice(room.price)}</span>
                              <span className="text-sm text-gray-500">/night</span>
                            </div>
                            <Button className="bg-amber-600 hover:bg-amber-700">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="suites" className="mt-0">
                <div className={activeView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {filteredRooms
                    .filter(room => room.type.includes('Suite'))
                    .map(room => (
                      <RoomCard key={room.id} room={room} />
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="premium" className="mt-0">
                <div className={activeView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {filteredRooms
                    .filter(room => room.type.includes('Premium'))
                    .map(room => (
                      <RoomCard key={room.id} room={room} />
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="standard" className="mt-0">
                <div className={activeView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {filteredRooms
                    .filter(room => room.type.includes('Classic'))
                    .map(room => (
                      <RoomCard key={room.id} room={room} />
                    ))
                  }
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;