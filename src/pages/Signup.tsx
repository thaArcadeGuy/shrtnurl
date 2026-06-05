import { SignUp } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <Link to="/" className="">
            <span className="">shrtnurl</span>
          </Link>
          <h2 className="">Create your account</h2>
          <p className="">Start shortening URLs in seconds</p>
        </div>
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/signin"
          redirectUrl="/dashboard"
        />

        <p className="">
          Already have an account?{' '}
          <Link to="/signin" className="">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}