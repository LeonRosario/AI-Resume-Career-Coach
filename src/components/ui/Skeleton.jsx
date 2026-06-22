export function SkeletonLine({ className = "" }) {
  return <div className={`skeleton rounded-lg h-4 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-glass p-6 space-y-3">
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
      className="skeleton rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
