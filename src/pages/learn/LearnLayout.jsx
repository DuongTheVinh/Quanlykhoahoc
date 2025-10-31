import React from "react";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { getCourseById } from "../../data/courses";

export default function LearnLayout() {
  const { courseId } = useParams();
  const [sp] = useSearchParams();
  const trial = sp.get("trial") === "1";
  const course = getCourseById(courseId);
  const isPro = course?.type === "pro";
  const passed = typeof window !== "undefined" && courseId ? localStorage.getItem(`quizPassed:${courseId}`) === "1" : false;
  return (
    <div className="bg-white min-h-[calc(100vh-64px-64px)]">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link to="/courses" className="text-stone-600 hover:text-stone-900">Khoá học</Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-900 font-medium">{courseId || "Khoá học"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/quiz/${courseId || "fullstack"}`} className="btn border-stone-300 hover:border-stone-400">Làm bài kiểm tra</Link>
            <Link to="/dashboard" className="btn btn-primary">Thoát học</Link>
          </div>
        </div>
        <div className="h-1 bg-stone-200">
          <div className="h-full bg-primary-600 w-1/3" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isPro && !trial && !passed ? (
          <div className="min-h-[50vh] grid place-items-center">
            <div className="max-w-xl w-full rounded-2xl border border-stone-200 p-6 text-center">
              <div className="text-lg font-semibold text-stone-900">Hoàn tất giới thiệu và bài kiểm tra</div>
              <p className="mt-2 text-sm text-stone-600">Để vào học chính thức khoá <span className="font-medium">{course?.title}</span>, vui lòng xem phần giới thiệu và làm bài kiểm tra đạt yêu cầu.</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Link to={`/courses/${courseId}/intro`} className="btn border-stone-300 hover:border-stone-400">Xem giới thiệu</Link>
                <Link to={`/quiz/${courseId}`} className="btn btn-primary">Làm bài kiểm tra</Link>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
