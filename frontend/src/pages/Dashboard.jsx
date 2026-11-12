import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ArrowRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import api, { getErrorMessage } from "../services/api";

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  return data.transactions || data.data?.transactions || data.data || [];
}

function unwrapSummary(data) {
  return data.summary || data.data?.summary || data.data || data;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loaidng, setLoading] = useState(true);
  const [error, setError] = useState("");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [summaryResponse, transactionsResponse] = await Promise.all([
          api.get("/reports/summary"),
          api.get("/transactions"),
        ]);

        setSummary(unwrapSummary(summaryResponse.data));
        setTransactions(unwrapList(transactionsResponse.data).slice(0, 5));
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }
  });
}
