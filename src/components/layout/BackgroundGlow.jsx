export default function BackgroundGlow({ variant = 'default' }) {
  if (variant === 'auth') {
    return (
      <>
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#60B1FF] to-[#319AFF] opacity-20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#0084FF] opacity-15 blur-[100px]" />
      </>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute top-0 left-0 -translate-x-[20%] -translate-y-[20%] h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-[#60B1FF] opacity-[0.22] blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-0 left-0 -translate-x-[30%] -translate-y-[30%] h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-[#0084FF] opacity-[0.18] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-[#319AFF] to-[#60B1FF] opacity-10 blur-[100px]" />
    </>
  );
}
