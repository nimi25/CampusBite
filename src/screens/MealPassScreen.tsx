/**
 * CampusBite - MealPass Screen
 * Screen 10 of 10: Feature 6 - MEALPASS
 * Weekly meal planning subscription hub, day-by-day menu schedules,
 * savings comparison vs daily mess costs, and mock plan activation.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MEAL_PLANS } from '../data/mockData';
import { MealPlan } from '../types';
import {
  CalendarDays,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  PauseCircle,
  PlayCircle,
  UtensilsCrossed,
} from 'lucide-react';

export const MealPassScreen: React.FC = () => {
  const { activeMealPlan, subscribeMealPlan, cancelMealPlan, showToast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<MealPlan>(MEAL_PLANS[0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isCurrentPlanActive = activeMealPlan?.id === selectedPlan.id;

  const handleSubscribe = () => {
    subscribeMealPlan(selectedPlan);
    setShowConfirmModal(false);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    showToast(isPaused ? 'MealPass resumed!' : 'MealPass paused for tomorrow.');
  };

  const currentDaySchedule = selectedPlan.schedule[selectedDayIndex] || selectedPlan.schedule[0];

  return (
    <div id="mealpass-screen" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* 1. Feature 6 Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <CalendarDays className="w-3.5 h-3.5 text-amber-200" />
          <span>Feature 6 • Weekly Meal Planning & Pass</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          CampusBite MealPass™
        </h1>
        <p className="text-xs sm:text-sm text-orange-100 max-w-xl leading-relaxed">
          The smart alternative to repetitive hostel mess menus. Lock in healthy, restaurant-grade lunches and dinners delivered on schedule every week.
        </p>

        {/* Active Subscription Status Banner */}
        {activeMealPlan && (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-200 block">
                  Active Subscription:
                </span>
                <span className="text-sm font-black text-white">
                  {activeMealPlan.name}
                </span>
              </div>
            </div>

            <button
              onClick={handleTogglePause}
              className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-orange-50 transition-colors flex items-center gap-1"
            >
              {isPaused ? <PlayCircle className="w-3.5 h-3.5 text-emerald-600" /> : <PauseCircle className="w-3.5 h-3.5 text-amber-600" />}
              <span>{isPaused ? 'Resume Pass' : 'Pause Day'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Plan Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Available Student Weekly Passes
          </h3>
          <span className="text-xs text-slate-500">Save up to 35% vs daily ordering</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MEAL_PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            const isEnrolled = activeMealPlan?.id === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan);
                  setSelectedDayIndex(0);
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                    {isEnrolled && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-sm text-slate-900">{plan.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {plan.mealsIncluded}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-black text-slate-900">
                      ₹{plan.weeklyPrice}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-1.5">
                      ₹{plan.regularPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Save ₹{plan.savings}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Schedule for Selected Plan */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {selectedPlan.name}
              </h2>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                ₹{selectedPlan.weeklyPrice} / week
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{selectedPlan.description}</p>
          </div>

          <button
            id="enroll-mealpass-btn"
            onClick={() => setShowConfirmModal(true)}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentPlanActive ? 'Manage Subscription' : 'Subscribe to Pass'}</span>
          </button>
        </div>

        {/* Day Pills Bar */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Inspect Day-by-Day Menu Schedule:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {selectedPlan.schedule.map((sch, idx) => (
              <button
                key={sch.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  selectedDayIndex === idx
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sch.day}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day's Menu Card */}
        {currentDaySchedule && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900">
                {currentDaySchedule.day}'s Scheduled Campus Meal
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Auto-drop at 1:15 PM & 8:30 PM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentDaySchedule.lunch && (
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                    Midday Lunch (1:15 PM)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {currentDaySchedule.lunch}
                  </p>
                </div>
              )}

              {currentDaySchedule.dinner && (
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    Evening Study Fuel (8:30 PM)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {currentDaySchedule.dinner}
                  </p>
                </div>
              )}
            </div>

            {currentDaySchedule.specialPerk && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Special Perk: {currentDaySchedule.specialPerk}</span>
              </div>
            )}
          </div>
        )}

        {/* Value Comparison Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-amber-700" />
            <span>Economic Value Breakdown for MBA CIA 1 Evaluation:</span>
          </div>
          <p className="leading-relaxed text-amber-800">
            Regular ordering: <strong>₹{selectedPlan.regularPrice}/week</strong> (includes delivery & restaurant charges). <br />
            CampusBite MealPass bulk rate: <strong>₹{selectedPlan.weeklyPrice}/week</strong>. <br />
            Direct student savings: <strong>₹{selectedPlan.savings} per week</strong> (₹{selectedPlan.savings * 4} saved monthly!).
          </p>
        </div>
      </div>

      {/* Mock Subscription Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <CalendarDays className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Confirm MealPass Subscription
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You are activating the <strong>{selectedPlan.name}</strong> for ₹{selectedPlan.weeklyPrice}/week.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Plan Price:</span>
                <span className="font-bold text-slate-900">₹{selectedPlan.weeklyPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-bold text-emerald-600">FREE Campus Delivery</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Savings:</span>
                <span className="font-bold text-emerald-600">₹{selectedPlan.savings}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                id="confirm-mealpass-subscribe-btn"
                onClick={handleSubscribe}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white shadow-md"
              >
                Confirm & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
