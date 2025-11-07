"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Award, Home, TrendingUp, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const stats = [
    { icon: Home, value: "10,000+", label: "Properties Sold" },
    { icon: Users, value: "50+", label: "Expert Agents" },
    { icon: Award, value: "25", label: "Years Experience" },
    { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team-1.jpg",
      bio: "25 years of real estate expertise",
    },
    {
      name: "Michael Chen",
      role: "Head of Sales",
      image: "/images/team-2.jpg",
      bio: "Specializes in luxury properties",
    },
    {
      name: "Emily Davis",
      role: "Director of Operations",
      image: "/images/team-3.jpg",
      bio: "Expert in property management",
    },
  ]

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
              <Link href="/buy" className="text-gray-600 hover:text-blue-600">
                Buy
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Wealthome</h1>
            <p className="text-lg md:text-xl text-gray-300">
              We're on a mission to make real estate simple, transparent, and accessible for everyone
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1999, Wealthome started with a simple vision: to revolutionize the way people buy, sell,
                  and rent properties. What began as a small local agency has grown into one of the most trusted names
                  in real estate.
                </p>
                <p>
                  Over the past 25 years, we've helped over 10,000 families find their dream homes. Our commitment to
                  excellence, transparency, and customer satisfaction has remained unwavering throughout our journey.
                </p>
                <p>
                  Today, we combine cutting-edge technology with personalized service to deliver an unmatched real
                  estate experience. Our team of expert agents is dedicated to making your property journey smooth and
                  successful.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="/images/office-team.jpg"
                alt="Our team at work"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Integrity",
                description: "We operate with complete transparency and honesty in every transaction",
              },
              {
                title: "Excellence",
                description: "We strive for perfection in service delivery and customer satisfaction",
              },
              { title: "Innovation", description: "We embrace technology to make real estate more accessible" },
              { title: "Community", description: "We're committed to giving back to the communities we serve" },
              { title: "Trust", description: "We build lasting relationships based on reliability and trust" },
              { title: "Growth", description: "We continuously improve to better serve our clients" },
            ].map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-3 text-blue-600">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 text-lg">Experienced professionals dedicated to your success</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-blue-100">We'd love to hear from you</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="pt-6 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-blue-100">(555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="pt-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-blue-100">hello@wealthome.com</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Office</h3>
                  <p className="text-blue-100">123 Main St, New York, NY 10001</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Schedule a Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
