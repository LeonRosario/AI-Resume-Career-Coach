// Static CSS aurora — used in auth pages and simple backgrounds
export default function Aurora({ variant = "default" }) {
  return (
    <div className="aurora-field" aria-hidden="true">
      <div
        className="aurora-blob animate-float"
        style={{
          width: 560,
          height: 560,
          top: "-12%",
          left: "-8%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(37,99,235,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="aurora-blob animate-float-delay"
        style={{
          width: 480,
          height: 480,
          top: "20%",
          right: "-10%",
          background:
            "radial-gradient(circle at 60% 40%, rgba(79,70,229,0.20) 0%, transparent 70%)",
        }}
      />
      <div
        className="aurora-blob animate-float-slow"
        style={{
          width: 640,
          height: 640,
          bottom: "-18%",
          left: "18%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)",
          opacity: 0.4,
        }}
      />
      {variant === "auth" && (
        <div
          className="aurora-blob animate-float"
          style={{
            width: 400,
            height: 400,
            bottom: "8%",
            right: "8%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
            opacity: 0.35,
          }}
        />
      )}
    </div>
  );
}
