import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

const inputclass =
  "w-full rounded-xl border border-slate-200 px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Account created.Please sign in." },
      });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradinet-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-2xl shadow-blue-100/60 sm:p-10">
        <Link
          to="/login"
          className="mb-8 flex items-center justify-center gap-4 font-heading text-2xl font-extrabold text-slate-900"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
            <Wallet size={26} />
          </span>
          FinTrack
        </Link>

        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
            Create your Account
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Start tracking your income and expenses.
          </p>
        </div>
        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Full Name</span>
            <input
              className={inputclass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name "
              autoComplete="name"
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Email Address</span>
            <input
              className={inputclass}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Password</span>
            <input
              className={inputclass}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Confirm Password</span>
            <input
              className={inputclass}
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter Password again"
              autoComplete="new-password"
              required
            />
          </label>

          <button
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-brand px-4 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">
          Already Registered?{" "}
          <Link to="/login" className="font-bold text-brand hover:underline">
            {" "}
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}
