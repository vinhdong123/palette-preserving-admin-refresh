import { Link } from "@tanstack/react-router";
import { LayoutGrid, Users, ShieldCheck, Building2, ChevronDown, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Tổng quan", icon: LayoutGrid },
  { to: "/tai-khoan", label: "Tài khoản", icon: Users },
  { to: "/bao-cao", label: "Báo cáo vi phạm", icon: ShieldCheck },
  { to: "/yeu-cau", label: "Yêu cầu doanh nghiệp", icon: Building2 },
] as const;

export function AdminLayout({ title, description, actions, children }: { title: string; description?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary text-lg font-bold text-primary-foreground shadow-primary">a</span>
          <span className="text-xl font-bold tracking-tight">aresa<span className="text-primary">.</span></span>
        </Link>
        <span className="h-6 w-px bg-border" />
        <span className="text-sm font-medium text-muted-foreground">Quản trị hệ thống</span>
        <div className="ml-auto flex items-center gap-3">
          <button className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-accent-foreground" aria-label="Thông báo">
            <Bell className="size-[18px]" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 shadow-card transition hover:border-primary/30">
            <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-accent-foreground">TA</span>
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col px-4 py-6 md:flex">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Điều hướng</p>
          <nav className="flex flex-col gap-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} activeOptions={{ exact: true }}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground data-[status=active]:shadow-card">
                <span className="grid size-8 place-items-center rounded-lg bg-muted transition group-hover:bg-primary-soft group-data-[status=active]:bg-gradient-primary group-data-[status=active]:text-primary-foreground">
                  <Icon className="size-4" />
                </span>
                {label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto px-3 text-xs text-muted-foreground">Aresa © 2026</p>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-6 md:pl-0">
          <div className="min-h-[calc(100vh-7rem)] rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
              </div>
              {actions}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

type Tone = "success" | "warning" | "danger" | "info";
const toneCls: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive-soft text-destructive",
  info: "bg-primary-soft text-accent-foreground",
};
export function StatusBadge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneCls[tone]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Tabs<T extends string>({ items, value, onChange }: { items: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-muted p-1">
      {items.map((it) => (
        <button key={it.value} onClick={() => onChange(it.value)}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${value === it.value ? "bg-card text-accent-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}>
          {it.label}
          {it.count !== undefined && (
            <span className={`rounded-full px-1.5 text-[11px] font-semibold ${value === it.value ? "bg-primary-soft" : "bg-background"}`}>{it.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function SearchBox({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex h-10 w-full max-w-sm items-center gap-2 rounded-xl border border-input bg-card px-3 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
      <Search className="size-4 text-muted-foreground" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

export function Initials({ name }: { name: string }) {
  const ini = name.split(" ").filter(Boolean).slice(-2).map((w) => w[0]).join("").toUpperCase();
  return <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-accent-foreground">{ini}</span>;
}

export function TableShell({ head, children, footer }: { head: string[]; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>{head.map((h) => <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
      {footer && <div className="border-t border-border bg-muted/40 px-5 py-3 text-xs text-muted-foreground">{footer}</div>}
    </div>
  );
}

export const rowCls = "transition hover:bg-primary-soft/40";
export const cellCls = "px-5 py-4 align-middle";
export const linkBtn = "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary-soft";
export const softBtn = "rounded-lg bg-primary-soft px-3 py-1.5 text-sm font-semibold text-accent-foreground transition hover:bg-primary hover:text-primary-foreground";
export const dangerBtn = "rounded-lg bg-destructive-soft px-3 py-1.5 text-sm font-semibold text-destructive transition hover:bg-destructive hover:text-destructive-foreground";
