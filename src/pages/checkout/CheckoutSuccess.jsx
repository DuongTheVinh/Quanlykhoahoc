import React from "react";
import { Link, useLocation } from "react-router-dom";

function formatVND(n) {
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${n} đ`;
  }
}

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state || {};
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-stone-900">Thanh toán thành công</h1>
        <p className="mt-2 text-stone-600">Cảm ơn bạn đã đăng ký gói {order?.plan?.name || "Pro"}. Email xác nhận sẽ được gửi tới {order?.info?.email || "email"}.</p>

        <div className="mt-6 text-left rounded-2xl border border-stone-200 p-6 inline-block text-sm">
          <div className="flex items-center justify-between"><span>Mã đơn hàng</span><span className="font-medium">{order?.orderId || "—"}</span></div>
          <div className="flex items-center justify-between mt-2"><span>Gói</span><span>{order?.plan?.name || "Pro"}</span></div>
          <div className="flex items-center justify-between mt-2"><span>Tổng thanh toán</span><span className="font-semibold">{formatVND(order?.pricing?.total || 399000)}</span></div>
          <div className="flex items-center justify-between mt-2"><span>Phương thức</span><span>{order?.method || "card"}</span></div>
          <div className="flex items-center justify-between mt-2"><span>Thời gian</span><span>{order?.time ? new Date(order.time).toLocaleString("vi-VN") : "—"}</span></div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/learn/fullstack" className="btn btn-primary">Bắt đầu học</Link>
          <Link to="/pricing" className="btn border-stone-300 hover:border-stone-400">Quay lại bảng giá</Link>
        </div>
      </div>
    </div>
  );
}

