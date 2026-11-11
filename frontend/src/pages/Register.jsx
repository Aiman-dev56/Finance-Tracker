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
        </div>
      </section>
    </main>
  );
}
