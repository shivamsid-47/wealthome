"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Play, Clock, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import { VideoPlayer } from "@/components/video-player"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const videoTours = [
  {
    id: 1,
    title: "Luxury Modern Villa Tour",
    description: "Take a virtual tour through this stunning modern villa featuring panoramic ocean views, infinity pool, and state-of-the-art amenities.",
    duration: "5:32",
    views: "12.5K",
    thumbnail: "/images/property-1.jpg",
    videoSrc: "/videos/house-tour-1.mp4",
    category: "luxury",
    property: "COVA Home Realty",
    price: "$710,680",
  },
  {
    id: 2,
    title: "Downtown Penthouse Showcase",
    description: "Explore this breathtaking penthouse with floor-to-ceiling windows, designer interiors, and a private rooftop terrace.",
    duration: "4:15",
    views: "8.2K",
    thumbnail: "/images/property-2.jpg",
    videoSrc: "/videos/house-tour-2.mp4",
    category: "penthouse",
    property: "Exit Realty",
    price: "$630,440",
  },
  {
    id: 3,
    title: "Mediterranean Estate Walkthrough",
    description: "Discover this magnificent Mediterranean-style estate with vineyard views, wine cellar, and expansive outdoor living spaces.",
    duration: "7:48",
    views: "15.3K",
    thumbnail: "/images/property-3.jpg",
    videoSrc: "/videos/house-tour-1.mp4",
    category: "estate",
    property: "Modern Villa Estate",
    price: "$850,000",
  },
  {
    id: 4,
    title: "Cozy Family Home Tour",
    description: "Step inside this charming family home featuring open-concept living, modern kitchen, and a beautiful backyard perfect for entertaining.",
    duration: "3:45",
    views: "6.8K",
    thumbnail: "/images/property-4.jpg",
    videoSrc: "/videos/house-tour-2.mp4",
    category: "family",
    property: "Cozy Family Home",
    price: "$425,000",
  },
  {
    id: 5,
    title: "Beachfront Paradise Virtual Tour",
    description: "Experience oceanfront living in this stunning beachfront property with direct beach access, infinity pool, and tropical gardens.",
    duration: "6:20",
    views: "22.1K",
    thumbnail: "/images/buy-luxury-1.jpg",
    videoSrc: "/videos/house-tour-1.mp4",
    category: "luxury",
    property: "Mediterranean Villa",
    price: "$1,250,000",
  },
  {
    id: 6,
    title: "Modern City Condo Tour",
    description: "Tour this sleek urban condo with smart home technology, chef's kitchen, and stunning city skyline views.",
    duration: "4:05",
    views: "9.4K",
    thumbnail: "/images/buy-condo-1.jpg",
    videoSrc: "/videos/house-tour-2.mp4",
    category: "condo",
    property: "Modern City Condo",
    price: "$550,000",
  },
  {
    id: 7,
    title: "Countryside Estate Experience",
    description: "Immerse yourself in this sprawling countryside estate featuring rolling hills, horse stables, and a private vineyard.",
    duration: "8:15",
    views: "18.7K",
    thumbnail: "/images/buy-estate-1.jpg",
    videoSrc: "/videos/house-tour-1.mp4",
    category: "estate",
    property: "Countryside Estate",
    price: "$2,100,000",
  },
  {
    id: 8,
    title: "Suburban Dream Home Tour",
    description: "Walk through this perfect suburban family home with spacious rooms, beautiful landscaping, and a welcoming neighborhood.",
    duration: "4:30",
    views: "11.2K",
    thumbnail: "/images/buy-family-1.jpg",
    videoSrc: "/videos/house-tour-2.mp4",
    category: "family",
    property: "Classic Family Home",
    price: "$485,000",
  },
]

export default function VideoToursPage() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState("login")
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState("all")

  const openAuthModal = (tab) => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const filteredVideos = categoryFilter === "all" 
    ? videoTours 
    : videoTours.filter(video => video.category === categoryFilter)

  const VideoCard = ({ video }) => (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" onClick={() => setSelectedVideo(video)}>
      <div className="relative overflow-hidden">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          width={400}
          height={250}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-blue-600 ml-1" />
          </div>
        </div>
        <Badge className="absolute top-3 left-3 bg-blue-600">{video.category}</Badge>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            {video.views} views
          </div>
          <span className="text-blue-600 font-semibold">{video.price}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Wealthome</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/rent" className="text-gray-600 hover:text-blue-600 transition-colors">Rent</Link>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600 transition-colors">Sell</Link>
              <Link href="/buy" className="text-gray-600 hover:text-blue-600 transition-colors">Buy</Link>
              <Link href="/video-tours" className="text-blue-600 font-medium">Video Tours</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="ghost" onClick={() => openAuthModal("login")}>Login</Button>
                  <Button onClick={() => openAuthModal("register")}>Get Started</Button>
                </>
              )}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-600">Home</Link>
                <Link href="/rent" className="text-gray-600">Rent</Link>
                <Link href="/sell" className="text-gray-600">Sell</Link>
                <Link href="/buy" className="text-gray-600">Buy</Link>
                <Link href="/video-tours" className="text-blue-600 font-medium">Video Tours</Link>
                <Link href="/about" className="text-gray-600">About</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Virtual Property Tours</h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Experience our properties like never before with immersive video tours. 
            Explore every room, every detail, from the comfort of your home.
          </p>
          
          {/* Filter */}
          <div className="flex justify-center">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 bg-white text-gray-900">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="estate">Estate</SelectItem>
                <SelectItem value="family">Family Home</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Tour</h2>
          <div className="max-w-4xl mx-auto">
            <div className="h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
              <VideoPlayer
                src="/videos/house-tour-1.mp4"
                poster="/images/buy-luxury-1.jpg"
                title="Beachfront Paradise - Featured Virtual Tour"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Beachfront Paradise Virtual Tour</h3>
              <p className="text-gray-600">Experience oceanfront living in this stunning beachfront property</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">All Video Tours</h2>
            <p className="text-gray-600">{filteredVideos.length} tours available</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedVideo && (
            <div>
              <div className="h-64 md:h-96">
                <VideoPlayer
                  src={selectedVideo.videoSrc}
                  poster={selectedVideo.thumbnail}
                  title={selectedVideo.title}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                    <p className="text-gray-600">{selectedVideo.description}</p>
                  </div>
                  <Badge className="bg-blue-600">{selectedVideo.category}</Badge>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedVideo.duration}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedVideo.views} views
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{selectedVideo.property}</p>
                    <p className="text-xl font-bold text-blue-600">{selectedVideo.price}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button className="flex-1">View Property Details</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">Schedule a Visit</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold">Wealthome</span>
              </div>
              <p className="text-gray-400">Find your perfect home with us.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
                <li><Link href="/video-tours" className="hover:text-white transition-colors">Video Tours</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/buy" className="hover:text-white transition-colors">Buy Property</Link></li>
                <li><Link href="/rent" className="hover:text-white transition-colors">Rent Property</Link></li>
                <li><Link href="/sell" className="hover:text-white transition-colors">Sell Property</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@wealthome.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wealthome. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  )
}
