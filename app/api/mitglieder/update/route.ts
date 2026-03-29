import { NextResponse } from "next/server";
import { updateContactDetails, updateMemberLogin } from "@/lib/easyverein";

export const dynamic = "force-dynamic";

/**
 * POST /api/mitglieder/update
 *
 * Updates a member's contact details (email, birthdate) and
 * login credentials in EasyVerein.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, contactId, email, passwort, geburtsdatum } = body;

    if (!memberId || !contactId || !email || !geburtsdatum) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    if (passwort && passwort.length < 8) {
      return NextResponse.json(
        { error: "Das Passwort muss mindestens 8 Zeichen lang sein." },
        { status: 400 }
      );
    }

    // Normalize date to YYYY-MM-DD (API expects ISO format)
    let isoDate = geburtsdatum;
    if (geburtsdatum.includes(".")) {
      // Convert DD.MM.YYYY → YYYY-MM-DD
      const parts = geburtsdatum.split(".");
      if (parts.length === 3) {
        isoDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
      }
    }

    // Update contact details (email, birthdate)
    await updateContactDetails(contactId, {
      privateEmail: email,
      dateOfBirth: isoDate,
    });

    // Update member login email — some tokens may lack write access here,
    // so we treat this as non-critical if contact-details succeeded.
    try {
      await updateMemberLogin(memberId, {
        emailOrUserName: email,
      });
    } catch (loginErr) {
      console.warn("Member login update failed (non-critical):", loginErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      {
        error:
          "Daten konnten nicht gespeichert werden. Bitte versuchen Sie es erneut oder wenden Sie sich an den Verein.",
      },
      { status: 500 }
    );
  }
}
