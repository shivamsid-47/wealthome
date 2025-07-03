"use client"

import { AgentCard } from "@/components/agent-card"

const agents = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    image: "/images/agent-1.jpg",
    rating: 4.9,
    reviews: 127,
    phone: "(555) 123-4567",
    email: "sarah@wealthome.com",
    specialties: ["Luxury Homes", "First-time Buyers", "Investment Properties"],
    propertiesSold: 150,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Real Estate Specialist",
    image: "/images/agent-2.jpg",
    rating: 4.8,
    reviews: 89,
    phone: "(555) 987-6543",
    email: "michael@wealthome.com",
    specialties: ["Commercial", "Residential", "Property Management"],
    propertiesSold: 95,
  },
]

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Expert Agents</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our experienced real estate professionals are here to help you find your dream home or sell your property
            with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  )
}
