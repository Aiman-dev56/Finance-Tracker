const colors = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  red: "bg-rose-50 text-rose-600",
  purple: "bg-violet-50 text-violet-600",
};

export default function SummaryCard({
  title,
  amount,
  icon: Icon,
  color = "blue",
  description,
}) {
  const formattedAmount = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ">
      <div className="mb-6 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 md:text-sm">
          {title}
        </span>

        {Icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors[color] || colors.blue}`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </article>
  );
}
