/**
 * CampusBite - Types & Data Models
 * MBA Digital Product Management CIA 1 Project Prototype
 */

export type ScreenType =
  | 'welcome'
  | 'home'
  | 'budget'
  | 'listing'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'track'
  | 'group'
  | 'mealpass'
  | 'account';

export type BudgetTier = 'all' | 'under99' | 'under149' | 'under199';

export type QuickPickCategory = 'hungry' | 'healthy' | 'latenight' | 'bestvalue';

export interface FoodItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  price: number;
  originalPrice?: number;
  category: 'North Indian' | 'South Indian' | 'Fast Food' | 'Healthy' | 'Late Night' | 'Beverages';
  description: string;
  image: string;
  isVeg: boolean;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  calories?: number;
  tags: string[];
  budgetTier: 'under99' | 'under149' | 'under199';
  quickPicks: QuickPickCategory[];
  isSpecial?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  campusLocation: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  image: string;
  tagline: string;
  cuisine: string[];
  isPopular?: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  notes?: string;
  assignedTo?: string; // For group ordering assignment
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isHost?: boolean;
}

export interface GroupOrderItem {
  id: string;
  memberId: string;
  memberName: string;
  foodItem: FoodItem;
  quantity: number;
}

export interface GroupOrder {
  id: string;
  name: string;
  code: string;
  hostName: string;
  members: GroupMember[];
  items: GroupOrderItem[];
}

export type OrderStage = 1 | 2 | 3 | 4 | 5;

export interface OrderStageInfo {
  stage: OrderStage;
  title: string;
  subtitle: string;
  estimatedTime: string;
  iconName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  finalTotal: number;
  deliveryLocation: string;
  paymentMethod: string;
  orderTime: string;
  estimatedDeliveryTime: string;
  runnerName: string;
  runnerPhone: string;
  currentStage: OrderStage;
  isCompleted: boolean;
}

export interface MealPlanDay {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  lunch: string;
  dinner?: string;
  specialPerk?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  subtitle: string;
  weeklyPrice: number;
  regularPrice: number;
  savings: number;
  description: string;
  badge: string;
  mealsIncluded: string;
  popularFor: string;
  schedule: MealPlanDay[];
}

export interface Coupon {
  code: string;
  discount: number;
  minSubtotal: number;
  description: string;
}

export interface StudentUser {
  name: string;
  email: string;
  studentId: string;
  program: string;
  hostelRoom: string;
  campusWallet: number;
  savedPassId?: string;
}
