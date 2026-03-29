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

    // Update contact details (email, birthdate)
    await updateContactDetails(contactId, {
      privateEmail: email,
      dateOfBirth: geburtsdatum,
    });

    // Update member login email
    await updateMemberLogin(memberId, {
      emailOrUserName: email,
    });

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
