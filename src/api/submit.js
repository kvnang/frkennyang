import mailgun from 'mailgun-js';
import fetch from 'node-fetch';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export default async function handler(req, res) {
  if (!req.body) {
    res.status(400).send(`Form data is required.`);
    return;
  }

  const { 'form-name': formName, title, ...data } = req.body; // title is honeypot on both forms

  if (!formName || title) {
    res.status(400).send(`Sorry ... beep bop ... this email cannot be sent.`);
    return;
  }

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

  // TODO: Handle form verification logic

  const mjml = `
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-section background-color="#f5f2ed" />
        <mj-all font-family="Helvetica" />
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
        }
        
        .table td, .table th {
          padding: 3px 5px;
        }
        
        .table td:first-child,
        .table th:first-child {
          width: 25%;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-section padding-bottom="0">
        <mj-column>
          <mj-image src="https://www.fatherkenny.com/logo.png" width="200px" align="left" alt="Fr. Kenny Ang"></mj-image>
          <mj-divider border-width="1px" border-color="#a9a9a9"></mj-divider>
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
            <tr style="border-bottom:1px solid #ecedee;text-align:left;">
              <th>Field</th>
              <th>Value</th>
            </tr>
            ${Object.keys(data)
              .map((key) => `<tr><td>${key}</td><td>${data[key]}</tr>`)
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

  const mjmlResponse = await fetch('https://api.mjml.io/v1/render', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.MJML_APPLICATION_ID}:${process.env.MJML_SECRET_KEY}`
      ).toString('base64')}`,
    },
    body: JSON.stringify({ mjml }),
  });

  const htmlOutput = await mjmlResponse.json();

  const mailOptions = {
    from: `noreply@${process.env.MAILGUN_DOMAIN}`,
    to: process.env.RECIPIENT_EMAIL,
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
