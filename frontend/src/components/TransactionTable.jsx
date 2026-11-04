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
        <p className="text-sm text-slate-400">
          Your transactions will appear here after you add them.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[650px] text-left">
        <thead>
          <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
            <th className="px-4 py-4">Transaction</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
