/**
 * CampusBite - Main Application Root
 * MBA Digital Product Management CIA 1 Project Prototype
 *
 * Core Features:
 * 1. BUDGETBITES: Under ₹99, ₹149, ₹199 filters
 * 2. QUICKPICK: Personalized mood-based recommendations
 * 3. GROUPORDER: Roommate squad basket & automated bill split
 * 4. CLEARBILL: 100% transparent pricing, zero hidden junk fees
 * 5. ORDERTRACK: 5-stage simulated campus delivery tracker
 * 6. MEALPASS: Weekly mess alternative meal plan subscriptions
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ClassroomDemoBar } from './components/ClassroomDemoBar';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { FoodDetailModal } from './components/FoodDetailModal';

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { BudgetBitesScreen } from './screens/BudgetBitesScreen';
import { MealListingScreen } from './screens/MealListingScreen';
import { CartClearBillScreen } from './screens/CartClearBillScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderTrackScreen } from './screens/OrderTrackScreen';
import { GroupOrderScreen } from './screens/GroupOrderScreen';
import { MealPassScreen } from './screens/MealPassScreen';
import { AccountScreen } from './screens/AccountScreen';

const MainContent: React.FC = () => {
  const { screen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* 1. Top Classroom Demonstration Helper Bar */}
      <ClassroomDemoBar />

      {/* 2. CampusBite Collegiate Header */}
      <Navbar />

      {/* 3. Main Screen Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 pb-20 lg:pb-10">
        {screen === 'welcome' && <WelcomeScreen />}
        {screen === 'home' && <HomeScreen />}
        {screen === 'budget' && <BudgetBitesScreen />}
        {screen === 'listing' && <MealListingScreen />}
        {screen === 'cart' && <CartClearBillScreen />}
        {screen === 'checkout' && <CheckoutScreen />}
        {screen === 'track' && <OrderTrackScreen />}
        {screen === 'group' && <GroupOrderScreen />}
        {screen === 'mealpass' && <MealPassScreen />}
        {screen === 'account' && <AccountScreen />}
      </main>

      {/* 4. Food Details Modal (when an item is clicked) */}
      <FoodDetailModal />

      {/* 5. Mobile-First Bottom Navigation Bar */}
      <BottomNav />

      {/* 6. In-App Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
