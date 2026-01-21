import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { name, slug, price, compareAtPrice, images, colors } = product;

  return (
    <Link to={`/product/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {compareAtPrice && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1">
            Sale
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
          {name}
        </h3>

        {/* Color swatches */}
        {colors && colors.length > 1 && (
          <div className="flex gap-1 mt-2">
            {colors.map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-sm font-medium ${compareAtPrice ? 'text-red-600' : 'text-gray-900'}`}>
            ${price.toFixed(2)}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
