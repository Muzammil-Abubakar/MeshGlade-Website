import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Meshglade — Complex needs, simple solutions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Nohemi-Medium.ttf")),
    readFile(join(process.cwd(), "public/brand/logo-ivory.png"), "base64"),
  ]);

  // Fluted stripes, like the brand cover
  const flutes = Array.from({ length: 30 }, (_, i) => i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(60% 80% at 82% 30%, #DF462B 0%, rgba(223,70,43,0.4) 45%, #272727 80%)",
          color: "#FFF9EA",
          fontFamily: "Nohemi",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {flutes.map((i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: "100%",
                background: "linear-gradient(90deg, rgba(0,0,0,0.28), rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.3))",
              }}
            />
          ))}
        </div>
        <img src={`data:image/png;base64,${logo}`} width={340} height={42} alt="" style={{ position: "relative" }} />
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: -4, color: "rgba(255,249,234,0.5)" }}>Complex needs.</div>
          <div style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: -4 }}>Simple solutions.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,249,234,0.75)", letterSpacing: -0.5 }}>
            AI Automation · Software · Data & AI · Growth
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Nohemi", data: font, weight: 500, style: "normal" }] },
  );
}
