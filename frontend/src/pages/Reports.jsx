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

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            Loading reports...
          </div>
        ) : (
          <>
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <SummaryCard
                title="Total income"
                amount={income}
                icon={TrendingUp}
                color="green"
                description="Money received"
              />
              <SummaryCard
                title="Total Expenses"
                amount={expenses}
                icon={TrendingDown}
                color="red"
                description="Money spent"
              />
              <SummaryCard
                title="Net balance"
                amount={balance}
                icon={Wallet}
                color="blue"
                description="Income minus expenses"
              />
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-heading text-lg font-extrabold text-slate-900">
                    Monthly overview
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Income compared with expenses.
                  </p>
                </div>

                {monthly.length > 0 ? (
                  <div className="h-[300px] w-full">
                    <Responsivecontainer width="100%" height="100%">
                      <BarChart data={monthly}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => money(value)} />
                        <Legend />
                        <Bar
                          dataKey="income"
                          name="Income"
                          fill="#16a34a"
                          radius={[5, 5, 0, 0]}
                        />
                        <Bar
                          dataKey="expenses"
                          name="Expenses"
                          fill="#e11d48"
                          radius={[5, 5, 0, 0]}
                        />
                      </BarChart>
                    </Responsivecontainer>
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </article>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
