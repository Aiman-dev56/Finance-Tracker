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
