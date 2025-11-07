"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X, Heart, Bed, Bath, Square, Star, ArrowRight, MapPin, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import { ImageGallery } from "@/components/image-gallery"
import { VideoPlayer } from "@/components/video-player"

const properties = [
  {
    id: 1,
    title: "COVA Home Realty",
    price: "$710,680",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    beds: 3,
    baths: 2,
    sqft: 1430,
    image: "/images/property-1.jpg",
    badge: "New",
    featured: true,
    gallery: [
      "/images/property-1.jpg",
      "/images/modern-kitchen.jpg",
      "/images/luxury-bathroom.jpg",
      "/images/bedroom-modern.jpg",
      "/images/living-room-luxury.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [
      { src: "/videos/house-tour-1.mp4", title: "Virtual Tour" },
      { src: "/videos/house-tour-2.mp4", title: "Neighborhood Overview" },
    ],
  },
  {
    id: 2,
    title: "Exit Realty",
    price: "$630,440",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    beds: 5,
    baths: 2,
    sqft: 1680,
    image: "/images/property-2.jpg",
    badge: "Hot",
    featured: false,
    gallery: [
      "/images/property-2.jpg",
      "/images/luxury-home-1.jpg",
      "/images/modern-kitchen.jpg",
      "/images/pool-area.jpg",
    ],
    videos: [{ src: "/videos/house-tour-1.mp4", title: "Property Walkthrough" }],
  },
  {
    id: 3,
    title: "Modern Villa Estate",
    price: "$850,000",
    address: "456 Oak Avenue, Beverly Hills, CA 90210",
    beds: 4,
    baths: 3,
    sqft: 2100,
    image: "/images/property-3.jpg",
    badge: "Luxury",
    featured: true,
    gallery: [
      "/images/property-3.jpg",
      "/images/luxury-home-2.jpg",
      "/images/luxury-bathroom.jpg",
      "/images/bedroom-modern.jpg",
      "/images/pool-area.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [
      { src: "/videos/house-tour-1.mp4", title: "Luxury Tour" },
      { src: "/videos/house-tour-2.mp4", title: "Amenities Overview" },
    ],
  },
  {
    id: 4,
    title: "Cozy Family Home",
    price: "$425,000",
    address: "789 Maple Street, Austin, TX 78701",
    beds: 3,
    baths: 2,
    sqft: 1250,
    image: "/images/property-4.jpg",
    badge: "Deal",
    featured: false,
    gallery: [
      "/images/property-4.jpg",
      "/images/modern-kitchen.jpg",
      "/images/living-room-luxury.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [{ src: "/videos/house-tour-1.mp4", title: "Family Home Tour" }],
  },
]

const testimonials = [
  {
    id: 1,
    name: "Chris Traeger",
    rating: 5,
    image: "/images/customer-1.jpg",
    background: "/images/property-1.jpg",
    review: "Amazing service! Found my dream home in just 2 weeks.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    image: "/images/customer-2.jpg",
    background: "/images/property-2.jpg",
    review: "Professional team that made buying stress-free.",
  },
  {
    id: 3,
    name: "Mike Chen",
    rating: 4,
    image: "/images/customer-3.jpg",
    background: "/images/property-3.jpg",
    review: "Great experience selling our property quickly.",
  },
]

export default function WealthomeWebsite() {
  const { user, updateUser } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState("login")
  const [favorites, setFavorites] = useState(user?.favorites.map(Number) || [])
  const [viewMode, setViewMode] = useState("grid")
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef(null)

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]

    setFavorites(newFavorites)

    if (user) {
      updateUser({ favorites: newFavorites.map(String) })
    }
  }

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  const openAuthModal = (tab) => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const PropertyCard = ({ property }) => (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">{property.badge}</Badge>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-all duration-200 ${
            favorites.includes(property.id) ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => {
            if (!user) {
              openAuthModal("login")
              return
            }
            toggleFavorite(property.id)
          }}
        >
          <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-2xl font-bold text-blue-600">{property.price}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors cursor-pointer">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </p>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.beds} Bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.baths} Bath
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.sqft} sqft
            </div>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={() => setSelectedProperty(property)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Wealthome</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/rent" className="text-gray-600 hover:text-blue-600 transition-colors">
                Rent
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sell
              </Link>
              <Link href="/buy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Buy
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="ghost" onClick={() => openAuthModal("login")}>
                    Login
                  </Button>
                  <Button onClick={() => openAuthModal("register")}>Get Started</Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-blue-600 font-medium">
                  Home
                </Link>
                <Link href="/rent" className="text-gray-600">
                  Rent
                </Link>
                <Link href="/sell" className="text-gray-600">
                  Sell
                </Link>
                <Link href="/buy" className="text-gray-600">
                  Buy
                </Link>
                <Link href="/about" className="text-gray-600">
                  About
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                      <UserMenu />
                    </div>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={() => openAuthModal("login")}>
                        Login
                      </Button>
                      <Button onClick={() => openAuthModal("register")}>Get Started</Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Find a place where you can be yourself</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                If you're looking for a place where you can be yourself, don't give up. Keep searching until you find a
                place that feels like home.
              </p>

              {/* Enhanced Search Bar */}
              <Card className="p-6 bg-white text-gray-900">
                <div className="grid md:grid-cols-4 gap-4">
                  <Select defaultValue="buy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Location..." className="md:col-span-2" />
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </Card>
            </div>

            <div className="relative">
              <Image
                src="/images/hero-house.jpg"
                alt="Beautiful home"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
              <p className="text-gray-600 text-lg">Discover our handpicked selection of premium properties</p>
            </div>
            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                Explore More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/renovation.jpg"
                alt="Quality home renovation"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">We Specialize in Quality Home Renovation</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Looking to renovate your home to reflect your style and personality? Look no further than our team of
                experts who specialize in quality home renovations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Smart Home Technology",
                  "Beautiful Scene Around",
                  "Exceptional Lifestyle",
                  "Complete 24/7 Security",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Video Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Virtual Property Tours</h2>
            <p className="text-gray-600 text-lg">
              Experience our properties like never before with immersive video tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="h-64 md:h-80">
              <VideoPlayer
                src="/videos/house-tour-1.mp4"
                poster="/images/property-1.jpg"
                title="Luxury Home Virtual Tour"
              />
            </div>
            <div className="h-64 md:h-80">
              <VideoPlayer
                src="/videos/house-tour-2.mp4"
                poster="/images/property-2.jpg"
                title="Modern Villa Showcase"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Video Tours
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-2">Our Customers</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Clients Say</h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md -ml-2 first:ml-0"
                >
                  <Image
                    src={`/images/customer-${(index % 3) + 1}.jpg`}
                    alt={`Customer ${index + 1}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative overflow-hidden h-80 group cursor-pointer">
                <Image
                  src={testimonial.background || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <div className="flex items-center mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm">{testimonial.rating}.0</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-200">{testimonial.review}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold">Wealthome</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner in finding the perfect home. We make real estate simple, transparent, and
                accessible for everyone.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <div className="space-y-3">
                {["Home", "Buy", "Sell", "Rent"].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <div className="space-y-3">
                {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wealthome. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Property Details Modal */}
      {selectedProperty && (
        <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="space-y-6">
              <ImageGallery images={selectedProperty.gallery} title={selectedProperty.title} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProperty.title}</h2>
                  <p className="text-3xl font-bold text-blue-600 mb-4">{selectedProperty.price}</p>
                  <p className="text-gray-600 mb-6 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedProperty.address}
                  </p>

                  <div className="flex space-x-6 mb-6">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{selectedProperty.beds} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{selectedProperty.baths} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{selectedProperty.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Video Tours */}
                  {selectedProperty.videos && selectedProperty.videos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Video Tours</h3>
                      <div className="space-y-4">
                        {selectedProperty.videos.map((video, index) => (
                          <div key={index} className="h-48">
                            <VideoPlayer src={video.src} poster={selectedProperty.image} title={video.title} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    Schedule a Tour
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Contact Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                    onClick={() => {
                      if (!user) {
                        openAuthModal("login")
                        return
                      }
                      toggleFavorite(selectedProperty.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        favorites.includes(selectedProperty.id) ? "fill-current text-red-500" : ""
                      }`}
                    />
                    {favorites.includes(selectedProperty.id) ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </div>
  )
}
