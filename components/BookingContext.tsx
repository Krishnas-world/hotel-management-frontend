// BookingContext.jsx
import { createContext, useContext, useState } from "react";

// Global booking state context
const BookingContext = createContext({
  bookingData: {
    dateRange: undefined,
    rooms: "",
    guests: "",
    guestCounts: { Adults: 2, Children: 0, Infants: 0 }
  },
  updateBookingData: (data:any) => {},
  clearBookingData: () => {}
});

// Booking provider component
export function BookingProvider({ children }:any) {
  const [bookingData, setBookingData] = useState({
    dateRange: undefined,
    rooms: "",
    guests: "2 Adults",
    guestCounts: { Adults: 2, Children: 0, Infants: 0 }
  });

  const updateBookingData = (newData:any) => {
    setBookingData(prev => ({ ...prev, ...newData }));
  };

  const clearBookingData = () => {
    setBookingData({
      dateRange: undefined,
      rooms: "",
      guests: "2 Adults",
      guestCounts: { Adults: 2, Children: 0, Infants: 0 }
    });
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, clearBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

// Hook to use booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};