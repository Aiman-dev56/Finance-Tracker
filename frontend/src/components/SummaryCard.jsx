export default function SummaryCard({
    title,
    amount,
    description,
}) {
    return(
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
                {title}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
                {new Intl.NumberFormat("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    maximumFractionDigits : 2,
                }).format(Number(amount))}

            </h2>
            <p className="mt-2 text-sm text-slate-500">
                {description}
                </p>

        </div>
    );
}