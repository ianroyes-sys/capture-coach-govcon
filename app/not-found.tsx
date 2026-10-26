import Link from "next/link";

export default function NotFound() {
  return <main className="center-state"><p className="eyebrow">404 · Off pursuit</p><h1>This room does not exist.</h1><Link className="button primary" href="/">Return to briefing</Link></main>;
}
