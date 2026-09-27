import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the pipe "P" on the site ground, drawn for small sizes. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f2ee" }}>
        <svg width="132" height="132" viewBox="0 0 64 64">
          <path d="M18 56V12h16a13 13 0 0 1 0 26H18" fill="none" stroke="#B8612B" strokeWidth="11" strokeLinejoin="round" />
          <path d="M32.5 19s-4.2 4.8-4.2 7.9a4.2 4.2 0 0 0 8.4 0c0-3.1-4.2-7.9-4.2-7.9Z" fill="#0F2330" />
        </svg>
      </div>
    ),
    size,
  );
}
