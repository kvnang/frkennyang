import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

export async function generateDocx() {
  // // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // // This simple example will only contain one section
  // const doc = new Document({
  //   sections: [
  //     {
  //       properties: {},
  //       children: [
  //         new Paragraph({
  //           children: [
  //             new TextRun("Hello World"),
  //             new TextRun({
  //               text: "Foo Bar",
  //               bold: true,
  //             }),
  //             new TextRun({
  //               text: "\tGithub is the best",
  //               bold: true,
  //             }),
  //           ],
  //         }),
  //       ],
  //     },
  //   ],
  // });
  //

  // Create a new document
  const doc = new Document({
    title: "Kenny Ang - Curriculum Vitae",
    description: "CV generated with docx.js",
    styles: {
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 28,
            bold: true,
            color: "000000",
            font: "Calibri",
          },
          paragraph: {
            spacing: {
              after: 120,
            },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 24,
            bold: true,
            color: "000000",
            font: "Calibri",
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
        {
          id: "SectionTitle",
          name: "Section Title",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 24,
            bold: true,
            color: "000000",
            font: "Calibri",
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
      ],
    },

    sections: [
      {
        children: [
          new Paragraph({
            text: "CURRICULUM VITÆ",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.LEFT,
          }),

          // Name
          new Paragraph({
            text: "Kenny Ang",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,
          }),

          // Contact Information
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun("Pontifical University of the Holy Cross")],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun("Via dei Farnesi 83, Rome 00186, Italy")],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun("k.ang@pusc.it")],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun("www.fatherkenny.com")],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun("ORCID Record")],
          }),

          // Education Section
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),

          // 2022-2024
          new Paragraph({
            children: [
              new TextRun({
                text: "2022–2024",
                bold: true,
              }),
              new TextRun({
                text: "Doctor of Sacred Theology",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Pontifical University of the Holy Cross, "),
              new TextRun({
                text: "9.8 gpa/10 (summa cum laude)",
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Title: ",
                italics: true,
              }),
              new TextRun(
                "Aquinas and the Biblical Grounds of the Doctrine of Creation: An Analysis of Thomas Aquinas's Creation Theology in the Light of His References to Scripture",
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Supervisor: ",
                italics: true,
              }),
              new TextRun("Paul O'Callaghan"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Internal Censors: ",
                italics: true,
              }),
              new TextRun("Philip Goyret; Catalina Vial de Amesti"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "External Censor: ",
                italics: true,
              }),
              new TextRun("Mariusz Tabaczek, OP"),
            ],
          }),

          // 2020-2022
          new Paragraph({
            children: [
              new TextRun({
                text: "2020–2022",
                bold: true,
              }),
              new TextRun({
                text: "Licentiate of Sacred Theology",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Pontifical University of the Holy Cross, "),
              new TextRun({
                text: "9.8 gpa/10",
                italics: true,
              }),
            ],
          }),

          // 2015-2018
          new Paragraph({
            children: [
              new TextRun({
                text: "2015–2018",
                bold: true,
              }),
              new TextRun({
                text: "Bachelor of Sacred Theology",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("University of Navarra, "),
              new TextRun({
                text: "9.85 gpa/10",
                italics: true,
              }),
            ],
          }),

          // 2013-2015
          new Paragraph({
            children: [
              new TextRun({
                text: "2013–2015",
                bold: true,
              }),
              new TextRun({
                text: "Bachelor of Philosophy",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("University of Navarra, "),
              new TextRun({
                text: "9.87 gpa/10",
                italics: true,
              }),
            ],
          }),

          // 2010-2012
          new Paragraph({
            children: [
              new TextRun({
                text: "2010–2012",
                bold: true,
              }),
              new TextRun({
                text: "Music Performance",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Missouri Western State University, "),
              new TextRun({
                text: "4.0 gpa/4",
                italics: true,
              }),
            ],
          }),

          // Professional Appointments
          new Paragraph({
            text: "Professional Appointments",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),

          // 2024-present
          new Paragraph({
            children: [
              new TextRun({
                text: "2024–present",
                bold: true,
              }),
              new TextRun({
                text: "Research Professor",
                bold: true,
              }),
            ],
          }),
          new Paragraph("Department of Dogmatic Theology"),
          new Paragraph("Pontifical University of the Holy Cross"),

          // 2022-2024
          new Paragraph({
            children: [
              new TextRun({
                text: "2022–2024",
                bold: true,
              }),
              new TextRun({
                text: "Teaching Assistant",
                bold: true,
              }),
            ],
          }),
          new Paragraph("Department of Dogmatic Theology"),
          new Paragraph("Pontifical University of the Holy Cross"),

          // 2019-2020
          new Paragraph({
            children: [
              new TextRun({
                text: "2019–2020",
                bold: true,
              }),
              new TextRun({
                text: "Lecturer in Religion",
                bold: true,
              }),
            ],
          }),
          new Paragraph("University of Ciputra (Surabaya, Indonesia)"),

          // 2018-2020
          new Paragraph({
            children: [
              new TextRun({
                text: "2018–2020",
                bold: true,
              }),
              new TextRun({
                text: "Lecturer in Introduction to Sacred Scripture",
                bold: true,
              }),
            ],
          }),
          new Paragraph("St. John Vianney Seminary (Surabaya, Indonesia)"),

          // Research Interests
          new Paragraph({
            text: "Research Interests",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),
          new Paragraph(
            "Thomas Aquinas; Biblical Thomism; Peter Lombard; Metaphysics; Medieval Thought; relationship between the Trinity and creation",
          ),

          // University Courses
          new Paragraph({
            text: "University Courses",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),

          // 2024-2025
          new Paragraph({
            children: [
              new TextRun({
                text: "2024–2025",
                bold: true,
              }),
              new TextRun({
                text: "Il mistero di Dio Uno e Trino I",
                italics: true,
              }),
            ],
          }),
          new Paragraph("Baccalaureate in Sacred Theology"),
          new Paragraph("Pontifical University of the Holy Cross"),

          new Paragraph({
            children: [
              new TextRun({
                text: "Trinità e creazione in San Tommaso",
                italics: true,
              }),
              new TextRun(" (Syllabus)"),
            ],
          }),
          new Paragraph("Licentiate in Sacred Theology"),
          new Paragraph("Pontifical University of the Holy Cross"),

          // Books
          new Paragraph({
            text: "Books",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),

          // 2024
          new Paragraph({
            children: [
              new TextRun({
                text: "2024",
                bold: true,
              }),
              new TextRun({
                text: "Aquinas and the Biblical Grounds of the Doctrine of Creation: An Analysis of Thomas Aquinas's Creation Theology in the Light of his References to Scripture",
                italics: true,
              }),
            ],
          }),
          new Paragraph(
            "(Rome: Edizioni Santa Croce, 2024), https://www.researchgate.net/publication/381397077AquinasandtheBiblicalGroundsoftheDoctrineofCreationAnAnalysisofThomasAquinas'sCreationTheologyintheLightofHisReferencestoScripture.",
          ),

          new Paragraph({
            children: [
              new TextRun("Review by Piotr Roszak in "),
              new TextRun({
                text: "Studia Gdańskie",
                italics: true,
              }),
              new TextRun(
                " 54, no. 2 (2024): 148–150, https://doi.org/10.26142/stgd-2024-011 [Unofficial English Translation].",
              ),
            ],
          }),

          // Peer-reviewed Articles
          new Paragraph({
            text: "Peer-reviewed Articles",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),

          // 2025
          new Paragraph({
            children: [
              new TextRun({
                text: "2025",
                bold: true,
              }),
            ],
          }),
          new Paragraph(
            '"Magisterium AI in Theological Inquiry and Evangelization: Challenges and Prospects" (under review).',
          ),
          new Paragraph({
            children: [
              new TextRun(
                "\"Christ as Creator in Aquinas's and Bonaventure's Gospel Commentaries: Continuities and Variations,\" ",
              ),
              new TextRun({
                text: "Nova et Vetera",
                italics: true,
              }),
              new TextRun(" (forthcoming)."),
            ],
          }),

          // Continue with more sections...
          // For brevity, I'm showing a subset of the full CV
        ],
      },
    ],
  });

  // Generate the document
  // const buffer = await doc.save();
  console.log("Document created successfully!");

  // In a real environment, you would save the file
  // writeFileSync("kenny-ang-cv.docx", buffer);

  console.log(
    "Document contains education, professional appointments, research interests, and more sections",
  );
  console.log(
    "To save this document, you would use: writeFileSync('kenny-ang-cv.docx', buffer);",
  );

  // Used to export the file into a .docx file
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
