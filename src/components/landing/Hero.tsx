import { useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Button from "../ui/Button"

export default function Hero() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()
  const [url, setUrl] = useState("")
  const [shortened, setShortened] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

   const createLink = useMutation(api.links.createLink)

  const [guestLinkCount, setGuestLinkCount] = useState(() => {
  const stored = localStorage.getItem("guestLinkCount")
  return stored ? parseInt(stored) : 0
})

  const handleShorten = async () => {
    setError('')
 
    if (!url) {
      setError("Please enter a URL")
      return
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL (start with http:// or https://)")
      return
    }

    if (!isSignedIn) {
      const MAX_GUEST_LINKS = 3 
      if (guestLinkCount >= MAX_GUEST_LINKS) {
        setError(`You've used all ${MAX_GUEST_LINKS} guest links!`)
        return
      }
    }

    setIsLoading(true)
    try {
      let result
      
      if (isSignedIn) {
        result = await createLink({
          originalUrl: url,
          customSlug: undefined, 
        })
    
        if (user?.createdAt && Date.now() - new Date(user.createdAt).getTime() < 60000) {
          localStorage.setItem("guestLinkCount", "0")
          setGuestLinkCount(0)
        }
      } else {
        result = await createLink({
          originalUrl: url,
          customSlug: undefined,
        })
    
        const newCount = guestLinkCount + 1
        localStorage.setItem("guestLinkCount", String(newCount))
        setGuestLinkCount(newCount)
      }
     
      const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL
      setShortened(`${convexUrl}/${result.slug}`)
      setUrl("")
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create link")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Shorten Your <span style={{color: "#df2582"}}>URLS</span>
            <br />
            Share with <span style={{color: "#FFBF00"}}>Confidence</span>
          </h1>

          {/* Hero Paragraph */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Create short, memorable links that work everywhere. Track clicks, 
            generate QR codes, and analyze your audience — all in one place.
          </p>

          {/* URL Form */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                placeholder="https://your-super-long-url.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-5 py-3 border-2 border-[#A7A8CD] focus:outline-none focus:border-[#df2582] transition-colors"
              />
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleShorten}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Shorten URL"}
              </Button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {/* Guest link counter */}
            {!isSignedIn && (
              <div className="mt-3 text-sm text-gray-500">
                {guestLinkCount < 3 ? (
                  <span>Guest links remaining: {3 - guestLinkCount} of 3. <button onClick={() => navigate("/signup")} className="text-[#df2582] hover:underline">Sign up</button> for unlimited!</span>
                ) : (
                  <span className="text-amber-600">All guest links used. Ready for more? <button onClick={() => navigate("/signup")} className="text-[#df2582] hover:underline font-semibold">Create an account</button> in seconds.</span>
                )}
              </div>
            )}

            {/* Shortened result */}
            {shortened && (
              <div className="mt-6 p-4 bg-gradient-to-r from-[#df2582]/10 to-[#FFBF00]/10 rounded-lg border border-[#df2582]/20">
                <p className="text-sm text-gray-600 mb-1">Your short link:</p>
                <a 
                  href={shortened}
                  target="_blank" 
                  className="text-[#df2582] font-semibold hover:underline break-all"
                >
                  {shortened}
                </a>
                {!isSignedIn && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <button
                        onClick={() => navigate("/signup")}
                        className="text-[#df2582] font-semibold hover:underline"
                      >
                        Sign up
                      </button>
                      {" "}to track clicks and manage all your links in one dashboard.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Decorative element */}
          <div className="mt-16 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#df2582]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FFBF00]"></div>
            <div className="w-2 h-2 rounded-full bg-[#A7A8CD]"></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgb(3, 142, 125)" }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgb(17, 121, 191, 1)" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}