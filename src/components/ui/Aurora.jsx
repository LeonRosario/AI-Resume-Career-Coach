export default function Aurora({ variant = "default" }) {
  return (
    <div className="aurora-field" aria-hidden="true">
      <div
        className="aurora-blob animate-float"
        style={{
          width: 520,
          height: 520,
          top: "-10%",
          left: "-8%",
          background:
            "radial-gradient(circle at 30% 30%, #0084FF 0%, rgba(0,132,255,0) 70%)",
          opacity: 0.45,
        }}
      />
      <div
        className="aurora-blob animate-float-delay"
        style={{
          width: 460,
          height: 460,
          top: "20%",
          right: "-10%",
          background:
            "radial-gradient(circle at 60% 40%, #0084FF 0%, rgba(0,132,255,0) 70%)",
          opacity: 0.35,
        }}
      />
      <div
        className="aurora-blob animate-float-slow"
        style={{
          width: 600,
          height: 600,
          bottom: "-15%",
          left: "20%",
          background:
            "radial-gradient(circle at 50% 50%, #38BDF8 0%, rgba(56,189,248,0) 70%)",
          opacity: 0.3,
        }}
      />
      <div
        className="aurora-blob animate-float"
        style={{
          width: 300,
          height: 300,
          top: "55%",
          right: "20%",
          background:
            "radial-gradient(circle at 50% 50%, #0084FF 0%, rgba(0,132,255,0) 70%)",
          opacity: 0.2,
        }}
      />
      {variant === "auth" && (
        <div
          className="aurora-blob animate-float"
          style={{
            width: 380,
            height: 380,
            bottom: "5%",
            right: "10%",
            background:
              "radial-gradient(circle at 50% 50%, #0084FF 0%, rgba(0,132,255,0) 70%)",
            opacity: 0.3,
          }}
        />
      )}
    </div>
  );
}
