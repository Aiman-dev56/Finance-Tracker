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
  }
}
