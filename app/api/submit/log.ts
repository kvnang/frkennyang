import { getGoogleAuthToken } from "@/lib/googleAuth";

export async function submitLog(body: Record<string, any>) {
  const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const googleSpreadsheetID = process.env.GOOGLE_SPREADSHEET_ID;

  if (!googleClientEmail || !googlePrivateKey || !googleSpreadsheetID) {
    return { error: "Google API not configured" };
  }

  const { form_name: formName, data, created_at: createdAt } = body;

  if (
    (data && !Object.keys(data).length) ||
    (formName !== "contact" && formName !== "invite")
  ) {
    return { error: "This cannot be logged." };
  }

  const token = await getGoogleAuthToken(
    googleClientEmail,
    googlePrivateKey.replace(/\\n/g, "\n"),
    "https://www.googleapis.com/auth/spreadsheets"
  );

  let values: string[][] = [];
  if (formName === "contact") {
    values = [[createdAt, data.name, data.email, data.message]];
  }
  if (formName === "invite") {
    values = [
      [
        createdAt,
        data.date,
        data.alternateDate,
        data.startTime,
        data.endTime,
        data.timeZone,
        data.localDate,
        data.localAlternateDate,
        data.localStartTime,
        data.localEndTime,
        data.localTimeZone,
        data.organization,
        data.contactName,
        data.email,
        data.phone,
        data.eventLocation,
        data.venue,
        data.venueCapacity,
        data.addressStreet,
        data.addressStreet2,
        data.city,
        data.addressState,
        data.addressZip,
        data.addressCountry,
        data.airport,
        data.attendance,
        data.age,
        data.diocese,
        data.topic,
        data.eventType,
        data.hasSpokenBefore,
        data.details,
      ],
    ];
  }

  if (!values) {
    return;
  }

  // request to google sheets via REST API
  const endpoint =
    process.env.NODE_ENV === "development"
      ? `https://sheets.googleapis.com/v4/spreadsheets/1YMmY5v4opqH1ZXQPYvkAVrMmZTByzG2aaXdO7e9jShY/values/${formName}!A:B:append?valueInputOption=USER_ENTERED`
      : `https://sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetID}/values/${formName}!A:B:append?valueInputOption=USER_ENTERED`;

  const sheetsRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      values,
    }),
  });

  return sheetsRes;
}
