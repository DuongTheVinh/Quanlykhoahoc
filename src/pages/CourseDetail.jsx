import React from "react";
import SectionHeading from "../components/SectionHeading";

export default function CourseDetail() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeading
          eyebrow="Khoá học"
          title="Fullstack Web - Lộ trình 12 tuần"
          subtitle="Xây dựng nền tảng vững, hoàn thiện dự án và portfolio"
        />
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-200 to-primary-100" />
            <div className="mt-6 prose prose-stone max-w-none">
              <h3>Nội dung chính</h3>
              <ul>
                <li>HTML/CSS/JS hiện đại</li>
                <li>React căn bản đến nâng cao</li>
                <li>Node.js, REST API, Auth</li>
                <li>Database và triển khai</li>
              </ul>
              <h3>Dự án cuối khoá</h3>
              <p>Làm 1 ứng dụng thực tế, review bởi mentor và góp ý chi tiết.</p>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="font-semibold">Thông tin</div>
              <div className="mt-2 text-sm text-stone-600 space-y-1">
                <div>Thời lượng: 12 tuần</div>
                <div>Hình thức: Online</div>
                <div>Cấp độ: Trung cấp</div>
              </div>
              <button className="btn btn-primary w-full mt-4">Đăng ký học</button>
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

