/**
 * CampusBite - Classroom Demonstration Controller
 * Built specifically for the MBA Digital Product Management CIA 1 Presentation.
 * Provides instant jump buttons to all 6 evaluation pillars and preset state loaders.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  DollarSign,
  Zap,
  Users,
  Receipt,
  Truck,
  CalendarDays,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  ShoppingBag,
} from 'lucide-react';

export const ClassroomDemoBar: React.FC = () => {
  const {
    navigate,
    screen,
    setBudgetTier,
    setQuickPick,
    loadSampleCart,
    loadSampleGroupOrder,
    activeOrder,
    placeOrder,
    resetAllData,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleBudgetBites = () => {
    setBudgetTier('under99');
    navigate('budget');
  };

  const handleQuickPick = () => {
    setQuickPick('hungry');
    navigate('home');
  };

  const handleClearBill = () => {
    loadSampleCart();
    navigate('cart');
  };

  const handleOrderTrack = () => {
    if (!activeOrder) {
      // Create quick order if none active
      loadSampleCart();
      placeOrder('UPI - Google Pay');
    } else {
      navigate('track');
    }
  };

  return (
    <aside
      id="classroom-demo-bar"
      aria-label="MBA CIA 1 Evaluation Bar"
      className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs shadow-md transition-all sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Project Header Tag */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-500/20 text-orange-400 p-1 rounded-md flex items-center gap-1 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">MBA CIA 1 Prototype</span>
            <span className="xs:hidden">CIA 1</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 font-medium hidden md:inline">
            Quick Jump to 6 Project Features:
          </span>
        </div>

        {/* Feature Jump Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            id="demo-nav-budget"
            onClick={handleBudgetBites}
            title="Feature 1: BudgetBites (Under ₹99, ₹149, ₹199)"
            className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
              screen === 'budget'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <DollarSign className="w-3 h-3 text-orange-400" />
            <span>1. BudgetBites</span>
          </button>

          <button
            id="demo-nav-quickpick"
            onClick={handleQuickPick}
            title="Feature 2: QuickPick (Personalized Mood Recommendations)"
            className="px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>2. QuickPick</span>
          </button>

          <button
            id="demo-nav-group"
            onClick={loadSampleGroupOrder}
            title="Feature 3: GroupOrder (Roommate Squad Bill Split)"
            className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
              screen === 'group'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3 h-3 text-cyan-400" />
            <span>3. GroupOrder</span>
          </button>

          <button
            id="demo-nav-clearbill"
            onClick={handleClearBill}
            title="Feature 4: ClearBill (Transparent Pricing & ₹0 Junk Fees)"
            className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
              screen === 'cart'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Receipt className="w-3 h-3 text-emerald-400" />
            <span>4. ClearBill</span>
          </button>

          <button
            id="demo-nav-track"
            onClick={handleOrderTrack}
            title="Feature 5: OrderTrack (5-Stage Simulated Campus Delivery)"
            className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
              screen === 'track'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Truck className="w-3 h-3 text-sky-400" />
            <span>5. OrderTrack</span>
          </button>

          <button
            id="demo-nav-mealpass"
            onClick={() => navigate('mealpass')}
            title="Feature 6: MealPass (Weekly Mess Plan Subscription)"
            className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
              screen === 'mealpass'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CalendarDays className="w-3 h-3 text-purple-400" />
            <span>6. MealPass</span>
          </button>
        </div>

        {/* Demo Tools: Toggle Info & Reset */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            id="demo-reset-state"
            onClick={resetAllData}
            title="Reset prototype state to initial demo defaults"
            className="p-1 text-slate-400 hover:text-white rounded bg-slate-800/80 hover:bg-slate-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            id="demo-toggle-details"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white rounded bg-slate-800/80 hover:bg-slate-700 flex items-center"
            title="Toggle CIA 1 Project Details"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded CIA 1 Project Info Banner */}
      {isExpanded && (
        <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-3 text-slate-300 text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="font-semibold text-orange-400 block mb-1">MBA CIA 1 Problem Statement:</span>
              <p className="text-slate-400 leading-relaxed">
                College students suffer from repetitive hostel mess food, predatory surge fees on commercial apps, and tedious manual bill splitting among roommates.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-1">CampusBite Solution:</span>
              <p className="text-slate-400 leading-relaxed">
                A hyper-local campus food network with meals capped at ₹99/₹149/₹199, transparent ₹5 runner fee, 1-click roommate bill calculation, and weekly meal passes.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">Demo Quick Actions:</span>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={loadSampleCart}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-2 py-1 rounded text-[11px] flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" /> Fill Demo Cart
                </button>
                <button
                  onClick={() => navigate('welcome')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded text-[11px]"
                >
                  View Login Screen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
