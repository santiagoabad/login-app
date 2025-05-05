"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje("Usuario registrado correctamente ✅");
      setForm({ nombre: "", email: "", password: "" });
    } else {
      setMensaje(data.error || "Error al registrar ❌");
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-row gap-3 pb-4">
        <h1 className="pb-2 text-4xl font-bold text-gray-500 my-auto">
          Creá tu cuenta
        </h1>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-1">
          <input
            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full py-3 pr-4 pl-2"
            autoComplete="off"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full py-3 pr-4 pl-2"
            autoComplete="off"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full py-3 pr-4 pl-2"
            autoComplete="off"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="w-full text-white bg-[#4F46E5] hover:bg-[#3730a3] cursor-pointer focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-6 transition-colors duration-300">
            Registrarme
          </button>
        </div>
      </form>
      <p className="mt-4 text-gray-500 font-bold text-center">
        ¿Ya tenés cuenta?{" "}
        <button
          onClick={() => router.push("/")}
          className="text-indigo-600 hover:text-indigo-900 font-bold cursor-pointer"
        >
          Iniciá sesión acá
        </button>
      </p>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
