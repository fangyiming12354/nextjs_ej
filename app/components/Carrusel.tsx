// "use client" es necesario porque usamos useState y useEffect (hooks del navegador).
// Los componentes que manejan interactividad o timers deben ser Client Components.
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Cada slide define el texto, el destino del botón y la foto de fondo.
// Las imágenes están en /public/carrusel/ y se sirven como archivos estáticos.
const slides = [
  {
    titulo: "Nueva colección de Zapatillas",
    descripcion: "Descubre los modelos más exclusivos de la temporada",
    href: "/producto?categoria=zapatillas",
    imagen: "/carrusel/carrusel-zapatillas.jpg",
  },
  {
    titulo: "Ropa deportiva",
    descripcion: "Comodidad y estilo para cada momento",
    href: "/producto?categoria=ropa",
    imagen: "/carrusel/carrusel-ropa.jpg",
  },
  {
    titulo: "Todos nuestros productos",
    descripcion: "Explora el catálogo completo de la tienda",
    href: "/producto",
    imagen: "/carrusel/carrusel-todo.jpg",
  },
];

export default function Carrusel() {
  // Índice del slide visible en este momento
  const [actual, setActual] = useState(0);

  // Avance automático: cambia de slide cada 4 segundos.
  // El return del useEffect limpia el intervalo cuando el componente se desmonta,
  // evitando memory leaks si el usuario navega a otra página.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  // Navegación manual: suma/resta 1 con módulo para dar la vuelta al llegar al extremo
  const anterior = () => setActual((prev) => (prev - 1 + slides.length) % slides.length);
  const siguiente = () => setActual((prev) => (prev + 1) % slides.length);

  return (
    // overflow-hidden oculta los slides que están fuera del viewport durante la transición
    <div className="relative w-full h-[calc(100vh-9rem)] overflow-hidden">
      {slides.map((slide, i) => (
        // Todos los slides ocupan el mismo espacio (absolute inset-0).
        // Solo el activo tiene opacity-100; los demás son opacity-0 e invisibles.
        // transition-opacity duration-700 anima el fundido entre slides.
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === actual ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* fill hace que la imagen ocupe todo el contenedor; object-cover la recorta sin deformarla.
              priority en el primer slide le dice a Next.js que lo precargue para evitar parpadeo inicial. */}
          <Image
            src={slide.imagen}
            alt={slide.titulo}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Capa semitransparente oscura encima de la foto para que el texto blanco sea legible */}
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold text-center px-4 drop-shadow">{slide.titulo}</h2>
            <p className="mt-4 text-lg text-white/80 text-center px-4 drop-shadow">{slide.descripcion}</p>
            <Link
              href={slide.href}
              className="mt-8 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Ver productos
            </Link>
          </div>
        </div>
      ))}

      {/* Botón anterior */}
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
      >
        ‹
      </button>

      {/* Botón siguiente */}
      <button
        onClick={siguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Puntos indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === actual ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
