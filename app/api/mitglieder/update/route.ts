import { NextResponse } from "next/server";
import { updateContactDetails, updateMemberLogin } from "@/lib/easyverein";

export const dynamic = "force-dynamic";

/**
 * POST /api/mitglieder/update
 *
 * Updates a member's contact details (email, birthdate, SEPA),
 * sets the login password, and activates the EasyVerein account.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      memberId,
      contactId,
      mitgliedsnummer,
      email,
      passwort,
      geburtsdatum,
      iban,
      bic,
      kontoinhaber,
    } = body;

    if (!memberId || !contactId || !email || !geburtsdatum || !iban || !kontoinhaber) {
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
      const parts = geburtsdatum.split(".");
      if (parts.length === 3) {
        isoDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
      }
    }

    // SEPA mandate date: 30 days ago in YYYY-MM-DD
    const mandateDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sepaDate = mandateDate.toISOString().split("T")[0];

    // Mandate reference: "Bildung Mitgliedsnr. {number}"
    const sepaMandate = `Bildung Mitgliedsnr. ${mitgliedsnummer || ""}`.trim();

    // Timestamp for internal tracking
    const now = new Date();
    const timestamp = now.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update contact details (email, birthdate, SEPA, tracking note)
    await updateContactDetails(contactId, {
      privateEmail: email,
      dateOfBirth: isoDate,
      iban: iban.replace(/\s/g, ""),
      bic: bic || "",
      bankAccountOwner: kontoinhaber,
      sepaMandate,
      sepaDate,
      methodOfPayment: 1, // 1 = Lastschrift
      internalNote: `Datenerfassung abgeschlossen am ${timestamp}`,
    });

    // Update member login: set email, password, and activate account
    await updateMemberLogin(memberId, {
      emailOrUserName: email,
      password: passwort,
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
