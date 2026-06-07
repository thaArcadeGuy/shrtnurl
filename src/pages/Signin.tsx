import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="font-bold text-xl" style={{ color: '#df2582' }}>shrtnurl</span>
          </Link>
          <h2 className="text-2xl font-bold mt-6">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <SignIn 
          routing="path" 
          path="/signin"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
        />
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#df2582] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}