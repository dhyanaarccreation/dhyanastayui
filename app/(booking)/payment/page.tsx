"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Wallet, Lock, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      router.push("/confirmation");
    }, 2000);
  };

  return (
    <div className="bg-background min-h-screen pt-[72px] pb-24">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs text-muted hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to booking details
        </button>

        <h1 className="heading-display text-3xl md:text-5xl text-foreground mb-10">
          Complete your booking
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Payment Form */}
          <div className="flex-1">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setMethod("card")}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-colors ${
                    method === "card"
                      ? "bg-surface-hover border-primary text-foreground"
                      : "bg-background border-border text-muted hover:border-subtle"
                  }`}
                >
                  <CreditCard size={24} className={method === "card" ? "text-primary" : ""} />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>
                <button
                  onClick={() => setMethod("upi")}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-colors ${
                    method === "upi"
                      ? "bg-surface-hover border-primary text-foreground"
                      : "bg-background border-border text-muted hover:border-subtle"
                  }`}
                >
                  <Wallet size={24} className={method === "upi" ? "text-primary" : ""} />
                  <span className="text-sm font-medium">UPI / Wallets</span>
                </button>
              </div>

              <form onSubmit={handlePayment}>
                {method === "card" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
                        <input
                          type="text"
                          required
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                          CVV
                        </label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
                          <input
                            type="text"
                            required
                            placeholder="123"
                            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {method === "upi" && (
                  <div className="space-y-4 animate-fade-in text-center py-8 border border-border rounded-xl bg-background">
                    <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center p-2 mb-4">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=dhyanastays@okhdfcbank&pn=Dhyana%20Stays&cu=INR" alt="UPI QR Code" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-sm text-muted">Scan with any UPI app to pay</p>
                    <div className="flex items-center gap-4 justify-center mt-4">
                      <div className="h-px bg-border w-12" />
                      <span className="text-xs text-subtle uppercase tracking-wider">OR ENTER UPI ID</span>
                      <div className="h-px bg-border w-12" />
                    </div>
                    <div className="px-8 mt-4">
                      <input
                        type="text"
                        placeholder="username@bank"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-border">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      `Pay ₹47,700`
                    )}
                  </button>
                  <p className="text-center text-xs text-muted mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} className="text-sage" /> Payments are secure and encrypted
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:w-[350px]">
            <div className="bg-surface border border-border rounded-2xl p-6 sticky top-[100px]">
              <h3 className="text-lg font-semibold text-foreground mb-6">Booking Summary</h3>
              
              <div className="space-y-4 text-sm text-muted border-b border-border pb-6 mb-6">
                <div>
                  <div className="font-medium text-foreground mb-1">The Glasshouse in the Pines</div>
                  <div className="text-xs">Mashobra, Himachal Pradesh</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Dates</div>
                    <div className="text-foreground">Oct 15 - Oct 18</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Guests</div>
                    <div className="text-foreground">2 Adults</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm border-b border-border pb-6 mb-6">
                <div className="flex justify-between text-muted">
                  <span>₹15,000 x 3 nights</span>
                  <span>₹45,000</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Platform fee</span>
                  <span>₹1,500</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Taxes</span>
                  <span>₹1,200</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold text-foreground">
                <span>Total to pay</span>
                <span className="text-primary">₹47,700</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
