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

  const mailOptions = {
    from: `noreply@${process.env.MAILGUN_DOMAIN}`,
    to: 'fatherkennyang@gmail.com',
    'h:Reply-To': data.email || '',
    subject: `New form submission: ${toTitleCase(formName)} Form`,
    text: `${Object.keys(data)
      .map((key) => `${key}: ${data[key]}`)
      .join('\n')}`,
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
