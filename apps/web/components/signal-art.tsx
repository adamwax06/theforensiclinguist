"use client";

import { Warp } from "@paper-design/shaders-react";

export default function SignalArt({ paused }: { paused: boolean }) {
  return (
    <Warp
      width="100%"
      height="100%"
      colors={["#163a32", "#d8bb7c", "#517660", "#152c27"]}
      proportion={0.32}
      softness={0.12}
      distortion={0.2}
      swirl={0.65}
      swirlIterations={6}
      shape="stripes"
      shapeScale={0.2}
      speed={paused ? 0 : 0.12}
      frame={12000}
      rotation={-25}
      minPixelRatio={1}
      maxPixelCount={700000}
    />
  );
}
