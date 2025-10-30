import React from "react";
import SectionHeading from "../components/SectionHeading";

function CourseCard({ title, level, time }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-md transition">
      <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-100" />
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">{level}</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-600">{time}</span>
        </div>
        <h3 className="mt-2 font-semibold text-stone-900 group-hover:text-primary-700">{title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-stone-600">120 bài học</div>
          <button className="btn btn-primary">Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const courses = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: `Fullstack Web #${i + 1}`,
    level: i % 3 === 0 ? "Cơ bản" : i % 3 === 1 ? "Trung cấp" : "Nâng cao",
    time: `${8 + (i % 4)} tuần`,
  }));
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeading
          eyebrow="Khoá học"
          title="Danh sách khoá học"
          subtitle="Chọn lộ trình phù hợp với mục tiêu của bạn"
          center
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <a key={c.id} href={`/learn/fullstack?from=courses`} className="block">
              <CourseCard title={c.title} level={c.level} time={c.time} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
