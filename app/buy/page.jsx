"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Search, TrendingUp, Shield, Heart, Bed, Bath, Square, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveSearch } from "@/components/interactive-search"

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Modern Villa",
    price: "$1,250,000",
    address: "456 Ocean Drive, Miami, FL 33139",
    beds: 5,
    baths: 4,
    sqft: 3500,
    image: "/images/buy-luxury-1.jpg",
    badge: "New Listing",
    type: "luxury",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: "$550,000",
    address: "789 Maple Street, Austin, TX 78701",
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: "/images/buy-family-1.jpg",
    badge: "Great Value",
    type: "family",
  },
  {
    id: 3,
    title: "Downtown Condo",
    price: "$425,000",
    address: "321 City Center, Seattle, WA 98101",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "/images/buy-condo-1.jpg",
    badge: "Hot Deal",
    type: "condo",
  },
  {
    id: 4,
    title: "Countryside Estate",
    price: "$2,100,000",
    address: "654 Valley Road, Napa, CA 94558",
    beds: 6,
    baths: 5,
    sqft: 5200,
    image: "/images/buy-estate-1.jpg",
    badge: "Premium",
    type: "luxury",
  },
]

export default function BuyPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProperties =
    activeTab === "all" ? featuredProperties : featuredProperties.filter((p) => p.type === activeTab)

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
              <Link href="/rent" className="text-gray-600 hover:text-blue-600">
                Rent
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600">
                Sell
              </Link>
              <Link href="/buy" className="text-blue-600 font-medium">
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Buy Your Dream Home</h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Explore thousands of properties and find the perfect place to call home
            </p>

            {/* Interactive Search Bar */}
            <InteractiveSearch variant="default" accentColor="purple" />
          </div>
        </div>
      </section>

      {/* Why Buy With Us */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: TrendingUp, title: "Market Insights", description: "Get real-time market data and trends" },
              { icon: Shield, title: "Secure Process", description: "Protected transactions with escrow services" },
              { icon: Heart, title: "Expert Guidance", description: "Professional agents to guide you" },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties for Sale</h2>
            <p className="text-gray-600 text-lg">Handpicked homes that match your lifestyle</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="luxury">Luxury</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="condo">Condo</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-purple-600">{property.badge}</Badge>
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl font-bold text-purple-600">{property.price}</span>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you every step of the way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              Browse All Listings
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
