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
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Hourly Rate:</strong> ${hourlyRate.toFixed(2)}
        </p>

        <p>
          <strong>Duration:</strong> {durationMinutes} minutes
        </p>

        <p>
          <strong>Coverage:</strong> {coverageRadiusMiles} miles
        </p>
      </div>

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