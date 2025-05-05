"use client";
import {
    Wifi,
    Utensils,
    Coffee,
    Gamepad2,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";


export const Facilities = () => {
    return (
        <div>
            <section className="flex flex-col items-center justify-center bg-gray-100 py-16 px-6 md:px-12 lg:px-24 text-gray-800">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        World-Class Facilities
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From cozy rooms to unforgettable experiences, enjoy all the comforts and luxuries of a premier resort — all in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {FACILITIES.map((facility, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 border rounded-xl hover:shadow-xl transition-shadow bg-white"
                        >
                            <div className="bg-[#f59e0b]/10 text-[#f59e0b] p-4 rounded-full mb-4">
                                {facility.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-black mb-2 text-center">
                                {facility.title}
                            </h3>
                            <p className="text-sm text-center text-gray-600">
                                {facility.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="facilities" className="bg-white py-20 px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                    Other Facilities
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        From fitness to food, every aspect of your stay is curated for maximum comfort and luxury.
                    </p>
                </div>

                {/* Facilities List */}
                <div className="space-y-24">
                    {FacilityImage.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"
                                    } items-center gap-10`}
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={600}
                                        height={400}
                                        className="rounded-xl object-cover shadow-xl"
                                    />
                                </div>

                                {/* Text */}
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                                        {item.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm md:text-base">
                                        Learn More <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};


const FacilityImage = [
    {
        title: "Gym Training Grounds",
        description:
            "Elevate your fitness with our modern gym equipped with cardio, weights, and personal training assistance — all in a luxurious air-conditioned environment.",
        image: "https://images.unsplash.com/photo-1651340048718-6185c00f1833?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Indoor Swimming Pool",
        description:
            "Dive into tranquility in our temperature-controlled indoor pool, open year-round with attentive staff and spa-side seating.",
        image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "The Restaurant Center",
        description:
            "Enjoy world-class cuisine in our elegant restaurant, offering multi-cuisine delicacies crafted by expert chefs using local ingredients.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];


const FACILITIES = [
    {
        title: "Free Wi-Fi",
        desc: "Stay connected throughout your stay with high-speed internet access.",
        icon: <Wifi size={28} />,
    },
    {
        title: "Multi-Cuisine Restaurant",
        desc: "Enjoy Indian and continental delicacies made by expert chefs.",
        icon: <Utensils size={28} />,
    },
    {
        title: "Coffee Bar",
        desc: "Unwind with premium coffee and scenic views by the lounge.",
        icon: <Coffee size={28} />,
    },
    {
        title: "Gaming Zone",
        desc: "Enjoy a variety of games and activities for all ages.",
        icon: <Gamepad2 size={28} />,
    },
];