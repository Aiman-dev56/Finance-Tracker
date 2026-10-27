import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCard from "../components/SummaryCard";

export default function Dashboard(){
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSummary() {
            try {
                const response = await api.get("/reports/summary");
                setSummary(response.data);
            } catch {
                setError("Unable to load your financial summary.");
                
            }
            }
            loadSummary();
    }, []);

    if(error) {
        return<p role="alert">{error}</p>
    }

    if(!summary) {
        return<p> Loading your dashbaord...</p>;
    }

  return(
    <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold">
            Financial Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
Track your income, expenses and savings.
        </p>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard title="Total Balance"
            amount={summary.net_balance}
            description="Income minus expenses"/>
<SummaryCard 
title="Total Income"
amount={summary.total_income}
description="All recorded income"
/>

<SummaryCard 
title="Total Expenses"
amount={summary.total_expenses}
description="All recorded expenses"
/>

        </section>

    </main>
  );
}