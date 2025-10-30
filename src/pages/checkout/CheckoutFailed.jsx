import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutFailed() {
  return (
    <div className="bg-white">
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-600">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-stone-900">Thanh toán thất bại</h1>
        <p className="mt-2 text-stone-600">Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức khác.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/checkout" className="btn btn-primary">Thử lại</Link>
          <Link to="/pricing" className="btn border-stone-300 hover:border-stone-400">Quay lại bảng giá</Link>
        </div>
      </div>
    </div>
  );
}

