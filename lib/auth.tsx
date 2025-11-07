"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "agent" | "admin"
  favorites: string[]
  savedSearches: any[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/images/customer-1.jpg",
    role: "user",
    favorites: ["1", "3"],
    savedSearches: [],
  },
  {
    id: "2",
    name: "Sarah Agent",
    email: "sarah@wealthome.com",
    avatar: "/images/customer-2.jpg",
    role: "agent",
    favorites: [],
    savedSearches: [],
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("wealthome_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("wealthome_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      setIsLoading(false)
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "user",
      favorites: [],
      savedSearches: [],
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("wealthome_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wealthome_user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("wealthome_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
