import { useState } from "react";
import Button from "../ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAuthRedirect = (path: string) => {
    alert(`Redirect to ${path} - Auth coming soon!`);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 x-50 shadow-sm z-50">
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-3xl" style={{ color: "#df2582" }}>
                shrtnurl
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation Section */}
          <nav className="hidden text-[1.125rem] md:flex items-center space-x-8">
            <button
              onClick={() => handleAuthRedirect("/signup")}
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              My URLs
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleAuthRedirect('/signin')} 
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              Analytics
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden text-[1.125rem] md:flex items-center space-x-4">
            <button
              onClick={() => handleAuthRedirect("/signin")}
              className="text-gray-700 cursor-pointer hover:text-[#df2582] transition"
            >
              Login
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleAuthRedirect("/signup")}
            >
              Try for free
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-[#df2582] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleAuthRedirect("/signup")} 
                className="text-gray-700 py-2"
              >
                My URLs
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className="text-gray-700 py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 py-2"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 py-2"
              >
                FAQs
              </button>
              <button
                onClick={() => handleAuthRedirect("/signin")} 
                className="text-gray-700 py-2"
              >
                Analytics
              </button>
              <div className="pt-2 flex flex-col space-y-2">
                <button 
                  onClick={() => handleAuthRedirect('/signin')}
                  className="text-gray-700 py-2"
                >
                  Login
                </button>
                <Button
                  variant="primary"
                  onClick={() => handleAuthRedirect('/signup')}
                >
                  Try fo free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}