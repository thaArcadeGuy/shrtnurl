import { useState } from "react"

const faqs = [
  {
    question: 'How does URL shortening work?',
    answer: 'When you paste a long URL into shrtnurl, we create a unique short link that redirects to your original URL. Every time someone clicks your short link, they are instantly redirected to your destination page.'
  },
  {
    question: 'Can I customize my short links?',
    answer: 'Yes! Professional plan users can create custom branded slugs (e.g., shrtnurl.com/your-brand). Free users get randomly generated but still memorable short links.'
  },
  {
    question: 'What analytics do you provide?',
    answer: 'We track total clicks, unique visitors, geographic location, device type, browser, referrer source, and click timestamps. Professional plans get real-time analytics and export capabilities.'
  },
  {
    question: 'Are QR codes free?',
    answer: 'Basic QR codes are included in the Free plan. Professional plan users get customizable QR codes with logos, custom colors, and high-resolution downloads.'
  },
  {
    question: 'Do links expire?',
    answer: 'Free plan links expire after 7 days. Professional plan links never expire unless you set a custom expiration date.'
  },
  {
    question: 'Can I use an API?',
    answer: 'Yes! Professional plan includes full API access for programmatic link creation, analytics retrieval, and bulk operations.'
  }
]
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked <span style={{ color: 'rgb(3, 142, 125)' }}>questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about shrtnurl. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <span className="text-2xl" style={{ color: '#df2582' }}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-5 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}