import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Question({ q, onAnswer, answer }) {
  return (
    <div className="rounded-xl border border-stone-200 p-4 bg-white">
      <div className="text-sm text-stone-600">Câu hỏi</div>
      <div className="mt-1 font-semibold text-stone-900">{q.text}</div>
      <div className="mt-3 space-y-2">
        {q.choices.map((c) => (
          <label key={c.id} className={`flex items-center gap-2 p-2 rounded-lg border ${answer === c.id ? "border-primary-300 bg-primary-50" : "border-stone-200 hover:bg-stone-50"}`}>
            <input
              type="radio"
              name={`q-${q.id}`}
              checked={answer === c.id}
              onChange={() => onAnswer(c.id)}
            />
            <span className="text-sm text-stone-800">{c.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function QuizRun() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const questions = useMemo(
    () => [
      { id: 1, text: "Flexbox dùng để làm gì?", choices: [
        { id: "a", text: "Căn chỉnh bố cục linh hoạt" },
        { id: "b", text: "Tạo server" },
        { id: "c", text: "Quản lý database" },
      ], correct: "a" },
      { id: 2, text: "const dùng để?", choices: [
        { id: "a", text: "Khai báo biến có thể gán lại" },
        { id: "b", text: "Khai báo hằng số" },
        { id: "c", text: "Khai báo lớp" },
      ], correct: "b" },
      { id: 3, text: "Array method nào tạo mảng mới?", choices: [
        { id: "a", text: "push" },
        { id: "b", text: "splice" },
        { id: "c", text: "map" },
      ], correct: "c" },
    ],
    []
  );

  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const current = questions[index];

  const progress = Math.round(((index + 1) / questions.length) * 100);

  const finish = () => {
    const correct = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    navigate(`/quiz/${courseId || "fullstack"}/result`, { state: { correct, total: questions.length } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl border border-stone-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-stone-600">Tiến độ</div>
          <div className="text-sm text-stone-700">{index + 1}/{questions.length}</div>
        </div>
        <div className="mt-2 h-2 bg-stone-200 rounded-full">
          <div className="h-2 bg-primary-600 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-4">
        <Question
          q={current}
          answer={answers[current.id]}
          onAnswer={(a) => setAnswers({ ...answers, [current.id]: a })}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="btn border-stone-300 hover:border-stone-400"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Trước
        </button>
        {index < questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={!answers[current.id]}
          >
            Tiếp
          </button>
        ) : (
          <button className="btn btn-primary" onClick={finish} disabled={!answers[current.id]}>Nộp bài</button>
        )}
      </div>
      <div className="mt-3 text-xs text-stone-500 text-right">
        <Link to={`/quiz/${courseId || "fullstack"}`} className="hover:underline">Xem lại hướng dẫn</Link>
      </div>
    </div>
  );
}

