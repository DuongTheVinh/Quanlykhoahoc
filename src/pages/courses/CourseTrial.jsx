import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../data/courses";

export default function CourseTrial() {
  const { slug } = useParams();
  const course = getCourseById(slug);
  if (!course) return <div className="max-w-7xl mx-auto px-4 py-12">Khoá học không tồn tại.</div>;
  return (
    <div className="bg-white">
      <div className="bg-soft">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-xs text-primary-700"><span className="w-1.5 h-1.5 rounded-full bg-primary-600"/> Học thử</div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-stone-900">{course.title}</h1>
          <p className="mt-2 text-stone-600">Trải nghiệm cách học, phương pháp và nội dung trước khi quyết định.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl overflow-hidden border border-stone-200">
            <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-100" />
            <div className="p-4 text-sm text-stone-700">Bài học mẫu: xem thử phương pháp giảng dạy và giao diện học.</div>
          </div>
          <div className="mt-6 rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Tóm tắt nội dung</div>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-stone-700">
              {(course.learn || []).slice(0,5).map((i) => (<li key={i}>{i}</li>))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Cách học hiệu quả</div>
            <ol className="mt-3 list-decimal pl-5 space-y-1 text-sm text-stone-700">
              <li>Học theo lộ trình, xem video không tua.</li>
              <li>Tạm dừng để ghi chú ý chính.</li>
              <li>Làm bài tập nhỏ ngay sau mỗi bài.</li>
              <li>Ôn lại 10 phút vào cuối ngày.</li>
              <li>Đặt câu hỏi sớm để nhận phản hồi.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-stone-200 p-6">
            <div className="font-semibold text-stone-900">Sẵn sàng bắt đầu?</div>
            <p className="mt-2 text-sm text-stone-700">Bạn có thể học thử 1 bài, sau đó làm bài kiểm tra để mở khoá toàn bộ.</p>
            <div className="mt-4 flex items-center gap-3">
              <Link to={`/learn/${course.id}?trial=1`} className="btn btn-primary">Bắt đầu học thử</Link>
              <Link to={`/checkout?course=${course.id}`} className="btn border-stone-300 hover:border-stone-400">Mua khoá học</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

