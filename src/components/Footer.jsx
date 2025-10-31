import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary-600 text-white grid place-items-center font-bold">
              FS
            </div>
            <span className="font-semibold text-stone-900">Your LMS</span>
          </div>
          <p className="mt-3 text-stone-600">
            Hệ thống học lập trình định hướng thực chiến.
          </p>
        </div>
        <div>
          <div className="font-semibold text-stone-900">Sản phẩm</div>
          <ul className="mt-3 space-y-2 text-stone-600">
            <li>
              <a href="/courses">Khoá học</a>
            </li>
            <li>
              <a href="/pricing">Bảng giá</a>
            </li>
            <li>
              <a href="/mentors">Mentor</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-stone-900">Tài nguyên</div>
          <ul className="mt-3 space-y-2 text-stone-600">
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/about">Về chúng tôi</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-stone-900">Liên hệ</div>
          <ul className="mt-3 space-y-2 text-stone-600">
            <li>support@example.com</li>
            <li>0123 456 789</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
