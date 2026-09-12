import { CalendarDays, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[31px] font-extrabold tracking-[-1px] text-[#10284f]">{title}</h1>
        <p className="mt-1 text-[16px] text-slate-600">{description}</p>
      </div>
      {action ?? (
        <button type="button" className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium shadow-sm">
          <CalendarDays size={17} /> Today <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
}
