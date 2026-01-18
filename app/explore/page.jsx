"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Search, Menu, X, Heart, Bed, Bath, Square, MapPin, Filter, Grid, List, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import Loading from "./loading"

const allProperties = [
  {
    id: 1,
    title: "COVA Home Realty",
    price: 710680,
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    beds: 3,
    baths: 2,
    sqft: 1430,
    image: "/images/property-1.jpg",
    badge: "New",
    type: "house",
    status: "sale",
  },
  {
    id: 2,
    title: "Exit Realty",
    price: 630440,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    beds: 5,
    baths: 2,
    sqft: 1680,
    image: "/images/property-2.jpg",
    badge: "Hot",
    type: "house",
    status: "sale",
  },
  {
    id: 3,
    title: "Modern Villa Estate",
    price: 850000,
    address: "456 Oak Avenue, Beverly Hills, CA 90210",
    beds: 4,
    baths: 3,
    sqft: 2100,
    image: "/images/property-3.jpg",
    badge: "Luxury",
    type: "villa",
    status: "sale",
  },
  {
    id: 4,
    title: "Cozy Family Home",
    price: 425000,
    address: "789 Maple Street, Austin, TX 78701",
    beds: 3,
    baths: 2,
    sqft: 1250,
    image: "/images/property-4.jpg",
    badge: "Deal",
    type: "house",
    status: "sale",
  },
  {
    id: 5,
    title: "Downtown Luxury Apartment",
    price: 3500,
    address: "123 Main St, New York, NY 10001",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "/images/rental-1.jpg",
    badge: "Featured",
    type: "apartment",
    status: "rent",
  },
  {
    id: 6,
    title: "Cozy Studio Loft",
    price: 1800,
    address: "456 Arts District, Los Angeles, CA 90013",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/images/rental-2.jpg",
    badge: "Popular",
    type: "apartment",
    status: "rent",
  },
  {
    id: 7,
    title: "Suburban Family Home",
    price: 2800,
    address: "789 Oak Lane, Suburban Heights, TX 75001",
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: "/images/rental-3.jpg",
    badge: "Family",
    type: "house",
    status: "rent",
  },
  {
    id: 8,
    title: "Luxury Penthouse Suite",
    price: 8500,
    address: "1 Skyline Tower, Miami, FL 33101",
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "/images/rental-4.jpg",
    badge: "Premium",
    type: "penthouse",
    status: "rent",
  },
  {
    id: 9,
    title: "Mediterranean Villa",
    price: 1250000,
    address: "100 Ocean Drive, Malibu, CA 90265",
    beds: 5,
    baths: 4,
    sqft: 3500,
    image: "/images/buy-luxury-1.jpg",
    badge: "Exclusive",
    type: "villa",
    status: "sale",
  },
  {
    id: 10,
    title: "Classic Family Home",
    price: 485000,
    address: "222 Maple Ave, Denver, CO 80202",
    beds: 4,
    baths: 2,
    sqft: 1800,
    image: "/images/buy-family-1.jpg",
    badge: "Best Value",
    type: "house",
    status: "sale",
  },
  {
    id: 11,
    title: "Modern City Condo",
    price: 550000,
    address: "500 Urban Plaza, Seattle, WA 98101",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/images/buy-condo-1.jpg",
    badge: "New",
    type: "condo",
    status: "sale",
  },
  {
    id: 12,
    title: "Countryside Estate",
    price: 2100000,
    address: "1 Vineyard Road, Napa Valley, CA 94558",
    beds: 6,
    baths: 5,
    sqft: 5000,
    image: "/images/buy-estate-1.jpg",
    badge: "Luxury",
    type: "estate",
    status: "sale",
  },
]

export default function ExplorePage() {
  const { user, updateUser } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState("login")
  const [favorites, setFavorites] = useState(user?.favorites?.map(Number) || [])
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2500000])
  const [bedsFilter, setBedsFilter] = useState("any")
  const [bathsFilter, setBathsFilter] = useState("any")
  const [sortBy, setSortBy] = useState("newest")

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter((fav) => fav !== id) 
      : [...favorites, id]
    setFavorites(newFavorites)
    if (user) {
      updateUser({ favorites: newFavorites.map(String) })
    }
  }

  const openAuthModal = (tab) => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  // Filter properties
  const filteredProperties = allProperties.filter(property => {
    if (searchQuery && !property.address.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (propertyType !== "all" && property.type !== propertyType) return false
    if (statusFilter !== "all" && property.status !== statusFilter) return false
    if (bedsFilter !== "any" && property.beds < parseInt(bedsFilter)) return false
    if (bathsFilter !== "any" && property.baths < parseInt(bathsFilter)) return false
    
    const price = property.status === "rent" ? property.price * 100 : property.price
    if (price < priceRange[0] || price > priceRange[1]) return false
    
    return true
  }).sort((a, b) => {
    switch(sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "beds": return b.beds - a.beds
      case "sqft": return b.sqft - a.sqft
      default: return b.id - a.id
    }
  })

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
        <Badge className="absolute top-3 left-20 bg-gray-800 hover:bg-gray-900">
          {property.status === "rent" ? "For Rent" : "For Sale"}
        </Badge>
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
          <span className="text-2xl font-bold text-blue-600">
            {property.status === "rent" ? `$${property.price.toLocaleString()}/mo` : `$${property.price.toLocaleString()}`}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors cursor-pointer">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{property.address}</span>
        </p>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.beds}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.baths}
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.sqft}
            </div>
          </div>
        </div>
        <Button className="w-full mt-4">View Details</Button>
      </CardContent>
    </Card>
  )

  return (
    <Suspense fallback={<Loading />}>
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
                <Link href="/explore" className="text-blue-600 font-medium">Explore</Link>
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
                  <Link href="/explore" className="text-blue-600 font-medium">Explore</Link>
                  <Link href="/about" className="text-gray-600">About</Link>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 pb-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Explore All Properties</h1>
            <p className="text-blue-100 text-lg text-center mb-8">
              Browse through our extensive collection of properties for sale and rent
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-4 bg-white text-gray-900">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search by location or property name..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <section className="bg-white border-b py-6">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bedsFilter} onValueChange={setBedsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Beds</SelectItem>
                    <SelectItem value="1">1+ Beds</SelectItem>
                    <SelectItem value="2">2+ Beds</SelectItem>
                    <SelectItem value="3">3+ Beds</SelectItem>
                    <SelectItem value="4">4+ Beds</SelectItem>
                    <SelectItem value="5">5+ Beds</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bathsFilter} onValueChange={setBathsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Baths</SelectItem>
                    <SelectItem value="1">1+ Baths</SelectItem>
                    <SelectItem value="2">2+ Baths</SelectItem>
                    <SelectItem value="3">3+ Baths</SelectItem>
                    <SelectItem value="4">4+ Baths</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="beds">Most Bedrooms</SelectItem>
                    <SelectItem value="sqft">Largest</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSearchQuery("")
                  setPropertyType("all")
                  setStatusFilter("all")
                  setBedsFilter("any")
                  setBathsFilter("any")
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Properties Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties
              </p>
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
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">No properties found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setPropertyType("all")
                  setStatusFilter("all")
                  setBedsFilter("any")
                  setBathsFilter("any")
                }}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>

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
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
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
    </Suspense>
  )
}
