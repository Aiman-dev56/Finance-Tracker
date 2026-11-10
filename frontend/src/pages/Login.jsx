import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;
      const token = data.token || data.accessToken || data.data?.token;
      const user = data.user || data.data?.user;

      if (!token) {
        throw new Error("The server did not return an authentication token.");
      }
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white bg-white p-6 shadow-2xl shadow-blue-100/60 sm:p-10">
        <Link
          to="/login"
          className="mb-10 flex items-center justify-center gap-4 font-heading text-2xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
            <Wallet size={26} />
          </span>
          FinTrack
        </Link>

        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Sign in to manage your personal finances.
          </p>
        </div>

        {location.state?.message && (
          <p className="mb-5">{location.state.message}</p>
        )}

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
