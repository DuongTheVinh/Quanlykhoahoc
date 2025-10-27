import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
