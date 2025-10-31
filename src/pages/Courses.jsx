import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { courses as catalog } from "../data/courses";

function formatVND(n) {
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${n} đ`;
  }
}

function Crown() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-amber-700">
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 7l4.5 3 4.5-6 4.5 6L21 7v10H3z"></path></svg>
      Pro
    </span>
  );
}

function CourseCard({ course }) {
  const isPro = course.type === "pro";
  return (
    <div className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-md transition">
      <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-100 relative">
        {isPro && (
          <div className="absolute top-2 right-2 rounded-full bg-white/90 border border-amber-300 px-2 py-1">
            <Crown />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">{course.level}</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-600">{course.duration}</span>
        </div>
        <h3 className="mt-2 font-semibold text-stone-900 group-hover:text-primary-700">
          <Link to={`/courses/${course.id}/intro`}>{course.title}</Link>
        </h3>
        <div className="mt-3 flex items-center justify-between">
          {isPro ? (
            <div className="text-sm font-medium text-stone-900">{formatVND(course.price)}</div>
          ) : (
            <div className="text-sm text-green-700 font-medium">Miễn phí</div>
          )}
          <div className="flex gap-2">
            {isPro ? (
              <>
                <Link className="btn border-stone-300 hover:border-stone-400" to={`/courses/${course.id}/intro`}>Giới thiệu</Link>
                <Link className="btn btn-primary" to={`/checkout?course=${course.id}`}>Mua</Link>
              </>
            ) : (
              <Link className="btn border-stone-300 hover:border-stone-400" to={`/courses/${course.id}/intro`}>Giới thiệu</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const freeCourses = catalog.filter((c) => c.type === "free");
  const proCourses = catalog.filter((c) => c.type === "pro");
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <SectionHeading eyebrow="Khoá học" title="Danh sách khoá học" center />

        <div>
          <h3 className="text-lg font-semibold text-stone-900">Khoá học miễn phí</h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">Khoá học Pro <span className="text-xs">(<Crown />)</span></h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

