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
      <div className="">

        {/* Section header */}
        <div className="">
          <h2 className="">
            Simple, <span>transparent</span> pricing
          </h2>
          <p className="">
            Choose the plan that works best for you. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                ${
                  plan.popular ? "" : ""
                }`}
            >
              {plan.popular && (
                <div className="">
                  MOST POPULAR
                </div>
              )}
              <div className="">
                <h3 className="">{plan.name}</h3>
                <div className="">
                  <span className="">
                    {plan.price}
                  </span>
                  <span className="">/{plan.period}</span>
                </div>
                <ul className="">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="">
                      <span className="">✓</span>
                      <span className="">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "" : ""}
                  onClick={() => handleSelectPlan(plan.name)}
                  className=""
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