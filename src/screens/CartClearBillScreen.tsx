/**
 * CampusBite - Cart & ClearBill Screen
 * Screen 6 of 10: Feature 4 - CLEARBILL
 * 100% transparent pricing breakdown, instant reactive calculations,
 * and zero hidden junk fees.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_COUPONS } from '../data/mockData';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Receipt,
  Sparkles,
} from 'lucide-react';

export const CartClearBillScreen: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    bill,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigate,
    loadSampleCart,
  } = useApp();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [showFeeInfoModal, setShowFeeInfoModal] = useState(false);

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
    setCouponCodeInput('');
  };

  if (cart.length === 0) {
    return (
      <div
        id="empty-cart-view"
        className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs"
      >
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your campus cart is empty</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any dishes yet. Check out BudgetBites under ₹99 or pick a late-night craving!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            id="empty-cart-budget-btn"
            onClick={() => navigate('budget')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Browse BudgetBites
          </button>
          <button
            id="empty-cart-demo-fill-btn"
            onClick={loadSampleCart}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Load Demo Feast (3 items)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-clearbill-screen" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              ClearBill & Cart
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Feature 4 • ClearBill
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent pricing: What you see is what you pay. No hidden charges.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Order Items ({bill.itemsCount})
            </h3>

            <div className="divide-y divide-slate-100">
              {cart.map(({ foodItem, quantity, notes }) => (
                <div
                  key={foodItem.id}
                  id={`cart-item-${foodItem.id}`}
                  className="py-3.5 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={foodItem.image}
                      alt={foodItem.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            foodItem.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {foodItem.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {foodItem.restaurantName}
                      </p>
                      {notes && (
                        <p className="text-[10px] text-orange-600 italic truncate mt-0.5">
                          "{notes}"
                        </p>
                      )}
                      <div className="text-xs font-bold text-slate-900 mt-1">
                        ₹{foodItem.price} × {quantity} = ₹{foodItem.price * quantity}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center bg-slate-100 rounded-xl p-0.5 shrink-0">
                    <button
                      onClick={() => updateCartQuantity(foodItem.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(foodItem.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coupon Selector */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                Student Coupon Codes
              </span>
              {appliedCoupon && (
                <button
                  onClick={removeCoupon}
                  className="text-[11px] font-bold text-rose-600 hover:underline"
                >
                  Remove Coupon
                </button>
              )}
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                className="flex-1 text-xs uppercase font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
              />
              <button
                onClick={() => handleApplyCoupon(couponCodeInput)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Available Coupon Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {AVAILABLE_COUPONS.map((coupon) => {
                const isSelected = appliedCoupon?.code === coupon.code;
                const isEligible = bill.subtotal >= coupon.minSubtotal;

                return (
                  <div
                    key={coupon.code}
                    onClick={() => isEligible && handleApplyCoupon(coupon.code)}
                    className={`p-2.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-400'
                        : isEligible
                        ? 'border-slate-200 bg-slate-50 hover:bg-orange-50/60 cursor-pointer'
                        : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Save ₹{coupon.discount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {coupon.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: CLEARBILL Breakdown Engine */}
        <div className="lg:col-span-5 space-y-4">
          <div
            id="clearbill-calculation-card"
            className="bg-white rounded-3xl border-2 border-emerald-500/30 p-5 shadow-md space-y-4 relative"
          >
            {/* Header Tag */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  ClearBill™ Breakdown
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                100% Transparent
              </span>
            </div>

            {/* Line Items */}
            <div className="space-y-2.5 text-xs text-slate-600">
              {/* Item Subtotal */}
              <div className="flex items-center justify-between">
                <span>Item Subtotal ({bill.itemsCount} items)</span>
                <span className="font-bold text-slate-900">₹{bill.subtotal}</span>
              </div>

              {/* Delivery Fee */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Campus Delivery Partner Fee</span>
                  <button
                    onClick={() => setShowFeeInfoModal(!showFeeInfoModal)}
                    className="text-slate-400 hover:text-slate-600"
                    title="Explain delivery fee"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  {bill.deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600">
                      FREE <span className="line-through text-slate-400 text-[10px]">₹15</span>
                    </span>
                  ) : (
                    <span className="font-bold text-slate-900">₹{bill.deliveryFee}</span>
                  )}
                </div>
              </div>

              {/* Free Delivery Banner if applicable */}
              {bill.subtotal < 199 && (
                <div className="bg-amber-50 text-amber-800 text-[11px] p-2 rounded-xl flex items-center justify-between font-medium">
                  <span>Add ₹{199 - bill.subtotal} more for FREE Delivery!</span>
                  <button
                    onClick={() => navigate('budget')}
                    className="font-bold text-amber-900 underline"
                  >
                    Add snack
                  </button>
                </div>
              )}

              {/* Platform Fee */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Student Runner Platform Fee</span>
                  <span className="text-[10px] text-slate-400">(Flat rate)</span>
                </div>
                <span className="font-bold text-slate-900">₹{bill.platformFee}</span>
              </div>

              {/* Packaging Fee Policy */}
              <div className="flex items-center justify-between text-emerald-700">
                <div className="flex items-center gap-1">
                  <span>Restaurant Packaging Fee</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">
                    Banned by CampusBite
                  </span>
                </div>
                <span className="font-bold">₹0</span>
              </div>

              {/* Discount */}
              {bill.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold bg-emerald-50 p-2 rounded-xl">
                  <span>Student Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{bill.discount}</span>
                </div>
              )}
            </div>

            {/* Total Payable Box */}
            <div className="pt-3 border-t-2 border-dashed border-slate-200">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-extrabold text-slate-900 block">
                    Final Payable Total
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Inclusive of all campus runner fees
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{bill.finalTotal}
                  </span>
                </div>
              </div>

              {/* Student Savings Highlight */}
              {bill.savingsTotal > 0 && (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-2.5 rounded-xl flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Total Student Savings on this order:
                  </span>
                  <span>₹{bill.savingsTotal}</span>
                </div>
              )}
            </div>

            {/* Commercial Apps Comparison Callout */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Why ClearBill matters:
              </div>
              <p className="leading-relaxed">
                Standard commercial apps add ₹35 packaging, ₹45 surge delivery, and ₹12 platform fees. CampusBite caps total extra fees at ₹5-20 inside campus.
              </p>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              id="proceed-to-checkout-btn"
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-black text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center justify-between"
            >
              <span>Proceed to Campus Checkout</span>
              <div className="flex items-center gap-1.5">
                <span>₹{bill.finalTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
