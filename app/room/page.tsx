import type { Metadata } from "next";
import { DecisionRoom } from "./decision-room";

export const metadata: Metadata = { title: "Demo decision room", robots: { index: false, follow: false } };

export default function RoomPage() { return <DecisionRoom />; }
