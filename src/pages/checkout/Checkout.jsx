import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

function MethodCard({ id, label, desc, selected, onSelect, children }) {
  return (
    <div className={`rounded-xl border ${selected ? "border-primary-300 bg-primary-50" : "border-stone-200 bg-white"} p-4`}> 
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="radio" name="method" checked={selected} onChange={() => onSelect(id)} />
        <div>
          <div className="font-semibold text-stone-900">{label}</div>
          <div className="text-sm text-stone-600">{desc}</div>
        </div>
      </label>
      {selected && children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const planKey = sp.get("plan") || "pro";
  const plan = PLANS[planKey] || PLANS.pro;

  const [info, setInfo] = useState({ name: "", email: "", phone: "" });
  const [invoice, setInvoice] = useState({ company: "", tax: "", address: "" });
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", holder: "", exp: "", cvc: "" });
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);

  const pricing = useMemo(() => {
    const subtotal = plan.price;
    const discount = applied ? Math.round(subtotal * applied.percent) : 0;
    const vat = Math.round((subtotal - discount) * 0.1);
    const total = subtotal - discount + vat;
    return { subtotal, discount, vat, total };
  }, [plan.price, applied]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (code === "SAVE10") setApplied({ code, percent: 0.1, label: "Giảm 10%" });
    else if (code === "FREEVAT") setApplied({ code, percent: 0.0, label: "Miễn VAT" });
    else setApplied(null);
  };

  const canSubmit = info.name && info.email && plan.price >= 0 && method;

  const submit = () => {
    if (!canSubmit) return;
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    navigate("/checkout/success", {
      state: {
        orderId,
        plan: { key: planKey, name: plan.name, price: plan.price },
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
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_420px] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Thông tin liên hệ</div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <input className="input border-stone-300" placeholder="Họ và tên" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
              <input className="input border-stone-300" placeholder="Email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
              <input className="input border-stone-300 md:col-span-2" placeholder="Số điện thoại" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Xuất hoá đơn (tuỳ chọn)</div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <input className="input border-stone-300" placeholder="Tên công ty" value={invoice.company} onChange={(e) => setInvoice({ ...invoice, company: e.target.value })} />
              <input className="input border-stone-300" placeholder="Mã số thuế" value={invoice.tax} onChange={(e) => setInvoice({ ...invoice, tax: e.target.value })} />
              <input className="input border-stone-300 md:col-span-2" placeholder="Địa chỉ" value={invoice.address} onChange={(e) => setInvoice({ ...invoice, address: e.target.value })} />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 p-6 space-y-4">
            <div className="font-semibold text-stone-900">Phương thức thanh toán</div>
            <MethodCard
              id="card"
              label="Thẻ ngân hàng / Visa / Mastercard"
              desc="Nhập thông tin thẻ để thanh toán trực tuyến"
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
            </MethodCard>

            <MethodCard
              id="bank"
              label="Chuyển khoản ngân hàng"
              desc="Chuyển khoản theo hướng dẫn, hệ thống tự động đối soát"
              selected={method === "bank"}
              onSelect={setMethod}
            >
              <div className="rounded-lg border border-stone-200 p-3 text-sm text-stone-700 bg-white">
                <div>Ngân hàng: Techcombank</div>
                <div>Số tài khoản: 1903 123 456 789</div>
                <div>Chủ tài khoản: CONG TY ABC</div>
                <div>Nội dung: {info.email || "email"} - {plan.name}</div>
              </div>
            </MethodCard>

            <MethodCard
              id="momo"
              label="Ví MoMo"
              desc="Quét QR hoặc nhập số điện thoại để thanh toán"
              selected={method === "momo"}
              onSelect={setMethod}
            >
              <div className="text-sm text-stone-700">Mở ứng dụng MoMo và quét mã QR để thanh toán gói {plan.name}.</div>
            </MethodCard>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Tóm tắt đơn hàng</div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div>{plan.name} (1 tháng)</div>
              <div className="font-medium">{formatVND(plan.price)}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <input className="input border-stone-300 flex-1" placeholder="Mã giảm giá" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn border-stone-300 hover:border-stone-400" onClick={applyCoupon}>Áp dụng</button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <div className="flex items-center justify-between"><span>Tạm tính</span><span>{formatVND(pricing.subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Giảm giá</span><span>-{formatVND(pricing.discount)}</span></div>
              <div className="flex items-center justify-between"><span>VAT (10%)</span><span>{formatVND(pricing.vat)}</span></div>
              <div className="h-px bg-stone-200" />
              <div className="flex items-center justify-between font-semibold text-stone-900"><span>Tổng cộng</span><span>{formatVND(pricing.total)}</span></div>
            </div>
            <button className="btn btn-primary w-full mt-5" disabled={!canSubmit} onClick={submit}>Thanh toán</button>
            <div className="mt-2 text-xs text-stone-500 text-center">Bằng việc thanh toán, bạn đồng ý với Điều khoản sử dụng.</div>
          </div>
          <div className="rounded-2xl border border-stone-200 p-6 text-sm text-stone-700">
            <div className="font-semibold text-stone-900">Bảo mật & hỗ trợ</div>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Thanh toán an toàn, mã hoá thông tin</li>
              <li>Hoàn tiền nếu không hài lòng trong 7 ngày</li>
              <li>Hỗ trợ 24/7: support@example.com</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

