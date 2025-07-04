"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  title?: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  return (
    <div className="w-full">
      {/* main image */}
      <div className="relative w-full pb-[56.25%] md:pb-[40%] overflow-hidden rounded-lg shadow">
        <Image
          src={images[current] || "/placeholder.svg"}
          alt={title ?? "Property image"}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition",
                current === idx ? "border-blue-600" : "border-transparent hover:border-gray-300",
              )}
            >
              <Image src={img || "/placeholder.svg"} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
