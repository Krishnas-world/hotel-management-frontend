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
  X,
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";
import Navbar from "@/components/Navbar";

interface BackendRoom {
  id: string;
  roomName: string;
  roomType: string;
  beds: string;
  price: number;
  additionalBedCost?: number;
  amenities: string | string[]; // Can be a JSON string or an array
  roomSize: string;
  photos?: string[]; // Changed to an array of strings
  capacity?: string;
  view?: string;
  availability?: boolean;
}

interface TransformedRoom {
  id: string;
  name: string;
  type: string;
  image: string; // Now a single string URL
  beds: string;
  capacity: string;
  size: string;
  amenities: string;
  price: number;
  additionalBedCost: number;
  view: string;
  features: string[];
  availability: boolean;
}

interface RoomType {
  label: string;
  value: string;
}

interface Filters {
  breakfast: boolean;
  wifi: boolean;
  oceanView: boolean;
  balcony: boolean;
  spa: boolean;
  pool: boolean;
}

// Room type mappings to match your backend
const roomTypes: RoomType[] = [
  { label: "All Rooms", value: "all" },
  { label: "Suites", value: "Suite" },
  { label: "Premium", value: "Premium" },
  { label: "Luxury", value: "Luxury" },
  { label: "Classic", value: "Classic" },
  { label: "Standard", value: "Standard" },
  { label: "Deluxe", value: "Deluxe" }
];

