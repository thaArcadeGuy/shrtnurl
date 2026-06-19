import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Redirect() {
  const { slug } = useParams()
  const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL
  
  useEffect(() => {
    if (slug && CONVEX_SITE_URL) {
      // Redirect to Convex HTTP action
      window.location.href = `${CONVEX_SITE_URL}/${slug}`
    }
  }, [slug, CONVEX_SITE_URL])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#df2582] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting you to your destination...</p>
      </div>
    </div>
  )
}