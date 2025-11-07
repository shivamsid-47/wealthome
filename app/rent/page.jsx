"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Home, Bed, Bath, Square, MapPin, Filter, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/lib/auth"

const rentalProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: "$2,500",
    period: "/month",
    address: "123 Main Street, Downtown, NY 10001",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "/images/rental-1.jpg",
    badge: "Available Now",
    type: "Apartment",
  },
  {
    id: 2,
    title: "Cozy Studio Loft",
    price: "$1,800",
    period: "/month",
    address: "456 Park Avenue, Midtown, NY 10017",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/images/rental-2.jpg",
    badge: "Popular",
    type: "Studio",
  },
  {
    id: 3,
    title: "Spacious Family Home",
    price: "$3,800",
    period: "/month",
    address: "789 Oak Street, Suburbs, NY 10458",
    beds: 4,
    baths: 3,
    sqft: 2400,
    image: "/images/rental-3.jpg",
    badge: "Pet Friendly",
    type: "House",
  },
  {
    id: 4,
    title: "Luxury Penthouse Suite",
    price: "$5,200",
    period: "/month",
    address: "321 Elite Boulevard, Upper East, NY 10021",
    beds: 3,
    baths: 3,
    sqft: 1900,
    image: "/images/rental-4.jpg",
    badge: "Luxury",
    type: "Penthouse",
  },
]

export default function RentPage() {
  const { user } = useAuth()
  const [priceRange, setPriceRange] = useState([500, 6000])
  const [selectedType, setSelectedType] = useState("all")

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
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link href="/rent" className="text-blue-600 font-medium">
                Rent
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600">
                Sell
              </Link>
              <Link href="/buy" className="text-gray-600 hover:text-blue-600">
                Buy
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Home className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Rental</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover quality rental properties that feel like home
            </p>

            {/* Search Bar */}
            <Card className="p-4 md:p-6 bg-white text-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="Location..." className="md:col-span-2" />
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters & Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Property Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      min={500}
                      max={6000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Bedrooms</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Button key={num} variant="outline" size="sm">
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </Card>
            </div>

            {/* Property Listings */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Available Rentals</h2>
                <p className="text-gray-600">{rentalProperties.length} properties found</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {rentalProperties.map((property) => (
                  <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-600">{property.badge}</Badge>
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {property.price}
                          <span className="text-sm text-gray-500">{property.period}</span>
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        {property.address}
                      </p>
                      <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-600">
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
                      <Button className="w-full mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
