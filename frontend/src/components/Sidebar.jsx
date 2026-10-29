import {NavLink} from "react-router-dom";
import {Wallet, LayoutDashboard, ArrowLeftRight, ChartNoAxesCombined, Logout, Lambda, Icon} from "lucide-react";

const links = [
    {to: "/dashboard", label: "Dashbaord", icon: LayoutDashboard},
    {to: "/transactions", label: "Transactions", icon: ArrowLeftRight},
    {to: "/reports", label: "Reports", icon: ChartNoAxesCombined},
];

export default function Sidebar({onLogout}) {
    return(
        <aside className="flex w-full shrink-0 flex-col border-b border-style-200 bg-white p-4 md:fixed md:inset-y-0 md:z-20 md:w-64 md:border-rmd:p-6">
            <div className="mb-6 flex items-center gap-3 md:mb-12">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-blue-200">

                    <Wallet size={23}/>

                </div>
                <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900"> FinTrack</span>

            </div>
            <p className="mb-3 hidden pxx-3 text-xs font-bold tracking-widest text-slate-400 md:block">
                WORKSPACE
            </p>
            <nav className="grid grid-col-3 gap-2 md:grid-cols-1">
                {links.map(({to, label, icon: Icon}) => (
                    <NavLink
                    key={to}
                    to={to}
                    className={({isActive}) => 
                    `flex items-center justify-center gap-2 rounded-xl px-3 py-3 text=xs font-semibold transition md:justify-start md:gap-3 md:text-sm ${
                        isActive ? "bg-blue-50 text-brand" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    />
                ))}

            </nav>

        </aside>
    )
}