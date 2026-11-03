import { CalenderDays, Bell } from "lucide-react";

export default function Header({ title, user }) {
  const name = user?.name || "User";

  return (
    <header className="flex min-h-24 items-center justify-center gap-4 border-b border-slate-200 py-4">
      <div>
        <p className="mb-1 text-[10px] font-bold tracking-[0.18em] text-slate-400">
          PERSONAL FINANCE
        </p>
        <h1 className="font-heading text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h1>
      </div>
      <div></div>
    </header>
  );
}
