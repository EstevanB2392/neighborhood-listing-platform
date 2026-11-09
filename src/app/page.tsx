import PropertyCard from "@/components/PropertyCard";
import ServiceCard from "@/components/ServiceCard";

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

  const sampleService = {
    title: "Professional House Cleaning",
    hourlyRate: 45,
    durationMinutes: 120,
    coverageRadiusMiles: 15,
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Neighborhood Properties
        </h1>

        <PropertyCard property={sampleProperty} />

        <section
          className="mt-10"
          aria-labelledby="services-heading"
        >
          <h2
            id="services-heading"
            className="mb-4 text-2xl font-bold text-slate-900"
          >
            Available Services
          </h2>

          <ServiceCard {...sampleService} />
        </section>
      </div>
    </main>
  );
}