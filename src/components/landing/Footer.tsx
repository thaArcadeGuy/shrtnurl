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

  const currentYear: number = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Contact Form */}
          <div className="md: col-span-2">
            <h3 className="text-xl font-bold mb-4 style={{ color: '#FFBF00' }}">
              Contact Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#df2582] transition" 
                /> 
                <input 
                  type="email" 
                  placeholder="Your email..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email:e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#df2582] transition" 
                />
              </div>
              <textarea 
                placeholder="Your message..." 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#df258] transition"
              />
              <Button variant="primary" size="sm">
                Send Message
              </Button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#FFBF00' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Status Page</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; {currentYear} shrtnurl. All rights reserved. </p>
          {/* <div className="flex justify-center gap-4 mt-4">
            <span className="text-[#df2582]">✂️</span>
            <span className="text-[#FFBF00]">🔗</span>
            <span style={{ color: "rgb(3, 142, 125" }}>📊</span>
          </div> */}
        </div>
      </div>
    </footer>
  )
}