export type Acc = { name: string; email: string; locked: boolean; joined: string; company?: string };
export const candidates: Acc[] = [
  { name: "Đồng Vinh", email: "member@aresa.demo", locked: false, joined: "15/09/2026" },
  { name: "Văn Thành", email: "thanh@example.com", locked: true, joined: "18/09/2026" },
  { name: "Đồng Vinh", email: "vinhdong0899225163@gmail.com", locked: false, joined: "22/09/2026" },
  { name: "Đồng Vinh", email: "vinhdong01899225163@gmail.com", locked: false, joined: "22/09/2026" },
  { name: "Đồng Vinh", email: "vinhdong10899225163@gmail.com", locked: false, joined: "02/10/2026" },
];
export const companies: Acc[] = [
  { name: "Trần Mai", email: "company@aresa.demo", company: "Lumi Technology", locked: false, joined: "12/09/2026" },
  { name: "Vinh", email: "vvinhdong0899225163@gmail.com", company: "Microsof", locked: false, joined: "20/10/2026" },
  { name: "Lê Anh Tuấn", email: "company1@aresa.demo", company: "Công ty Demo Hải Đăng", locked: false, joined: "10/11/2026" },
  { name: "Phạm Thu Hà", email: "company2@aresa.demo", company: "Công ty Demo An Phát", locked: false, joined: "10/11/2026" },
];
export type Report = { title: string; type: string; date: string; source: string; reason: string; status: "pending" | "removed" | "ignored" };
export const reports: Report[] = [
  { title: "Tin tuyển dụng có dấu hiệu thu phí", type: "Tin tuyển dụng", date: "21/09/2026", source: "Người dùng", reason: "Yêu cầu ứng viên đóng phí trước phỏng vấn", status: "pending" },
  { title: "Bài viết quảng cáo lặp lại", type: "Bài viết", date: "20/09/2026", source: "AI gắn cờ", reason: "Spam", status: "pending" },
];
export type Req = { company: string; owner: string; kind: string; date: string; status: "pending" | "approved" | "rejected" };
export const requests: Req[] = [
  { company: "Microsof", owner: "Vinh", kind: "Xác minh", date: "20/10/2026", status: "approved" },
  { company: "Lumi Technology", owner: "Trần Mai", kind: "Xác minh", date: "21/09/2026", status: "approved" },
  { company: "Orbit Labs", owner: "Vũ Thanh An", kind: "Vô hiệu hóa", date: "20/09/2026", status: "approved" },
  { company: "Công ty Demo Hải Đăng", owner: "Lê Anh Tuấn", kind: "Xác minh", date: "10/11/2026", status: "pending" },
  { company: "Công ty Demo An Phát", owner: "Phạm Thu Hà", kind: "Xác minh", date: "10/11/2026", status: "pending" },
];
export const history = [
  { date: "10/11/2026", action: "Đang hoạt động", target: "acc1", note: "h", tone: "success" },
  { date: "10/11/2026", action: "Đã khóa", target: "acc1", note: "f", tone: "danger" },
  { date: "20/10/2026", action: "Đã phê duyệt", target: "6dcc2f95-31c8-482d-a2c0-f09e56e0ad5c", note: "h", tone: "info" },
  { date: "20/10/2026", action: "Đã phê duyệt", target: "req2", note: "hi", tone: "info" },
  { date: "20/10/2026", action: "Đã phê duyệt", target: "req1", note: "hi", tone: "info" },
  { date: "21/09", action: "Tiếp nhận", target: "Lumi Technology", note: "Yêu cầu xác minh", tone: "warning" },
] as const;
