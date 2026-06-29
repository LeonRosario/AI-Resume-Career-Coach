// Ambient aurora field — the signature visual motif used behind every glass
// surface in the app. Three soft blobs drift slowly so glass panels have
// something real to refract, rather than sitting on flat white.
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
            "radial-gradient(circle at 30% 30%, rgba(96,177,255,0.3) 0%, rgba(96,177,255,0) 70%)",
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
            "radial-gradient(circle at 60% 40%, rgba(49,154,255,0.3) 0%, rgba(49,154,255,0) 70%)",
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
            "radial-gradient(circle at 50% 50%, rgba(0,132,255,0.2) 0%, rgba(0,132,255,0) 70%)",
          opacity: 0.35,
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
            "radial-gradient(circle at 50% 50%, rgba(0,132,255,0.25) 0%, rgba(0,132,255,0) 70%)",
            opacity: 0.35,
          }}
        />
      )}
    </div>
  );
}
