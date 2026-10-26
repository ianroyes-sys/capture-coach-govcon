"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="center-state"><p className="eyebrow">Room interrupted</p><h1>The decision room could not open.</h1><p>Your local pursuit data has not been changed.</p><button className="button primary" onClick={reset}>Try again</button></main>;
}
