export const courses = [
  {
    id: "html-css-foundation",
    title: "HTML & CSS Foundation",
    level: "Cơ bản",
    duration: "6 tuần",
    type: "free",
    price: 0,
    summary: "Nắm vững nền tảng HTML/CSS để xây dựng giao diện web hiện đại.",
    learn: ["Semantic HTML", "Flexbox/Grid", "Responsive", "Tiện ích Tailwind cơ bản"],
    target: ["Người mới bắt đầu", "Bạn học trái ngành"],
    curriculum: [
      { title: "HTML cơ bản", lessons: [
        { title: "Cấu trúc trang", time: "07:20" },
        { title: "Thẻ văn bản", time: "11:35" },
        { title: "Liên kết & Hình ảnh", time: "10:12" },
      ] },
      { title: "CSS cơ bản", lessons: [
        { title: "Selector", time: "09:15" },
        { title: "Box model", time: "12:40" },
        { title: "Màu sắc & Font", time: "08:05" },
      ] },
    ],
  },
  {
    id: "js-basics",
    title: "JavaScript Căn Bản",
    level: "Cơ bản",
    duration: "8 tuần",
    type: "free",
    price: 0,
    summary: "Hiểu bản chất JavaScript để tự tin bước vào front-end frameworks.",
    learn: ["Kiểu dữ liệu", "Hàm", "Array/Object", "DOM cơ bản"],
    target: ["Bạn đã học HTML/CSS", "Muốn làm Frontend"],
    curriculum: [
      { title: "JS nền tảng", lessons: [
        { title: "Biến & kiểu", time: "13:20" },
        { title: "Toán tử", time: "12:10" },
        { title: "Hàm & scope", time: "14:25" },
      ] },
      { title: "Làm việc với DOM", lessons: [
        { title: "Select elements", time: "10:34" },
        { title: "Sự kiện", time: "11:55" },
        { title: "Bài tập nhỏ", time: "09:10" },
      ] },
    ],
  },
  {
    id: "react-intro",
    title: "React Nhập Môn",
    level: "Trung cấp",
    duration: "6 tuần",
    type: "free",
    price: 0,
    summary: "Làm quen React: component, state, props và hooks cơ bản.",
    learn: ["Component", "State/Props", "useEffect", "Router cơ bản"],
    target: ["Biết JS ES6", "Muốn học SPA"],
    curriculum: [
      { title: "React căn bản", lessons: [
        { title: "JSX", time: "08:40" },
        { title: "Component", time: "12:50" },
        { title: "Props/State", time: "13:10" },
      ] },
      { title: "Hooks", lessons: [
        { title: "useState", time: "11:05" },
        { title: "useEffect", time: "12:15" },
        { title: "Bài tập", time: "09:30" },
      ] },
    ],
  },
  {
    id: "nodejs-api",
    title: "Node.js REST API",
    level: "Trung cấp",
    duration: "8 tuần",
    type: "pro",
    price: 599000,
    summary: "Xây dựng REST API với Node.js/Express, Authentication và best practices.",
    learn: ["Express", "Middleware", "JWT Auth", "Validation", "Logging"],
    target: ["Front-end muốn lên Fullstack", "Backend beginner"],
    curriculum: [
      { title: "Express & Routing", lessons: [
        { title: "Khởi tạo dự án", time: "15:10" },
        { title: "Router tách module", time: "17:45" },
        { title: "Middleware", time: "16:30" },
      ] },
      { title: "Auth & Security", lessons: [
        { title: "JWT", time: "18:05" },
        { title: "CORS", time: "09:55" },
        { title: "Rate limit", time: "10:40" },
      ] },
    ],
  },
  {
    id: "fullstack-web",
    title: "Fullstack Web Thực Chiến",
    level: "Nâng cao",
    duration: "12 tuần",
    type: "pro",
    price: 999000,
    summary: "Lộ trình end-to-end: React, Node.js, Database, Deploy và CI/CD.",
    learn: ["React nâng cao", "API & DB", "Auth/Role", "CI/CD", "Deploy"],
    target: ["Đã có nền tảng JS", "Mục tiêu đi làm"],
    curriculum: [
      { title: "Frontend", lessons: [
        { title: "React Router", time: "20:30" },
        { title: "State Management", time: "24:10" },
        { title: "Performance", time: "18:55" },
      ] },
      { title: "Backend", lessons: [
        { title: "REST API", time: "22:10" },
        { title: "ORM", time: "19:40" },
        { title: "Authentication", time: "21:35" },
      ] },
      { title: "DevOps", lessons: [
        { title: "Docker cơ bản", time: "16:00" },
        { title: "CI/CD", time: "17:15" },
        { title: "Triển khai", time: "14:20" },
      ] },
    ],
  },
  {
    id: "react-advanced",
    title: "React Nâng Cao & Patterns",
    level: "Nâng cao",
    duration: "8 tuần",
    type: "pro",
    price: 799000,
    summary: "React patterns, performance, testing và kiến trúc component.",
    learn: ["Hooks nâng cao", "Context/Reducer", "Patterns", "Testing"],
    target: ["Frontend 1-2 năm kinh nghiệm", "Nâng cấp kỹ năng"],
    curriculum: [
      { title: "Patterns", lessons: [
        { title: "Container/Presentational", time: "14:35" },
        { title: "Render props", time: "13:10" },
        { title: "Compound components", time: "15:05" },
      ] },
      { title: "Testing", lessons: [
        { title: "Unit", time: "12:30" },
        { title: "Integration", time: "13:25" },
        { title: "Best practices", time: "11:40" },
      ] },
    ],
  },
];

export function getCourseById(id) {
  return courses.find((c) => c.id === id);
}
