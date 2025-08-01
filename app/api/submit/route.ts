// import { Resend } from "resend";
import { NextResponse } from "next/server";
import { fromZonedTime, format, toZonedTime } from "date-fns-tz";
import { submitLog } from "./log";
import { turnstileVerify } from "@/lib/turnstile";

interface MJMLResponseBodyProps {
  errors?: string[];
  html?: string;
  // mjml?: string;
  // mjml_version?: string;
  message?: string;
  // request_id?: string;
}

function toTitleCase(str: string) {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  let body: Record<string, any> = {};

  if (contentType?.includes("application/json")) {
    body = await request.json();
  } else if (contentType?.includes("x-www-form-urlencoded")) {
    const formData = await request.formData();
    body = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });
  }

  if (!body) {
    return NextResponse.json(
      { error: "Form data is required" },
      { status: 400 },
    );
  }

  // Turnstile validation
  const token = body["cf-turnstile-response"];
  const outcome = await turnstileVerify(request, token);

  if (!outcome.success) {
    return new Response(
      JSON.stringify({ error: "Turnstile validation failed" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  // const resend = new Resend(process.env.RESEND_API_KEY!);

  const recipientEmail =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
      ? "ka@kevinang.com"
      : process.env.RECIPIENT_EMAIL;

  if (!recipientEmail) {
    return NextResponse.json(
      { error: "Recipient Email not defined" },
      { status: 400 },
    );
  }

  const {
    "form-name": formName,
    "cf-turnstile-response": _,
    ...rawData
  } = body;

  if (!rawData || !Object.keys(rawData).length) {
    return NextResponse.json({ error: "No data to be sent" }, { status: 400 });
  }

  const localTimeZone = "Europe/Rome";
  let data: { [key: string]: any } = {};

  if (
    rawData.date &&
    rawData.startTime &&
    rawData.endTime &&
    rawData.timeZone
  ) {
    const utcStartDate = fromZonedTime(
      `${rawData.date} ${rawData.startTime}`,
      rawData.timeZone,
    );
    const utcEndDate = fromZonedTime(
      `${rawData.date} ${rawData.endTime}`,
      rawData.timeZone,
    );
    const localStartDateUTC = toZonedTime(utcStartDate, localTimeZone);
    const localEndDateUTC = toZonedTime(utcEndDate, localTimeZone);

    const localDate = format(localStartDateUTC, "yyyy-MM-dd", {
      timeZone: localTimeZone,
    });
    const localStartTime = format(localStartDateUTC, "HH:mm", {
      timeZone: localTimeZone,
    });
    const localEndTime = format(localEndDateUTC, "HH:mm", {
      timeZone: localTimeZone,
    });

    let localAlternateDate = "";

    if (rawData.alternateDate) {
      const utcAlternateDate = fromZonedTime(
        `${rawData.alternateDate} ${rawData.startTime}`,
        rawData.timeZone,
      );
      const localAlternateDateUTC = toZonedTime(
        utcAlternateDate,
        localTimeZone,
      );

      localAlternateDate = format(localAlternateDateUTC, "yyyy-MM-dd", {
        timeZone: localTimeZone,
      });
    }

    data = {
      ...rawData,
      localDate,
      localAlternateDate,
      localStartTime,
      localEndTime,
      localTimeZone,
    };
  } else {
    data = rawData;
  }

  try {
    await submitLog({
      data,
      form_name: formName,
      created_at: new Date(),
    });
  } catch (error) {
    console.error(error);
  }

  const mjml = `
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="Helvetica" />
        <mj-all color="#2f2f2f" />
      </mj-attributes>
      <mj-style inline="inline">
        h1 {
          margin: 0 !important;
          font-size: 20px;
          line-height: 1.25em;
        }
        
        h2.subtitle {
          margin: 0 0 5px !important;
          font-size: 14px;
          line-height: 1.25em;
          font-weight: 400;
          color: #a9a9a9;
        }
        
        .table td, .table th {
          padding: 3px 5px;
          vertical-align: top;
        }

        .table tr:not(:last-child) {
          border-bottom: 1px solid #e3e3e3;
        }
        
        .table td:first-child,
        .table th:first-child {
          width: 33%;
        }
      </mj-style>
      <mj-style>
        a {
          color: #e2a93a;
        }
        
        @media only screen and (min-width:480px) {
          .logo {
            width: 200px;
          }
        }
      </mj-style>
    </mj-head>
    <mj-body background-color="#fff">
      <mj-section full-width="full-width" background-color="#2f2f2f" background-url="https://www.fatherkenny.com/email-header-bg.png" background-size="cover">
        <mj-column>
          <mj-image src="https://www.fatherkenny.com/logo-W.png" width="160px" align="left" alt="Fr. Kenny Ang" css-class="logo"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section padding-bottom="0">
        <mj-column>
          <mj-text>
            <h2 class="subtitle">Form Submission</h2>
            <h1>${toTitleCase(formName)} Form</h1>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column width="100%">
          <mj-table css-class="table">
            <tr style="border-bottom:1px solid #a9a9a9;text-align:left;">
              <th>Field</th>
              <th>Value</th>
            </tr>
            ${Object.keys(data)
              .map(
                (key) =>
                  `<tr><td><strong>${toTitleCase(key)}</strong></td><td>${
                    data[key]
                  }</tr>`,
              )
              .join("\n")}
          </mj-table>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-button href="https://docs.google.com/spreadsheets/d/1WQ5pCNm2idSS2c4DA1nklSALfUuj45bnueQ-9mqNoRU/edit?usp=sharing" background-color="#e2a93a" align="right" color="white">View in Google Sheets</mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;

  if (!process.env.MJML_APPLICATION_ID || !process.env.MJML_SECRET_KEY) {
    console.log("MJML_APPLICATION_ID or MJML_SECRET_KEY not set");
  }

  try {
    const mjmlResponse: Response = await fetch(
      "https://api.mjml.io/v1/render",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MJML_APPLICATION_ID}:${process.env.MJML_SECRET_KEY}`,
          ).toString("base64")}`,
        },
        body: JSON.stringify({ mjml }),
      },
    );

    const htmlOutput = (await mjmlResponse.json()) as MJMLResponseBodyProps;

    const mailOptions: {
      from: string;
      to: string;
      "h:Reply-To"?: string;
      subject: string;
      html?: string;
      text?: string;
    } = {
      from: `"Fr. Kenny Ang - Web Notification" <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: recipientEmail,
      "h:Reply-To": data.email || "",
      subject: `New form submission: ${toTitleCase(formName)} Form`,
    };

    if (htmlOutput.html) {
      mailOptions.html = htmlOutput.html;
    } else {
      console.error(htmlOutput.message);
      mailOptions.text = `${Object.keys(data)
        .map((key) => `${key}: ${data[key]}`)
        .join("\n")}`;
    }

    // resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'fatherkenny@kevinang.com',
    //   subject: 'Hello World',
    //   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    // });

    const res = await fetch(
      `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("api:" + mailgunApiKey),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(mailOptions).toString(),
      },
    );

    return NextResponse.json({ success: res.ok });
  } catch (e) {
    console.log(e);
    throw new Error(`MJML / Mailgun API Error ${e}`);
  }
}
