import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  const mark = await readFile(join(process.cwd(), "public/fingerprint.svg"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#233c32",
        color: "#dfc48e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`data:image/svg+xml;base64,${mark.toString("base64")}`}
        width={125}
        height={125}
        alt=""
      />
    </div>,
    size,
  );
}
