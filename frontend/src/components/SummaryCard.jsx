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
  });
}
