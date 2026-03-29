const API_BASE = "https://easyverein.com/api/v2.0";

function getToken(): string {
  const token = process.env.EASYVEREIN_API_TOKEN;
  if (!token) throw new Error("EASYVEREIN_API_TOKEN is not configured");
  return token;
}

async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  return res;
}

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type EasyVereinMember = {
  id: number;
  membershipNumber: string;
  emailOrUserName: string;
  contactDetails:
    | number
    | {
        id: number;
        firstName: string;
        familyName: string;
        privateEmail: string;
        mobilePhone: string;
        privatePhone: string;
        street: string;
        zip: string;
        city: string;
        dateOfBirth: string | null;
      };
};

/* ------------------------------------------------------------------ */
/*  Search members by name, phone, address                            */
/* ------------------------------------------------------------------ */

export async function searchMember(params: {
  vorname: string;
  nachname: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  kindname: string;
}): Promise<EasyVereinMember | null> {
  // Strategy: search by last name, then filter client-side with the
  // remaining fields for precise matching.
  const query =
    "{id,membershipNumber,emailOrUserName," +
    "contactDetails{id,firstName,familyName,privateEmail,mobilePhone,privatePhone,street,zip,city,dateOfBirth}}";

  const res = await apiFetch(
    `/member?search=${encodeURIComponent(params.nachname)}&query=${encodeURIComponent(query)}&limit=100`
  );

  if (!res.ok) {
    console.error("EasyVerein search failed:", res.status, await res.text());
    return null;
  }

  const data = await res.json();
  const results: EasyVereinMember[] = data.results ?? [];

  // Normalize helper
  const norm = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[\s\-\.\/]+/g, "");

  // Score-based matching — the more fields match, the higher the score
  let bestMatch: EasyVereinMember | null = null;
  let bestScore = 0;

  for (const member of results) {
    const cd =
      typeof member.contactDetails === "object" ? member.contactDetails : null;
    if (!cd) continue;

    let score = 0;

    // Last name must match (mandatory)
    if (norm(cd.familyName) !== norm(params.nachname)) continue;
    score += 2;

    // First name
    if (norm(cd.firstName) === norm(params.vorname)) score += 2;

    // Phone (check both mobile and private, normalize digits only)
    const digits = (s: string) => s.replace(/\D/g, "");
    const paramPhone = digits(params.telefon);
    if (
      digits(cd.mobilePhone || "") === paramPhone ||
      digits(cd.privatePhone || "") === paramPhone
    ) {
      score += 3;
    }

    // Address
    if (norm(cd.street || "").includes(norm(params.strasse))) score += 1;
    if (norm(cd.zip || "") === norm(params.plz)) score += 1;
    if (norm(cd.city || "").includes(norm(params.ort))) score += 1;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = member;
    }
  }

  // Require at least name + phone OR name + address to consider it a match
  if (bestScore < 4) return null;

  return bestMatch;
}

/* ------------------------------------------------------------------ */
/*  Update contact details (email, birthdate)                         */
/* ------------------------------------------------------------------ */

export async function updateContactDetails(
  contactId: number,
  data: {
    privateEmail?: string;
    dateOfBirth?: string;
  }
) {
  const res = await apiFetch(`/contact-details/${contactId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("EasyVerein update contact failed:", res.status, text);
    throw new Error(`Update failed: ${res.status}`);
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Update member login (emailOrUserName)                             */
/* ------------------------------------------------------------------ */

export async function updateMemberLogin(
  memberId: number,
  data: {
    emailOrUserName?: string;
  }
) {
  const res = await apiFetch(`/member/${memberId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("EasyVerein update member failed:", res.status, text);
    throw new Error(`Update failed: ${res.status}`);
  }

  return res.json();
}
