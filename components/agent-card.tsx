"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, Mail, MessageCircle } from "lucide-react"

interface Agent {
  id: string
  name: string
  title: string
  image: string
  rating: number
  reviews: number
  phone: string
  email: string
  specialties: string[]
  propertiesSold: number
}

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={agent.image || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-600 hover:bg-green-700">{agent.propertiesSold}+ Sales</Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
          <p className="text-gray-600 mb-2">{agent.title}</p>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {agent.rating} ({agent.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {agent.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Agent
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
