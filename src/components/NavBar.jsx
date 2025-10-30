import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const linkCls = ({ isActive }) =>
    `text-sm ${isActive ? "text-stone-900" : "text-stone-700 hover:text-stone-900"}`;
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-primary-600 text-white grid place-items-center font-bold">
            FS
          </div>
          <span className="font-semibold text-stone-900">Your LMS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/courses" className={linkCls}>Khoá học</NavLink>
          <NavLink to="/mentors" className={linkCls}>Mentor</NavLink>
          <NavLink to="/pricing" className={linkCls}>Bảng giá</NavLink>
          <NavLink to="/blog" className={linkCls}>Blog</NavLink>
          <NavLink to="/faq" className={linkCls}>Hỏi đáp</NavLink>
          <NavLink to="/about" className={linkCls}>Về chúng tôi</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn">Đăng nhập</Link>
          <Link to="/register" className="btn btn-primary">Bắt đầu miễn phí</Link>
        </div>
      </div>
    </header>
  );
}

