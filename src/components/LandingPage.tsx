import { useUser } from "@clerk/clerk-react";
import TopNavBar from "./TopMenubar";
import { useNavigate } from 'react-router';
import { useEffect } from "react";

const features = [
  {
    title: 'Market Research & Analysis',
    description:
      'Access real-time market data, competitor analysis, and industry trends to inform your business strategy.',
  },
  {
    title: 'Financial Projections',
    description:
      'Generate realistic financial models and cash flow projections based on your business parameters.',
  },
  {
    title: 'Business Plan Generation',
    description:
      'Create comprehensive, investor-ready business plans with all essential components.',
  },
  {
    title: 'Risk Assessment',
    description:
      'Identify potential challenges and develop mitigation strategies before they become problems.',
  },
];

export default function LandingPage() {

      const { isSignedIn } = useUser();
       const navigate = useNavigate();

    useEffect(() => {
    if (isSignedIn) {
      navigate('/client');
    }
  }, [isSignedIn, navigate]);



  return (
    <main className="bg-white text-gray-900">

     <TopNavBar/>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Launch Your Business With AI-Powered Expert Guidance
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Our intelligent AI assistant works alongside experienced business coaches to help you develop, validate, and launch your business with confidence.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Meet Your AI Business Planning Assistant</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our intelligent AI works alongside you to develop your business plan, conduct market research, and prepare for expert validation.
        </p>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Business Planning</h2>
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="border p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Validation */}
      <section className="bg-gray-100 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Expert Validation Process</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          After your AI-assisted business plan is complete, our subject matter experts review and validate your plan to ensure it’s viable and ready for launch.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">1:1 Expert Review Session</h3>
            <p className="text-gray-600">
              Schedule a session with an industry expert to validate your business plan before launch.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Launch with Confidence?</h2>
        <p className="mb-6 max-w-2xl mx-auto text-lg">
          Start your journey with our AI assistant and get expert validation to ensure you're on the right track.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Start Free Today
        </button>
      </section>
    </main>
  );
}
