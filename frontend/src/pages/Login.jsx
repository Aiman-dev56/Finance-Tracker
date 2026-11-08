import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500";
