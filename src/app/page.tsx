import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const sampleProperty = {
    id: 1,
    address: "123 Elm Street",
    city: "Los Angeles, CA",
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "/property-placeholder.svg",
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Neighborhood Properties
        </h1>

        <PropertyCard property={sampleProperty} />
      </div>
    </main>
  );
}