import {NavLink} from "react-router-dom";
import {Wallet, LayoutDashboard, ArrowLeftRight, ChartNoAxesCombined, Logout, Lambda} from "lucide-react";

const links = [
    {to: "/dashboard", label: "Dashbaord", icon: LayoutDashboard},
    {to: "/transactions", label: "Transactions", icon: ArrowLeftRight},
    {to: "/reports", label: "Reports", icon: ChartNoAxesCombined},
];

export default function Sidebar({onLogout}) {
    return(
        <aside className="flex w-full shrink-0 flex-col border-b border-style-200 bg-white p-4 md:fixed md:inset-y-0 md:z-20 md:w-64 md:border-rmd:p-6">
            <div className="mb-6 flex items-center gap-3 md:mb-12">
                <div className="brand-icon">
                    <Wallet size={23}/>

                </div>
                <span>FinTrack</span>

            </div>

        </aside>
    )
}