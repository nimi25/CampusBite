/**
 * CampusBite - AppContext & State Manager
 * Handles Cart, ClearBill calculation, GroupOrder split logic,
 * OrderTrack state machine, MealPass subscriptions, and MBA Demo presets.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenType,
  BudgetTier,
  QuickPickCategory,
  FoodItem,
  CartItem,
  GroupOrder,
  GroupMember,
  GroupOrderItem,
  Order,
  OrderStage,
  MealPlan,
  Coupon,
  StudentUser,
} from '../types';
import {
  DEFAULT_USER,
  FOOD_ITEMS,
  AVAILABLE_COUPONS,
  INITIAL_GROUP_MEMBERS,
  CAMPUS_LOCATIONS,
  MEAL_PLANS,
} from '../data/mockData';

interface ClearBillSummary {
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  packagingCharges: number;
  finalTotal: number;
  itemsCount: number;
  savingsTotal: number;
}

interface AppContextType {
  // Navigation
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  navigate: (screen: ScreenType) => void;

  // Student Profile
  user: StudentUser;
  setUser: React.Dispatch<React.SetStateAction<StudentUser>>;
  deliveryLocation: string;
  setDeliveryLocation: (loc: string) => void;

  // Food Discovery & Filters
  budgetTier: BudgetTier;
  setBudgetTier: (tier: BudgetTier) => void;
  quickPick: QuickPickCategory | null;
  setQuickPick: (pick: QuickPickCategory | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFood: FoodItem | null;
  setSelectedFood: (item: FoodItem | null) => void;

  // Cart & ClearBill
  cart: CartItem[];
  addToCart: (food: FoodItem, quantity?: number, notes?: string) => void;
  updateCartQuantity: (foodId: string, delta: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  bill: ClearBillSummary;

  // GroupOrder Feature
  groupOrder: GroupOrder;
  setGroupOrderName: (name: string) => void;
  addGroupMember: (name: string) => void;
  removeGroupMember: (memberId: string) => void;
  addItemToGroupOrder: (memberId: string, food: FoodItem) => void;
  removeGroupOrderItem: (itemId: string) => void;
  clearGroupOrder: () => void;
  getGroupMemberShare: (memberId: string) => { itemsCost: number; splitDelivery: number; splitPlatform: number; totalDue: number };

  // Order & OrderTrack Feature
  activeOrder: Order | null;
  orderHistory: Order[];
  placeOrder: (paymentMethod: string, notes?: string) => Order;
  advanceOrderStage: () => void;
  previousOrderStage: () => void;
  setOrderStageManual: (stage: OrderStage) => void;
  cancelActiveOrder: () => void;

  // MealPass Feature
  activeMealPlan: MealPlan | null;
  subscribeMealPlan: (plan: MealPlan) => void;
  cancelMealPlan: () => void;

  // UI Toast & MBA Presentation shortcuts
  toast: string | null;
  showToast: (msg: string) => void;
  loadSampleCart: () => void;
  loadSampleGroupOrder: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [screen, setScreen] = useState<ScreenType>('home');

  // Student Profile
  const [user, setUser] = useState<StudentUser>(() => {
    const saved = localStorage.getItem('cb_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [deliveryLocation, setDeliveryLocation] = useState<string>(
    CAMPUS_LOCATIONS[0]
  );

  // Filters & Discovery
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('all');
  const [quickPick, setQuickPick] = useState<QuickPickCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Persist Cart & User to localStorage
  useEffect(() => {
    localStorage.setItem('cb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cb_user', JSON.stringify(user));
  }, [user]);

  // GroupOrder State
  const [groupOrder, setGroupOrder] = useState<GroupOrder>(() => {
    const saved = localStorage.getItem('cb_group_order');
    if (saved) return JSON.parse(saved);
    return {
      id: 'grp-404',
      name: 'Hostel 3rd Floor Late-Night Squad',
      code: 'CAMPUS-892',
      hostName: 'Aarav (You)',
      members: INITIAL_GROUP_MEMBERS,
      items: [
        {
          id: 'gi-1',
          memberId: 'mem-1',
          memberName: 'Aarav (You)',
          foodItem: FOOD_ITEMS[1], // Midnight Maggi
          quantity: 1,
        },
        {
          id: 'gi-2',
          memberId: 'mem-2',
          memberName: 'Rohan Verma',
          foodItem: FOOD_ITEMS[6], // Double Egg Chicken Roll
          quantity: 1,
        },
        {
          id: 'gi-3',
          memberId: 'mem-3',
          memberName: 'Ananya Iyer',
          foodItem: FOOD_ITEMS[5], // Ghee Roast Dosa
          quantity: 1,
        },
        {
          id: 'gi-4',
          memberId: 'mem-4',
          memberName: 'Kabir Mehta',
          foodItem: FOOD_ITEMS[0], // Samosa Pav + Chai
          quantity: 2,
        },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('cb_group_order', JSON.stringify(groupOrder));
  }, [groupOrder]);

  // Active Order & History
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('cb_active_order');
    return saved ? JSON.parse(saved) : null;
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cb_order_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('cb_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('cb_active_order');
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem('cb_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // MealPass subscription
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan | null>(() => {
    const saved = localStorage.getItem('cb_active_meal_plan');
    if (saved) return JSON.parse(saved);
    return MEAL_PLANS[0]; // Default active Weekday Lunch Pass for demonstration
  });

  useEffect(() => {
    if (activeMealPlan) {
      localStorage.setItem('cb_active_meal_plan', JSON.stringify(activeMealPlan));
    } else {
      localStorage.removeItem('cb_active_meal_plan');
    }
  }, [activeMealPlan]);

  // Bill Calculations (CLEARBILL Engine)
  const calculateBill = (): ClearBillSummary => {
    const subtotal = cart.reduce((acc, item) => acc + item.foodItem.price * item.quantity, 0);
    const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Free delivery on orders ₹199+
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 199 ? 0 : 15;
    // Flat ₹5 student platform runner convenience fee
    const platformFee = subtotal === 0 ? 0 : 5;
    // ₹0 packaging charge policy
    const packagingCharges = 0;

    let discount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minSubtotal) {
      discount = appliedCoupon.discount;
    }

    const finalTotal = Math.max(0, subtotal + deliveryFee + platformFee + packagingCharges - discount);

    // Calculate total savings for student delight
    const originalSubtotal = cart.reduce(
      (acc, item) => acc + (item.foodItem.originalPrice || item.foodItem.price) * item.quantity,
      0
    );
    const menuDiscount = originalSubtotal - subtotal;
    const deliverySaved = subtotal >= 199 ? 15 : 0;
    const savingsTotal = menuDiscount + discount + deliverySaved;

    return {
      subtotal,
      deliveryFee,
      platformFee,
      discount,
      packagingCharges,
      finalTotal,
      itemsCount,
      savingsTotal,
    };
  };

  const bill = calculateBill();

  // Cart Handlers
  const addToCart = (food: FoodItem, quantity: number = 1, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodItem.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodItem.id === food.id ? { ...item, quantity: item.quantity + quantity, notes } : item
        );
      }
      return [...prev, { foodItem: food, quantity, notes }];
    });
    showToast(`Added "${food.name}" to cart!`);
  };

  const updateCartQuantity = (foodId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.foodItem.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (foodId: string) => {
    setCart((prev) => prev.filter((item) => item.foodItem.id !== foodId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code. Try CAMPUS50 or FIRSTBITE!');
      return false;
    }
    if (bill.subtotal < found.minSubtotal) {
      showToast(`Add ₹${found.minSubtotal - bill.subtotal} more to use ${found.code}`);
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon applied! Saved ₹${found.discount}`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // GroupOrder Handlers
  const setGroupOrderName = (name: string) => {
    setGroupOrder((prev) => ({ ...prev, name }));
  };

  const addGroupMember = (name: string) => {
    if (!name.trim()) return;
    const avatars = ['🧑‍🎨', '👩‍💻', '👨‍🔬', '👩‍🎓', '🧑‍🚀', '⚡'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newMember: GroupMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      avatar: randomAvatar,
    };
    setGroupOrder((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
    showToast(`Added ${name} to group order!`);
  };

  const removeGroupMember = (memberId: string) => {
    setGroupOrder((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId),
      items: prev.items.filter((item) => item.memberId !== memberId),
    }));
    showToast('Member and their items removed');
  };

  const addItemToGroupOrder = (memberId: string, food: FoodItem) => {
    const member = groupOrder.members.find((m) => m.id === memberId);
    if (!member) return;

    setGroupOrder((prev) => {
      const existing = prev.items.find(
        (it) => it.memberId === memberId && it.foodItem.id === food.id
      );
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((it) =>
            it.id === existing.id ? { ...it, quantity: it.quantity + 1 } : it
          ),
        };
      }
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            id: `gi-${Date.now()}-${Math.random()}`,
            memberId,
            memberName: member.name,
            foodItem: food,
            quantity: 1,
          },
        ],
      };
    });
    showToast(`Added ${food.name} for ${member.name}`);
  };

  const removeGroupOrderItem = (itemId: string) => {
    setGroupOrder((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== itemId),
    }));
  };

  const clearGroupOrder = () => {
    setGroupOrder((prev) => ({
      ...prev,
      items: [],
    }));
    showToast('Group basket cleared');
  };

  const getGroupMemberShare = (memberId: string) => {
    const memberItems = groupOrder.items.filter((item) => item.memberId === memberId);
    const itemsCost = memberItems.reduce(
      (acc, it) => acc + it.foodItem.price * it.quantity,
      0
    );

    const activeMembersCount = Math.max(1, groupOrder.members.length);
    // Group delivery & platform fee split equally
    const groupDeliveryFee = 15; // shared delivery
    const groupPlatformFee = 5; // shared runner fee
    const splitDelivery = Math.round(groupDeliveryFee / activeMembersCount);
    const splitPlatform = Math.round(groupPlatformFee / activeMembersCount);
    const totalDue = itemsCost + (itemsCost > 0 ? splitDelivery + splitPlatform : 0);

    return {
      itemsCost,
      splitDelivery,
      splitPlatform,
      totalDue,
    };
  };

  // Order Placement & ORDERTRACK Stepper
  const placeOrder = (paymentMethod: string, notes?: string): Order => {
    const orderId = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
    const runners = ['Vikram Singh (Campus Runner)', 'Pooja Nair (Campus Runner)', 'Rohit Deshmukh (Hostel Rep)'];
    const randomRunner = runners[Math.floor(Math.random() * runners.length)];

    const now = new Date();
    const orderTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const eta = new Date(now.getTime() + 18 * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      subtotal: bill.subtotal,
      deliveryFee: bill.deliveryFee,
      platformFee: bill.platformFee,
      discount: bill.discount,
      finalTotal: bill.finalTotal,
      deliveryLocation,
      paymentMethod,
      orderTime: orderTimeStr,
      estimatedDeliveryTime: eta,
      runnerName: randomRunner,
      runnerPhone: '+91 98765 43210',
      currentStage: 1, // Order Confirmed
      isCompleted: false,
    };

    setActiveOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);
    clearCart();
    setScreen('track');
    showToast(`Order #${orderId} placed successfully!`);
    return newOrder;
  };

  const advanceOrderStage = () => {
    if (!activeOrder) return;
    if (activeOrder.currentStage < 5) {
      const nextStage = (activeOrder.currentStage + 1) as OrderStage;
      const isDone = nextStage === 5;
      const updated: Order = {
        ...activeOrder,
        currentStage: nextStage,
        isCompleted: isDone,
      };
      setActiveOrder(updated);
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === activeOrder.id ? updated : o))
      );
      showToast(`Order status updated to stage ${nextStage}!`);
    } else {
      showToast('Order already delivered!');
    }
  };

  const previousOrderStage = () => {
    if (!activeOrder) return;
    if (activeOrder.currentStage > 1) {
      const prevStage = (activeOrder.currentStage - 1) as OrderStage;
      const updated: Order = {
        ...activeOrder,
        currentStage: prevStage,
        isCompleted: false,
      };
      setActiveOrder(updated);
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === activeOrder.id ? updated : o))
      );
      showToast(`Order status moved back to stage ${prevStage}`);
    }
  };

  const setOrderStageManual = (stage: OrderStage) => {
    if (!activeOrder) return;
    const updated: Order = {
      ...activeOrder,
      currentStage: stage,
      isCompleted: stage === 5,
    };
    setActiveOrder(updated);
    setOrderHistory((prev) =>
      prev.map((o) => (o.id === activeOrder.id ? updated : o))
    );
  };

  const cancelActiveOrder = () => {
    if (!activeOrder) return;
    showToast(`Order #${activeOrder.id} cancelled`);
    setActiveOrder(null);
    setScreen('home');
  };

  // MealPass Subscriptions
  const subscribeMealPlan = (plan: MealPlan) => {
    setActiveMealPlan(plan);
    setUser((prev) => ({ ...prev, savedPassId: plan.id }));
    showToast(`Subscribed to ${plan.name}! Saved ₹${plan.savings}/week`);
  };

  const cancelMealPlan = () => {
    setActiveMealPlan(null);
    setUser((prev) => ({ ...prev, savedPassId: undefined }));
    showToast('Meal pass subscription paused');
  };

  // MBA Classroom Demonstration Helpers
  const loadSampleCart = () => {
    setCart([
      { foodItem: FOOD_ITEMS[1], quantity: 2 }, // 2x Midnight Cheese Maggi
      { foodItem: FOOD_ITEMS[6], quantity: 1 }, // 1x Chicken Biryani Hostel Box
      { foodItem: FOOD_ITEMS[4], quantity: 2 }, // 2x Bun Maska + Chai
    ]);
    setAppliedCoupon(AVAILABLE_COUPONS[0]); // CAMPUS50
    showToast('Sample student feast loaded into Cart!');
    setScreen('cart');
  };

  const loadSampleGroupOrder = () => {
    setScreen('group');
    showToast('Switched to GroupOrder with active student squad!');
  };

  const resetAllData = () => {
    localStorage.clear();
    setCart([]);
    setActiveOrder(null);
    setAppliedCoupon(AVAILABLE_COUPONS[0]);
    setUser(DEFAULT_USER);
    setBudgetTier('all');
    setQuickPick(null);
    setSelectedCategory('All');
    setSearchQuery('');
    setScreen('home');
    showToast('CampusBite demo state reset successfully.');
  };

  const navigate = (newScreen: ScreenType) => {
    setScreen(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        navigate,
        user,
        setUser,
        deliveryLocation,
        setDeliveryLocation,
        budgetTier,
        setBudgetTier,
        quickPick,
        setQuickPick,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedFood,
        setSelectedFood,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        bill,
        groupOrder,
        setGroupOrderName,
        addGroupMember,
        removeGroupMember,
        addItemToGroupOrder,
        removeGroupOrderItem,
        clearGroupOrder,
        getGroupMemberShare,
        activeOrder,
        orderHistory,
        placeOrder,
        advanceOrderStage,
        previousOrderStage,
        setOrderStageManual,
        cancelActiveOrder,
        activeMealPlan,
        subscribeMealPlan,
        cancelMealPlan,
        toast,
        showToast,
        loadSampleCart,
        loadSampleGroupOrder,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
