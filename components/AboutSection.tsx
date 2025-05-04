"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import YouTube from "react-youtube"

// Define types for YouTube player
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
}

export default function AboutSection() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const onPlayerReady = (event: YouTubeEvent) => {
    if (isPlaying) {
      event.target.playVideo();
    }
    if (isMuted) {
      event.target.mute();
    }
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const getOpts = () => ({
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 4,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: isMuted ? 1 : 0,
      playsinline: 1,
    },
  });

  return (
    <section className="sm:py-10 md:py-10 px-6 md:px-12 lg:px-24 sm:px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative order-1 md:order-1">
            <div className="relative rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative w-full aspect-video bg-black">
                <YouTube
                  videoId="mJVuZiK9a6I"
                  opts={getOpts()}
                  onReady={onPlayerReady}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <Button 
                    onClick={togglePlay} 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  
                  <Button 
                    onClick={toggleMute} 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-amber-500 opacity-10 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="order-2 md:order-2 pl-0 md:pl-6 lg:pl-10">
            <div className="border-l-4 border-amber-500 pl-4 mb-6">
              <span className="text-amber-500 font-medium text-sm tracking-wider">PREMIUM HOSPITALITY</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2 leading-tight">
                LUXURY LIVING IN MANGALORE
              </h3>
            </div>

            <div className="text-gray-700 mb-8">
              <p className="mb-4">
                Experience unparalleled luxury in the heart of coastal Karnataka. Our hotel combines elegant design with premium amenities for a truly exceptional stay.
              </p>
              <p className="text-sm text-gray-500 italic">
                Where comfort meets sophistication.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-amber-500 font-bold text-xl md:text-2xl">120+</div>
                <div className="text-xs text-gray-500">Luxury Rooms</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-amber-500 font-bold text-xl md:text-2xl">24/7</div>
                <div className="text-xs text-gray-500">Room Service</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-amber-500 font-bold text-xl md:text-2xl">4.9</div>
                <div className="text-xs text-gray-500">Guest Rating</div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}