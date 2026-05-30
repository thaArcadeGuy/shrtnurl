import Button from "../ui/Button"

export default function CtaBanner() {
  return (
    <section className="py-20" style={{ backgroundColor: "#faf9ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex gap-2 mb-6">
          <span className="text-4xl">⚡</span>
          <span className="text-4xl">🚀</span>
          <span className="text-4xl">✨</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to <span style={{ color: '#df2582' }}>shorten</span> your first URL?
        </h3>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already creating smarter, trackable links
        </p>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => alert('Redirect to signup - Auth coming soon!')}
        >
          Get Started — It's Free
        </Button>
      </div>
    </section>
  )
}