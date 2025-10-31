import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LessonSidebar from "../../components/LessonSidebar";
import { getCourseById } from "../../data/courses";

function PlayerHeader({ lesson }) {
  return (
    <div className="mb-4">
      <div className="text-xs text-stone-500 uppercase tracking-wide">Bài học</div>
      <h1 className="text-xl md:text-2xl font-bold text-stone-900">{lesson?.title || "Nội dung đang cập nhật"}</h1>
    </div>
  );
}

function ContentTabs({ active, setActive }) {
  const tabs = [
    { id: "video", name: "Video" },
    { id: "notes", name: "Ghi chú" },
    { id: "resources", name: "Tài liệu" },
  ];
  return (
    <div className="border-b border-stone-200 flex items-center gap-4 text-sm">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`px-2 py-2 border-b-2 -mb-px ${active === t.id ? "border-primary-600 text-stone-900" : "border-transparent text-stone-600 hover:text-stone-900"}`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [sp] = useSearchParams();
  const isTrial = sp.get("trial") === "1";
  const course = getCourseById(courseId);
  const isPro = course?.type === "pro";

  const modules = useMemo(
    () => [
      {
        id: "m1",
        title: "Khởi động với HTML & CSS",
        lessons: [
          { id: "l1", title: "Giới thiệu khoá học", time: "05:12" },
          { id: "l2", title: "Thiết lập môi trường", time: "08:03" },
          { id: "l3", title: "Flexbox căn bản", time: "12:27" },
        ],
      },
      {
        id: "m2",
        title: "JavaScript nền tảng",
        lessons: [
          { id: "l4", title: "Biến và kiểu dữ liệu", time: "10:45" },
          { id: "l5", title: "Hàm và phạm vi", time: "11:18" },
          { id: "l6", title: "Mảng & đối tượng", time: "14:06" },
        ],
      },
    ],
    []
  );

  const playableModules = useMemo(() => {
    if (!isTrial) return modules;
    const firstModule = modules[0];
    const firstLesson = firstModule.lessons[0];
    return [
      {
        id: firstModule.id,
        title: firstModule.title,
        lessons: [firstLesson],
      },
    ];
  }, [modules, isTrial]);

  const flatLessons = playableModules.flatMap((m) => m.lessons);
  const [index, setIndex] = useState(0);
  const current = flatLessons[index] || { id: "", title: "Nội dung đang cập nhật" };
  const [tab, setTab] = useState("video");

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(flatLessons.length - 1, i + 1));
  const canPrev = index > 0;
  const canNext = index < flatLessons.length - 1;

  const containerCls = isTrial ? "flex flex-col gap-6 items-stretch" : "grid md:grid-cols-[1fr_320px] gap-6";
  const cardCls = isTrial ? "max-w-3xl mx-auto w-full rounded-2xl border border-stone-200 bg-white shadow-sm p-6" : "";

  const handleSelect = (lesson) => {
    const found = flatLessons.findIndex((l) => l.id === lesson.id);
    if (found !== -1) {
      setIndex(found);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={containerCls}>
      {isTrial && (
        <div className="max-w-3xl mx-auto w-full rounded-xl border border-primary-200 bg-primary-50 p-4 text-sm text-primary-800">
          Đây là chế độ học thử, bạn chỉ có thể xem 1 bài học đầu tiên.
          {isPro && course && (
            <>
              {" "}
              <Link to={`/checkout?course=${course.id}`} className="underline hover:no-underline font-medium">
                Mua khoá {course.title}
              </Link>
              {" "}
              để mở khoá toàn bộ nội dung.
            </>
          )}
        </div>
      )}

      <div className={cardCls}>
        <PlayerHeader lesson={current} />
        <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 via-primary-200 to-primary-100" />
        <div className="mt-4">
          <ContentTabs active={tab} setActive={setTab} />
          <div className="mt-4">
            {tab === "video" && (
              <div className="text-sm text-stone-700">
                <p>Nội dung tóm tắt bài học, ghi chú quan trọng và liên kết hữu ích.</p>
              </div>
            )}
            {tab === "notes" && (
              <div className="space-y-3">
                <textarea className="input border-stone-300 w-full h-32" placeholder="Ghi chú của bạn..." />
                <div className="text-right">
                  <button className="btn btn-primary">Lưu ghi chú</button>
                </div>
              </div>
            )}
            {tab === "resources" && (
              <ul className="list-disc pl-5 text-sm text-stone-700 space-y-1">
                <li>Slide bài học (PDF)</li>
                <li>Liên kết tài liệu tham khảo</li>
                <li>Source code minh hoạ</li>
              </ul>
            )}
          </div>
        </div>
        <div className={`mt-6 flex items-center ${isTrial ? "justify-center gap-3" : "justify-between"}`}>
          <button onClick={goPrev} className="btn border-stone-300 hover:border-stone-400" disabled={!canPrev}>Bài trước</button>
          <button onClick={goNext} className="btn btn-primary" disabled={!canNext}>Bài tiếp theo</button>
        </div>
      </div>

      {!isTrial && (
        <LessonSidebar
          modules={playableModules}
          activeLessonId={current.id}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

