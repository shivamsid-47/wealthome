"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, MapPin, Building, X, Clock, TrendingUp, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const cities = [
  { value: "miami", label: "Miami, FL", count: 245 },
  { value: "austin", label: "Austin, TX", count: 189 },
  { value: "seattle", label: "Seattle, WA", count: 156 },
  { value: "beverly-hills", label: "Beverly Hills, CA", count: 87 },
  { value: "napa", label: "Napa Valley, CA", count: 43 },
  { value: "hawaii", label: "Hawaii", count: 112 },
  { value: "new-york", label: "New York, NY", count: 534 },
  { value: "san-francisco", label: "San Francisco, CA", count: 298 },
  { value: "chicago", label: "Chicago, IL", count: 276 },
  { value: "los-angeles", label: "Los Angeles, CA", count: 421 },
  { value: "denver", label: "Denver, CO", count: 167 },
]

const neighborhoods = [
  { value: "downtown", label: "Downtown", icon: Building },
  { value: "suburbs", label: "Suburbs", icon: Building },
  { value: "beachfront", label: "Beachfront", icon: Building },
  { value: "countryside", label: "Countryside", icon: Building },
  { value: "waterfront", label: "Waterfront", icon: Building },
  { value: "gated-community", label: "Gated Community", icon: Building },
  { value: "historic-district", label: "Historic District", icon: Building },
  { value: "urban", label: "Urban", icon: Building },
]

const popularSearches = [
  "Luxury homes in Miami",
  "Family houses in Austin",
  "Beachfront condos",
  "Downtown apartments",
]

export function InteractiveSearch({ variant = "default", accentColor = "blue" }) {
  const [searchType, setSearchType] = useState("buy")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const searchRef = useRef(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Calculate result count based on filters
  useEffect(() => {
    let count = 1247 // Base count
    if (selectedCity) {
      const city = cities.find(c => c.value === selectedCity)
      count = city?.count || 100
    }
    if (selectedNeighborhood) count = Math.floor(count * 0.3)
    if (priceRange) count = Math.floor(count * 0.4)
    if (bedrooms) count = Math.floor(count * 0.5)
    if (searchType === "rent") count = Math.floor(count * 0.6)
    setResultCount(Math.max(count, 12))
  }, [selectedCity, selectedNeighborhood, priceRange, bedrooms, searchType])

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    setIsSearching(true)
    
    // Save to recent searches
    const searchTerm = selectedCity ? cities.find(c => c.value === selectedCity)?.label : searchQuery
    if (searchTerm) {
      const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
      setRecentSearches(newRecent)
      localStorage.setItem("recentSearches", JSON.stringify(newRecent))
    }

    // Simulate search delay then redirect
    setTimeout(() => {
      setIsSearching(false)
      window.location.href = `/explore?type=${searchType}&city=${selectedCity}&neighborhood=${selectedNeighborhood}&price=${priceRange}&beds=${bedrooms}`
    }, 500)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const filteredCities = cities.filter(city => 
    city.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const colorClasses = {
    blue: {
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-100 text-blue-700",
      highlight: "text-blue-600",
      ring: "ring-blue-500",
    },
    purple: {
      button: "bg-purple-600 hover:bg-purple-700",
      badge: "bg-purple-100 text-purple-700",
      highlight: "text-purple-600",
      ring: "ring-purple-500",
    }
  }

  const colors = colorClasses[accentColor] || colorClasses.blue

  return (
    <Card className="p-4 md:p-6 bg-white text-gray-900 shadow-xl">
      {/* Search Type Tabs */}
      <div className="flex gap-2 mb-4">
        {["buy", "rent", "sell"].map((type) => (
          <Button
            key={type}
            variant={searchType === type ? "default" : "outline"}
            size="sm"
            className={searchType === type ? colors.button : ""}
            onClick={() => setSearchType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Main Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* City Search with Autocomplete */}
        <div className="lg:col-span-2 relative" ref={searchRef}>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Enter city or location..."
              className="pl-10 pr-10"
              value={searchQuery || (selectedCity ? cities.find(c => c.value === selectedCity)?.label : "")}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedCity("")
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {(searchQuery || selectedCity) && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCity("")
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && !searchQuery && (
                <div className="p-3 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase">Recent Searches</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearRecentSearches}>
                      Clear
                    </Button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded text-left"
                      onClick={() => {
                        setSearchQuery(search)
                        setShowSuggestions(false)
                      }}
                    >
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {!searchQuery && (
                <div className="p-3 border-b">
                  <span className="text-xs font-medium text-gray-500 uppercase">Trending Searches</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setSearchQuery(search)
                          setShowSuggestions(false)
                        }}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* City Results */}
              <div className="p-2">
                <span className="text-xs font-medium text-gray-500 uppercase px-2">Cities</span>
                {filteredCities.map((city) => (
                  <button
                    key={city.value}
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded"
                    onClick={() => {
                      setSelectedCity(city.value)
                      setSearchQuery("")
                      setShowSuggestions(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{city.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {city.count} listings
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Neighborhood Select */}
        <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
          <SelectTrigger>
            <SelectValue placeholder="Neighborhood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Neighborhood</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Select */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Price</SelectItem>
            {searchType === "rent" ? (
              <>
                <SelectItem value="0-1500">$0 - $1,500/mo</SelectItem>
                <SelectItem value="1500-2500">$1,500 - $2,500/mo</SelectItem>
                <SelectItem value="2500-4000">$2,500 - $4,000/mo</SelectItem>
                <SelectItem value="4000-6000">$4,000 - $6,000/mo</SelectItem>
                <SelectItem value="6000+">$6,000+/mo</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="0-300k">$0 - $300k</SelectItem>
                <SelectItem value="300k-500k">$300k - $500k</SelectItem>
                <SelectItem value="500k-750k">$500k - $750k</SelectItem>
                <SelectItem value="750k-1m">$750k - $1M</SelectItem>
                <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                <SelectItem value="2m+">$2M+</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>

        {/* Bedrooms Select */}
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Beds</SelectItem>
            <SelectItem value="1">1+ Bed</SelectItem>
            <SelectItem value="2">2+ Beds</SelectItem>
            <SelectItem value="3">3+ Beds</SelectItem>
            <SelectItem value="4">4+ Beds</SelectItem>
            <SelectItem value="5">5+ Beds</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button 
          className={`w-full ${colors.button} font-semibold text-base py-5`}
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Finding Properties...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Find Your Dream Home
            </>
          )}
        </Button>
      </div>

      {/* Results Preview */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${colors.highlight}`}>{resultCount.toLocaleString()}</span>
          <span className="text-gray-600 text-sm">
            properties {searchType === "rent" ? "for rent" : searchType === "sell" ? "to sell" : "for sale"}
          </span>
        </div>
        
        {/* Active Filters */}
        <div className="flex flex-wrap gap-2">
          {selectedCity && (
            <Badge className={colors.badge}>
              {cities.find(c => c.value === selectedCity)?.label}
              <button className="ml-1" onClick={() => setSelectedCity("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedNeighborhood && selectedNeighborhood !== "any" && (
            <Badge className={colors.badge}>
              {neighborhoods.find(n => n.value === selectedNeighborhood)?.label}
              <button className="ml-1" onClick={() => setSelectedNeighborhood("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {priceRange && priceRange !== "any" && (
            <Badge className={colors.badge}>
              {priceRange}
              <button className="ml-1" onClick={() => setPriceRange("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {bedrooms && bedrooms !== "any" && (
            <Badge className={colors.badge}>
              {bedrooms}+ Beds
              <button className="ml-1" onClick={() => setBedrooms("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
