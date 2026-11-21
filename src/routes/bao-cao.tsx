import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Sparkles, ArrowRight } from "lucide-react";
import { AdminLayout, SearchBox, StatusBadge, TableShell, Tabs, cellCls, linkBtn, rowCls } from "@/components/admin/AdminLayout";
import { reports } from "@/lib/admin-data";

export const Route = createFileRoute("/bao-cao")({
  head: () => ({ meta: [
    { title: "Báo cáo vi phạm — Aresa Admin" },
    { name: "description", content: "Xem xét nội dung được cộng đồng và hệ thống báo cáo." },
    { property: "og:title", content: "Báo cáo vi phạm — Aresa Admin" },
    { property: "og:description", content: "Xem xét nội dung được cộng đồng và hệ thống báo cáo." },
  ] }),
  component: Page,
});

const label = { pending: ["warning", "Chờ xử lý"], removed: ["danger", "Đã gỡ"], ignored: ["info", "Đã bỏ qua"] } as const;
type F = "all" | "pending" | "removed" | "ignored";
function Page() {
  const [f, setF] = useState<F>("all");
  const [q, setQ] = useState("");
  const shown = reports.filter((r) => (f === "all" || r.status === f) && r.title.toLowerCase().includes(q.toLowerCase()));
  const c = (s: string) => reports.filter((r) => r.status === s).length;
  return (
    <AdminLayout title="Báo cáo vi phạm" description="Xem xét nội dung được cộng đồng và hệ thống báo cáo.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={f} onChange={setF} items={[
          { value: "all", label: "Tất cả", count: reports.length },
          { value: "pending", label: "Chờ xử lý", count: c("pending") },
          { value: "removed", label: "Đã gỡ", count: c("removed") },
          { value: "ignored", label: "Đã bỏ qua", count: c("ignored") },
        ]} />
        <SearchBox placeholder="Tìm báo cáo" value={q} onChange={setQ} />
      </div>
      <TableShell head={["Nội dung", "Nguồn", "Trạng thái", "Thao tác"]} footer={`${shown.length} báo cáo`}>
        {shown.map((r) => {
          const [tone, text] = label[r.status];
          const ai = r.source.startsWith("AI");
          return (
            <tr key={r.title} className={rowCls}>
              <td className={cellCls}><p className="font-semibold">{r.title}</p><p className="text-xs text-muted-foreground">{r.type} · {r.date}</p></td>
              <td className={cellCls}><span className="inline-flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">{ai ? <Sparkles className="size-3.5 text-primary" /> : <User className="size-3.5" />}{r.source}</span></td>
              <td className={cellCls}><StatusBadge tone={tone}>{text}</StatusBadge></td>
              <td className={cellCls}><button className={linkBtn}>Xem xét <ArrowRight className="size-4" /></button></td>
            </tr>
          );
        })}
        {shown.length === 0 && <tr><td colSpan={4} className="py-12 text-center text-sm text-muted-foreground">Không có báo cáo nào.</td></tr>}
      </TableShell>
    </AdminLayout>
  );
}
