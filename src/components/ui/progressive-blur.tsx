type ProgressiveBlurProps = {
  className?: string;
  direction?: "left" | "right" | "both";
};

export default function ProgressiveBlur({
  className = "",
  direction = "both",
}: ProgressiveBlurProps) {
  const baseClasses = "pointer-events-none absolute inset-y-0 z-20";

  if (direction === "left") {
    return (
      <div
        className={`${baseClasses} left-0 w-20 ${className}`}
        style={{
          background:
            "linear-gradient(90deg, rgba(244, 247, 255, 0.96) 0%, rgba(244, 247, 255, 0.72) 45%, rgba(244, 247, 255, 0) 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  if (direction === "right") {
    return (
      <div
        className={`${baseClasses} right-0 w-20 ${className}`}
        style={{
          background:
            "linear-gradient(270deg, rgba(244, 247, 255, 0.96) 0%, rgba(244, 247, 255, 0.72) 45%, rgba(244, 247, 255, 0) 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <div
        className={`${baseClasses} left-0 w-20 ${className}`}
        style={{
          background:
            "linear-gradient(90deg, rgba(244, 247, 255, 0.96) 0%, rgba(244, 247, 255, 0.72) 45%, rgba(244, 247, 255, 0) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className={`${baseClasses} right-0 w-20 ${className}`}
        style={{
          background:
            "linear-gradient(270deg, rgba(244, 247, 255, 0.96) 0%, rgba(244, 247, 255, 0.72) 45%, rgba(244, 247, 255, 0) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
