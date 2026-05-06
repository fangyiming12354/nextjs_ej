"use client";

import { useState } from "react";

// Campos del formulario agrupados en un solo objeto para facilitar el manejo con useState
interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export default function FormularioPage() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  // enviado controla si mostrar el mensaje de confirmación en lugar del formulario
  const [enviado, setEnviado] = useState(false);

  // Actualiza el campo correspondiente sin tocar el resto del estado
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Evita la recarga de página que haría un form HTML normal
    e.preventDefault();
    // Aquí iría la llamada a una API o Server Action para guardar/enviar el mensaje
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contacto</h1>
        <p className="text-sm text-gray-500 mb-8">
          Rellena el formulario y te responderemos lo antes posible.
        </p>

        {enviado ? (
          // Mensaje de confirmación que aparece tras enviar el formulario
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
            <p className="text-indigo-700 font-semibold text-lg">Mensaje enviado</p>
            <p className="text-indigo-500 text-sm mt-1">
              Gracias por contactarnos, te responderemos pronto.
            </p>
            <button
              onClick={() => { setEnviado(false); setForm({ nombre: "", email: "", asunto: "", mensaje: "" }); }}
              className="mt-6 px-5 py-2 bg-indigo-700 text-white text-sm font-medium rounded-full hover:bg-indigo-800 transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-300"
              />
            </div>

            {/* Asunto */}
            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <select
                id="asunto"
                name="asunto"
                required
                value={form.asunto}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${form.asunto === "" ? "text-indigo-300" : "text-gray-900"}`}
                // text-gray-900 se aplica dinámicamente cuando hay una opción seleccionada
              >
                <option value="" disabled>Selecciona un asunto</option>
                <option value="consulta">Consulta de producto</option>
                <option value="pedido">Estado de mi pedido</option>
                <option value="devolucion">Devolución</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder:text-indigo-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white font-medium text-sm py-2.5 rounded-full hover:bg-indigo-800 transition-colors"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
