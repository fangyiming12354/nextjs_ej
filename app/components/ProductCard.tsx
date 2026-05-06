import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/data/productos";

// Async Server Component: se ejecuta en el servidor y puede hacer await.
// Al estar envuelto en <Suspense> en la página, Next.js muestra el skeleton
// mientras este componente no haya terminado de renderizarse.
export default async function ProductCard({
  producto,
  delayMs,
}: {
  producto: Producto;
  // Milisegundos que tarda en aparecer la tarjeta (simula carga lenta de datos)
  delayMs: number;
}) {
  // Pausa artificial que simula una consulta o procesamiento lento.
  // En producción esto sería una llamada a una API externa o una query pesada.
  await new Promise((res) => setTimeout(res, delayMs));

  // Si la imagen ya empieza por "/" la usamos tal cual (ruta absoluta).
  // Si no, asumimos que está en la carpeta /productos/ del directorio public.
  const imageUrl = producto.imagen?.startsWith("/")
    ? producto.imagen
    : `/productos/${producto.imagen}`;

  return (
    // El Link envuelve toda la tarjeta para que cualquier clic navegue al detalle
    <Link href={`/producto/detalle/${producto.id}`} className="block">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Contenedor con altura fija y position relative para que Image fill funcione */}
      <div className="relative h-56 bg-gray-100">
        {producto.imagen ? (
          // fill hace que la imagen ocupe todo el contenedor padre (que tiene position: relative).
          // object-cover recorta la imagen para que nunca quede distorsionada.
          <Image
            src={imageUrl}
            alt={producto.nombre}
            fill
            className="object-cover"
          />
        ) : (
          // Fallback cuando el producto no tiene imagen guardada en la BD
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm leading-snug">
          {producto.nombre}
        </h3>

        {/* line-clamp-2 corta el texto en 2 líneas y añade "…" si es más largo */}
        {producto.descripcion && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {producto.descripcion}
          </p>
        )}

        {/* toFixed(2) garantiza que el precio siempre muestre dos decimales, ej: 29.90€ */}
        <p className="text-lg font-bold mt-2 text-indigo-700">
          {Number(producto.precio).toFixed(2)}€
        </p>
      </div>
    </div>
    </Link>
  );
}
