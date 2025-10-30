import React from "react";
import SectionHeading from "../components/SectionHeading";

function MentorCard({ name, title }) {
  return (
    <div className="rounded-2xl border border-stone-200 p-6 bg-white">
      <div className="w-16 h-16 rounded-full bg-primary-200" />
      <div className="mt-3 font-semibold text-stone-900">{name}</div>
      <div className="text-sm text-stone-600">{title}</div>
    </div>
  );
}

export default function Mentors() {
  const mentors = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Mentor ${i + 1}`,
    title: i % 2 ? "Senior Fullstack" : "Senior Frontend",
  }));
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeading
          eyebrow="Đội ngũ"
          title="Mentor đồng hành"
          subtitle="Chuyên gia nhiều năm kinh nghiệm tại doanh nghiệp"
          center
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((m) => (
            <MentorCard key={m.id} name={m.name} title={m.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

