import Button from "../ui/Button"

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    color: '#A7A8CD',
    features: [
      'Up to 50 links/month',
      'Basic analytics',
      'Standard QR codes',
      '7-day link expiration',
      'Email support'
    ],
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: '$9',
    period: 'month',
    color: '#df2582',
    features: [
      'Unlimited links',
      'Advanced analytics',
      'Custom QR codes with logos',
      'Custom branded slugs',
      'Priority support',
      'API access',
      'Team collaboration'
    ],
    buttonText: 'Start Free Trial',
    popular: true
  }
];

export default function Pricing() {
  const handleSelectPlan = (planName: string) => {
    alert(`Redirect to signup for ${planName} plan - Auth coming soon!`);
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Simple, <span style={{ color: '#FFBF00' }}>transparent</span> pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                ${
                  plan.popular ? "ring-2 ring-[#df2582] scale-105" : ""
                }`}
            >
              {plan.popular && (
                <div className="bg-[#df2582] text-white text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold" style={{ color: plan.color }}>
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  onClick={() => handleSelectPlan(plan.name)}
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}