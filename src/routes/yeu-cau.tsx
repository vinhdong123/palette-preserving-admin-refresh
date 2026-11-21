import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AdminLayout, Initials, SearchBox, StatusBadge, TableShell, Tabs, cellCls, linkBtn, rowCls } from "@/components/admin/AdminLayout";
import { requests } from "@/lib/admin-data";

export const Route = createFileRoute("/yeu-cau")({
  head: () => ({ meta: [
    { title: "Yêu cầu doanh nghiệp — Aresa Admin" },
    { name: "description", content: "Xác minh và quản lý hoạt động các trang doanh nghiệp." },
    { property: "og:title", content: "Yêu cầu doanh nghiệp — Aresa Admin" },
    { property: "og:description", content: "Xác minh và quản lý hoạt động các trang doanh nghiệp." },
  ] }),
  component: Page,
});

const label = { pending: ["warning", "Chờ xét duyệt"], approved: ["success", "Đã phê duyệt"], rejected: ["danger", "Đã từ chối"] } as const;
type F = "all" | "pending" | "approved" | "rejected";
function Page() {
  const [f, setF] = useState<F>("all");
  const [q, setQ] = useState("");
  const shown = requests.filter((r) => (f === "all" || r.status === f) && r.company.toLowerCase().includes(q.toLowerCase()));
  const c = (s: string) => requests.filter((r) => r.status === s).length;
  return (
    <AdminLayout title="Yêu cầu doanh nghiệp" description="Xác minh và quản lý hoạt động các trang doanh nghiệp.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={f} onChange={setF} items={[
          { value: "all", label: "Tất cả", count: requests.length },
          { value: "pending", label: "Chờ xét duyệt", count: c("pending") },
          { value: "approved", label: "Đã phê duyệt", count: c("approved") },
          { value: "rejected", label: "Đã từ chối", count: c("rejected") },
        ]} />
        <SearchBox placeholder="Tìm tên doanh nghiệp" value={q} onChange={setQ} />
      </div>
      <TableShell head={["Doanh nghiệp", "Loại yêu cầu", "Ngày gửi", "Trạng thái", "Thao tác"]} footer={`${shown.length} yêu cầu`}>
        {shown.map((r) => {
          const [tone, text] = label[r.status];
          return (
            <tr key={r.company} className={rowCls}>
              <td className={cellCls}><div className="flex items-center gap-3"><Initials name={r.company.replace("Công ty Demo ", "")} /><div><p className="font-semibold">{r.company}</p><p className="text-xs text-muted-foreground">{r.owner}</p></div></div></td>
              <td className={cellCls}><span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">{r.kind}</span></td>
              <td className={`${cellCls} text-muted-foreground`}>{r.date}</td>
              <td className={cellCls}><StatusBadge tone={tone}>{text}</StatusBadge></td>
              <td className={cellCls}><button className={linkBtn}>Xét duyệt <ArrowRight className="size-4" /></button></td>
            </tr>
          );
        })}
      </TableShell>
    </AdminLayout>
  );
}
