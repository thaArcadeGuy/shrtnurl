import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#df2582]"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}