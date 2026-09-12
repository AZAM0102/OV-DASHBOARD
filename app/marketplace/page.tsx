"use client";

import { CheckCircle2, RefreshCw, Store, Unplug } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { MarketplaceBadge } from "@/components/ui";
import { flipkartAccounts, type FlipkartAccount } from "@/lib/data";

export default function Marketplace() {
  const [accounts, setAccounts] = useState<FlipkartAccount[]>(flipkartAccounts);
  const [syncing, setSyncing] = useState<string | null>(null);

  const syncAccount = (id: string) => {
    setSyncing(id);
    window.setTimeout(() => {
      setAccounts((current) => current.map((account) => account.id === id ? { ...account, lastSync: "Just now" } : account));
      setSyncing(null);
    }, 700);
  };

  const disconnectAccount = (id: string) => {
    setAccounts((current) => current.map((account) => account.id === id ? { ...account, status: "Disconnected", lastSync: "Disconnected" } : account));
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] p-5 md:p-7">
        <PageHeader
          title="Marketplace Connections"
          description="Manage your three Flipkart seller accounts from one place."
          action={
            <button type="button" className="flex h-11 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#e96d00]">
              <Store size={17} /> Connect Account
            </button>
          }
        />

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="ov-card p-5"><span className="text-xs text-slate-500">Flipkart Accounts</span><b className="mt-1 block text-2xl text-[#10284f]">{accounts.length}</b></div>
          <div className="ov-card p-5"><span className="text-xs text-slate-500">Connected</span><b className="mt-1 block text-2xl text-emerald-600">{accounts.filter((a) => a.status === "Connected").length}</b></div>
          <div className="ov-card p-5"><span className="text-xs text-slate-500">Sync Status</span><b className="mt-1 block text-2xl text-[#10284f]">API Ready</b></div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {accounts.map((account) => {
            const connected = account.status === "Connected";
            const isSyncing = syncing === account.id;

            return (
              <div className="ov-card p-6" key={account.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <MarketplaceBadge marketplace="Flipkart" />
                    <div>
                      <h2 className="font-extrabold text-[#10284f]">{account.name}</h2>
                      <span className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${connected ? "text-emerald-600" : "text-red-500"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-500" : "bg-red-500"}`} />
                        {account.status}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className={connected ? "text-emerald-500" : "text-slate-300"} size={20} />
                </div>

                <div className="my-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-xs text-slate-500">Orders</span>
                    <b className="mt-1 block text-sm text-[#10284f]">Awaiting API</b>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-xs text-slate-500">Inventory</span>
                    <b className="mt-1 block text-sm text-[#10284f]">Awaiting API</b>
                  </div>
                </div>

                <p className="text-xs text-slate-500">Last sync: {account.lastSync}</p>
                <div className={`mt-1 text-xs ${connected ? "text-emerald-600" : "text-slate-500"}`}>
                  {connected ? "Orders sync · Inventory sync active" : "Reconnect this seller account to resume sync"}
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    disabled={!connected || isSyncing}
                    onClick={() => syncAccount(account.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RefreshCw size={15} className={isSyncing ? "animate-spin" : ""} />
                    {isSyncing ? "Syncing..." : "Sync Now"}
                  </button>
                  <button
                    type="button"
                    disabled={!connected}
                    onClick={() => disconnectAccount(account.id)}
                    aria-label={`Disconnect ${account.name}`}
                    className="rounded-xl border border-red-100 px-3 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Unplug size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex items-start gap-3">
            <Store className="mt-0.5 shrink-0 text-[#1768d4]" size={20} />
            <div>
              <b className="text-[#10284f]">3 Flipkart accounts are ready in the UI</b>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                THE DUKAAN, NUME and GOLD-PEARL are currently represented as connected seller accounts. Real orders, sales, inventory and returns will replace the placeholder sync state after the secure Flipkart API + backend integration is added.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
