import React from "react";
import { Link, useParams } from "react-router-dom";

export default function QuizIntro() {
  const { courseId } = useParams();
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-stone-200 p-6">
          <div className="text-sm text-stone-600">Bài kiểm tra</div>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">Đánh giá cuối chương - {courseId || "Khoá học"}</h1>
          <ul className="mt-4 text-sm text-stone-700 space-y-2 list-disc pl-5">
            <li>Thời gian: 20 phút</li>
            <li>Số câu hỏi: 15</li>
            <li>Đạt: 12/15 để vượt qua</li>
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-stone-500">Lưu ý: Không tắt tab trong khi làm bài.</div>
            <Link to={`/quiz/${courseId || "fullstack"}/run`} className="btn btn-primary">Bắt đầu làm bài</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