const RoomsPage: React.FC = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<number[]>([5000, 50000]);
  const [activeRoomType, setActiveRoomType] = useState<string>("all");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    breakfast: false,
    wifi: false,
    oceanView: false,
    balcony: false,
    spa: false,
    pool: false
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rooms, setRooms] = useState<TransformedRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<TransformedRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/rooms', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const roomsData: BackendRoom[] = await response.json();
        console.log(roomsData);
        // Transform the data to match frontend expectations
        const transformedRooms: TransformedRoom[] = roomsData.map((room: BackendRoom) => {
          let parsedAmenities: string[] = [];
          if (typeof room.amenities === 'string') {
            try {
              parsedAmenities = JSON.parse(room.amenities);
              if (!Array.isArray(parsedAmenities)) {
                parsedAmenities = [room.amenities]; // Fallback if parsed but not an array
              }
            } catch (e) {
              // If parsing fails, treat as a comma-separated string
              parsedAmenities = room.amenities.split(",").map((a: string) => a.trim());
            }
          } else if (Array.isArray(room.amenities)) {
            parsedAmenities = room.amenities;
          }

          const defaultImage = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

          return {
            id: room.id,
            name: room.roomName,
            type: room.roomType,
            image: room.photos && room.photos.length > 0 ? room.photos[0] : defaultImage, // Use first photo or default
            beds: room.beds,
            capacity: room.capacity || "2 Adults", // Default if not provided
            size: room.roomSize || "N/A",
            amenities: parsedAmenities.join(", "), // Join for display in amenities string
            price: room.price,
            additionalBedCost: parseFloat(room.additionalBedCost?.toString() || "0"), // Ensure it's a number
            view: room.view || "Standard", // Default view
            features: parsedAmenities, // Use the parsed array for filtering
            availability: room.availability !== false // Default to available
          };
        });


        setRooms(transformedRooms);
        setFilteredRooms(transformedRooms);

        // Update price range based on actual room prices
        if (transformedRooms.length > 0) {
          const prices = transformedRooms.map((room: TransformedRoom) => room.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([Math.floor(minPrice / 1000) * 1000, Math.ceil(maxPrice / 1000) * 1000]);
        }

      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Apply filters
  useEffect(() => {
    if (rooms.length === 0) return;

    let results = rooms.filter((room: TransformedRoom) => {
      // Price filter
      if (room.price < priceRange[0] || room.price > priceRange[1]) return false;

      // Room type filter
      if (activeRoomType !== "all" && !room.type.toLowerCase().includes(activeRoomType.toLowerCase())) return false;

      // Amenities filters
      const features = room.features.map((f: string) => f.toLowerCase());
      if (filters.breakfast && !features.some((f: string) => f.includes("breakfast") || f.includes("meal"))) return false;
      if (filters.wifi && !features.some((f: string) => f.includes("wifi") || f.includes("internet"))) return false;
      if (filters.oceanView && !features.some((f: string) => f.includes("ocean") || f.includes("sea") || f.includes("view"))) return false;
      if (filters.balcony && !features.some((f: string) => f.includes("balcony") || f.includes("terrace"))) return false;
      if (filters.spa && !features.some((f: string) => f.includes("spa") || f.includes("wellness"))) return false;
      if (filters.pool && !features.some((f: string) => f.includes("pool") || f.includes("swimming"))) return false;

      // Search query
      if (searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !room.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !room.amenities.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    setFilteredRooms(results);
  }, [priceRange, activeRoomType, filters, searchQuery, rooms]);

  const handleCheckboxChange = (filter: keyof Filters): void => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const clearFilters = (): void => {
    if (rooms.length > 0) {
      const prices = rooms.map((room: TransformedRoom) => room.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([Math.floor(minPrice / 1000) * 1000, Math.ceil(maxPrice / 1000) * 1000]);
    }
    setActiveRoomType("all");
    setFilters({
      breakfast: false,
      wifi: false,
      oceanView: false,
      balcony: false,
      spa: false,
      pool: false
    });
    setSearchQuery("");
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
  };

  if (loading) {
    return (
      <div>
        <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading room details...</p>
                </div>
            </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-red-600 mb-4">Error loading rooms: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
                Premium Comfort
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Modern Amenities
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Exceptional Service
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
                    defaultValue={priceRange}
                    min={rooms.length > 0 ? Math.min(...rooms.map((r: TransformedRoom) => r.price)) : 5000}
                    max={rooms.length > 0 ? Math.max(...rooms.map((r: TransformedRoom) => r.price)) : 50000}
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
                  {roomTypes.map((type: RoomType) => (
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
                      Meals/Breakfast
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
                      WiFi
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
                      Premium View
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
                      Spa/Wellness
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pool"
                      checked={filters.pool}
                      onCheckedChange={() => handleCheckboxChange('pool')}
                    />
                    <label
                      htmlFor="pool"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      <Mountain className="h-4 w-4 mr-2 text-amber-500" />
                      Pool Access
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
                    Choose from our selection of comfortable accommodations
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

              {/* No Results Message */}
              {filteredRooms.length === 0 && !loading && (
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
                      {filteredRooms.map((room: TransformedRoom) => (
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
                      {filteredRooms.map((room: TransformedRoom) => (
                        <div key={room.id} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md">
                          <div className="md:w-1/3 relative">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full h-48 md:h-full object-cover"
                              onError={handleImageError}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-amber-600 hover:bg-amber-600">{room.type}</Badge>
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                              <h3 className="text-xl font-serif mb-2">{room.name}</h3>
                              <div className="flex flex-wrap gap-3 mb-2">
                                {room.features.slice(0, 4).map((feature: string, index: number) => (
                                  <span key={index} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                    {feature}
                                  </span>
                                ))}
                                {room.features.length > 4 && (
                                  <span className="text-sm text-gray-500">+{room.features.length - 4} more</span>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-6">
                              <div>
                                <span className="text-gray-500 flex items-center">
                                  <Bed className="h-4 w-4 mr-1 text-amber-500" />
                                  Beds
                                </span>
                                <span className="font-medium">{room.beds || 'Standard'}</span>
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
                                  <Coffee className="h-4 w-4 mr-1 text-amber-500" />
                                  Size
                                </span>
                                <span className="font-medium">{room.size}</span>
                              </div>
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                              <div>
                                <span className="text-2xl font-medium text-amber-600">{formatPrice(room.price)}</span>
                                <span className="text-sm text-gray-500">/night</span>
                                {room.additionalBedCost > 0 && (
                                  <div className="text-xs text-gray-500">
                                    +{formatPrice(room.additionalBedCost)} per extra bed
                                  </div>
                                )}
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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;