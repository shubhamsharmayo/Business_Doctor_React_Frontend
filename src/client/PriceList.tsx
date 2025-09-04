import PriceCard from "@/components/PriceCard";
import { loadStripe } from "@stripe/stripe-js";
// import { features } from "process";
import { useUser, useClerk } from "@clerk/clerk-react";
import { NODE_API_BASE_URL } from "@/lib/api_base_url";

const Prices = [
  {
    title: "BASIC",
    price: 100,
    originalPrice: 150,
    features: ["AI Chat – Discuss various business plans with AI"],
    isPopular: false,
  },
  {
    title: "PRO",
    price: 200,
    originalPrice: 300,
    features: [
      "AI Chat – Discuss various business plans with AI",
      "1-on-1 Coach Guidance – Hire a coach for expert advice",
      "Personalized growth strategies",
      "Real-world validation & feedback"
    ],
    isPopular: true,
  },
];

const stripePromise = loadStripe(
  "pk_test_51Ry4DRRXnjeDilLncyqUvGVVEgExaYMUdr8VqflFqvfzQoL1j7iZztt4F1wPJPKwPO3TjgWyy1afGXw9eOau3lQS00Ye923EKJ"
); // publishable key

const PriceList = () => {
  const { user } = useUser();
  const { redirectToSignUp } = useClerk();

  console.log(user?.id);

  const handleCheckout = async (datas: string) => {
    const stripe = await stripePromise;
    if (!user) {
      redirectToSignUp({ redirectUrl: "/onboard" });
    }
    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }

    // Call backend to create session
    const res = await fetch(`${NODE_API_BASE_URL}/stripe/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: datas,
        clerkId: user?.id,
      }),
    });

    const data = await res.json();

    if (!data?.id) {
      console.error("No sessionId returned from backend:", data);
      return;
    }
    // Redirect to Stripe Checkout
    if (!user) return;
    const { error } = await stripe.redirectToCheckout({ sessionId: data?.id });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
    console.log(data);
  };

  return (
    <div>
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto ">
          {/* Cards with equal space around each one */}
          <div className="flex flex-wrap justify-around items-center gap-y-6 lg:gap-y-8">
            {Prices.map((e, i) => (
              <PriceCard
                key={i}
                title={e.title}
                price={e.price}
                originalPrice={e.originalPrice}
                features={e.features}
                isPopular={e.isPopular}
                onSelect={() => handleCheckout(e.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
