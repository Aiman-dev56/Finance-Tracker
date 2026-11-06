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
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Date</th>
            <th className="px-4 py-4">Amount</th>
            {showActions && <th className="px-4 py-4">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((transaction) => {
            const income = transaction.type === "income";

            return (
              <tr
                key={transaction.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${income ? "bg-emerald-500" : "bg-rose-500"}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {transaction.title}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        {transaction.payment_method || "_"}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
