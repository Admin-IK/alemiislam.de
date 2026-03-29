import { NextResponse } from "next/server";
import { searchMember } from "@/lib/easyverein";

export const dynamic = "force-dynamic";

/**
 * POST /api/mitglieder/verify
 *
 * Searches EasyVerein for a member matching the provided personal data.
 * Returns the profile if found.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vorname, nachname, telefon, strasse, plz, ort, kindname } = body;

    if (!vorname || !nachname || !telefon || !strasse || !plz || !ort) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    const member = await searchMember({
      vorname,
      nachname,
      telefon,
      strasse,
      plz,
      ort,
      kindname: kindname || "",
    });

    if (!member) {
      return NextResponse.json(
        {
          error:
            "Mitglied konnte nicht gefunden werden. Bitte prüfen Sie Ihre Angaben oder wenden Sie sich an den Verein.",
        },
        { status: 404 }
      );
    }

    const cd =
      typeof member.contactDetails === "object"
        ? member.contactDetails
        : null;

    return NextResponse.json({
      profile: {
        memberId: member.id,
        contactId: cd?.id,
        mitgliedsnummer: member.membershipNumber || "–",
        vorname: cd?.firstName || "",
        nachname: cd?.familyName || "",
        telefon: cd?.mobilePhone || cd?.privatePhone || "",
        strasse: cd?.street || "",
        plz: cd?.zip || "",
        ort: cd?.city || "",
        email: cd?.privateEmail || "",
        geburtsdatum: cd?.dateOfBirth || "",
      },
    });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktieren Sie den Verein." },
      { status: 500 }
    );
  }
}
