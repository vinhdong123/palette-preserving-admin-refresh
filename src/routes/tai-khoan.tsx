import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserRound, Briefcase } from "lucide-react";
import { AdminLayout, Initials, SearchBox, StatusBadge, TableShell, Tabs, cellCls, dangerBtn, linkBtn, rowCls, softBtn } from "@/components/admin/AdminLayout";
import { candidates, companies, type Acc } from "@/lib/admin-data";

export const Route = createFileRoute("/tai-khoan")({
  head: () => ({ meta: [
    { title: "Quản lý tài khoản — Aresa Admin" },
    { name: "description", content: "Quản lý tài khoản ứng viên và doanh nghiệp." },
    { property: "og:title", content: "Quản lý tài khoản — Aresa Admin" },
    { property: "og:description", content: "Quản lý tài khoản ứng viên và doanh nghiệp." },
  ] }),
  component: Page,
});

type F = "all" | "active" | "locked";
function Page() {
  const [kind, setKind] = useState<"cand" | "comp">("cand");
  const [f, setF] = useState<F>("all");
  const [q, setQ] = useState("");
  const [data, setData] = useState({ cand: candidates, comp: companies });
  const list = data[kind];
  const shown = list.filter((a) => (f === "all" || (f === "locked") === a.locked) && (a.name + a.email).toLowerCase().includes(q.toLowerCase()));
  const toggle = (a: Acc) => setData((d) => ({ ...d, [kind]: d[kind].map((x) => (x === a ? { ...x, locked: !x.locked } : x)) }));
  const remove = (a: Acc) => setData((d) => ({ ...d, [kind]: d[kind].filter((x) => x !== a) }));
  const isComp = kind === "comp";

  return (
    <AdminLayout title="Quản lý tài khoản" description="Quản lý riêng tài khoản ứng viên và tài khoản doanh nghiệp.">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
        {([["cand", "Tài khoản ứng viên", UserRound, data.cand.length], ["comp", "Tài khoản doanh nghiệp", Briefcase, data.comp.length]] as const).map(([k, label, Icon, n]) => (
          <button key={k} onClick={() => { setKind(k); setF("all"); }}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${kind === k ? "border-primary bg-primary-soft/50 ring-4 ring-primary/10" : "border-border hover:border-primary/40"}`}>
            <span className={`grid size-10 place-items-center rounded-lg ${kind === k ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="size-5" /></span>
            <span><span className="block font-semibold">{label}</span><span className="text-xs text-muted-foreground">{n} tài khoản</span></span>
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={f} onChange={setF} items={[
          { value: "all", label: "Tất cả", count: list.length },
          { value: "active", label: "Đang hoạt động", count: list.filter((a) => !a.locked).length },
          { value: "locked", label: "Đã khóa", count: list.filter((a) => a.locked).length },
        ]} />
        <SearchBox placeholder="Tên hoặc email tài khoản" value={q} onChange={setQ} />
      </div>
      <TableShell head={["Tài khoản", ...(isComp ? ["Doanh nghiệp"] : []), "Trạng thái", "Ngày tham gia", "Thao tác"]} footer={`${shown.length} tài khoản`}>
        {shown.map((a, i) => (
          <tr key={a.email + i} className={rowCls}>
            <td className={cellCls}><div className="flex items-center gap-3"><Initials name={a.name} /><div><p className="font-semibold">{a.name}</p><p className="text-xs text-muted-foreground">{a.email}</p></div></div></td>
            {isComp && <td className={`${cellCls} font-medium`}>{a.company}</td>}
            <td className={cellCls}>{a.locked ? <StatusBadge tone="danger">Đã khóa</StatusBadge> : <StatusBadge tone="success">Đang hoạt động</StatusBadge>}</td>
            <td className={`${cellCls} text-muted-foreground`}>{a.joined}</td>
            <td className={cellCls}><div className="flex items-center gap-1.5">
              <button className={linkBtn}>Chi tiết</button>
              <button onClick={() => toggle(a)} className={softBtn}>{a.locked ? "Mở khóa" : "Khóa"}</button>
              <button onClick={() => remove(a)} className={dangerBtn}>Xóa</button>
            </div></td>
          </tr>
        ))}
      </TableShell>
    </AdminLayout>
  );
}
