import { useEffect, useState } from "react";
import {
  CheckCircle,
  Calendar,
  ArrowRight,
  CreditCard,
  User,
  Package,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// Mock API base URL for demonstration - replace with your actual import
import { NODE_API_BASE_URL } from "@/lib/api_base_url";
import Stripe from "stripe";

export default function SuccessPage() {
  // Mock URL parameters for demonstration - replace with actual useSearchParams in your app
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState<
    | (Stripe.Checkout.Session & {
        line_items?: Stripe.ApiList<Stripe.LineItem>;
      })
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  console.log(user);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetch(`${NODE_API_BASE_URL}/stripe/success?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);
  console.log(sessionData);
  const formatCurrency = (amount: number, currency: string = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-teal-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600  to-blue-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white-600 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-white-600 max-w-2xl mx-auto">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
        </div>

        {/* Payment Details Card */}
        {sessionData ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-green-600" />
              Payment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                {sessionData.customer_details && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">Customer</p>
                      <p className="text-slate-600">
                        {sessionData.customer_details.name || "N/A"}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {sessionData.customer_details.email || "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {sessionData.line_items?.data?.[0] && (
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">Service</p>
                      <p className="text-slate-600">
                        {sessionData.line_items.data[0].description ||
                          "Premium Service"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                {sessionData.amount_total && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Amount Paid
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                          sessionData.amount_total,
                          sessionData.currency ?? "usd"
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {sessionData.created && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Date & Time
                      </p>
                      <p className="text-slate-600">
                        {formatDate(sessionData.created)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction ID */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Transaction ID</p>
                  <p className="text-slate-500 font-mono text-sm">
                    {sessionData.id}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {sessionData.payment_status?.toUpperCase() || "PAID"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8 text-center">
              <p className="text-slate-600">No payment data available.</p>
            </div>
          )
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            You'll receive a confirmation email shortly with your receipt and
            next steps. Our team will reach out to schedule your session within
            24 hours.
          </p>
          <Link to={"/client/dashboard"}>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Support Section */}
        <div className="text-center mt-8 p-6 bg-slate-100 rounded-lg">
          <p className="text-slate-600 mb-2">
            Need help or have questions about your purchase?
          </p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
