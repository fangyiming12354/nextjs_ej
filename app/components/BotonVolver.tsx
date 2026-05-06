"use client";

// useRouter necesita "use client" — accede al historial del navegador para volver atrás
import { useRouter } from "next/navigation";

export default function BotonVolver() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
    >
      {/* Flecha izquierda */}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Volver
    </button>
  );
}
