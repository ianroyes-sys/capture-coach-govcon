import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://capture.royzmediagroup.com"),
  title: { default: "CaptureCoach — Make the call before the proposal", template: "%s · CaptureCoach" },
  description: "A transparent, evidence-led bid/no-bid decision room for small GovCon teams.",
  applicationName: "CaptureCoach",
  openGraph: {
    title: "CaptureCoach",
    description: "Turn pursuit evidence into a defensible bid/no-bid decision.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
