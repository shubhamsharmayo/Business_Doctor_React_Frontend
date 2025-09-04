import { useEffect, useState } from "react";
import { XCircle, ArrowLeft, CreditCard, HelpCircle, RefreshCw } from "lucide-react";

import { NODE_API_BASE_URL } from "@/lib/api_base_url";
import Stripe from "stripe";

export default function CancelPage() {
  const [session, setSession] = useState<(Stripe.Checkout.Session & { line_items?: Stripe.ApiList<Stripe.LineItem> })| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Get session_id from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      fetch(`${NODE_API_BASE_URL}/stripe/cancel?session_id=${sessionId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch session details');
          }
          return res.json();
        })
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Unable to retrieve session details');
          setLoading(false);
        });
    } else {
      setError('No session ID provided');
      setLoading(false);
    }
  }, []);

  const handleRetryPayment = () => {
    // Navigate back to checkout or payment page
    window.history.back();
  };

  const handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-md w-full text-center">
          <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 p-6 text-center border-b">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Payment Canceled
          </h1>
          <p className="text-gray-600">
            Your payment has been canceled and no charges were made.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-yellow-800 text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-red-600">Canceled</span>
                </div>
                
                {session?.id && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Session ID:</span>
                    <span className="font-mono text-sm text-gray-800 truncate ml-2">
                      {session.id}
                    </span>
                  </div>
                )}
                
                {session?.amount_total && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-800">
                      ${(session.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                )}
                
                {session?.currency && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium text-gray-800 uppercase">
                      {session.currency}
                    </span>
                  </div>
                )}

                {session?.created && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(session.created * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• No charges were made to your payment method</li>
                  <li>• You can retry your purchase at any time</li>
                  <li>• Your cart items have been saved</li>
                  <li>• If you continue to experience issues, please contact support</li>
                </ul>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Try Payment Again
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Homepage
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <p className="text-center text-sm text-gray-500">
            Need help? 
            <a href="/contact" className="text-blue-600 hover:underline ml-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}