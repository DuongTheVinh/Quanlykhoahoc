import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim().toLowerCase();
    const password = (form.get("password") || "").toString();
    const confirm = (form.get("confirm") || "").toString();
    const role = (form.get("role") || "STUDENT").toString();

    // Validate đơn giản (có thể thay bằng react-hook-form + zod nếu muốn)
    if (name.length < 2) return setError("Ho ten phai co it nhat 2 ky tu");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Email khong hop le");
    if (password.length < 6) return setError("Mat khau phai >= 6 ky tu");
    if (password !== confirm) return setError("Nhap lai mat khau khong khop");

    // Mock lưu user vào localStorage và kiểm tra trùng email
    const key = "mock_users";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    if (list.some((u) => u.email === email)) {
      return setError("Email da ton tai, vui long dung email khac");
    }

    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // chỉ để demo. Thực tế KHÔNG lưu plain text trên FE.
      roles: [role],
    };
    list.push(user);
    localStorage.setItem(key, JSON.stringify(list));

    // Điều hướng về login và gợi ý điền sẵn email
    nav("/login", { state: { emailHint: email, justRegistered: true } });
  };

  return (
    <div className="min-h-screen bg-soft flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 md:p-10 border border-[#eadfd1]">
        {/* Huy hiệu / icon */}
        <div className="w-14 h-14 mx-auto -mt-14 mb-6 rounded-full bg-[#d9b991] text-white grid place-items-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="1.6"
              d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z"
            />
            <path
              strokeWidth="1.6"
              d="M8.5 10.5s.75 1.25 3.5 1.25 3.5-1.25 3.5-1.25M9 15c1.2 1 2.8 1 4 0"
            />
          </svg>
        </div>

        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-semibold text-[#6e4f3b]">
            Create account
          </h1>
          <p className="text-sm text-[#8b6d57]">Start your journey with us</p>
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Họ tên */}
          <label className="block">
            <span className="sr-only">Ho ten</span>
            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="Ho ten"
                required
                autoComplete="name"
                className="w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-[#d9b991]/50 placeholder:text-[#b8a692] text-[#6e4f3b]"
              />
              {/* Icon người */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b8a692]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                {/* đầu */}
                <circle cx="12" cy="8" r="3.2" strokeWidth="1.6" />
                {/* vai/ngực */}
                <path d="M5 18c0-3.2 3.1-5 7-5s7 1.8 7 5" strokeWidth="1.6" />
              </svg>
            </div>
          </label>

          {/* Email */}
          <label className="block">
            <span className="sr-only">Email</span>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-[#d9b991]/50 placeholder:text-[#b8a692] text-[#6e4f3b]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b8a692]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="1.6" d="M4 6h16v12H4z" />
                <path strokeWidth="1.6" d="m4 7 8 6 8-6" />
              </svg>
            </div>
          </label>

          {/* Mật khẩu */}
          <label className="block">
            <span className="sr-only">Mat khau</span>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-[#d9b991]/50 placeholder:text-[#b8a692] text-[#6e4f3b]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b8a692]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="10"
                  rx="2"
                  strokeWidth="1.6"
                />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeWidth="1.6" />
              </svg>

              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8a692] hover:text-[#8b6d57]"
                aria-label="Toggle password"
              >
                {showPass ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="1.6"
                      d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                    />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="1.6" d="M2 2l20 20" />
                    <path
                      strokeWidth="1.6"
                      d="M9.9 9.9A3 3 0 0 0 12 15c1.66 0 3-1.34 3-3 0-.51-.13-.99-.35-1.4"
                    />
                    <path
                      strokeWidth="1.6"
                      d="M10.73 5.08A9.86 9.86 0 0 1 12 5.5C18.5 5.5 22 12 22 12a16.62 16.62 0 0 1-4.07 4.46"
                    />
                    <path
                      strokeWidth="1.6"
                      d="M6.61 6.61A16.5 16.5 0 0 0 2 12s3.5 6.5 10 6.5c1.48 0 2.85-.27 4.08-.76"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {/* Nhập lại mật khẩu */}
          <label className="block">
            <span className="sr-only">Nhap lai mat khau</span>
            <div className="relative">
              <input
                name="confirm"
                type={showPass2 ? "text" : "password"}
                placeholder="Confirm password"
                required
                className="w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-[#d9b991]/50 placeholder:text-[#b8a692] text-[#6e4f3b]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b8a692]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="10"
                  rx="2"
                  strokeWidth="1.6"
                />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeWidth="1.6" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPass2((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8a692] hover:text-[#8b6d57]"
                aria-label="Toggle confirm password"
              >
                {showPass2 ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="1.6"
                      d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                    />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="1.6" d="M2 2l20 20" />
                    <path
                      strokeWidth="1.6"
                      d="M9.9 9.9A3 3 0 0 0 12 15c1.66 0 3-1.34 3-3 0-.51-.13-.99-.35-1.4"
                    />
                    <path
                      strokeWidth="1.6"
                      d="M10.73 5.08A9.86 9.86 0 0 1 12 5.5C18.5 5.5 22 12 22 12a16.62 16.62 0 0 1-4.07 4.46"
                    />
                    <path
                      strokeWidth="1.6"
                      d="M6.61 6.61A16.5 16.5 0 0 0 2 12s3.5 6.5 10 6.5c1.48 0 2.85-.27 4.08-.76"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {/* Vai trò trong LMS (theo tài liệu): Student/Teacher/CourseManager */}
          <label className="block">
            <span className="text-sm font-medium text-[#6e4f3b]">Role</span>
            <select
              name="role"
              defaultValue="STUDENT"
              className="mt-1 w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#d9b991]/50 text-[#6e4f3b]"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="COURSE_MANAGER">Course Manager</option>
            </select>
          </label>

          {/* Điều khoản (minh họa) */}
          <label className="flex items-start gap-2 text-sm text-[#8b6d57]">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-[#eadfd1] text-[#caa877] focus:ring-[#d9b991]"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-[#a07f63] underline">
                Terms
              </a>{" "}
              &amp;{" "}
              <a href="#" className="text-[#a07f63] underline">
                Privacy
              </a>
              .
            </span>
          </label>

          {/* Nút tạo tài khoản */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#caa877] hover:bg-[#c39f6f] text-white py-3 font-medium shadow-md transition-colors"
          >
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="h-px bg-[#eee5d9]" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-[#b8a692]">
            or continue with
          </span>
        </div>

        {/* Social (demo) */}
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-2xl border border-[#eadfd1] py-2.5 hover:bg-[#faf7f2]">
            Google
          </button>
          <button className="rounded-2xl border border-[#eadfd1] py-2.5 hover:bg-[#faf7f2]">
            Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#8b6d57] mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#a07f63] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
