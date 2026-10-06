import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const imageSize = { width: 1200, height: 630 };

export async function socialImage(title: string, label: string) {
  const font = await readFile(
    join(process.cwd(), "app/fonts/Fraunces72pt-Regular.ttf"),
  );
  const mark = await readFile(join(process.cwd(), "public/fingerprint.svg"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#233c32",
        color: "#f0ecdc",
        padding: "48px 64px",
        fontFamily: "Fraunces",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 25 }}
      >
        <span style={{ fontSize: 45, color: "#dfc48e" }}>fl.</span>
        <span>The Forensic Linguist</span>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 770,
            gap: 24,
          }}
        >
          <div style={{ fontSize: 19, color: "#dfc48e", letterSpacing: 3 }}>
            {label}
          </div>
          <div
            style={{
              fontSize: title.length > 70 ? 54 : 72,
              lineHeight: 1.06,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 250,
            height: 320,
            alignItems: "center",
            color: "#dfc48e",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders a PNG, not an HTML page. */}
          <img
            src={`data:image/svg+xml;base64,${mark.toString("base64")}`}
            width={250}
            height={250}
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #879579",
          paddingTop: 22,
          fontSize: 18,
          color: "#c6cfaa",
        }}
      >
        <span>Language. Context. Evidence.</span>
        <span>theforensiclinguist.com</span>
      </div>
    </div>,
    {
      ...imageSize,
      fonts: [{ name: "Fraunces", data: font, weight: 400, style: "normal" }],
    },
  );
}
