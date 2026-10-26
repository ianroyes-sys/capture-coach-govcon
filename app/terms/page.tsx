import Link from "next/link";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <main className="legal-page">
    <header className="legal-header"><Link className="brand" href="/"><span>CC</span> CaptureCoach</Link><Link href="/">← Back home</Link></header>
    <article><p className="eyebrow">Effective August 31, 2026</p><h1>Terms of use.</h1><p className="legal-lede">These terms govern use of the public CaptureCoach website and demo operated by Royz Media Group LLC.</p>
      <h2>Educational decision aid</h2><p>CaptureCoach provides a structured, deterministic qualification aid. It is not legal, accounting, procurement, compliance, or investment advice, and it does not guarantee an award, outcome, or opportunity. You remain responsible for independent review and every bid or no-bid decision.</p>
      <h2>Safe and lawful use</h2><p>You may use the demo only with information you have the right to use. Do not enter classified information, CUI, export-controlled information, source-selection information, personal information you are not authorized to process, malicious code, or proprietary third-party material.</p>
      <h2>Demo availability and local storage</h2><p>The demo is provided “as is” and may change or become unavailable. Entries are stored in your browser, not as a hosted customer record. You are responsible for clearing shared devices and maintaining any records you need.</p>
      <h2>Intellectual property</h2><p>The CaptureCoach name, interface, scorecard, prompts, and original demo materials belong to Royz Media Group LLC or its licensors. You may use the public demo for internal evaluation but may not copy, resell, scrape, reverse engineer, or represent its materials as your own except where law expressly permits.</p>
      <h2>Paid services</h2><p>A decision clinic is not booked until scope, timing, and payment are confirmed in writing. Unless a written agreement says otherwise, fees cover the stated session and deliverables; client delays may move delivery dates. Service-specific written terms control if they conflict with this page.</p>
      <h2>Liability</h2><p>To the fullest extent permitted by law, Royz Media Group LLC is not liable for indirect, incidental, special, consequential, or lost-profit damages arising from the website or demo. Our total liability relating to the free demo will not exceed $100.</p>
      <h2>Contact</h2><p>Questions may be sent to <a href="mailto:contact@royzmediagroup.com">contact@royzmediagroup.com</a>.</p>
    </article>
  </main>;
}
