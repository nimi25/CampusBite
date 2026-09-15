/**
 * CampusBite - Welcome & Student Login Screen
 * Screen 1 of 10: Welcomes the student, introduces value proposition,
 * and provides 1-click login profiles for MBA presentation.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  ShieldCheck,
  Zap,
  Users,
  CalendarDays,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { DEFAULT_USER } from '../data/mockData';

export const WelcomeScreen: React.FC = () => {
  const { navigate, setUser, showToast } = useApp();
  const [studentIdInput, setStudentIdInput] = useState('MBA2026-084');
  const [nameInput, setNameInput] = useState('Aarav Sharma');

  const handleLogin = (name: string, id: string, program: string) => {
    setUser({
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@campus.edu`,
      studentId: id,
      program,
      hostelRoom: 'Hostel Block B, Room 314',
      campusWallet: 450,
      savedPassId: 'pass-lunch-pro',
    });
    showToast(`Welcome back, ${name}!`);
    navigate('home');
  };

  return (
    <div id="welcome-screen" className="min-h-[85vh] flex flex-col justify-center py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <GraduationCap className="w-4 h-4 text-orange-600" />
            <span>MBA Digital Product Management • CIA 1</span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/25 mb-4">
            <UtensilsCrossed className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Campus<span className="text-orange-600">Bite</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-lg mx-auto">
            Smart, transparent campus food delivery & weekly meal planning designed for college students.
          </p>
        </div>

        {/* 4 Core Student Value Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
              ₹
            </div>
            <h4 className="text-xs font-bold text-slate-900">BudgetBites</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Under ₹99, ₹149, ₹199</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">QuickPick</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Hungry, Healthy & Night</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">GroupOrder</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Fair roommate bill splits</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CalendarDays className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">MealPass</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Weekly mess alternatives</p>
          </div>
        </div>

        {/* Student Demo Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 max-w-xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Student Single Sign-On</h3>
              <p className="text-xs text-slate-500">Access campus discounts & room delivery</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Campus Portal
            </span>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div className="space-y-2.5 mb-6">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick 1-Click Demo Logins:
            </div>

            <button
              id="login-profile-aarav"
              onClick={() => handleLogin('Aarav Sharma', 'MBA2026-084', 'MBA Digital Product Management')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100/80 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  AS
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                    Aarav Sharma
                  </div>
                  <div className="text-xs text-slate-500">
                    MBA Batch '26 • ID: MBA2026-084
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="login-profile-ananya"
              onClick={() => handleLogin('Ananya Iyer', 'BT2025-142', 'B.Tech Computer Science')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Ananya Iyer</div>
                  <div className="text-xs text-slate-500">
                    B.Tech CS Batch '25 • ID: BT2025-142
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Custom Student ID Option */}
          <div className="pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or enter your Name & Student ID:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Full Name"
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
                  />
                  <input
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    placeholder="Student ID"
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                id="btn-login-custom"
                onClick={() =>
                  handleLogin(
                    nameInput || 'Student Guest',
                    studentIdInput || 'CAMPUS-DEMO',
                    'College Scholar'
                  )
                }
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter CampusBite App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
