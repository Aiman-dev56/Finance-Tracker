import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, ReceiptText } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";
import api, { getErrorMessage } from "../services/api";

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  return data.transactions || data.data?.transactions || data.data || [];
}

export default function Transactions() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/transactions");
      setTransactions(unwrapList(response.data));
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
}

async function addTransaction(transaction) {
  await api.post("/transactions", transaction);
  setShowForm(false);
  setNotice("Transaction added successfully.");
  await loadTransactions();
}

async function deleteTransaction(id) {
  if (!Window.confirm("Are you sure you want to delete this transaction?")) {
    return;
  }
  setError("");
  setNotice("");

  try {
    await api.delete(`/transactions/${id}`);
    setNotice("Transaction deleted successfully.");
    await loadTransactions();
  } catch (error) {
    setError(getErrorMessage(error));
  }
}

const filteredTransactions =
  filter === "all"
    ? Transactions
    : Transactions.filter((item) => item.type === filter);

return (
  <div className="min-h-screen bg-slate-50 md:pl-64">
    <Sidebar onLogout={logout} />

    <min className="mx-auto max-w-[1600px] px-4 pb-10 md:px-8">
      <Header title="Transactions" user={user} />

      <section className="my-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-slate-900">
            Manage your transactions
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Keep track of every rupee you earn and spend.
          </p>
        </div>

        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-brand-dark"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close form" : "Add transaction"}
        </button>
      </section>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-emerald-50 p-4 text-sm text-emerald-700"
        >
          {notice}
        </div>
      )}

      {showForm && (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <TransactionForm
            onSubmit={addTransaction}
            onCancel={() => setShowForm(false)}
          />
        </section>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-900">
            <ReceiptText size={20} className="text-brand" />
            All Transactions
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {filteredTransactions.length} transactions shown
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-2">
          {["all", "income", "expense"].map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-lg py-2 text-xs font-bold transition ${
                filter === value
                  ? "bg-white text-brand shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {value === "all"
                ? "All"
                : value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
      </section>
    </min>
  </div>
);
