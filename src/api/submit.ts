import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import mailgun from 'mailgun-js';
import fetch, { Response } from 'node-fetch';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

interface MJMLResponseBodyProps {
  errors?: string[];
  html?: string;
  // mjml?: string;
  // mjml_version?: string;
  message?: string;
  // request_id?: string;
}

function toTitleCase(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(req.body);

  if (!req.body) {
    res.status(400).send(`Form data is required.`);
    throw new Error('Form data is required.');
  }

  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  if (!mailgunApiKey || !mailgunDomain) {
    res.status(400).send('Mailgun API is not configured');
    throw new Error('Mailgun API is not configured');
  }

  if (!recipientEmail) {
    res.status(400).send('Recipient Email not defined');
    throw new Error('Recipient Email not defined');
  }

  const mg = mailgun({
    apiKey: mailgunApiKey,
    domain: mailgunDomain,
  });

  const { 'form-name': formName, title, ...rawData } = req.body; // title is honeypot on both forms

  if (!formName || title) {
    res.status(400).send(`Sorry ... beep bop ... this email cannot be sent.`);
    return;
  }

  // format dates

  if (!rawData || !Object.keys(rawData).length) {
    res.status(400).send(`No data to be sent`);
    return;
  }

  const localTimeZone = 'Europe/Rome';
  let data: { [key: string]: any } = {};

  if (
    rawData.date &&
    rawData.startTime &&
    rawData.endTime &&
    rawData.timeZone
  ) {
    const utcStartDate = zonedTimeToUtc(
      `${rawData.date} ${rawData.startTime}`,
      rawData.timeZone
    );
    const utcEndDate = zonedTimeToUtc(
      `${rawData.date} ${rawData.endTime}`,
      rawData.timeZone
    );
    const localStartDateUTC = utcToZonedTime(utcStartDate, localTimeZone);
    const localEndDateUTC = utcToZonedTime(utcEndDate, localTimeZone);

    const localDate = format(localStartDateUTC, 'yyyy-MM-dd', {
      timeZone: localTimeZone,
    });
    const localStartTime = format(localStartDateUTC, 'HH:mm', {
      timeZone: localTimeZone,
    });
    const localEndTime = format(localEndDateUTC, 'HH:mm', {
      timeZone: localTimeZone,
    });

    let localAlternateDate = '';

    if (rawData.alternateDate) {
      const utcAlternateDate = zonedTimeToUtc(
        `${rawData.alternateDate} ${rawData.startTime}`,
        rawData.timeZone
      );
      const localAlternateDateUTC = utcToZonedTime(
        utcAlternateDate,
        localTimeZone
      );

      localAlternateDate = format(localAlternateDateUTC, 'yyyy-MM-dd', {
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

  console.log('Before fetch', req.body);

  // Log to Google Sheet
  fetch(`${process.env.URL}api/log/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // id: body.id,
      form_name: formName,
      data,
      created_at: new Date(),
    }),
  });

  console.log('After fetch', req.body);

  // TODO: Handle form verification logic

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
                  }</tr>`
              )
              .join('\n')}
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

  console.log(
    `Basic ${Buffer.from(
      `${process.env.MJML_APPLICATION_ID}:${process.env.MJML_SECRET_KEY}`
    ).toString('base64')}`
  );

  if (!process.env.MJML_APPLICATION_ID || !process.env.MJML_SECRET_KEY) {
    console.log('MJML_APPLICATION_ID or MJML_SECRET_KEY not set');
  }

  let mjmlResponse: Response | undefined;

  try {
    mjmlResponse = await fetch('https://api.mjml.io/v1/render', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.MJML_APPLICATION_ID}:${process.env.MJML_SECRET_KEY}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({ mjml }),
    });
  } catch (e) {
    console.log(e);
    throw new Error(`MJML API Error ${e}`);
  }

  console.log('MJML Response', mjmlResponse);

  const htmlOutput = (await mjmlResponse.json()) as MJMLResponseBodyProps;

  const mailOptions: {
    from: string;
    to: string;
    'h:Reply-To'?: string;
    subject: string;
    html?: string;
    text?: string;
  } = {
    from: `"Fr. Kenny Ang - Web Notification" <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to: recipientEmail,
    'h:Reply-To': data.email || '',
    subject: `New form submission: ${toTitleCase(formName)} Form`,
  };

  if (htmlOutput.html) {
    mailOptions.html = htmlOutput.html;
  } else {
    console.error(htmlOutput.message);
    mailOptions.text = `${Object.keys(data)
      .map((key) => `${key}: ${data[key]}`)
      .join('\n')}`;
  }

  console.log('Before mg.message()', req.body);

  mg.messages().send(mailOptions, (error, body) => {
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      console.log(body);
      res.status(200).json(body);
    }
  });
}
