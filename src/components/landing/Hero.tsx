import { useState } from "react"
import Button from "../ui/Button"

export default function Hero() {
  const [url, setUrl] = useState("")
  const [shortened, setShortened] = useState("")

  const handleShorten = () => {
    if (!url) return

    const mockShortUrl = `shrtnurl.com/${Math.random().toString(36).substring(2, 8)}`
    setShortened(mockShortUrl)
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
              <Button variant="primary" size="lg" onClick={handleShorten}>
                Shorten URL
              </Button>
            </div>

            {/* Shortened result */}
            {shortened && (
              <div className="mt-6 p-4 bg-gradient-to-r from-[#df2582]/10 to-[#FFBF00]/10 rounded-lg border border-[#df2582]/20">
                <p className="text-sm text-gray-600 mb-1">Your short link:</p>
                <a 
                  href={`http://${shortened}`}
                  target="_blank" 
                  className="text-[#df2582] font-semibold hover:underline break-all"
                >
                  {shortened}
                </a>
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