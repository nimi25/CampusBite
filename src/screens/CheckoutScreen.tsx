/**
 * CampusBite - Checkout Screen
 * Screen 7 of 10: Campus drop-off verification, delivery note,
 * student-friendly payment selection, and mock order dispatch.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAMPUS_LOCATIONS } from '../data/mockData';
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building,
  User,
  Phone,
  AlertCircle,
} from 'lucide-react';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    bill,
    user,
    deliveryLocation,
    setDeliveryLocation,
    placeOrder,
    navigate,
  } = useApp();

  const [roomInput, setRoomInput] = useState(user.hostelRoom);
  const [deliveryNote, setDeliveryNote] = useState('Call me once you enter hostel gate');
  const [phoneInput, setPhoneInput] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI - Google Pay / PhonePe');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(paymentMethod, deliveryNote);
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mt-1">
          Please add items to cart before checking out.
        </p>
        <button
          onClick={() => navigate('budget')}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
        >
          Browse BudgetBites
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-screen" className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Campus Delivery Checkout
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Confirm your hostel location and choose your payment method
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Sections */}
        <div className="md:col-span-2 space-y-4">
          {/* 1. Delivery Location Selection */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Campus Drop-off Point</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Campus Building / Gate
              </label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-orange-500"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Room / Bench / Dept Details
                </label>
                <input
                  type="text"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  placeholder="e.g. Room 314, Block B"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Runner Delivery Instructions
              </label>
              <input
                type="text"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="e.g. Leave with guard or call on reaching hostel lobby"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          {/* 2. Payment Method Options */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CreditCard className="w-4 h-4 text-orange-600" />
                <span>Student Payment Mode</span>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full">
                Mock Prototype
              </span>
            </div>

            <div className="space-y-2">
              {/* Option A: Campus Student Wallet */}
              <label
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Campus Student Wallet'
                    ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Campus Student Wallet'}
                    onChange={() => setPaymentMethod('Campus Student Wallet')}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        Campus Student Wallet
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                        Bal: ₹{user.campusWallet}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      1-Tap student debit, no OTP needed
                    </p>
                  </div>
                </div>
                <Wallet className="w-5 h-5 text-slate-400" />
              </label>

              {/* Option B: UPI */}
              <label
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI - Google Pay / PhonePe'
                    ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI - Google Pay / PhonePe'}
                    onChange={() => setPaymentMethod('UPI - Google Pay / PhonePe')}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                      UPI (Google Pay / PhonePe / Paytm)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Scan QR or pay via college VPA
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  UPI
                </span>
              </label>

              {/* Option C: Cash on Delivery */}
              <label
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Campus Delivery'
                    ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Campus Delivery'}
                    onChange={() => setPaymentMethod('Cash on Campus Delivery')}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                      Cash on Campus Handover
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Pay cash directly to fellow student runner
                    </p>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-slate-400" />
              </label>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & Confirmation */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({bill.itemsCount}):</span>
                <span className="font-semibold text-slate-900">₹{bill.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Campus Delivery Fee:</span>
                <span className="font-semibold text-slate-900">
                  {bill.deliveryFee === 0 ? 'FREE' : `₹${bill.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Student Runner Fee:</span>
                <span className="font-semibold text-slate-900">₹{bill.platformFee}</span>
              </div>
              {bill.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Student Coupon:</span>
                  <span>- ₹{bill.discount}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <span className="font-extrabold text-sm text-slate-900">Total Payable:</span>
              <span className="text-xl font-black text-slate-900">₹{bill.finalTotal}</span>
            </div>

            <div className="bg-amber-50 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Estimated Delivery: <strong>15 - 20 mins</strong></span>
            </div>

            <button
              id="confirm-place-order-btn"
              disabled={isSubmitting}
              onClick={handlePlaceOrder}
              className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-black text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Dispatching Order...</span>
              ) : (
                <>
                  <span>Place Mock Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
