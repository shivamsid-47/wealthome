"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function SocialAuth() {
  const handleGoogleAuth = () => {
    // In a real app, this would integrate with Google OAuth
    console.log("Google authentication")
  }

  const handleFacebookAuth = () => {
    // In a real app, this would integrate with Facebook OAuth
    console.log("Facebook authentication")
  }

  const handleAppleAuth = () => {
    // In a real app, this would integrate with Apple OAuth
    console.log("Apple authentication")
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Button variant="outline" onClick={handleGoogleAuth} className="w-full bg-transparent">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <Button variant="outline" onClick={handleFacebookAuth} className="w-full bg-transparent">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </Button>

        <Button variant="outline" onClick={handleAppleAuth} className="w-full bg-transparent">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.557.37 4.697.594 3.953.89c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.884.11 5.744-.054 6.978-.218 8.214-.262 8.585-.262 12.017c0 3.431.044 3.803.207 5.037.164 1.234.388 2.094.684 2.838.306.79.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.744.296 1.604.52 2.838.684 1.234.164 1.606.208 5.037.208 3.431 0 3.803-.044 5.037-.208 1.234-.164 2.094-.388 2.838-.684.79-.305 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.744.52-1.604.684-2.838.164-1.234.208-1.606.208-5.037 0-3.431-.044-3.803-.208-5.037-.164-1.234-.388-2.094-.684-2.838a5.907 5.907 0 0 0-1.384-2.126A5.907 5.907 0 0 0 19.778.89c-.744-.296-1.604-.52-2.838-.684C15.706.044 15.334 0 11.903 0h.114zm1.414 2.166c3.363 0 3.765.014 5.095.162 1.23.056 1.898.26 2.344.432.588.228 1.008.5 1.449.942.442.441.714.861.942 1.449.172.446.376 1.114.432 2.344.148 1.33.162 1.732.162 5.095 0 3.363-.014 3.765-.162 5.095-.056 1.23-.26 1.898-.432 2.344a3.9 3.9 0 0 1-.942 1.449c-.441.442-.861.714-1.449.942-.446.172-1.114.376-2.344.432-1.33.148-1.732.162-5.095.162-3.363 0-3.765-.014-5.095-.162-1.23-.056-1.898-.26-2.344-.432a3.9 3.9 0 0 1-1.449-.942 3.9 3.9 0 0 1-.942-1.449c-.172-.446-.376-1.114-.432-2.344-.148-1.33-.162-1.732-.162-5.095 0-3.363.014-3.765.162-5.095.056-1.23.26-1.898.432-2.344.228-.588.5-1.008.942-1.449.441-.442.861-.714 1.449-.942.446-.172 1.114-.376 2.344-.432 1.33-.148 1.732-.162 5.095-.162z" />
          </svg>
          Continue with Apple
        </Button>
      </div>
    </div>
  )
}
