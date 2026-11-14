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
        </div>
      </section>
    </min>
  </div>
);
