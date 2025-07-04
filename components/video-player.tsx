"use client"

import { useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    if (!ref.current) return
    if (playing) {
      ref.current.pause()
    } else {
      ref.current.play()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!ref.current) return
    ref.current.muted = !muted
    setMuted(!muted)
  }

  const enterFullscreen = () => {
    ref.current?.requestFullscreen?.()
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        {title ?? "Video not supported"}
      </video>

      {/* controls overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/30 opacity-0 transition hover:opacity-100">
        <Button size="icon" className="rounded-full bg-white text-blue-600" onClick={togglePlay}>
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button size="icon" variant="secondary" onClick={toggleMute}>
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Button size="icon" variant="secondary" onClick={enterFullscreen}>
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
