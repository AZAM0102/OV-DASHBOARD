export type Marketplace = "Amazon" | "Flipkart" | "Meesho";
export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";

export type Order = {
  id: string;
  marketplace: Marketplace;
  product: string;
  sku: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
  emoji: string;
};

export type InventoryItem = {
  product: string;
  sku: string;
  total: number;
  amazon: number;
  flipkart: number;
  meesho: number;
  reorder: number;
  price: number;
  emoji: string;
};

export type FlipkartAccount = {
  id: string;
  name: "THE DUKAAN" | "NUME" | "GOLD-PEARL";
  marketplace: "Flipkart";
  status: "Connected" | "Disconnected";
  lastSync: string;
};

export const flipkartAccounts: FlipkartAccount[] = [
  { id: "the-dukaan", name: "THE DUKAAN", marketplace: "Flipkart", status: "Connected", lastSync: "Not synced yet" },
  { id: "nume", name: "NUME", marketplace: "Flipkart", status: "Connected", lastSync: "Not synced yet" },
  { id: "gold-pearl", name: "GOLD-PEARL", marketplace: "Flipkart", status: "Connected", lastSync: "Not synced yet" },
];

export const orders: Order[] = [
  { id: "#AMZ78452", marketplace: "Amazon", product: "Travel Backpack", sku: "TB-001", customer: "Rahul Kumar", amount: 899, status: "Shipped", date: "14 Aug 2026", emoji: "🎒" },
  { id: "#FLP32891", marketplace: "Flipkart", product: "Water Bottle", sku: "WB-014", customer: "Aman Verma", amount: 599, status: "Pending", date: "14 Aug 2026", emoji: "🧴" },
  { id: "#MSH99231", marketplace: "Meesho", product: "Casual Shoes", sku: "CS-021", customer: "Priya Sharma", amount: 1299, status: "Delivered", date: "13 Aug 2026", emoji: "👟" },
  { id: "#AMZ65821", marketplace: "Amazon", product: "Premium T-shirt", sku: "TS-008", customer: "Mohit Singh", amount: 499, status: "Processing", date: "13 Aug 2026", emoji: "👕" },
  { id: "#FLP77312", marketplace: "Flipkart", product: "Women's Handbag", sku: "HB-031", customer: "Neha Gupta", amount: 1199, status: "Pending", date: "13 Aug 2026", emoji: "👜" },
  { id: "#MSH66142", marketplace: "Meesho", product: "Wireless Earbuds", sku: "WE-003", customer: "Arjun Rao", amount: 799, status: "Shipped", date: "12 Aug 2026", emoji: "🎧" },
  { id: "#AMZ55129", marketplace: "Amazon", product: "Smart Watch", sku: "SW-002", customer: "Vikas Jain", amount: 1899, status: "Delivered", date: "12 Aug 2026", emoji: "⌚" },
  { id: "#FLP44018", marketplace: "Flipkart", product: "Backpack Pro", sku: "BP-003", customer: "Sahil Khan", amount: 1499, status: "Cancelled", date: "11 Aug 2026", emoji: "🎒" },
  { id: "#MSH30981", marketplace: "Meesho", product: "Cotton Shirt", sku: "CS-011", customer: "Rohit Das", amount: 699, status: "Returned", date: "11 Aug 2026", emoji: "👔" },
  { id: "#AMZ22074", marketplace: "Amazon", product: "Laptop Sleeve", sku: "LS-007", customer: "Aditya Patel", amount: 549, status: "Processing", date: "10 Aug 2026", emoji: "💻" },
];

export const inventory: InventoryItem[] = [
  { product: "Wireless Earbuds", sku: "WE-003", total: 42, amazon: 18, flipkart: 14, meesho: 10, reorder: 20, price: 799, emoji: "🎧" },
  { product: "Smart Watch", sku: "SW-002", total: 8, amazon: 4, flipkart: 2, meesho: 2, reorder: 15, price: 1899, emoji: "⌚" },
  { product: "Backpack Pro", sku: "BP-003", total: 10, amazon: 5, flipkart: 3, meesho: 2, reorder: 12, price: 1499, emoji: "🎒" },
  { product: "Travel Backpack", sku: "TB-001", total: 65, amazon: 30, flipkart: 20, meesho: 15, reorder: 20, price: 899, emoji: "🎒" },
  { product: "Water Bottle", sku: "WB-014", total: 128, amazon: 50, flipkart: 44, meesho: 34, reorder: 25, price: 599, emoji: "🧴" },
  { product: "Women's Handbag", sku: "HB-031", total: 17, amazon: 6, flipkart: 7, meesho: 4, reorder: 15, price: 1199, emoji: "👜" },
];

export const marketplaceStats = [
  { name: "Amazon", orders: 542, sales: "₹1,08,420", share: 43 },
  { name: "Flipkart", orders: 421, sales: "₹82,740", share: 34 },
  { name: "Meesho", orders: 284, sales: "₹57,760", share: 23 },
];
