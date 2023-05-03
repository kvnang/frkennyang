import { NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/googleAuth";

export const runtime = "edge";

// Sample Request
// {
//   "number": 7,
//   "title": "Kevin",
//   "email": "kevin@kevinang.com",
//   "name": "Kevin",
//   "first_name": "Kevin",
//   "last_name": null,
//   "company": null,
//   "summary": "<strong>Kevin</strong> Hey there, just checking out to say how nice this website is!",
//   "body": "Hey there, just checking out to say how nice this website is!",
//   "data": {
//     "name": "Kevin",
//     "email": "kevin@kevinang.com",
//     "message": "Hey there, just checking out to say how nice this website is!",
//     "ip": "187.190.163.48",
//     "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
//     "referrer": "https://www.fatherkenny.com/"
//   },
//   "created_at": "2021-09-24T01:36:17.633Z",
//   "human_fields": {
//     "Name": "Kevin",
//     "Email": "kevin@kevinang.com",
//     "Message": "Hey there, just checking out to say how nice this website is!"
//   },
//   "ordered_human_fields": [
//     {
//       "title": "Name",
//       "name": "name",
//       "value": "Kevin"
//     },
//     {
//       "title": "Email",
//       "name": "email",
//       "value": "kevin@kevinang.com"
//     },
//     {
//       "title": "Message",
//       "name": "message",
//       "value": "Hey there, just checking out to say how nice this website is!"
//     }
//   ],
//   "id": "614d2b91e3695a1fb8eb52c5",
//   "form_id": "6143ec357114bb0007eaaa3e",
//   "site_url": "https://www.fatherkenny.com",
//   "form_name": "contact"
// }

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({ error: "No body" }, { status: 400 });
  }

  const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const googleSpreadsheetID = process.env.GOOGLE_SPREADSHEET_ID;

  if (!googleClientEmail || !googlePrivateKey || !googleSpreadsheetID) {
    return NextResponse.json(
      { error: "Google API not configured" },
      { status: 400 }
    );
  }

  const { form_name: formName, data, created_at: createdAt } = body;

  if (
    (data && !Object.keys(data).length) ||
    formName !== "contact" ||
    formName !== "invite"
  ) {
    return NextResponse.json(
      { error: "Sorry, this email cannot be sent." },
      { status: 400 }
    );
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
  const sheetsRes1 = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetID}/values/${formName}!A:B:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        values,
      }),
    }
  );

  const sheetsRes2 = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1YMmY5v4opqH1ZXQPYvkAVrMmZTByzG2aaXdO7e9jShY/values/${formName}!A:B:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        values,
      }),
    }
  );

  try {
    // Log to Kenny's DB
    const response = await sheetsRes1.json();
    const response2 = await sheetsRes2.json();

    // Log to Kevin's DB
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { status: 500 });
  }
}
