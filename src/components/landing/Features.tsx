import { useState } from "react"

const features = [
  {
    id: 1,
    title: "URL Shortening",
    icon: "🔗",
    color: "#df2582",
    description: "Transform long, complex URLs into short, memorable links that are easy to share and track.",
    details: [
      "Custom branded slugs",
      "Instant link generation",
      "Link expiration options",
      "Bulk URL shortening"
    ]
  },
  {
    id: 2,
    title: "QR Codes",
    icon: "📱",
    color: "#FFBF00",
    description: "Generate beautiful, customizable QR codes for every short link you create.",
    details: [
      "High-resolution PNG/SVG",
      "Custom colors & logos",
      "Scan analytics tracking",
      "Print-ready formats"
    ]
  },
  {
    id: 3,
    title: "Data Analytics",
    icon: "📊",
    color: "rgb(3, 142, 125)",
    description: "Get detailed insights about who clicks your links, where they come from, and what devices they use.",
    details: [
      "Real-time click tracking",
      "Geographic location data",
      "Device & browser stats",
      "Referrer analysis"
    ]
  }
];

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Features that <span style={{ color: '#df2582' }}>empower</span> your links
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, manage, and track your shortened links
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Feature Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">{features[currentIndex].icon}</div>
              <h3 
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: features[currentIndex].color }}
              >
                {features[currentIndex].title}
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {features[currentIndex].description}
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
                {features[currentIndex].details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevFeature}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#df2582] flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              ←
            </button>
            <button
              onClick={nextFeature}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#df2582] flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              →
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex ? 'w-8 bg-[#df2582]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}