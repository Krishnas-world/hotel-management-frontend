"use client"
import Navbar from '@/components/Navbar';
import RoomDetail from '@/components/RoomDetail'
import { useParams } from 'next/navigation'
export default function page() {
    const params = useParams()
    const roomId = params.roomId as string;
    console.log("Room ID:", roomId);

    return (
        <div>
            <Navbar />
            <RoomDetail params={{ id: roomId }} />
        </div>
    )
}
