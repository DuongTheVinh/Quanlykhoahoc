import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const emailRef = useRef(null);

  useEffect(() => {
    if (location.state?.emailHint && emailRef.current) {
      emailRef.current.value = location.state.emailHint;
    }
  }, [location.state]);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: gọi API đăng nhập ở đây
    console.log("login data", data);
    // ví dụ: navigate('/dashboard')
  };

  return (
    <div className="min-h-screen bg-soft flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 md:p-10 border border-[#eadfd1]">
        {/* Badge icon tròn phía trên */}
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

        {/* Title */}
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-semibold text-[#6e4f3b]">
            Welcome back
          </h1>
          <p className="text-sm text-[#8b6d57]">
            Sign in to your peaceful space
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <label className="block">
            <span className="sr-only">Email address</span>
            <div className="relative">
              <input
                ref={emailRef}
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

          {/* Password */}
          <label className="block">
            <span className="sr-only">Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full rounded-2xl border border-[#eadfd1] bg-white px-4 py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-[#d9b991]/50 placeholder:text-[#b8a692] text-[#6e4f3b]"
              />
              {/* Lock icon */}
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
              {/* Eye toggle */}
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

          {/* Options row */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 select-none text-[#8b6d57]">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-[#eadfd1] text-[#caa877] focus:ring-[#d9b991]"
              />
              Remember me
            </label>
            <a className="text-[#a07f63] hover:underline" href="#">
              Forgot password?
            </a>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#caa877] hover:bg-[#c39f6f] text-white py-3 font-medium shadow-md transition-colors"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="h-px bg-[#eee5d9]" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-[#b8a692]">
            or continue with
          </span>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-2xl border border-[#eadfd1] py-2.5 flex items-center justify-center gap-2 hover:bg-[#faf7f2]">
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.6 31.9 29.3 35 24 35 16.8 35 11 29.2 11 22s5.8-13 13-13c3.3 0 6.3 1.3 8.5 3.5l5.7-5.7C34.7 3.2 29.6 1 24 1 11.8 1 2 10.8 2 23s9.8 22 22 22c12.1 0 21-9 21-22 0-1.3-.1-2.5-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 15.7 18.9 12 24 12c3.3 0 6.3 1.3 8.5 3.5l5.7-5.7C34.7 3.2 29.6 1 24 1 16 1 9 5.6 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 45c5.2 0 10-1.7 13.7-4.7l-6.3-5.2C29.3 35 26.9 36 24 36c-5.3 0-9.6-3.6-11.2-8.5l-6.4 4.9C9 42.2 15.9 45 24 45z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.3-4.6 7-11.3 7-6.2 0-11-5-11-13s4.8-13 11-13c3.3 0 6.3 1.3 8.5 3.5l5.7-5.7C34.7 3.2 29.6 1 24 1c-12.2 0-22 9.8-22 22s9.8 22 22 22c12.1 0 21-9 21-22 0-1.3-.1-2.5-.4-3.5z"
              />
            </svg>
            Google
          </button>
          <button className="rounded-2xl border border-[#eadfd1] py-2.5 flex items-center justify-center gap-2 hover:bg-[#faf7f2]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0866ff">
              <path d="M22 12.06C22 6.49 17.52 2 11.95 2S2 6.49 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94z" />
            </svg>
            Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#8b6d57] mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#a07f63] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
