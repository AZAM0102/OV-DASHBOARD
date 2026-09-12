import { ChevronDown } from "lucide-react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import type { Marketplace, OrderStatus } from "@/lib/data";

export function MarketplaceBadge({ marketplace }: { marketplace: Marketplace }) {
  const config: Record<Marketplace, string> = {
    Amazon: "bg-white text-black border border-slate-200",
    Flipkart: "bg-[#ffe45f] text-[#1561a9]",
    Meesho: "bg-[#8e0d63] text-[#ffd44b]",
  };
  const letter = marketplace === "Amazon" ? "a" : marketplace === "Flipkart" ? "f" : "m";
  return <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base font-black ${config[marketplace]}`}>{letter}</span>;
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, string> = {
    Pending: "bg-amber-50 text-amber-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-violet-50 text-violet-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
    Returned: "bg-orange-50 text-orange-700",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config[status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { className?: string; children?: ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <select {...props} className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium outline-none">{children}</select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
