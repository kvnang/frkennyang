import mailgun from 'mailgun-js';
import fetch from 'node-fetch';
import mjml2html from 'mjml';

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

export default function handler(req, res) {
  if (!req.body) {
    res.status(400).json({});
  }

  const { 'form-name': formName, ...data } = req.body;

  if (!formName) {
    res.status(400).json(`form-name is not provided`);
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

  const htmlOutput = mjml2html(`
  <mjml>
    <mj-head>
      <mj-all font-family="Helvetica" />
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
        td, th {
          padding: 3px 5px;
        }
        td:first-child,
        th:first-child {
          width: 25%;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-section padding-bottom="0">
        <mj-column>
          <mj-image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='167' height='34' fill='%232f2f2f' aria-labelledby='main-logo' role='img'%3E%3Ctitle id='main-logo'%3EFr. Kenny Ang%3C/title%3E%3Cpath d='M1.742 24.717c.482-.215.918-.462 1.309-.742a8.02 8.02 0 0 0 1.055-.879c.313-.312.576-.628.791-.947a5.99 5.99 0 0 0 .527-.928c.059-.143.169-.215.332-.215.111 0 .199.039.264.117.072.072.107.153.107.244 0 .052-.01.101-.029.146-.143.319-.326.651-.547.996a6.95 6.95 0 0 1-.811 1.006 8.12 8.12 0 0 1-1.104.947 8.8 8.8 0 0 1-1.455.84c.352.365.658.768.918 1.211.26.449.475.915.645 1.396a8.45 8.45 0 0 1 .391 1.455 7.84 7.84 0 0 1 .137 1.416 5.4 5.4 0 0 1-.117 1.152 3.18 3.18 0 0 1-.332.947 1.8 1.8 0 0 1-.527.625c-.208.156-.446.234-.713.234-.391 0-.693-.146-.908-.439-.215-.287-.374-.687-.479-1.201a11.39 11.39 0 0 1-.176-1.807L1 28.037v-3.144l.01-1.924.039-4.024.029-1.865.117-2.998c.059-.879.153-1.621.283-2.227s.306-1.064.527-1.377c.228-.319.514-.479.859-.479a1.05 1.05 0 0 1 .693.234 1.61 1.61 0 0 1 .459.615 3.33 3.33 0 0 1 .254.898 7.26 7.26 0 0 1 .078 1.084 12.7 12.7 0 0 1-.205 2.305c-.137.742-.322 1.462-.557 2.158a17.86 17.86 0 0 1-.83 2.041L1.75 21.297v1.797l-.01.889v.732zm.029-4.922a16.03 16.03 0 0 0 .732-1.582 15.41 15.41 0 0 0 .586-1.729c.163-.593.29-1.198.381-1.816a12.79 12.79 0 0 0 .137-1.865 6.72 6.72 0 0 0-.049-.85 2.64 2.64 0 0 0-.137-.644c-.059-.182-.137-.322-.234-.42-.091-.104-.199-.156-.322-.156-.13 0-.244.078-.342.234s-.182.365-.254.625a8.12 8.12 0 0 0-.186.898l-.117 1.065-.078 1.104-.049 1.035-.02.85v.557l-.02.693-.01.596-.02.625v.781zm-.029 6.123l-.01 1.143v.977l.01 1.797.088 1.592c.059.475.143.856.254 1.143.117.293.283.439.498.439.195 0 .355-.088.479-.264a1.96 1.96 0 0 0 .283-.625 4.01 4.01 0 0 0 .146-.742l.039-.605c0-.397-.039-.814-.117-1.25-.072-.436-.186-.869-.342-1.299a7.98 7.98 0 0 0-.557-1.23 5.64 5.64 0 0 0-.771-1.074zm7.717-5.693l-.098.498-.117.4-.088.273-.049.117c-.065.15-.179.225-.342.225a.39.39 0 0 1-.254-.098c-.078-.072-.117-.159-.117-.264 0-.039.007-.068.02-.088s.033-.059.059-.117a2.41 2.41 0 0 0 .098-.293 9.37 9.37 0 0 0 .146-.635 5.72 5.72 0 0 1-.342-.01c-.117-.007-.225-.029-.322-.068a.56.56 0 0 1-.254-.186c-.065-.085-.098-.202-.098-.352 0-.111.033-.26.098-.449.059-.189.14-.374.244-.557a2.18 2.18 0 0 1 .352-.469c.13-.137.26-.205.391-.205.15 0 .27.055.361.166.098.111.173.247.225.41a2.38 2.38 0 0 1 .107.498 3.19 3.19 0 0 1 .039.459h.322l.312-.01c.371 0 .654.081.85.244s.293.43.293.801a3.92 3.92 0 0 1-.029.469L11.13 22a4.35 4.35 0 0 0-.029.498 1.53 1.53 0 0 0 .098.586 1.07 1.07 0 0 0 .244.361c.098.091.202.156.313.195.111.032.212.049.303.049a1.31 1.31 0 0 0 .791-.273c.247-.182.475-.4.684-.654a6.27 6.27 0 0 0 .557-.82l.42-.752c.033-.059.078-.104.137-.137s.12-.049.186-.049c.117 0 .208.039.273.117.065.072.098.153.098.244a.39.39 0 0 1-.039.176l-.527.908a6.33 6.33 0 0 1-.674.938c-.254.293-.54.54-.859.742a1.87 1.87 0 0 1-1.035.303 1.64 1.64 0 0 1-.664-.137 1.57 1.57 0 0 1-.547-.371 1.97 1.97 0 0 1-.361-.615c-.091-.247-.137-.524-.137-.83a4.82 4.82 0 0 1 .098-.967 4.75 4.75 0 0 0 .098-.928c0-.124-.029-.215-.088-.273-.052-.065-.173-.098-.361-.098h-.303l-.342.01zm-.654-.723a2.02 2.02 0 0 0-.01-.176c0-.078-.007-.153-.02-.225a.76.76 0 0 0-.039-.186c-.013-.052-.029-.078-.049-.078s-.046.026-.078.078a2.38 2.38 0 0 0-.088.176 1.64 1.64 0 0 0-.088.215l-.059.195h.43zm10.656 4.453c0 .15-.052.273-.156.371-.098.104-.221.156-.371.156a.52.52 0 0 1-.381-.156.5.5 0 0 1-.147-.371.49.49 0 0 1 .147-.361.52.52 0 0 1 .381-.156c.15 0 .273.052.371.156.104.098.156.218.156.361zm11.03-5.217l-1.88 1.96v3.54h-3.22v-14h3.22v6.54l6.2-6.54h3.6l-5.8 6.24 6.14 7.76h-3.78l-4.48-5.5zm23.544 2.9v2.6h-10.84v-14h10.58v2.6h-7.36v3.04h6.5v2.52h-6.5v3.24h7.62zm18.418-11.4v14h-2.66l-6.98-8.5v8.5h-3.2v-14h2.68l6.96 8.5v-8.5h3.2zm19.153 0v14h-2.66l-6.98-8.5v8.5h-3.2v-14h2.68l6.96 8.5v-8.5h3.2zm13.032 9.04v4.96h-3.24v-5l-5.42-9h3.44l3.74 6.22 3.74-6.22h3.18l-5.44 9.04zm22.899 1.02h-8.119l-1.781 3.94h-1.1l6.441-14h1.019l6.441 14h-1.101l-1.8-3.94zm-.379-.86l-3.68-8.08-3.661 8.08h7.341zm20.221-9.2v14h-.84l-9.54-12.16v12.16h-1.02v-14h.86l9.52 12.16v-12.16h1.02zm17.889 7.06h.98v5.24c-.613.587-1.36 1.033-2.24 1.34-.867.307-1.787.46-2.76.46-1.387 0-2.64-.307-3.76-.92-1.107-.613-1.98-1.46-2.62-2.54-.627-1.08-.94-2.293-.94-3.64s.313-2.56.94-3.64c.64-1.08 1.513-1.927 2.62-2.54 1.12-.613 2.38-.92 3.78-.92 1.027 0 1.967.167 2.82.5a5.93 5.93 0 0 1 2.22 1.42l-.64.68a5.17 5.17 0 0 0-1.98-1.26c-.72-.267-1.52-.4-2.4-.4-1.2 0-2.287.267-3.26.8a5.83 5.83 0 0 0-2.26 2.22c-.547.933-.82 1.98-.82 3.14 0 1.147.273 2.193.82 3.14a6.18 6.18 0 0 0 2.28 2.22c.96.533 2.04.8 3.24.8 1.6 0 2.927-.427 3.98-1.28v-4.82z'%3E%3C/path%3E%3C/svg%3E" width="200px" align="left" alt="Fr. Kenny Ang"></mj-image>
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
        <mj-table>
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
  `);

  const mailOptions = {
    from: `noreply@${process.env.MAILGUN_DOMAIN}`,
    to: 'kvn23ang@gmail.com',
    'h:Reply-To': data.email || '',
    subject: `New form submission: ${toTitleCase(formName)} Form`,
    // text: `${Object.keys(data)
    //   .map((key) => `${key}: ${data[key]}`)
    //   .join('\n')}`,
    html: htmlOutput.html,
  };

  mg.messages().send(mailOptions, (error, body) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      console.log(body);
      res.status(200).json(body);
    }
  });
}
