"use client";

import Image from "next/image";

type PropertyCardProps = {
  property: {
    id: number;
    address: string;
    city: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    imageUrl: string;
  };
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const handleFavorite = () => {
    console.log(`Favorited ${property.address}`);
  };

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:flex">
      <div className="relative h-52 w-full md:h-auto md:w-2/5">
        <Image
          src={property.imageUrl}
          alt={`Front view of property at ${property.address}, ${property.city}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-xl font-semibold text-slate-900">
          {property.address}
        </h2>

        <p className="text-slate-600">{property.city}</p>

        <p className="font-semibold text-slate-900">
          ${property.price.toLocaleString()}
        </p>

        <p className="text-slate-600">
          {property.bedrooms} beds · {property.bathrooms} baths
        </p>

        <button
          type="button"
          onClick={handleFavorite}
          aria-label={`Favorite property at ${property.address}`}
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Favorite
        </button>
      </div>
    </article>
  );
}