import { useState } from "react";
import { getErrorMessage } from "../services/api";

const initialForm = {
  type: "expense",
  title: "",
  amount: "",
  category: "Food",
  payment_method: "cash",
  transaction_date: new Date().toLocaleDataString("en-CA"),
  notes: "",
};

const categories = {
  income: ["Salary", "Freelance", "Business", "Investment", "Other"],
  expense: [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Health",
    "Education",
    "Entertainment",
    "Other",
  ],
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 ";

export default function TransactionForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "type" ? { category: categories[value][0] } : {}),
    }));
  }

  async function handelSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      !Number.isFinite(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      setError("Enter a title and an amount greater then zero.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        amount: Number(form.amount),
      });

      setForm({
        ...initialForm,
        transaction_date: new Date().toLocaleDateString("en-CA"),
      });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handelSubmit} className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-slate-900">
          Add Transaction
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Record money coming in or going out.
        </p>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Transaction type</span>
          <select
            className={fieldClass}
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Title</span>
          <input
            className={fieldClass}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g, Monthly Salary"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Amount</span>
          <input
            className={fieldClass}
            name="amount"
            type="number"
            min="0.1"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Category</span>
          <select
            className={fieldClass}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories[form.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Payment Method</span>
          <select
            className={fieldClass}
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
          >
            {[
              "cash",
              "Bank Transafer",
              "Debit Card",
              "Credit Card",
              "Mobile Wallet",
            ].map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          <span>Date</span>
          <input
            className={fieldClass}
            name="transaction_date"
            type="data"
            value={form.transaction_date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
    </form>
  );
}
