/**
 * CampusBite - Student Account & MBA Project Screen
 * Screen 11: Student Profile, Campus Wallet, Order History,
 * and MBA Digital Product Management CIA 1 Product Overview.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Wallet,
  CalendarDays,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Tag,
  Users,
  Receipt,
  Truck,
  Sparkles,
  CheckCircle,
  Plus,
  ArrowRight,
} from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const { user, setUser, orderHistory, activeMealPlan, navigate, showToast } = useApp();

  const handleAddWalletBalance = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      campusWallet: prev.campusWallet + amount,
    }));
    showToast(`Added ₹${amount} to Campus Student Wallet!`);
  };

  return (
    <div id="account-screen" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* 1. Student Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-orange-600/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.program}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
              <span>ID: <strong>{user.studentId}</strong></span>
              <span>•</span>
              <span>{user.hostelRoom}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('welcome')}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-50"
        >
          Switch Student Profile
        </button>
      </div>

      {/* 2. Campus Wallet & Active MealPass */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campus Student Wallet */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-orange-600" />
              Campus Student Wallet
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Instant 1-Tap Pay
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">₹{user.campusWallet}</span>
            <span className="text-xs text-slate-500">available</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">Quick Top-up:</span>
            <button
              onClick={() => handleAddWalletBalance(100)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              +₹100
            </button>
            <button
              onClick={() => handleAddWalletBalance(200)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              +₹200
            </button>
            <button
              onClick={() => handleAddWalletBalance(500)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              +₹500
            </button>
          </div>
        </div>

        {/* Enrolled MealPass */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-orange-600" />
                Subscribed MealPass
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 mt-2">
              {activeMealPlan ? activeMealPlan.name : 'No Active Pass'}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeMealPlan ? activeMealPlan.mealsIncluded : 'Subscribe to weekday meals to save money.'}
            </p>
          </div>

          <button
            onClick={() => navigate('mealpass')}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 self-start"
          >
            <span>Manage MealPass Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. MBA Digital Product Management CIA 1 Project Overview Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              MBA Digital Product Management • CIA 1 Evaluation Scope
            </h3>
          </div>
          <span className="text-xs text-slate-400">Classroom Prototype</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>CampusBite</strong> addresses student-specific pain points in food delivery: predatory commercial surge pricing, mess food fatigue, and roommate friction during group meal ordering.
        </p>

        {/* 6 Feature Verification Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">1.</span>
            <div>
              <strong className="text-white block">BUDGETBITES</strong>
              <span className="text-slate-400 text-[11px]">Strict budget caps under ₹99, ₹149, and ₹199</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">2.</span>
            <div>
              <strong className="text-white block">QUICKPICK</strong>
              <span className="text-slate-400 text-[11px]">Personalized moods: Hungry, Healthy, Late-night & Value</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">3.</span>
            <div>
              <strong className="text-white block">GROUPORDER</strong>
              <span className="text-slate-400 text-[11px]">Roommate basket with automated bill split & WhatsApp copy</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">4.</span>
            <div>
              <strong className="text-white block">CLEARBILL</strong>
              <span className="text-slate-400 text-[11px]">100% transparent math, ₹5 runner fee, ₹0 packaging</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">5.</span>
            <div>
              <strong className="text-white block">ORDERTRACK</strong>
              <span className="text-slate-400 text-[11px]">5-stage simulated delivery tracking with manual stepper</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2 text-xs">
            <span className="text-amber-400 font-bold">6.</span>
            <div>
              <strong className="text-white block">MEALPASS</strong>
              <span className="text-slate-400 text-[11px]">Weekly meal plan subscription with day-wise menus</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Past Orders History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-600" />
          Recent Campus Orders ({orderHistory.length})
        </h3>

        {orderHistory.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">
            No past orders placed yet in this session.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {orderHistory.map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Order #{order.id}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                      Stage {order.currentStage} of 5
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {order.items.map((i) => `${i.quantity}x ${i.foodItem.name}`).join(', ')}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-slate-900 block">₹{order.finalTotal}</span>
                  <button
                    onClick={() => navigate('track')}
                    className="text-[11px] font-bold text-orange-600 hover:underline"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
