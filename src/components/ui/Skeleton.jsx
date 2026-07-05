/**
 * Skeleton shimmer components — uses the .skeleton class from index.css
 * which animates with the new blue/violet design tokens.
 */

export function SkeletonLine({ className = "" }) {
  return (
    <div
      className={["skeleton rounded-lg h-4", className].join(" ")}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={["glass rounded-[20px] p-6 space-y-3", className].join(" ")}
      aria-hidden="true"
    >
      <div className="skeleton rounded-lg h-5 w-2/3" />
      <div className="skeleton rounded-lg h-3 w-full" />
      <div className="skeleton rounded-lg h-3 w-5/6" />
      <div className="skeleton rounded-lg h-8 w-1/3 mt-4" />
    </div>
  );
}

export function SkeletonCircle({ size = 160 }) {
  return (
    <div
      className="skeleton rounded-full shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  const widths = ["w-full", "w-5/6", "w-4/6", "w-3/6", "w-2/6"];
  return (
    <div className={["space-y-2", className].join(" ")} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton rounded-lg h-3.5 ${widths[i % widths.length]}`}
        />
      ))}
    </div>
  );
}
