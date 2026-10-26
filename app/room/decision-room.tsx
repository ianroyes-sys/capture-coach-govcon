"use client";

import { useEffect, useRef, useState } from "react";
import { criteria, defaultRatings, scorePursuit, type CriterionKey, type Rating, type Ratings } from "@/lib/scoring";

type Tab = "intake" | "evidence" | "qualify" | "decision" | "plan" | "history" | "admin";
type Intake = { name: string; agency: string; vehicle: string; value: string; deadline: string; mission: string; attested: boolean };
type Evidence = { id: number; title: string; detail: string; source: string };

const tabs: Array<{ id: Tab; name: string }> = [
  { id: "intake", name: "Pursuit intake" },
  { id: "evidence", name: "Evidence room" },
  { id: "qualify", name: "Qualification" },
  { id: "decision", name: "Decision memo" },
  { id: "plan", name: "Action plan" },
  { id: "history", name: "Checkpoints" },
  { id: "admin", name: "Provenance" },
];

const initialIntake: Intake = {
  name: "Expeditionary Data Operations Support",
  agency: "U.S. Army (fictional demo)",
  vehicle: "Unspecified / research stage",
  value: "$2M–$5M estimated",
  deadline: "2026-09-30",
  mission: "Help a program office consolidate mission data workflows and improve operational reporting. This is fictional demo content and does not describe a real procurement.",
  attested: false,
};

const initialEvidence: Evidence[] = [
  { id: 1, title: "Mission need is specific", detail: "Public demo scenario identifies workflow fragmentation and reporting latency as the customer problem.", source: "Original demo scenario" },
  { id: 2, title: "Delivery model is plausible", detail: "Existing team skills map to data engineering, change management, and program support.", source: "User-entered claim" },
  { id: 3, title: "Budget remains unverified", detail: "Estimated value has no validated public notice or customer confirmation yet.", source: "Assumption" },
];

const plans = {
  "7": [
    ["Book customer discovery", "Validate mission pain, acquisition timing, and decision process.", "DAY 3"],
    ["Map the field", "Name the incumbent, likely primes, and two viable teaming paths.", "DAY 5"],
    ["Price the pursuit", "Estimate capture and proposal cost before approving more labor.", "DAY 7"],
  ],
  "14": [
    ["Prove one advantage", "Attach a measurable outcome and proof point to the proposed approach.", "DAY 10"],
    ["Resolve staffing risk", "Confirm two critical roles and a credible surge path.", "DAY 12"],
    ["Run the second gate", "Re-score with the decision owner and record changes.", "DAY 14"],
  ],
  "30": [
    ["Build the capture brief", "Convert validated evidence into messages, discriminators, and win themes.", "DAY 21"],
    ["Pressure-test the price", "Compare solution ambition with an executable target price.", "DAY 25"],
    ["Commit or exit", "Authorize proposal resources only if the gate conditions are met.", "DAY 30"],
  ],
} as const;

const storageKey = "capturecoach-demo-v1";

