/**
 * CampusBite - OrderTrack Screen
 * Screen 8 of 10: Feature 5 - ORDERTRACK
 * 5-stage simulated delivery tracking with manual presentation stepper,
 * runner contact, ETA countdown, and order receipt.
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStage } from '../types';
import {
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Bike,
  Home,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  ShoppingBag,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const OrderTrackScreen: React.FC = () => {
  const {
    activeOrder,
    advanceOrderStage,
    previousOrderStage,
    setOrderStageManual,
    navigate,
    loadSampleCart,
    placeOrder,
  } = useApp();

  const [autoSimulate, setAutoSimulate] = useState(false);

  // Auto progression simulation if toggled on
  useEffect(() => {
    let interval: any;
    if (autoSimulate && activeOrder && activeOrder.currentStage < 5) {
      interval = setInterval(() => {
        advanceOrderStage();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoSimulate, activeOrder?.currentStage]);

  if (!activeOrder) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
        <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900">No active order to track</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          You don't have any ongoing campus delivery right now. Place a mock order or load a sample order to test the 5 tracking stages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={() => {
              loadSampleCart();
              placeOrder('UPI - Google Pay');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Launch Instant Demo Order
          </button>
          <button
            onClick={() => navigate('budget')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Browse Meals
          </button>
        </div>
      </div>
    );
  }

  const stages: {
    stage: OrderStage;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      stage: 1,
      title: 'Order Confirmed',
      subtitle: 'Restaurant received your order',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      stage: 2,
      title: 'Preparing in Kitchen',
      subtitle: 'Chef is cooking your fresh hot meal',
      icon: <ChefHat className="w-5 h-5" />,
    },
    {
      stage: 3,
      title: 'Picked Up by Runner',
      subtitle: 'Packed with zero plastic packaging',
      icon: <PackageCheck className="w-5 h-5" />,
    },
    {
      stage: 4,
      title: 'On the Way to Hostel',
      subtitle: 'Campus runner entering hostel gate',
      icon: <Bike className="w-5 h-5" />,
    },
    {
      stage: 5,
      title: 'Delivered! Enjoy',
      subtitle: 'Handed over at your campus spot',
      icon: <Home className="w-5 h-5" />,
    },
  ];

  const currentStageInfo = stages.find((s) => s.stage === activeOrder.currentStage)!;
  const progressPercent = ((activeOrder.currentStage - 1) / 4) * 100;

  return (
    <div id="ordertrack-screen" className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* 1. Header & Live Status Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Order #{activeOrder.id}
              </span>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Feature 5 • OrderTrack
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              {currentStageInfo.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{currentStageInfo.subtitle}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              Estimated Delivery
            </span>
            <span className="text-xl font-black text-orange-600 flex items-center justify-end gap-1">
              <Clock className="w-4 h-4" />
              {activeOrder.currentStage === 5 ? 'Arrived!' : activeOrder.estimatedDeliveryTime}
            </span>
          </div>
        </div>

        {/* 2. Stepper Progress Bar */}
        <div className="space-y-4">
          {/* Visual Bar */}
          <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 5 Stages Node Icons */}
          <div className="grid grid-cols-5 gap-1 text-center">
            {stages.map((s) => {
              const isPast = activeOrder.currentStage > s.stage;
              const isCurrent = activeOrder.currentStage === s.stage;

              return (
                <button
                  key={s.stage}
                  onClick={() => setOrderStageManual(s.stage)}
                  className="flex flex-col items-center group focus:outline-hidden"
                  title={`Jump to stage: ${s.title}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-110 ring-4 ring-orange-100'
                        : isPast
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold mt-1.5 line-clamp-1 ${
                      isCurrent
                        ? 'text-orange-600'
                        : isPast
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. MBA Classroom Presentation Stepper Controls */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {activeOrder.currentStage}
            </span>
            <span>Stage {activeOrder.currentStage} of 5</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="ordertrack-prev-stage-btn"
              onClick={previousOrderStage}
              disabled={activeOrder.currentStage <= 1}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Stage</span>
            </button>

            <button
              id="ordertrack-next-stage-btn"
              onClick={advanceOrderStage}
              disabled={activeOrder.currentStage >= 5}
              className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 font-bold text-white shadow-xs disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setAutoSimulate(!autoSimulate)}
              className={`px-2.5 py-1.5 rounded-xl font-semibold border transition-colors flex items-center gap-1 ${
                autoSimulate
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle automatic 5-second stage progression"
            >
              <RotateCw className={`w-3 h-3 ${autoSimulate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoSimulate ? 'Auto ON' : 'Auto Sim'}</span>
            </button>
          </div>
        </div>

        {/* 4. Campus Runner Details */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-base text-white shrink-0">
              🚴
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">
                Assigned Student Runner
              </span>
              <h4 className="font-bold text-sm truncate">{activeOrder.runnerName}</h4>
              <p className="text-xs text-slate-400 truncate">
                Delivering to: {activeOrder.deliveryLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${activeOrder.runnerPhone}`}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors"
              title="Call Runner"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
            </a>
            <button
              onClick={() => alert(`Connecting with ${activeOrder.runnerName} on Campus Intercom`)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors"
              title="Chat with Runner"
            >
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Order Receipt Details */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-orange-600" />
            Order Receipt & Breakdown
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Placed at {activeOrder.orderTime}
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {activeOrder.items.map(({ foodItem, quantity }) => (
            <div key={foodItem.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 w-5">{quantity}x</span>
                <span className="text-slate-700">{foodItem.name}</span>
              </div>
              <span className="font-bold text-slate-900">
                ₹{foodItem.price * quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-900">₹{activeOrder.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span className="font-semibold text-slate-900">
              {activeOrder.deliveryFee === 0 ? 'FREE' : `₹${activeOrder.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Runner Fee:</span>
            <span className="font-semibold text-slate-900">₹{activeOrder.platformFee}</span>
          </div>
          {activeOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Student Discount:</span>
              <span>- ₹{activeOrder.discount}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
            <span>Total Paid ({activeOrder.paymentMethod}):</span>
            <span>₹{activeOrder.finalTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
