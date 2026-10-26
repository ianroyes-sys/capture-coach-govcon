import Link from "next/link";

const steps = [
  ["01", "Frame the pursuit", "Capture the mission, buyer, timing, value, and what you know—without uploading sensitive files."],
  ["02", "Challenge the case", "Score seven qualification factors and expose assumptions that cannot yet survive scrutiny."],
  ["03", "Make the call", "Leave with a bid, conditional bid, or no-bid recommendation and a dated action plan."],
];

export default async function Home({ searchParams }: { searchParams: Promise<{ payment?: string }> }) {
  const paymentComplete = (await searchParams).payment === "success";
  // Stripe Payment Link for the $750 decision clinic; set in .env.local
  const clinicHref = process.env.NEXT_PUBLIC_STRIPE_CLINIC_LINK || "#checkout-not-configured";
  return (
    <main>
      {paymentComplete ? <div className="payment-success" role="status"><strong>Payment received.</strong> We’ll contact you at the email used at checkout to schedule your decision clinic. Questions? <a href="mailto:contact@royzmediagroup.com">Email us.</a></div> : null}
      <header className="site-header">
        <Link className="brand" href="/" aria-label="CaptureCoach home"><span>CC</span> CaptureCoach</Link>
        <nav aria-label="Primary"><Link href="#method">Method</Link><Link href="#clinic">Decision clinic</Link><Link className="button small" href="/room">Open demo room</Link></nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Bid / no-bid discipline for small GovCon teams</p>
          <h1>Make the call <em>before</em> the proposal owns you.</h1>
          <p className="lede">CaptureCoach turns scattered pursuit knowledge into one evidence-led decision—then shows exactly what could change it.</p>
          <div className="hero-actions"><Link className="button primary" href="/room">Run a demo decision <span>↗</span></Link><a className="text-link" href="#method">See the method ↓</a></div>
          <p className="trust-line"><span>LOCAL DEMO</span> No account · No uploads · No AI key · No sensitive data</p>
        </div>
        <div className="hero-dossier" aria-label="Example decision summary">
          <div className="dossier-top"><span>DECISION MEMO / DEMO</span><span>26 AUG 2026</span></div>
          <div className="decision-mark"><span className="decision-word">CONDITIONAL<br/>BID</span><span className="score">64<small>/100</small></span></div>
          <div className="dossier-grid"><p><small>Confidence</small><strong>83%</strong></p><p><small>Open blockers</small><strong>02</strong></p><p><small>Decision gate</small><strong>14 days</strong></p></div>
          <div className="dossier-note"><span>WHAT CHANGES THE CALL</span><p>Confirm incumbent displacement path and secure a customer discovery conversation.</p></div>
        </div>
      </section>

      <section className="method" id="method">
        <div className="section-intro"><p className="eyebrow">A hard gate, not a horoscope</p><h2>Every recommendation leaves a trail.</h2><p>The score is deterministic. The evidence, blockers, assumptions, and decision owner stay visible.</p></div>
        <div className="steps">{steps.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="guardrails" id="guardrails">
        <div><p className="eyebrow">Designed for responsible capture</p><h2>Keep sensitive work out of the demo.</h2></div>
        <div className="guardrail-list"><p><strong>No file uploads.</strong> Text-only demo fields with prominent sensitivity and rights attestation.</p><p><strong>No borrowed expertise.</strong> All guidance is original Royz Media Group demo material—not an expert archive.</p><p><strong>No black box.</strong> Weighted criteria and thresholds are visible, editable, and reproducible.</p></div>
      </section>

      <section className="clinic" id="clinic">
        <div className="clinic-heading"><p className="eyebrow">Founding client offer · $750 flat</p><h2>One pursuit. One hard decision.</h2><p>A live, facilitated bid/no-bid clinic for small GovCon teams that need an independent challenge before committing proposal resources.</p></div>
        <div className="clinic-docket">
          <div className="docket-stamp"><span>DELIVERED</span><strong>3 business days</strong><small>after the working session</small></div>
          <ul><li>60-minute remote decision session for up to five stakeholders</li><li>Seven-factor qualification score and evidence-gap review</li><li>Written bid, conditional-bid, or no-bid decision memo</li><li>Prioritized 7-day action plan with owners and gate conditions</li></ul>
          <p className="clinic-note">Founding price covers one pursuit and one follow-up clarification. No guarantee of award. Do not email sensitive, classified, CUI, export-controlled, or source-selection information.</p>
          <a className="button primary" href={clinicHref}>Book for $750 <span>↗</span></a>
          <a className="contact-address" href="mailto:contact@royzmediagroup.com">contact@royzmediagroup.com</a>
        </div>
      </section>

      <footer><div className="brand"><span>CC</span> CaptureCoach</div><p>Original product concept by Royz Media Group LLC. Demo guidance is educational, not legal or procurement advice.</p><div className="footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/room">Open decision room →</Link></div></footer>
    </main>
  );
}
