import React, { useMemo, useState } from "react";
import LessonSidebar from "../../components/LessonSidebar";

function PlayerHeader({ lesson }) {
  return (
    <div className="mb-4">
      <div className="text-xs text-stone-500">Bài học</div>
      <h1 className="text-xl md:text-2xl font-bold text-stone-900">{lesson?.title}</h1>
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
        <button key={t.id} onClick={() => setActive(t.id)} className={`px-2 py-2 border-b-2 -mb-px ${active === t.id ? "border-primary-600 text-stone-900" : "border-transparent text-stone-600 hover:text-stone-900"}`}>{t.name}</button>
      ))}
    </div>
  );
}

export default function CoursePlayer() {
  const modules = useMemo(
    () => [
      {
        id: "m1",
        title: "Khởi động với HTML & CSS",
        lessons: [
          { id: "l1", title: "Giới thiệu khoá học", time: "5:12" },
          { id: "l2", title: "Thiết lập môi trường", time: "8:03" },
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
  const flatLessons = modules.flatMap((m) => m.lessons);
  const [current, setCurrent] = useState(flatLessons[0]);
  const [tab, setTab] = useState("video");

  const goPrev = () => {
    const i = flatLessons.findIndex((l) => l.id === current.id);
    if (i > 0) setCurrent(flatLessons[i - 1]);
  };
  const goNext = () => {
    const i = flatLessons.findIndex((l) => l.id === current.id);
    if (i < flatLessons.length - 1) setCurrent(flatLessons[i + 1]);
  };

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <div>
        <PlayerHeader lesson={current} />
        <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-200 to-primary-100" />
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
                <div className="text-right"><button className="btn btn-primary">Lưu ghi chú</button></div>
              </div>
            )}
            {tab === "resources" && (
              <ul className="list-disc pl-5 text-sm text-stone-700 space-y-1">
                <li>Slide bài học (PDF)</li>
                <li>Liên kết tài liệu MDN</li>
                <li>Source code mẫu</li>
              </ul>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button onClick={goPrev} className="btn border-stone-300 hover:border-stone-400">Bài trước</button>
          <button onClick={goNext} className="btn btn-primary">Bài tiếp theo</button>
        </div>
      </div>

      <LessonSidebar
        modules={modules}
        activeLessonId={current.id}
        onSelect={(l) => setCurrent(l)}
      />
    </div>
  );
}

