import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../data/courses";

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

export default function ProIntro() {
  const { slug } = useParams();
  const course = getCourseById(slug);
  const safeCourse = course || {
    id: slug,
    title: "Khoá học không tồn tại",
    duration: "—",
    level: "—",
    type: "free",
    price: 0,
    summary: "Khoá học bạn tìm không tồn tại hoặc đã bị gỡ bỏ.",
    learn: [],
    target: [],
    curriculum: [],
  };
  const isPro = safeCourse.type === "pro";
  const [open, setOpen] = useState(() => (safeCourse.curriculum || []).map((_, i) => i === 0));
  
  function parseTime(t) {
    if (!t || typeof t !== "string") return 0;
    const [m, s] = t.split(":").map((x) => parseInt(x || "0", 10));
    return (m || 0) * 60 + (s || 0);
  }

  const totals = useMemo(() => {
    const modules = safeCourse.curriculum || [];
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
    const mm = minutes % 60;
    return { modules: modules.length, lessons, label: h > 0 ? `${h} giờ ${mm} phút` : `${mm} phút` };
  }, [safeCourse]);
  return (
    <div className="bg-white">
      <div className="bg-soft">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            {isPro ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1 text-xs text-primary-700"><Crown /> Khoá học Pro</div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1 text-xs text-stone-700">Khoá học Miễn phí</div>
            )}
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-stone-900">{safeCourse.title}</h1>
            <p className="mt-3 text-stone-600">{safeCourse.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {isPro ? (
                <>
                  <div className="text-2xl font-bold text-stone-900">{formatVND(safeCourse.price)}</div>
                  <Link className="btn btn-primary" to={`/checkout?course=${safeCourse.id}`}>Mua khoá học</Link>
                  <Link className="btn border-stone-300 hover:border-stone-400" to={`/courses/${safeCourse.id}/trial`}>Học thử</Link>
                </>
              ) : (
                <>
                  <Link className="btn btn-primary" to={course ? `/learn/${safeCourse.id}` : "/courses"}>Học miễn phí</Link>
                  <Link className="btn border-stone-300 hover:border-stone-400" to={course ? `/courses/${safeCourse.id}` : "/courses"}>Xem giáo trình</Link>
                </>
              )}
            </div>
            <div className="mt-4 text-sm text-stone-600">Thời lượng {safeCourse.duration} • Cấp độ {safeCourse.level}</div>
          </div>
          <div className="w-full">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400" />
            <div className="mt-2 text-center text-xs text-stone-600">Xem giới thiệu khoá học</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-[1fr_360px] gap-10">
        <div>
          <div>
            <div className="font-semibold text-stone-900">Bạn sẽ học được gì?</div>
            <div className="mt-3 grid md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {(safeCourse.learn || []).map((i) => (
                <div key={i} className="flex items-start gap-2 text-stone-700">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-600" />
                  <span>{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-stone-900">Nội dung khoá học</div>
              <div className="text-xs text-primary-700">
                <button className="hover:underline mr-3" onClick={() => setOpen(open.map(() => true))}>Mở rộng tất cả</button>
                <button className="hover:underline" onClick={() => setOpen(open.map(() => false))}>Thu nhỏ tất cả</button>
              </div>
            </div>
            <div className="mt-1 text-sm text-stone-600">{totals.modules} chương • {totals.lessons} bài học • Thời lượng {totals.label}</div>
            <div className="mt-4 space-y-3">
              {(safeCourse.curriculum || []).map((m, idx) => {
                const isOpen = open[idx];
                const count = (m.lessons || []).length;
                return (
                  <div key={m.title} className="rounded-xl border border-stone-200">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left bg-stone-50 rounded-t-xl"
                      onClick={() => setOpen(open.map((v, i) => (i === idx ? !v : v)))}
                    >
                      <div className="font-medium text-stone-900 flex items-center gap-2">
                        <span className="text-stone-400">{isOpen ? "—" : "+"}</span>
                        <span>{idx + 1}. {m.title}</span>
                      </div>
                      <div className="text-xs text-stone-700 bg-white border border-stone-200 px-2 py-1 rounded-lg">{count} bài học</div>
                    </button>
                    {isOpen && (
                      <ul className="divide-y divide-stone-200">
                        {(m.lessons || []).map((l, i2) => (
                          <li key={`${m.title}-${i2}`} className="flex items-center justify-between px-4 py-2 text-sm">
                            <div className="flex items-center gap-2 text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                              <span>{i2 + 1}. {l.title || l}</span>
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
        </div>

        <aside className="space-y-4 md:sticky md:top-6 h-max">
          <div className="rounded-2xl overflow-hidden border border-stone-200">
            <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-400" />
            <div className="p-4 text-center text-xs text-stone-600">Xem giới thiệu khoá học</div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-stone-900 text-center">{isPro ? formatVND(safeCourse.price) : "Miễn phí"}</div>
              <div className="mt-3 flex flex-col items-stretch gap-2">
                {isPro ? (
                  <>
                    <Link className="btn btn-primary w-full" to={`/checkout?course=${safeCourse.id}`}>Đăng ký học</Link>
                    <Link className="btn w-full border-stone-300 hover:border-stone-400" to={`/courses/${safeCourse.id}/trial`}>Học thử</Link>
                  </>
                ) : (
                  <Link className="btn btn-primary w-full" to={course ? `/learn/${safeCourse.id}` : "/courses"}>Đăng ký học</Link>
                )}
              </div>
              <ul className="mt-4 text-sm text-stone-700 space-y-2">
                <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-stone-200" />Trình độ {String(safeCourse.level).toLowerCase()}</li>
                <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-stone-200" />Tổng số {totals.lessons} bài học</li>
                <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-stone-200" />Thời lượng {totals.label}</li>
                <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-stone-200" />Học mọi lúc, mọi nơi</li>
              </ul>
            </div>
          </div>
          {!course && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Khoá học này hiện không khả dụng. Vui lòng quay lại <Link className="underline" to="/courses">danh sách khoá học</Link> để chọn khoá khác.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
