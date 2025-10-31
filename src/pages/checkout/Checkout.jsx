import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCourseById } from "../../data/courses";

const PLANS = {
  basic: { name: "Cơ bản", price: 199000 },
  pro: { name: "Pro", price: 399000, highlighted: true },
  enterprise: { name: "Doanh nghiệp", price: 0 },
};

function formatVND(n) {
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${n} đ`;
  }
}

function Step({ no, title, children }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white">
      <div className="px-6 py-4 border-b border-stone-200 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-primary-600 text-white text-sm grid place-items-center">{no}</div>
        <h3 className="font-semibold text-stone-900">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function MethodItem({ id, label, desc, selected, onSelect, right, children }) {
  return (
    <div className={`rounded-xl border ${selected ? "border-primary-300 bg-primary-50" : "border-stone-200 bg-white"}`}>
      <label className="flex items-start gap-3 p-4 cursor-pointer">
        <input type="radio" name="method" checked={selected} onChange={() => onSelect(id)} />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold text-stone-900">{label}</div>
            {right}
          </div>
          <div className="text-sm text-stone-600 mt-0.5">{desc}</div>
        </div>
      </label>
      {selected && children && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const planKey = sp.get("plan") || "pro";
  const plan = PLANS[planKey] || PLANS.pro;
  const courseId = sp.get("course");
  const course = courseId ? getCourseById(courseId) : null;
  const isCoursePurchase = !!course;

  const [info, setInfo] = useState({ name: "", email: "", phone: "" });
  const [invoice, setInvoice] = useState({ company: "", tax: "", address: "" });
  const [method, setMethod] = useState("vnpay");
  const [card, setCard] = useState({ number: "", holder: "", exp: "", cvc: "" });
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);

  const pricing = useMemo(() => {
    const basePrice = isCoursePurchase ? (course?.price || 0) : plan.price;
    const subtotal = basePrice;
    const discount = applied?.percent ? Math.round(subtotal * applied.percent) : 0;
    const vat = applied?.noVat ? 0 : Math.round((subtotal - discount) * 0.1);
    const total = subtotal - discount + vat;
    return { subtotal, discount, vat, total };
  }, [isCoursePurchase, course?.price, plan.price, applied]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (code === "SAVE10") setApplied({ code, percent: 0.1, label: "Giảm 10%" });
    else if (code === "FREEVAT") setApplied({ code, noVat: true, label: "Miễn VAT" });
    else setApplied(null);
  };

  const canSubmit = info.name && info.email && method && (!isCoursePurchase || (course && course.type === "pro"));
  const submit = () => {
    if (!canSubmit) return;
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    navigate("/checkout/success", {
      state: {
        orderId,
        ...(isCoursePurchase
          ? { course: { id: course.id, title: course.title, price: course.price } }
          : { plan: { key: planKey, name: plan.name, price: plan.price } }),
        pricing,
        info,
        invoice,
        method,
        time: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6">
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 text-sm text-primary-800">
            Bạn đang đăng ký gói <span className="font-semibold">{plan.name}</span>. Vui lòng nhập thông tin và chọn phương thức thanh toán.
          </div>

          <Step no={1} title="Thông tin liên hệ">
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input border-stone-300" placeholder="Họ và tên" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
              <input className="input border-stone-300" placeholder="Email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
              <input className="input border-stone-300 md:col-span-2" placeholder="Số điện thoại" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
            </div>
          </Step>

          <Step no={2} title="Xuất hoá đơn (tuỳ chọn)">
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input border-stone-300" placeholder="Tên công ty" value={invoice.company} onChange={(e) => setInvoice({ ...invoice, company: e.target.value })} />
              <input className="input border-stone-300" placeholder="Mã số thuế" value={invoice.tax} onChange={(e) => setInvoice({ ...invoice, tax: e.target.value })} />
              <input className="input border-stone-300 md:col-span-2" placeholder="Địa chỉ" value={invoice.address} onChange={(e) => setInvoice({ ...invoice, address: e.target.value })} />
            </div>
          </Step>

          <Step no={3} title="Phương thức thanh toán">
            <div className="space-y-3">
              <MethodItem
                id="vnpay"
                label="VNPay - Thẻ nội địa/QR"
                desc="Thanh toán qua cổng VNPay, hỗ trợ thẻ nội địa và QR banking"
                selected={method === "vnpay"}
                onSelect={setMethod}
                right={<div className="text-xs text-stone-500">Khuyến nghị</div>}
              />
              <MethodItem
                id="momo"
                label="Ví MoMo"
                desc="Quét QR bằng ứng dụng MoMo để thanh toán"
                selected={method === "momo"}
                onSelect={setMethod}
              >
                <div className="text-sm text-stone-700">Mở MoMo và quét mã QR (hiển thị ở bước sau) để thanh toán gói {plan.name}.</div>
              </MethodItem>
              <MethodItem
                id="card"
                label="Thẻ quốc tế (Visa/Mastercard)"
                desc="Nhập thông tin thẻ để thanh toán ngay"
                selected={method === "card"}
                onSelect={setMethod}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="input border-stone-300 md:col-span-2" placeholder="Số thẻ" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  <input className="input border-stone-300" placeholder="Tên chủ thẻ" value={card.holder} onChange={(e) => setCard({ ...card, holder: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input border-stone-300" placeholder="MM/YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} />
                    <input className="input border-stone-300" placeholder="CVC" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                  </div>
                </div>
              </MethodItem>
              <MethodItem
                id="bank"
                label="Chuyển khoản ngân hàng"
                desc="Chuyển khoản theo hướng dẫn, hệ thống tự động đối soát trong 5-10 phút"
                selected={method === "bank"}
                onSelect={setMethod}
              >
                <div className="rounded-lg border border-stone-200 p-3 text-sm text-stone-700 bg-white">
                  <div>Ngân hàng: Techcombank</div>
                  <div>Số tài khoản: 1903 123 456 789</div>
                  <div>Chủ tài khoản: CONG TY ABC</div>
                  <div>Nội dung: {info.email || "email"} - {plan.name}</div>
                </div>
              </MethodItem>
            </div>
          </Step>

          <div className="rounded-2xl border border-stone-200 p-4 text-xs text-stone-600">
            Bằng việc bấm “Thanh toán”, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật.
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 h-max">
          <div className="rounded-2xl border border-stone-200 p-6 bg-white">
            <div className="font-semibold text-stone-900">Tóm tắt đơn hàng</div>
            <div className="mt-3 flex items-center justify-between text-sm">
              {isCoursePurchase ? (
                <>
                  <div>Khoá học: {course?.title || "—"}</div>
                  <div className="font-medium">{formatVND(course?.price || 0)}</div>
                </>
              ) : (
                <>
                  <div>{plan.name} (1 tháng)</div>
                  <div className="font-medium">{formatVND(plan.price)}</div>
                </>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <input className="input border-stone-300 flex-1" placeholder="Mã giảm giá (SAVE10/FREEVAT)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn border-stone-300 hover:border-stone-400" onClick={applyCoupon}>Áp dụng</button>
            </div>
            {applied && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 px-3 py-1 text-xs">
                Đã áp dụng: {applied.label}
              </div>
            )}
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <div className="flex items-center justify-between"><span>Tạm tính</span><span>{formatVND(pricing.subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Giảm giá</span><span>-{formatVND(pricing.discount)}</span></div>
              <div className="flex items-center justify-between"><span>VAT (10%)</span><span>{formatVND(pricing.vat)}</span></div>
              <div className="h-px bg-stone-200" />
              <div className="flex items-center justify-between font-semibold text-stone-900"><span>Tổng cộng</span><span>{formatVND(pricing.total)}</span></div>
            </div>
            {isCoursePurchase && course && course.type === "free" ? (
              <Link className="btn btn-primary w-full mt-5" to={`/learn/${course.id}`}>Học miễn phí</Link>
            ) : (
              <button className="btn btn-primary w-full mt-5" disabled={!canSubmit} onClick={submit}>Thanh toán</button>
            )}
            <div className="mt-2 text-xs text-stone-500 text-center">Hỗ trợ 24/7: support@example.com</div>
          </div>
          <div className="rounded-2xl border border-stone-200 p-6 text-sm text-stone-700 bg-white">
            <div className="font-semibold text-stone-900">Cam kết</div>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Hoàn tiền 7 ngày nếu không hài lòng</li>
              <li>Bảo mật thông tin thanh toán</li>
              <li>Xuất hoá đơn theo yêu cầu</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
