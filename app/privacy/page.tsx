import Link from "next/link";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <main className="legal-page">
    <header className="legal-header"><Link className="brand" href="/"><span>CC</span> CaptureCoach</Link><Link href="/">← Back home</Link></header>
    <article><p className="eyebrow">Effective August 31, 2026</p><h1>Privacy, in plain terms.</h1><p className="legal-lede">The public CaptureCoach demo is designed to work without an account, file upload, or external AI service.</p>
      <h2>Demo information</h2><p>Text, ratings, evidence labels, and task progress entered in the decision room are stored in your browser’s local storage. They are not submitted to Royz Media Group by the demo. You can remove them at any time from the Provenance tab using “Clear local demo data,” or through your browser settings.</p>
      <h2>Contact by email</h2><p>If you email us, we receive the information you choose to include and use it to respond to your inquiry, provide requested services, keep ordinary business records, and protect against abuse. Do not send classified information, CUI, export-controlled information, source-selection information, or restricted third-party material.</p>
      <h2>Hosting and technical logs</h2><p>Our hosting and infrastructure providers may process basic request data such as IP address, browser type, requested URL, and timestamps for delivery, reliability, and security. We do not use the demo to sell personal information or run behavioral advertising.</p>
      <h2>Retention and choices</h2><p>Business correspondence is retained only as reasonably needed for the inquiry, service delivery, legal obligations, and legitimate business records. To ask about, correct, or delete information you sent us, email <a href="mailto:contact@royzmediagroup.com">contact@royzmediagroup.com</a>.</p>
      <h2>Changes</h2><p>We may update this notice as the service changes. The effective date above identifies the current version.</p>
    </article>
  </main>;
}
