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
    iban?: string;
    bic?: string;
    bankAccountOwner?: string;
    sepaMandate?: string;
    sepaDate?: string;
    methodOfPayment?: number;
    internalNote?: string;
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

/**
 * Update member login credentials and activate the account.
 * Sets emailOrUserName, password, and requirePasswordChange=false
 * so the member can log in immediately.
 */
export async function updateMemberLogin(
  memberId: number,
  data: {
    emailOrUserName?: string;
    password?: string;
  }
) {
  const res = await apiFetch(`/member/${memberId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...data,
      requirePasswordChange: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("EasyVerein update member failed:", res.status, text);
    throw new Error(`Update failed: ${res.status}`);
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Fetch all members with status info (for admin dashboard)          */
/* ------------------------------------------------------------------ */

export type MemberStatus = {
  id: number;
  membershipNumber: string;
  firstName: string;
  familyName: string;
  email: string;
  phone: string;
  hasEmail: boolean;
  hasIban: boolean;
  hasDateOfBirth: boolean;
  hasPassword: boolean;
  internalNote: string;
  status: "completed" | "partial" | "pending";
};

export async function fetchAllMembers(): Promise<MemberStatus[]> {
  const allMembers: MemberStatus[] = [];
  let url: string | null =
    "/member?limit=100&query=" +
    encodeURIComponent(
      "{id,membershipNumber,emailOrUserName,requirePasswordChange," +
        "contactDetails{id,firstName,familyName,privateEmail,mobilePhone,privatePhone," +
        "iban,dateOfBirth,internalNote}}"
    );

  while (url) {
    const res = await apiFetch(url);
    if (!res.ok) {
      console.error("EasyVerein fetch members failed:", res.status);
      break;
    }

    const data = await res.json();
    const results = data.results ?? [];

    for (const m of results) {
      const cd = typeof m.contactDetails === "object" ? m.contactDetails : null;
      if (!cd) continue;

      const hasEmail = !!(cd.privateEmail && cd.privateEmail.includes("@"));
      const hasIban = !!cd.iban;
      const hasDob = !!cd.dateOfBirth;
      const hasPassword = !!(m.emailOrUserName && m.emailOrUserName.includes("@"));
      const note = cd.internalNote || "";

      let status: MemberStatus["status"] = "pending";
      if (hasEmail && hasIban && hasDob && hasPassword) {
        status = "completed";
      } else if (hasEmail || hasIban || hasDob) {
        status = "partial";
      }

      allMembers.push({
        id: m.id,
        membershipNumber: m.membershipNumber || "–",
        firstName: cd.firstName || "",
        familyName: cd.familyName || "",
        email: cd.privateEmail || "",
        phone: cd.mobilePhone || cd.privatePhone || "",
        hasEmail,
        hasIban,
        hasDateOfBirth: hasDob,
        hasPassword,
        internalNote: note,
        status,
      });
    }

    // Pagination
    if (data.next) {
      const nextUrl = new URL(data.next);
      url = nextUrl.pathname.replace("/api/v2.0", "") + nextUrl.search;
    } else {
      url = null;
    }
  }

  return allMembers;
}
