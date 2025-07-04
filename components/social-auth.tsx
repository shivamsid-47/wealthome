"use client"

import { Button } from "@/components/ui/button"
import { Github, Facebook, ChromeIcon as Google } from "lucide-react"

export function SocialAuth() {
  // In a real-world app these would trigger OAuth flows.
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Button variant="outline" className="w-full bg-transparent">
        <Google className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button variant="outline" className="w-full bg-transparent">
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button variant="outline" className="w-full bg-transparent">
        <Facebook className="mr-2 h-4 w-4" />
        Continue with Facebook
      </Button>
    </div>
  )
}
