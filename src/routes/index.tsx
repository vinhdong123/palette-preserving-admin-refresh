import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Flag, Building2, ArrowRight, ArrowUpRight, History } from "lucide-react";
import { AdminLayout, Initials, StatusBadge } from "@/components/admin/AdminLayout";
import { candidates, companies, reports, requests, history } from "@/lib/admin-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Tổng quan — Aresa Admin" },
    { name: "description", content: "Tổng quan hoạt động hệ thống Aresa." },
    { property: "og:title", content: "Tổng quan — Aresa Admin" },
    { property: "og:description", content: "Tổng quan hoạt động hệ thống Aresa." },
  ] }),
  component: Index,
});

function Index() {
  const pendingReq = requests.filter((r) => r.status === "pending");
  const pendingRep = reports.filter((r) => r.status === "pending");
  const stats = [
    { label: "Tài khoản hoạt động", value: [...candidates, ...companies].filter((a) => !a.locked).length + 6, icon: Users, hint: "+3 tuần này" },
    { label: "Báo cáo chờ xử lý", value: pendingRep.length, icon: Flag, hint: "Cần xem xét" },
    { label: "Yêu cầu chờ xét duyệt", value: pendingReq.length, icon: Building2, hint: "Doanh nghiệp" },
  ];
  return (
    <AdminLayout title="Xin chào, Admin 👋" description="Đây là tình hình hệ thống hôm nay.">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className={`relative overflow-hidden rounded-2xl p-5 ${i === 0 ? "bg-gradient-primary text-primary-foreground shadow-primary" : "border border-border bg-card shadow-card"}`}>
            <div className="flex items-start justify-between">
              <p className={`text-sm font-medium ${i === 0 ? "opacity-90" : "text-muted-foreground"}`}>{s.label}</p>
              <span className={`grid size-10 place-items-center rounded-xl ${i === 0 ? "bg-primary-foreground/15" : "bg-primary-soft text-accent-foreground"}`}><s.icon className="size-5" /></span>
            </div>
            <p className="mt-3 text-4xl font-bold tracking-tight">{s.value}</p>
            <p className={`mt-1 text-xs ${i === 0 ? "opacity-80" : "text-muted-foreground"}`}>{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel icon={Building2} title="Yêu cầu doanh nghiệp" to="/yeu-cau">
          {pendingReq.map((r) => (
            <Link key={r.company} to="/yeu-cau" className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-primary-soft/40">
              <Initials name={r.company.replace("Công ty Demo ", "")} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.company}</p>
                <p className="text-xs text-muted-foreground">{r.kind} · {r.date}</p>
              </div>
              <StatusBadge tone="warning">Chờ duyệt</StatusBadge>
              <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </Panel>
        <Panel icon={Flag} title="Báo cáo cần xem xét" to="/bao-cao">
          {pendingRep.map((r) => (
            <Link key={r.title} to="/bao-cao" className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-primary-soft/40">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-destructive-soft text-destructive"><Flag className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.title}</p>
                <p className="truncate text-xs text-muted-foreground">{r.reason}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </Panel>
      </div>

      <div className="mt-6 rounded-2xl border border-border">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <History className="size-4 text-primary" />
          <h2 className="font-semibold">Lịch sử quản trị</h2>
        </div>
        <ol className="relative px-5 py-4">
          {history.map((h, i) => (
            <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
              {i < history.length - 1 && <span className="absolute left-[7px] top-5 h-full w-px bg-border" />}
              <span className="relative mt-1.5 size-[15px] shrink-0 rounded-full border-4 border-primary-soft bg-primary" />
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
                <StatusBadge tone={h.tone}>{h.action}</StatusBadge>
                <span className="truncate text-sm font-medium">{h.target}</span>
                <span className="text-sm text-muted-foreground">— {h.note}</span>
                <span className="ml-auto text-xs text-muted-foreground">{h.date}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </AdminLayout>
  );
}

function Panel({ icon: Icon, title, to, children }: { icon: typeof Flag; title: string; to: "/yeu-cau" | "/bao-cao"; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="flex items-center gap-2 font-semibold"><Icon className="size-4 text-primary" />{title}</h2>
        <Link to={to} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Xem tất cả <ArrowUpRight className="size-4" /></Link>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}
