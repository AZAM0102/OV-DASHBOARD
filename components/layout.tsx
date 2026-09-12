"use client";

import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Box,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  Menu,
  RotateCcw,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const nav = [
  ["Dashboard", "/", LayoutDashboard],
  ["Orders", "/orders", ShoppingCart],
  ["Inventory", "/inventory", Box],
  ["Returns", "/returns", RotateCcw],
  ["Shipping / Labels", "/shipping", Truck],
  ["Analytics", "/analytics", BarChart3],
  ["AI Assistant", "/ai-assistant", Sparkles],
  ["Marketplace", "/marketplace", Store],
  ["Settings", "/settings", Settings],
  ["Billing", "/billing", CreditCard],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f6f9fd]">
      <header className="fixed inset-x-0 top-0 z-40 h-[88px] border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="flex h-full items-center">
          <Link href="/" className="flex w-[250px] shrink-0 items-center gap-3 px-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10284f] shadow-sm">
              <ShoppingCart size={27} className="text-[#ff7a00]" strokeWidth={2.7} />
            </span>
            <span>
              <b className="block text-[20px] font-black tracking-[-.6px] text-[#10284f]">OV DASHBOARD</b>
              <small className="block text-xs font-semibold tracking-wide text-[#ff7a00]">Manage · Grow · Sell Smarter</small>
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-between gap-6 px-6">
            <div className="relative hidden max-w-[685px] flex-1 md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
              <input
                aria-label="Search"
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#f7f9fc] pl-11 pr-20 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
                placeholder="Search orders, products, SKU, or anything..."
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500">Ctrl K</kbd>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <button aria-label="Notifications" className="relative rounded-xl p-2.5 hover:bg-slate-100">
                <Bell size={21} className="text-[#10284f]" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff7a00]" />
              </button>
              <div className="hidden h-10 w-px bg-slate-200 sm:block" />
              <button className="flex items-center gap-3" type="button">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#10284f] text-lg font-bold text-white">A</span>
                <span className="hidden text-left sm:block">
                  <b className="block text-sm text-[#14233f]">Azam Ansari</b>
                  <small className="text-xs text-slate-500">Seller</small>
                </span>
                <ChevronDown size={16} className="text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-24 z-50 rounded-xl bg-[#10284f] p-3 text-white shadow-lg lg:hidden"
      >
        <Menu size={20} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#10284f]/20 lg:hidden"
        />
      )}

      <aside className={`fixed bottom-0 left-0 top-[88px] z-50 w-[250px] border-r border-slate-200 bg-white p-4 shadow-[5px_0_30px_rgba(22,43,76,.04)] transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
          <X size={18} />
        </button>

        <nav className="flex h-full flex-col">
          <div className="space-y-1">
            {nav.map(([label, href, Icon]) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] transition ${active ? "bg-[#ff7a00] font-semibold text-white shadow-sm" : "font-medium text-[#183154] hover:bg-slate-50"}`}
                >
                  <Icon size={20} strokeWidth={1.9} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto rounded-2xl border border-blue-100 bg-gradient-to-br from-[#eff6ff] to-white p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff7a00] shadow-sm">
              <ShoppingCart size={27} />
            </div>
            <h3 className="text-[18px] font-extrabold leading-tight text-[#10284f]">Simplify<br />Your Selling<br />Journey</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600">One Dashboard.<br />All Marketplaces.</p>
            <Link href="/marketplace" aria-label="Open marketplace connections" className="mt-3 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#10284f] text-white">
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </nav>
      </aside>

      <section className="ml-0 pt-[88px] lg:ml-[250px]">{children}</section>
    </main>
  );
}