export function DecisionRoom() {
  const [tab, setTab] = useState<Tab>("intake");
  const [intake, setIntake] = useState<Intake>(initialIntake);
  const [ratings, setRatings] = useState<Ratings>(defaultRatings);
  const [evidence, setEvidence] = useState<Evidence[]>(initialEvidence);
  const [newEvidence, setNewEvidence] = useState("");
  const [planWindow, setPlanWindow] = useState<keyof typeof plans>("7");
  const [completeTasks, setCompleteTasks] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [restored, setRestored] = useState(false);
  const skipNextPersist = useRef(false);

  useEffect(() => {
    try {
      const local = window.localStorage.getItem(storageKey);
      if (local) {
        const parsed = JSON.parse(local) as { intake?: Intake; ratings?: Ratings; evidence?: Evidence[]; completeTasks?: string[] };
        if (parsed.intake) setIntake(parsed.intake);
        if (parsed.ratings) setRatings(parsed.ratings);
        if (parsed.evidence) setEvidence(parsed.evidence);
        if (parsed.completeTasks) setCompleteTasks(parsed.completeTasks);
      }
    } catch { /* Invalid local demo data falls back to the safe sample. */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify({ intake, ratings, evidence, completeTasks }));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 1200);
    return () => window.clearTimeout(timer);
  }, [intake, ratings, evidence, completeTasks, restored]);

  const result = scorePursuit(ratings);
  const canAdvance = intake.attested;
  const completedTabs = new Set<Tab>(canAdvance ? ["intake", ...(evidence.length ? ["evidence" as Tab] : []), "qualify"] : []);

  function go(next: Tab) { setTab(next); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function updateIntake<K extends keyof Intake>(key: K, value: Intake[K]) { setIntake((current) => ({ ...current, [key]: value })); }
  function addEvidence() {
    const title = newEvidence.trim();
    if (!title) return;
    setEvidence((items) => [...items, { id: Date.now(), title, detail: "User-entered text claim. Add a source and validation note before relying on it.", source: "Unverified claim" }]);
    setNewEvidence("");
  }
  function clearLocalData() {
    if (!window.confirm("Clear all CaptureCoach demo entries and reset the room? This cannot be undone.")) return;
    skipNextPersist.current = true;
    window.localStorage.removeItem(storageKey);
    setIntake(initialIntake);
    setRatings(defaultRatings);
    setEvidence(initialEvidence);
    setCompleteTasks([]);
    setPlanWindow("7");
    setTab("intake");
    setSaved(false);
  }

  return (
    <div className="room-shell">
      <aside className="room-sidebar">
        <a className="brand" href="/"><span>CC</span> CaptureCoach</a>
        <p className="side-label">Decision workflow</p>
        <nav className="room-nav" aria-label="Decision workflow">
          {tabs.map((item, index) => (
            <button key={item.id} className={`${tab === item.id ? "active" : ""} ${completedTabs.has(item.id) ? "complete" : ""}`} onClick={() => go(item.id)} aria-current={tab === item.id ? "page" : undefined}>
              <span className="nav-index">{String(index + 1).padStart(2, "0")}</span><span className="nav-name">{item.name}</span><span className="nav-check" aria-hidden="true">{completedTabs.has(item.id) ? "●" : "○"}</span>
            </button>
          ))}
        </nav>
        <div className="safety-card"><strong>DEMO SAFETY MODE</strong>No classified, CUI, export-controlled, proprietary, or third-party restricted information.</div>
      </aside>

      <main className="room-main">
        <header className="room-topbar">
          <div className="pursuit-title"><strong>{intake.name || "Untitled pursuit"}</strong><span className="demo-chip">DEMO</span></div>
          <div className="top-actions"><button className="button small" onClick={() => go("history")}>Checkpoints</button><button className="button primary small" onClick={() => go("decision")}>{saved ? "Saved locally" : "View the call"}</button></div>
        </header>

        <div className="room-content">
          {tab === "intake" ? <IntakeView intake={intake} update={updateIntake} canAdvance={canAdvance} onNext={() => go("evidence")} /> : null}
          {tab === "evidence" ? <EvidenceView evidence={evidence} newEvidence={newEvidence} setNewEvidence={setNewEvidence} addEvidence={addEvidence} removeEvidence={(id) => setEvidence((items) => items.filter((item) => item.id !== id))} onNext={() => go("qualify")} /> : null}
          {tab === "qualify" ? <QualificationView ratings={ratings} setRating={(key, value) => setRatings((current) => ({ ...current, [key]: value }))} result={result} onNext={() => go("decision")} /> : null}
          {tab === "decision" ? <DecisionView result={result} ratings={ratings} onNext={() => go("plan")} /> : null}
          {tab === "plan" ? <PlanView window={planWindow} setWindow={setPlanWindow} completeTasks={completeTasks} toggleTask={(task) => setCompleteTasks((items) => items.includes(task) ? items.filter((item) => item !== task) : [...items, task])} /> : null}
          {tab === "history" ? <HistoryView result={result} /> : null}
          {tab === "admin" ? <AdminView onClearLocalData={clearLocalData} /> : null}
        </div>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="room-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><p>{body}</p></div>;
}

function IntakeView({ intake, update, canAdvance, onNext }: { intake: Intake; update: <K extends keyof Intake>(key: K, value: Intake[K]) => void; canAdvance: boolean; onNext: () => void }) {
  return <>
    <PageHeading eyebrow="Gate 01 · Frame" title="Name the pursuit." body="Create a decision frame before enthusiasm hardens into sunk cost." />
    <div className="notice"><strong>Text-only, non-sensitive demo.</strong> Do not enter classified information, CUI, export-controlled data, source-selection information, proprietary third-party material, or anything you lack the right to use.</div>
    <section className="panel" aria-labelledby="intake-title">
      <div className="panel-header"><h2 id="intake-title">Pursuit frame</h2><span className="demo-chip">FICTIONAL SAMPLE</span></div>
      <div className="panel-body form-grid">
        <Field label="Pursuit name"><input value={intake.name} onChange={(event) => update("name", event.target.value)} /></Field>
        <Field label="Customer / agency"><input value={intake.agency} onChange={(event) => update("agency", event.target.value)} /></Field>
        <Field label="Contract vehicle"><input value={intake.vehicle} onChange={(event) => update("vehicle", event.target.value)} /></Field>
        <Field label="Estimated value"><input value={intake.value} onChange={(event) => update("value", event.target.value)} /></Field>
        <Field label="Decision deadline"><input type="date" value={intake.deadline} onChange={(event) => update("deadline", event.target.value)} /></Field>
        <Field label="Stage"><select defaultValue="research"><option value="research">Market research</option><option value="capture">Active capture</option><option value="rfp">RFP released</option></select></Field>
        <Field label="Mission need" full><textarea value={intake.mission} onChange={(event) => update("mission", event.target.value)} /><p className="field-hint">Describe the customer outcome—not your solution.</p></Field>
        <div className="attestation field full"><input id="attestation" type="checkbox" checked={intake.attested} onChange={(event) => update("attested", event.target.checked)} /><label htmlFor="attestation"><strong>I confirm this demo text is non-sensitive and I have the right to use it.</strong><br/>I have not entered classified, CUI, export-controlled, source-selection, or restricted third-party information.</label></div>
      </div>
      <div className="panel-actions"><button className="button primary" disabled={!canAdvance} onClick={onNext}>{canAdvance ? "Continue to evidence →" : "Complete the attestation"}</button></div>
    </section>
  </>;
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) { return <div className={`field ${full ? "full" : ""}`}><label>{label}</label>{children}</div>; }

function EvidenceView({ evidence, newEvidence, setNewEvidence, addEvidence, removeEvidence, onNext }: { evidence: Evidence[]; newEvidence: string; setNewEvidence: (value: string) => void; addEvidence: () => void; removeEvidence: (id: number) => void; onNext: () => void }) {
  return <>
    <PageHeading eyebrow="Gate 02 · Ground" title="Build the evidence room." body="Separate what the team knows from what it hopes. Every claim needs a provenance label." />
    <div className="workspace-grid">
      <section className="panel"><div className="panel-header"><h2>Evidence ledger</h2><span>{evidence.length} claims</span></div><div className="panel-body">
        {evidence.length ? <div className="evidence-list">{evidence.map((item) => <article className="evidence-item" key={item.id}><span className="evidence-dot"/><div><h3>{item.title}</h3><p>{item.detail}</p></div><div><span className="evidence-tag">{item.source}</span><button className="text-link" style={{ display: "block", marginTop: 10, border: 0, background: "none", color: "#65707b", fontSize: 10 }} onClick={() => removeEvidence(item.id)}>Remove</button></div></article>)}</div> : <div className="empty-box"><strong>No claims are in this room.</strong><p>Add a non-sensitive text claim to begin qualification.</p></div>}
      </div></section>
      <aside className="panel"><div className="panel-header"><h2>Add text evidence</h2></div><div className="panel-body"><div className="field"><label htmlFor="claim">Claim or fact</label><textarea id="claim" placeholder="Example: The customer named reporting latency as a priority in a public industry day." value={newEvidence} onChange={(event) => setNewEvidence(event.target.value)} /><p className="field-hint">New entries begin as unverified. Never paste sensitive or restricted information.</p><button className="button primary" onClick={addEvidence}>Add to ledger</button></div><button className="disabled-upload" disabled aria-disabled="true">File uploads disabled in demo</button></div></aside>
    </div>
    <div className="panel-actions" style={{ marginTop: 20 }}><button className="button primary" onClick={onNext}>Challenge the pursuit →</button></div>
  </>;
}

function QualificationView({ ratings, setRating, result, onNext }: { ratings: Ratings; setRating: (key: CriterionKey, value: Rating) => void; result: ReturnType<typeof scorePursuit>; onNext: () => void }) {
  return <>
    <PageHeading eyebrow="Gate 03 · Challenge" title="Score what survives." body="Rate evidence strength from zero to five. The weights and thresholds stay visible." />
    <div className="notice"><strong>Current preview: {result.recommendation} at {result.score}/100.</strong> This is a deterministic decision aid, not a guarantee of award or business outcome.</div>
    <section className="criteria-list" aria-label="Qualification criteria">{criteria.map((item) => <div className="criterion" key={item.key}><div><h3>{item.label}</h3><p>{item.prompt}</p></div><div className="criterion-scale" role="group" aria-label={`${item.label} rating from zero to five`}>{([0,1,2,3,4,5] as Rating[]).map((value) => <button key={value} aria-pressed={ratings[item.key] === value} aria-label={`${value} out of 5`} onClick={() => setRating(item.key, value)}>{value}</button>)}</div><div className="criterion-weight">{item.weight}% WEIGHT</div></div>)}</section>
    <div className="panel-actions" style={{ marginTop: 20 }}><button className="button primary" onClick={onNext}>Generate decision memo →</button></div>
  </>;
}

function DecisionView({ result, ratings, onNext }: { result: ReturnType<typeof scorePursuit>; ratings: Ratings; onNext: () => void }) {
  const low = criteria.filter((item) => ratings[item.key] < 3);
  return <>
    <PageHeading eyebrow="Decision memo · Live" title="The call, with receipts." body="A recommendation is useful only when the team can see its uncertainty and change conditions." />
    <section className="decision-board">
      <div className="decision-summary"><p className="eyebrow">Current recommendation</p><span className="score">{result.score}<small>/100</small></span><div className="recommendation">{result.recommendation}</div><div className="confidence-bar"><small>EVIDENCE CONFIDENCE · {result.confidence}%</small><div><span style={{ width: `${result.confidence}%` }} /></div><small>Calculated from criteria rated 3 or higher</small></div></div>
      <div className="decision-detail">
        <div className="decision-section"><h3>Why this call</h3><ul><li>Strategic fit and the stated customer need are above the qualification line.</li><li>Economics appear viable, but the value estimate is not independently validated.</li><li>{low.length ? `${low.length} weak criteria prevent an unconditional bid.` : "No criteria currently fall below the evidence threshold."}</li></ul></div>
        <div className="decision-section"><h3>Blockers</h3>{low.length ? <ul>{low.map((item) => <li key={item.key}>{item.label}: rated {ratings[item.key]}/5; assign an owner and validation source.</li>)}</ul> : <p>No open scoring blockers. Run an independent red-team review before committing.</p>}</div>
        <div className="decision-section"><h3>Assumptions & missing evidence</h3><ul><li>The estimated contract value reflects a funded acquisition path.</li><li>The team can access a decision influencer before the gate date.</li><li>Past-performance proof maps to this exact mission outcome.</li></ul></div>
        <div className="decision-section"><h3>What changes the decision</h3><div className="callout">Confirm customer access and the incumbent displacement path. Raise both weak criteria to at least 3/5 to move toward an unconditional bid.</div></div>
      </div>
    </section>
    <div className="panel-actions" style={{ marginTop: 20 }}><button className="button primary" onClick={onNext}>Build the action plan →</button></div>
  </>;
}

function PlanView({ window: planWindow, setWindow, completeTasks, toggleTask }: { window: keyof typeof plans; setWindow: (value: keyof typeof plans) => void; completeTasks: string[]; toggleTask: (task: string) => void }) {
  const inquiryHref = "mailto:contact@royzmediagroup.com?subject=CaptureCoach%20expert%20partner%20interest&body=I%27m%20interested%20in%20discussing%20an%20original-content%20partnership.";

  return <>
    <PageHeading eyebrow="Execution · Owner needed" title="Turn uncertainty into work." body="Resolve the highest-leverage unknowns first. Stop work if the gate conditions fail." />
    <div className="plan-tabs" role="tablist" aria-label="Action plan windows">{(["7","14","30"] as const).map((value) => <button role="tab" aria-selected={planWindow === value} className={planWindow === value ? "active" : ""} onClick={() => setWindow(value)} key={value}>{value} days</button>)}</div>
    <div className="task-list">{plans[planWindow].map(([title, detail, due]) => <label className="task" key={title}><input type="checkbox" checked={completeTasks.includes(title)} onChange={() => toggleTask(title)} /><span><strong>{title}</strong><p>{detail}</p></span><span className="due">{due}</span></label>)}</div>
    <section className="partner-card" style={{ marginTop: 28 }}><p className="eyebrow">Expert partner pilot</p><h2>Bring judgment into the room—legally.</h2><p>CaptureCoach is seeking independent GovCon practitioners to license original frameworks, review methods, or offer paid decision clinics. No archive or persona is used without a written agreement and documented provenance.</p><a className="button" href={inquiryHref}>Draft partner inquiry</a></section>
  </>;
}

function HistoryView({ result }: { result: ReturnType<typeof scorePursuit> }) {
  return <>
    <PageHeading eyebrow="Decision trail · Local demo" title="Remember why the call changed." body="Checkpoints keep a capture team honest when new evidence arrives." />
  </>;
}

function AdminView({ onClearLocalData }: { onClearLocalData: () => void }) {
  return <>
    <PageHeading eyebrow="Admin concept · Governance" title="Know where every insight came from." body="A production library should not publish guidance until rights, source, version, and reviewer are documented." />
    <div className="notice"><strong>No expert archive is connected.</strong> The rows below describe only the original demo material shipped in this prototype.</div>
    <section className="panel"><div className="panel-header"><h2>Content provenance register</h2><span>3 records</span></div><div className="panel-body" style={{ overflowX: "auto" }}><table className="provenance-table"><thead><tr><th>Asset</th><th>Origin</th><th>Rights basis</th><th>Status</th></tr></thead><tbody><tr><td>Seven-factor scorecard</td><td>Royz original demo</td><td>Owned</td><td className="status-ok">Cleared</td></tr><tr><td>Action-plan prompts</td><td>Royz original demo</td><td>Owned</td><td className="status-ok">Cleared</td></tr><tr><td>Fictional pursuit scenario</td><td>Royz original demo</td><td>Owned / fictional</td><td className="status-ok">Cleared</td></tr></tbody></table></div></section>
    <section className="panel" style={{ marginTop: 20 }}><div className="panel-header"><h2>Production release gate</h2></div><div className="panel-body"><div className="evidence-list"><article className="evidence-item"><span className="evidence-dot"/><div><h3>Written license required</h3><p>Scope, territory, duration, derivative rights, compensation, attribution, revocation, and AI-use terms must be signed before ingestion.</p></div><span className="evidence-tag">REQUIRED</span></article><article className="evidence-item"><span className="evidence-dot"/><div><h3>Human review required</h3><p>A named reviewer approves the version and records limitations before content reaches customers.</p></div><span className="evidence-tag">REQUIRED</span></article></div></div></section>
    <section className="panel data-control"><div><p className="eyebrow">Browser data control</p><h2>Clear this demo from this device.</h2><p>CaptureCoach stores entries only in this browser’s local storage. Clearing resets the fictional sample, ratings, evidence, and task progress. It cannot be undone.</p></div><button className="button danger" onClick={onClearLocalData}>Clear local demo data</button></section>
  </>;
}
