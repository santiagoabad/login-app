"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje("Login exitoso ✅");
      router.push("/dashboard");
    } else {
      setMensaje(data.mensaje || "Login fallido ❌");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2x1 shadow-x1 w-full max-w-md">
        <h1 className="text-2x1 font-bold mb-6 text-center text-gray-700">
          Inicial sesión
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg cursor-pointer"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tenés cuenta?{" "}
          <button
            onClick={() => router.push("/registro")}
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Registrate acá
          </button>
        </p>
        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </main>
  );
}
