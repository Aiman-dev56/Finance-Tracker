const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 2,
});

export default function TransactionTable({
  transactions = [],
  onDelete,
  showActions = true,
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center">
        <p className="mb-2 font-semibold text-slate-700">
          No transactions found
        </p>
      </div>
    );
  }
}
