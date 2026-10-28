import {NavLink} from "react-router-dom";
import {Wallet, LayoutDashboard, ArrowLeftRight, ChartNoAxesCombined, Logout, Lambda} from "lucide-react";

const links = [
    {to: "/dashboard", label: "Dashbaord", icon: LayoutDashboard},
    {to: "/transactions", label: "Transactions", icon: ArrowLeftRight},
    {to: "/reports", label: "Reports", icon: ChartNoAxesCombined},
];

export default function Sidebar({onLogout}) {
    return(
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">
                    <Wallet size={23}/>

                </div>
                <span>FinTrack</span>

            </div>

        </aside>
    )
}