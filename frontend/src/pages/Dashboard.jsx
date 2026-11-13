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

    loadDashboard();
  }, []);

  const income = Number(summary.totalIncome ?? summary.total_income ?? 0);
  const express = Number(summary.totalExpenses ?? summary.total_expenses ?? 0);
  const balance = Number(summary.balance ?? income - expenses);

  return (
    <div className="min-h-screen bg-slate-50 md:pl-64">
      <Sidebar onLogout={logout} />

      <main className="mx-auto max-w-[1600px] px-4 pb-10 md:px-8">
        <Header title="Dashboard" user={user} />

        <section className="my-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-slate-900">
              Your financial overview
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              See how your money is coming in and going out.
            </p>
          </div>

          <Link
            to="/transactions"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-brand-dark"
          >
            <Plus size={18} />
            Add Transaction
          </Link>
        </section>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        {loaidng ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            Loading your finances...
          </div>
        ) : (
          <>
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total balance"
                amount={balance}
                icon={Wallet}
                color="blue"
                description="Income minus expenses"
              />
              <SummaryCard
                title="Total income"
                amount={income}
                icon={TrendingUp}
                color="green"
                description="Money received"
              />
              <SummaryCard
                title="Total expenses"
                amount={expenses}
                icon={TrendingDown}
                color="red"
                description="Money spent"
              />
              <SummaryCard />

              <SummaryCard
                title="Net savings"
                amount={balance}
                icon={PiggyBank}
                color="purple"
                description="Current net amount"
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
