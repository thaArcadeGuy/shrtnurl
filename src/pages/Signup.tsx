import { SignUp } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="font-bold text-xl" style={{ color: "#df2582" }}>shrtnurl</span>
          </Link>
          <h2 className="text-2xl font-bold mt-6">Start shortening URLs in seconds</h2>
        </div>
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/signin"
          forceRedirectUrl="/dashboard"
        />

      </div>
    </div>
  )
}