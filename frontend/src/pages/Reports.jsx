import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Responsivecontainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import api, { getErrorMeesage } from "../services/api";

const chartColors = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#9333ea",
  "#e11d48",
  "#0891b2",
  "#64748b",
];

const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function Reports() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [summary, setSummary] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      setError("");

      try {
        const [summaryResponse, reportsResponse] = await Promise.all([
          api.get("/reports/summary"),
          api.get("/reports"),
        ]);

        const summaryData = summaryResponse.data;
        const reportData = reportsResponse.data;

        setSummary(
          summaryData.summary ||
            summaryData.data?.summary ||
            summaryData.data ||
            summaryData,
        );

        setMonthly(
          reportData.monthly ||
            reportData.data?.monthly ||
            reportData.data?.monthlyBreakdown ||
            [],
        );

        setCategories(
          reportData.categories ||
            reportData.data?.categories ||
            reportData.data?.categoryBreakdown ||
            [],
        );
      } catch (error) {
        setError(getErrorMeesage(error));
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const income = Number(summary.totalIncome ?? summary.total_income ?? 0);
  const expenses = Number(summary.totalExpenses ?? summary.total_expenses ?? 0);
  const balance = Number(summary.balance ?? income - expenses);

  return (
    <div className="min-h-screen bg-slate-50 md:pl-64">
      <Sidebar onLogout={logout} />

      <main className="mx-auto max-w[1600px] px-4 pb-10 md:px-8">
        <Header title="Reports" user={user} />

        <section className="my-8">
          <h2 className="font-heading text-xl font-extrabold text-slate-900">
            Financial Reports
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Understand your income, spending, and financial trends.
          </p>
        </section>
      </main>
    </div>
  );
}
