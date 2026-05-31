import { useState } from "react"
import Button from "../ui/Button"

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you ${formData.name}! We'll get back to you soon.`)
    setFormData({ name: "", email: "", message: "" })
  }
  
  return (
    <footer className="">
      <div className="">
        <div className="">

          {/* Contact Form */}
          <div className="">
            <h3 className="">
              Contact Us
            </h3>
            <form onSubmit={} className="">
              <div className="">
                <input type="text" className="" />
                <input type="text" className="" />
              </div>
              <textarea name="" id="" className=""/>
              <Button variant="" size="">
                Send Message
              </Button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="">
              Quick Links
            </h3>
            <ul className="">
              <li><a href="" className="">About Us</a></li>
              <li><a href="" className="">Privacy Policy</a></li>
              <li><a href="" className="">Terms of Service</a></li>
              <li><a href="" className="">API Documentation</a></li>
              <li><a href="" className="">Status Page</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="">
          <p>© 2025 shrtnurl. All rights reserved. Made with ❤️ for better link management</p>
          <div className="">
            <span className="">✂️</span>
            <span className="">🔗</span>
            <span style={{ color: "rgb(3, 142, 125" }}>📊</span>
          </div>
        </div>
      </div>
    </footer>
  )
}