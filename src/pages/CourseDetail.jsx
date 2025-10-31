import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { getCourseById } from "../data/courses";

function formatVND(n) {
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${n} đ`;
  }
}

function TabNav({ tab, setTab }) {
  const items = [
    { id: "overview", name: "Tổng quan" },
    { id: "curriculum", name: "Giáo trình" },
    { id: "mentors", name: "Mentor" },
    { id: "faq", name: "FAQ" },
  ];
  return (
    <div className="border-b border-stone-200 flex gap-4 text-sm">
      {items.map((t) => (
        <button key={t.id} onClick={() => setTab(t.id)} className={`px-2 py-2 -mb-px border-b-2 ${tab === t.id ? "border-primary-600 text-stone-900" : "border-transparent text-stone-600 hover:text-stone-900"}`}>{t.name}</button>
      ))}
    </div>
  );
}

function parseTime(t) {
  if (!t || typeof t !== "string") return 0;
  const [m, s] = t.split(":").map((x) => parseInt(x || "0", 10));
  return (m || 0) * 60 + (s || 0);
}

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourseById(slug) || { title: "Khoá học", duration: "—", level: "—", type: "free", price: 0 };
  const isPro = course.type === "pro";
  const [tab, setTab] = useState("overview");
  const [open, setOpen] = useState(() => (course.curriculum || []).map(() => true));

  const totals = useMemo(() => {
    const modules = course.curriculum || [];
    let lessons = 0;
    let seconds = 0;
    modules.forEach((m) => {
      (m.lessons || []).forEach((l) => {
        lessons += 1;
        seconds += parseTime(l.time);
      });
    });
    const minutes = Math.round(seconds / 60);
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { lessons, modules: modules.length, label: h > 0 ? `${h} giờ ${m} phút` : `${m} phút` };
  }, [course]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeading
          eyebrow="Khoá học"
          title={course.title}
          subtitle={`Thời lượng ${course.duration} • Cấp độ ${course.level}`}
        />
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-200 to-primary-100" />
            <div className="mt-6">
              <TabNav tab={tab} setTab={setTab} />
              {tab === "overview" && (
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-stone-200 p-6">
                    <div className="font-semibold text-stone-900">Bạn sẽ học được</div>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-stone-700">
                      {(course.learn || []).map((i) => (<li key={i}>{i}</li>))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-stone-200 p-6">
                    <div className="font-semibold text-stone-900">Phù hợp với</div>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-stone-700">
                      {(course.target || []).map((i) => (<li key={i}>{i}</li>))}
                    </ul>
                  </div>
                </div>
              )}
              {tab === "curriculum" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-stone-600">{totals.modules} chương • {totals.lessons} bài học • Thời lượng {totals.label}</div>
                    <button className="text-primary-700 hover:underline" onClick={() => setOpen(open.map(() => false))}>Thu nhỏ tất cả</button>
                  </div>
                  <div className="mt-3 space-y-3">
                    {(course.curriculum || []).map((m, idx) => {
                      const isOpen = open[idx];
                      const count = (m.lessons || []).length;
                      return (
                        <div key={m.title} className="rounded-xl border border-stone-200">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 text-left"
                            onClick={() => setOpen(open.map((v, i) => (i === idx ? !v : v)))}
                          >
                            <div className="font-medium text-stone-900">{idx + 1}. {m.title}</div>
                            <div className="text-xs text-stone-600">{count} bài học</div>
                          </button>
                          {isOpen && (
                            <ul className="divide-y divide-stone-200">
                              {(m.lessons || []).map((l, i2) => (
                                <li key={`${m.title}-${i2}`} className="flex items-center justify-between px-4 py-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                                    <span className="text-stone-800">{i2 + 1}. {l.title || l}</span>
                                  </div>
                                  <span className="text-stone-500">{l.time || "--:--"}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {tab === "mentors" && (
                <div className="mt-4 rounded-2xl border border-stone-200 p-6 text-sm text-stone-700">
                  Danh sách mentor sẽ được cập nhật theo từng khoá.
                </div>
              )}
              {tab === "faq" && (
                <div className="mt-4 rounded-2xl border border-stone-200 p-6 text-sm text-stone-700">
                  - Lịch học: linh hoạt, chủ động theo video và bài tập.
                  <br />- Hỗ trợ: Q&A trong giờ hành chính.
                </div>
              )}
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200">
              <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-100" />
              <div className="p-4">
                <div className="text-2xl font-bold text-stone-900">{isPro ? formatVND(course.price) : "Miễn phí"}</div>
                <div className="mt-3 text-sm text-stone-700 space-y-1">
                  <div>Trình độ: {course.level}</div>
                  <div>Tổng số {totals.lessons} bài học</div>
                  <div>Thời lượng {totals.label}</div>
                  <div>Học mọi lúc, mọi nơi</div>
                </div>
                {isPro ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link className="btn border-stone-300 hover:border-stone-400" to={`/courses/${course.id}/intro`}>Giới thiệu</Link>
                    <Link className="btn btn-primary" to={`/checkout?course=${course.id}`}>Mua</Link>
                    <Link className="btn col-span-2" to={`/courses/${course.id}/trial`}>Học thử</Link>
                  </div>
                ) : (
                  <Link className="btn btn-primary w-full mt-4" to={`/learn/${course.id}`}>Học miễn phí</Link>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="font-semibold">Yêu cầu đầu vào</div>
              <ul className="mt-2 text-sm text-stone-600 list-disc pl-5 space-y-1">
                <li>Kiến thức lập trình cơ bản</li>
                <li>Thời gian 8-10 giờ/tuần</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

