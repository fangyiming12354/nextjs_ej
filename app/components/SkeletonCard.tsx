// Placeholder visual que se muestra mientras un ProductCard está cargando.
// Tiene las mismas dimensiones que la tarjeta real para evitar saltos de layout.
// animate-pulse hace que los bloques grises parpadeen suavemente (efecto skeleton).
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Hueco de la imagen — misma altura que la imagen real (h-56) */}
      <div className="h-56 bg-gray-200" />

      <div className="p-4 space-y-2">
        {/* Simula el título del producto */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Simula las dos líneas de descripción */}
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />

        {/* Simula el precio */}
        <div className="h-7 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}
