"use client"
import Dashboard from '@/components/Dashboard'
import React, { useEffect, useState} from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/user', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log("User Data:", data);
        if (response.ok && data && data.userData && data.userData.email) {
          setUser(data.userData);
          console.log("User is authenticated.", data.userData.email);
        } else {
          setUser(null);
          console.log("User is not authenticated.");
          toast.error("You are not authenticated. Please log in.");
          router.push('/login'); 
        }
      } catch (error) {
        console.error("Page: Error checking auth status:", error);
        setUser(null);
        toast.error("Failed to connect to the server or authenticate.");
        router.push('/login'); 
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]); 
const handleLogout = async () => {
    console.log("Attempting to log out...");
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Logout successful.");
        toast.success("Logout Successful")
        setUser(null);
        window.location.href = '/login'; // Redirect to login page after logout
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
        toast.error("Logout Failed")
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      toast.error("Network error during logout")
    }
  };


  if (loading) {
    return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return null;
  }

  return (
    <div>
      <Dashboard userData={user} handleLogout={handleLogout} />
    </div>
  )
}