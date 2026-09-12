"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  MoreHorizontal,
  Package,
  RotateCcw,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout";
import { MarketplaceBadge, StatusBadge } from "@/components/ui";
import { flipkartAccounts, inventory, orders } from "@/lib/data";

function StatCard({
  icon,
  title,
  value,
  change,
  sub,
  positive = true,
  bars,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  sub: string;
  positive?: boolean;
  bars: number[];
}) {
  return (
    <div className="ov-card ov-fade p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-[#ff7a00]">{icon}</span>
          <span className="text-sm font-medium text-slate-600">{title}</span>
        </div>
        <span className="flex h-12 items-end gap-1">
          {bars.map((height, index) => (
            <i key={`${height}-${index}`} className="w-[7px] rounded-t-md bg-gradient-to-t from-[#ff7a00] to-[#ffd48f]" style={{ height }} />
          ))}
        </span>
      </div>
      <div className="mt-2 text-[27px] font-extrabold tracking-tight text-[#14233f]">{value}</div>
      <div className={`mt-1 flex items-center gap-1 text-sm font-semibold ${positive ? "text-emerald-600" : "text-orange-600"}`}>
        {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
        {change}
        <span className="ml-1 font-normal text-slate-500">{sub}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="ov-scroll mx-auto max-w-[1600px] overflow-x-hidden p-5 md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="ov-fade">
            <h1 className="text-[31px] font-extrabold tracking-[-1px] text-[#10284f]">Good Morning, Azam 👋</h1>
            <p className="mt-1 text-[16px] text-slate-600">Here&apos;s what&apos;s happening with your business today.</p>
          </div>
          <button type="button" className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#183154] shadow-sm">
            <CalendarDays size={17} />
            Today
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <StatCard icon={<ShoppingCart size={21} />} title="Total Orders" value="1,247" change="+12%" sub="vs. last week" bars={[16, 22, 27, 32, 39, 48]} />
          <StatCard icon={<CircleDollarSign size={21} />} title="Total Sales" value="₹2,48,920" change="+18%" sub="vs. last week" bars={[16, 22, 28, 32, 40, 48]} />
          <StatCard icon={<Package size={21} />} title="Pending Orders" value="214" change="+5%" sub="vs. last week" positive={false} bars={[16, 22, 28, 34, 41, 48]} />
          <StatCard icon={<RotateCcw size={21} />} title="Return Requests" value="32" change="-12%" sub="vs. last week" bars={[16, 22, 28, 34, 40, 48]} />
        </div>

        <section className="mt-4">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[20px] font-extrabold text-[#10284f]">My Flipkart Accounts</h2>
              <p className="mt-1 text-sm text-slate-500">Your three Flipkart seller accounts in one dashboard.</p>
            </div>
            <Link href="/marketplace" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Manage Accounts →</Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {flipkartAccounts.map((account) => (
              <div key={account.id} className="ov-card p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(16,40,79,.08)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <MarketplaceBadge marketplace="Flipkart" />
                    <div>
                      <h3 className="font-extrabold text-[#10284f]">{account.name}</h3>
                      <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {account.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-[11px] text-slate-500">Orders</span>
                    <b className="mt-1 block text-sm text-[#10284f]">Awaiting sync</b>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-[11px] text-slate-500">Sales</span>
                    <b className="mt-1 block text-sm text-[#10284f]">Awaiting sync</b>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Last sync</span>
                  <span className="font-semibold text-slate-600">{account.lastSync}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-4 grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_315px]">
          <div className="space-y-4">
            <div className="ov-card ov-fade-2 p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[19px] font-extrabold text-[#10284f]">Order Trend</h2>
                <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
                  <span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#ff7a00]" />Amazon</span>
                  <span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#3478e5]" />Flipkart</span>
                  <span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#dc3b7a]" />Meesho</span>
                </div>
              </div>
              <div className="ov-chart-grid relative h-[160px] overflow-hidden rounded-xl">
                <svg viewBox="0 0 640 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-label="Order trend chart">
                  <polyline points="0,130 65,125 120,72 180,113 240,100 300,90 360,43 420,34 480,62 540,55 590,18 640,32" fill="none" stroke="#ff7a00" strokeWidth="3" />
                  <polyline points="0,145 65,140 120,112 180,126 240,106 300,86 360,104 420,78 480,98 540,84 590,65 640,74" fill="none" stroke="#3478e5" strokeWidth="3" />
                  <polyline points="0,148 65,144 120,122 180,138 240,116 300,92 360,125 420,115 480,126 540,112 590,96 640,104" fill="none" stroke="#dc3b7a" strokeWidth="3" />
                </svg>
                <div className="absolute bottom-1 left-0 right-0 flex justify-between text-[11px] text-slate-500">
                  <span>Aug 8</span><span>Aug 9</span><span>Aug 10</span><span>Aug 11</span><span>Aug 12</span><span>Aug 13</span><span>Aug 14</span>
                </div>
              </div>
            </div>

            <div className="ov-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-[19px] font-extrabold text-[#10284f]">Recent Orders</h2>
                <Link href="/orders" className="text-sm font-medium text-blue-600">View All</Link>
              </div>
              <div className="ov-scroll overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-[#f7f9fc] text-left text-xs text-slate-500">
                    <tr><th className="px-5 py-3">Order ID</th><th>Marketplace</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                        <td className="px-5 py-3 font-semibold text-[#183154]">{order.id}</td>
                        <td><span className="flex items-center gap-2"><MarketplaceBadge marketplace={order.marketplace} />{order.marketplace}</span></td>
                        <td>{order.emoji} {order.product}</td>
                        <td className="font-semibold">₹{order.amount.toLocaleString("en-IN")}</td>
                        <td><StatusBadge status={order.status} /></td>
                        <td className="text-slate-600">{order.date}</td>
                        <td><button type="button" aria-label={`Actions for ${order.id}`} className="rounded-lg p-1.5 hover:bg-slate-100"><MoreHorizontal size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="ov-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[18px] font-extrabold text-[#10284f]">Connected Accounts</h2>
                <Link href="/marketplace" className="text-sm font-medium text-blue-600">View All</Link>
              </div>
              <div className="divide-y divide-slate-100">
                {flipkartAccounts.map((account) => (
                  <Link key={account.id} href="/marketplace" className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:bg-slate-50">
                    <MarketplaceBadge marketplace="Flipkart" />
                    <div className="flex-1">
                      <b className="block text-sm text-[#10284f]">{account.name}</b>
                      <span className="flex items-center gap-1 text-xs text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Connected</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-gradient-to-br from-[#dcebff] via-[#eaf3ff] to-[#cfe3ff] p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/75 text-[#10284f] shadow-sm"><Sparkles size={30} /></div>
                <div><h3 className="text-[18px] font-extrabold text-[#10284f]">Ask. Analyze. Grow.</h3><p className="mt-1 text-xs leading-5 text-slate-600">Your AI assistant for smarter selling.</p></div>
              </div>
              <Link href="/ai-assistant" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10284f] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#193c72]"> <Sparkles size={16} /> Ask Anything <ArrowUpRight size={16} /> </Link>
            </div>

            <div className="ov-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[18px] font-extrabold text-[#10284f]">Low Stock Alert</h2>
                <Link href="/inventory" className="text-sm font-medium text-blue-600">View All</Link>
              </div>
              <div className="divide-y divide-slate-100">
                {inventory.filter((item) => item.total <= item.reorder).slice(0, 3).map((item) => (
                  <div key={item.sku} className="flex items-center gap-3 py-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">{item.emoji}</span>
                    <div className="min-w-0 flex-1"><b className="block truncate text-sm">{item.product}</b><span className="text-xs text-slate-500">SKU: {item.sku}</span></div>
                    <div className="text-right"><b className={`block text-lg ${item.total <= 5 ? "text-red-500" : "text-orange-500"}`}>{item.total}</b><span className="text-xs text-slate-500">Left</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-5 flex items-center justify-between border-t border-slate-200 py-4 text-xs text-slate-500">
          <span>© 2026 OV DASHBOARD. All rights reserved.</span>
          <span className="hidden sm:block">Manage Smarter. Grow Faster.<i className="ml-2 inline-block h-1.5 w-7 rounded-full bg-[#ff7a00]" /></span>
        </footer>
      </div>
    </AppShell>
  );
}
