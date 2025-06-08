"use client";
import { useState, useEffect } from 'react';
import {
    BedDouble, Users, Maximize2, Coffee, Bath, Wifi, Utensils, Mountain, Star, MapPin,
    ChevronLeft, ChevronRight, Heart, Share2, Car, Dumbbell, Waves, Eye, X,
    Clock, Ban, CreditCard, Info, ChevronDown, ChevronUp, Check
} from "lucide-react";
import { toast } from 'sonner';
import BookingForm from './BookingForm';
import Navbar from './Navbar';

interface Room {
    id: string;
    roomName: string;
    roomType: string;
    beds: string;
    price: number;
    additionalBedCost?: number;
    amenities: string | string[];
    roomSize: string;
    photos?: string[];
    capacity?: string;
    view?: string;
    availability?: boolean;
    description?: string;
    features?: string[]; // Added to fix the error
}

interface RoomDetailPageProps {
    params: { id: string };
}

interface ImageGalleryProps {
    images: string[];
    roomName: string;
}

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};

const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    const iconMap = {
        wifi: <Wifi size={20} className="text-orange-600" />,
        food: <Utensils size={20} className="text-orange-600" />,
        parking: <Car size={20} className="text-orange-600" />,
        gym: <Dumbbell size={20} className="text-orange-600" />,
        pool: <Waves size={20} className="text-orange-600" />,
        spa: <Bath size={20} className="text-orange-600" />,
        view: <Mountain size={20} className="text-orange-600" />
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerFeature.includes(key)) return icon;
    }
    return <Coffee size={20} className="text-orange-600" />;
};



