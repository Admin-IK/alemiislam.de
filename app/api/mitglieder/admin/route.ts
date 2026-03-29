import { NextResponse } from "next/server";
import { fetchAllMembers } from "@/lib/easyverein";

export const dynamic = "force-dynamic";

/**
 * GET /api/mitglieder/admin?password=...
 *
 * Returns all members with their completion status.
 * Protected by ADMIN_PASSWORD env variable.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  const adminPw = process.env.ADMIN_PASSWORD;
  if (!adminPw || password !== adminPw) {
    return NextResponse.json({ error: "Zugriff verweigert." }, { status: 401 });
  }

  try {
    const members = await fetchAllMembers();

    const completed = members.filter((m) => m.status === "completed");
    const partial = members.filter((m) => m.status === "partial");
    const pending = members.filter((m) => m.status === "pending");

    return NextResponse.json({
      total: members.length,
      completedCount: completed.length,
      partialCount: partial.length,
      pendingCount: pending.length,
      members,
    });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Mitgliederdaten." },
      { status: 500 }
    );
  }
}
