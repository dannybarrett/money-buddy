export default function GetStarted() {
  const steps = [
    {
      number: "01",
      title: "Sign up for free",
      description:
        "Create your Money Buddy account in less than 2 minutes with just an email address.",
    },
    {
      number: "02",
      title: "Connect your accounts",
      description:
        "Securely link your bank accounts, credit cards, and investment accounts through Plaid.",
    },
    {
      number: "03",
      title: "Set your budget goals",
      description:
        "Create personalized budgets based on your financial goals and spending patterns.",
    },
    {
      number: "04",
      title: "Track and improve",
      description:
        "Monitor your spending habits, receive insights, and watch your financial health improve.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section-padding bg-money-buddy-light-gray grid gap-16"
    >
      <div className="container mx-auto text-center grid gap-4">
        <h2 className="text-3xl">Getting started is easy</h2>
        <p className="text-lg text-gray-600">
          Four simple steps to transform your financial management experience.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col gap-4"
          >
            <span className="absolute -top-5 -left-2 text-6xl font-bold text-money-buddy-teal/20">
              {step.number}
            </span>
            <h3 className="text-xl mt-4">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
