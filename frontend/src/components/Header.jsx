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
      <div className="flexx items-center gap-4">
        <div className="hidden items-center gap-2 text-xs texxt-slate-500 sm:flex">
          <CalenderDays size={17} />
          {new Date().toLocaleDateString("en-PK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500  transition hover:bg-slate-50 sm:flex"
        >
          <Bell size={19} />
        </button>
      </div>
    </header>
  );
}
