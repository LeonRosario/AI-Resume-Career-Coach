export function SkeletonLine({ className = "" }) {
  return <div className={`skeleton rounded-lg h-4 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-[20px] p-6 space-y-3">
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
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton rounded-lg h-3"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
