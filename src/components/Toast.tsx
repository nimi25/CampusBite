/**
 * CampusBite - Toast Notification Component
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      id="campusbite-toast"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
      <span>{toast}</span>
    </div>
  );
};
