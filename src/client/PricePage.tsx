import { useState } from "react";
import {
  Star,
  Zap,
  Shield,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";
import PriceList from "./PriceList";
import TopNavBar from "@/components/TopMenubar";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
      {
    icon: <Zap className="h-6 w-6" />,
    title: "AI Business Chat",
    description:
      "Discuss business plans, validate ideas, and get instant AI-powered insights to move faster."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Coach Support",
    description:
      "Upgrade to Pro and get direct access to experienced coaches who guide you with real-world strategies."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "One-Time Payment",
    description:
      "No recurring subscription. Pay once and enjoy lifetime access to AI chat or AI + Coach features."
  }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes! You can upgrade from the Basic AI Chat plan to the Pro plan with coach support at any time. The switch happens instantly and billing is adjusted automatically.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial so you can test AI chat and explore features before committing. No credit card required.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards. For teams or enterprises, we also support invoicing and bank transfers.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Absolutely. You can cancel anytime from your dashboard. Your access will remain active until the end of your billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we provide a 30-day money-back guarantee for all new subscriptions. Just reach out to our support team to request a refund.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content:
        "The AI chat helped us brainstorm business strategies in minutes. It feels like having an advisor on call 24/7.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      content:
        "I started with the Basic plan for AI insights and later upgraded to Pro. Having access to real coaches alongside AI has been a game changer for scaling my startup.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      content:
        "The combination of AI-driven suggestions and expert coaching gave us clarity and direction. The pricing is transparent and worth every penny.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <TopNavBar/>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-8">
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-purple-200 text-sm">
                Trusted by 10,000+ companies worldwide
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Simple,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Transparent
              </span>
              <br />
              Pricing
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Scale as you grow with no
              hidden fees or surprises. Start your journey today.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-1 flex">
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                    billingCycle === ""
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  One Time Payment
                {/* <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                //     20% OFF
                //   </span> */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Placeholder */}
        <div className="container mx-auto px-4 mb-20">
          <div className="bg-slate-800/30 backdrop-blur-sm border-2 border-dashed border-slate-600/50 rounded-2xl p-12 text-center">
            <div className="">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                <PriceList />
              </h3>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Our platform includes powerful features designed to help you
              achieve your goals faster and more efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 ">
            {features.map((feature, index) => (
              <div key={index} className="group ">
                <div className="bg-slate-800/30  backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 min-h-[15vh]">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by thousands of customers
            </h2>
            <p className="text-slate-300 text-lg">
              See what our customers have to say about our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-300 text-lg">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and take your business to
                the next level. Start your free trial today.
              </p>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors inline-flex items-center group">
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          </div>
        </div>

        {/* Trust Indicators */}
   

        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">YourBrand</h3>
                <p className="text-slate-400 mb-4">
                  Building the future of digital experiences with innovative
                  solutions.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  {["Features", "Pricing", "API Docs", "Changelog"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-slate-400 hover:text-purple-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {["About", "Blog", "Careers", "Contact"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-purple-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  {["Help Center", "Documentation", "Status", "Security"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-slate-400 hover:text-purple-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2025 YourBrand. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
