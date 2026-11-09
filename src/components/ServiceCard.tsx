type ServiceCardProps = {
  title: string;
  hourlyRate: number;
  durationMinutes: number;
  coverageRadiusMiles: number;
  onBook?: () => void;
};

export default function ServiceCard({
  title,
  hourlyRate,
  durationMinutes,
  coverageRadiusMiles,
  onBook,
}: ServiceCardProps) {
  return (
    <article className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </header>

      <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-700">
  <li>
    <strong>Hourly Rate:</strong> ${hourlyRate.toFixed(2)}
  </li>
  <li>
    <strong>Duration:</strong> {durationMinutes} minutes
  </li>
  <li>
    <strong>Coverage:</strong> {coverageRadiusMiles} miles
  </li>
</ul>

      <button
        type="button"
        onClick={onBook}
        disabled={!onBook}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Book ${title}`}
      >
        Book Service
      </button>
    </article>
  );
}