const ImageGallery = ({ images, roomName }: ImageGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    const navigate = (direction: any) => {
        setCurrentIndex(prev =>
            direction === 'next'
                ? (prev + 1) % images.length
                : (prev - 1 + images.length) % images.length
        );
    };

    if (showAllPhotos) {
        return (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-white text-xl font-semibold">{roomName} - All Photos</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="text-white hover:text-gray-300 p-2">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="relative h-[60vh] flex items-center justify-center">
                        <img
                            src={images[currentIndex]}
                            alt={`${roomName} photo ${currentIndex + 1}`}
                            className="object-contain w-full h-full"
                            onError={(e) => e.currentTarget.src = 'https://placehold.co/1000x700/FFA500/FFFFFF?text=Image+Error'}
                        />
                        <button onClick={() => navigate('prev')}
                            className="absolute left-4 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => navigate('next')}
                            className="absolute right-4 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    <div className="p-4 flex gap-2 overflow-x-auto">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-16 object-cover rounded cursor-pointer border-2 transition-all ${currentIndex === index ? 'border-orange-500' : 'border-transparent hover:border-orange-400'
                                    }`}
                                onClick={() => setCurrentIndex(index)}
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/200x160/FFA500/FFFFFF?text=Thumb'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-96 md:h-[500px]">
                <div className="relative">
                    <img
                        src={images[0] || 'https://placehold.co/1000x700/FFA500/FFFFFF?text=Room+Image'}
                        alt={roomName}
                        className="object-cover w-full h-full"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/1000x700/FFA500/FFFFFF?text=Image+Error'}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image}
                                alt={`${roomName} photo ${index + 2}`}
                                className="object-cover w-full h-full "
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/500x350/FFA500/FFFFFF?text=Image+Error'}
                            />
                            {index === 3 && images.length > 5 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all"
                                    onClick={() => setShowAllPhotos(true)}>
                                    <div className="text-center text-white">
                                        <Eye size={28} className="mx-auto mb-2" />
                                        <span className="font-semibold text-lg">+{images.length - 5} more</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:bg-white transition-all flex items-center gap-2 font-medium">
                <Eye size={16} />
                View all {images.length} photos
            </button>
        </div>
    );
};

const FavoritesManager = {
    get: () => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem('hotelFavorites');
        return saved ? JSON.parse(saved) : [];
    },

    add: (roomId: string) => {
        if (typeof window === 'undefined') return;
        const favorites = FavoritesManager.get();
        if (!favorites.includes(roomId)) {
            favorites.push(roomId);
            localStorage.setItem('hotelFavorites', JSON.stringify(favorites));
        }
    },

    remove: (roomId: string) => {
        if (typeof window === 'undefined') return;
        const favorites = FavoritesManager.get().filter((id: string) => id !== roomId);
        localStorage.setItem('hotelFavorites', JSON.stringify(favorites));
    },

    toggle: (roomId: string) => {
        const favorites = FavoritesManager.get();
        if (favorites.includes(roomId)) {
            FavoritesManager.remove(roomId);
            return false;
        } else {
            FavoritesManager.add(roomId);
            return true;
        }
    }
};

export default function RoomDetails({ params }: RoomDetailPageProps) {
    const [room, setRoom] = useState<Room | null>(null);
    const [allRooms, setAllRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/rooms', {
                    method: 'GET',
                });
                if (!response.ok) throw new Error('Failed to fetch rooms');

                const rooms: Room[] = await response.json();
                setAllRooms(rooms);

                const currentRoom = rooms.find(r => r.id === params.id);
                if (!currentRoom) throw new Error('Room not found');

                // Process amenities
                let amenities = [];
                if (typeof currentRoom.amenities === 'string') {
                    try {
                        amenities = JSON.parse(currentRoom.amenities);
                    } catch {
                        amenities = currentRoom.amenities.split(',').map(a => a.trim());
                    }
                } else {
                    amenities = currentRoom.amenities || [];
                }

                const defaultImages = [
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                ];

                const processedRoom = {
                    ...currentRoom,
                    photos: currentRoom.photos?.length ? currentRoom.photos : defaultImages,
                    features: amenities,
                    capacity: currentRoom.capacity || "2 Adults",
                    view: currentRoom.view || "Standard",
                    availability: currentRoom.availability !== false,
                    description: currentRoom.description || "Experience luxury and comfort in our thoughtfully designed room with modern amenities and elegant furnishings."
                };

                setRoom(processedRoom);
                setIsFavorited(FavoritesManager.get().includes(params.id));
            } catch (error) {
                toast.error('Failed to load room details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [params.id]);

    const handleFavoriteToggle = () => {
        const newState = FavoritesManager.toggle(params.id);
        setIsFavorited(newState);
        toast.success(newState ? 'Room added to favorites!' : 'Room removed from favorites');
    };

    const handleShare = async () => {
        const shareData = {
            title: `${room?.roomName} - Hotel Room`,
            text: `Check out this amazing ${room?.roomType} starting from ${formatPrice(room?.price || 0)} per night!`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toast.success('Room shared successfully!');
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Room link copied to clipboard!');
            }
        } catch (error) {
            toast.error('Failed to share room');
        }
    };

    if (loading) {
        return (
            <div>
                <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading room details...</p>
                    </div>
                </div>
            </div>

        );
    }

    if (!room) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <p className="text-gray-700 text-xl mb-6">Room not found</p>
                    <button onClick={() => window.history.back()}
                        className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const relatedRooms = allRooms.filter(r => r.id !== params.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {/* Enhanced Header */}
            <div className="bg-white/80 backdrop-blur-lg border-b border-orange-100  top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 py-4 lg:py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => window.history.back()}
                                className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                                <ChevronLeft size={24} className="text-gray-700" />
                            </button>
                            <div>
                                <nav className="text-xs sm:text-sm text-gray-500 mb-1">
                                    <span className="text-orange-600 font-medium">Home</span> /
                                    <span className="text-orange-600 font-medium"> Rooms</span> /
                                    <span className="text-gray-700"> {room.roomName}</span>
                                </nav>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    {room.roomName}
                                </h1>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 gap-2 sm:gap-0">
                                    <div className="flex items-center">
                                        <Star size={16} className="text-orange-400 fill-current mr-1" />
                                        <span className="font-semibold text-gray-800 text-sm sm:text-base">4.8</span>
                                        <span className="text-gray-500 ml-1 text-sm sm:text-base">(247 reviews)</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm sm:text-base">
                                        <MapPin size={14} className="text-orange-600 mr-1" />
                                        <span>Premium Location</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
                            <div className="w-full max-w-md lg:max-w-none">
                                <BookingForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Image Gallery */}
                <div className="mb-12">
                    <ImageGallery images={room.photos ?? []} roomName={room.roomName} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Room Type Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-semibold shadow-lg">
                            <Check size={16} className="mr-2" />
                            {room.roomType}
                        </div>

                        {/* Room Description */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Room</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{room.description}</p>
                        </div>

                        {/* Room Highlights */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { icon: BedDouble, label: room.beds, desc: "Bed Configuration" },
                                    { icon: Users, label: room.capacity, desc: "Maximum Guests" },
                                    { icon: Maximize2, label: room.roomSize, desc: "Room Area" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                                        <item.icon size={28} className="text-orange-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-lg">{item.label}</p>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Amenities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(room.features ?? []).slice(0, showAllAmenities ? (room.features?.length ?? 0) : 8).map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        {getFeatureIcon(feature)}
                                        <span className="text-gray-800 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {(room.features?.length ?? 0) > 8 && (
                                <button onClick={() => setShowAllAmenities(!showAllAmenities)}
                                    className="mt-6 px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center mx-auto">
                                    {showAllAmenities ? (
                                        <>Show Less <ChevronUp size={18} className="ml-2" /></>
                                    ) : (
                                        <>Show All {room.features?.length} Amenities <ChevronDown size={18} className="ml-2" /></>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Policies */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: Clock, title: "Check-in/out", desc: "3:00 PM - 12:00 PM" },
                                    { icon: Ban, title: "Cancellation", desc: "Free up to 24 hours" },
                                    { icon: CreditCard, title: "Payment", desc: "All major cards accepted" },
                                    { icon: Info, title: "Extras", desc: `Extra bed: ${formatPrice(room.additionalBedCost || 0)}` }
                                ].map((policy, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                                        <policy.icon size={24} className="text-orange-600 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                                            <p className="text-gray-600 text-sm">{policy.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
                            {/* Price Header */}
                            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center">
                                <div className="text-4xl font-bold mb-2">{formatPrice(room.price)}</div>
                                <div className="text-orange-100">per night</div>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Action Buttons */}
                                <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${room.availability
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={!room.availability}
                                    onClick={() => toast.success('Redirecting to booking...')}>
                                    {room.availability ? 'Book Now' : 'Unavailable'}
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={handleFavoriteToggle}
                                        className={`py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center ${isFavorited
                                            ? 'bg-red-50 text-red-600 border-2 border-red-200'
                                            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                                            }`}>
                                        <Heart size={18} className={`mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                                        {isFavorited ? 'Saved' : 'Save'}
                                    </button>

                                    <button onClick={handleShare}
                                        className="py-3 px-4 rounded-xl font-semibold bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center">
                                        <Share2 size={18} className="mr-2" />
                                        Share
                                    </button>
                                </div>

                                {/* Why Book Section */}
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
                                    <h3 className="font-bold text-orange-900 mb-3">Why Choose This Room?</h3>
                                    <ul className="text-sm text-orange-800 space-y-2">
                                        {['Premium location & amenities', 'Exceptional guest reviews', 'Modern comfort standards', 'Flexible booking options'].map((benefit, index) => (
                                            <li key={index} className="flex items-center">
                                                <Check size={14} className="text-orange-600 mr-2" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}