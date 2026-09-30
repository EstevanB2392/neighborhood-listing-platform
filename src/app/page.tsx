export default function Home() {
  const features = [
    {
      title: "Listings",
      description:
        "Browse neighborhood property listings and discover available homes.",
    },
    {
      title: "Neighborhood Sponsors",
      description:
        "Connect with local businesses and organizations that support the community.",
    },
    {
      title: "Voice Help",
      description:
        "Get simple voice-assisted help while searching the platform.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-3 font-semibold text-blue-700">
            Neighborhood Listing Platform
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find what matters in your neighborhood.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            A simple property platform for exploring local listings, connecting
            with neighborhood sponsors, and getting accessible voice help.
          </p>
        </header>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="mb-6 text-2xl font-semibold">
            Platform Features
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}