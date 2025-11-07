"use client"

import { Button } from "@/components/ui/button"
import { Github, Facebook, Cookie as Google } from "lucide-react"

export function SocialAuth() {
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
