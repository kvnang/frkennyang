import { titleCase } from "@/studio/plugins/productionUrl/utils";
import { CvSection } from "@/types";

export type CvListType = Awaited<ReturnType<typeof getCvList>>;

interface ExternalId {
  "external-id-type": "doi" | string;
  /** @example "10.12775/BPTh.2025.001" */
  "external-id-value": string;
  "external-id-normalized": {
    value: string;
    transient: boolean;
  };
  "external-id-normalized-error": null;
  "external-id-url": { value: string };
  "external-id-relationship": "self" | string;
}

const baseCvList: Array<CvSection> = [
  {
    title: "Education",
    items: [
      {
        title: "Doctor of Sacred Theology",
        institution: "Pontifical University of the Holy Cross",
        date: ["2022 – 2024"],
        badges: ["Summa cum laude"],
      },
      {
        title: "Licentiate in Dogmatic Theology",
        institution: "Pontifical University of the Holy Cross",
        date: ["2020 – 2022"],
        badges: ["Summa cum laude"],
      },
      {
        title: "Baccalaureate in Philosophy",
        institution: "University of Navarra",
        date: ["2013 – 2015", "2018 – 2019"],
        badges: ["Summa cum laude"],
      },
      {
        title: "Baccalaureate in Theology",
        institution: "University of Navarra",
        date: ["2015 – 2018"],
        badges: ["Summa cum laude"],
      },
      {
        title: `Piano Performance`,
        institution: "Missouri Western State University",
        date: ["2010 – 2012"],
      },
    ],
  },

  {
    title: "Academic Experience",
    items: [
      {
        title: "Teaching Assistant",
        institution: "Pontifical University of the Holy Cross",
        date: ["Since Oct 2022"],
        location: "Rome, Italy",
        active: true,
      },
      {
        title: "Lecturer",
        institution: "University of Ciputra",
        date: ["Sep 2019 – May 2020"],
        location: "Surabaya, Indonesia",
        description: `I taught Philosophy of Religion, both in English and in Bahasa Indonesia, to junior students of different majors.`,
      },
      {
        title: "Lecturer",
        institution: "Katolisitas Study Group",
        date: ["Jul 2019 – May 2020"],
        location: "Jakarta, Indonesia",
        description: `I taught St. Thomas Aquinas’ Summa Theologiae to a group of catechists.`,
      },
      {
        title: "Lecturer",
        institution: "St. John Vianney Spiritual Year Seminary",
        date: ["Aug 2018 – Jun 2020"],
        location: "Surabaya, Indonesia",
        description: `I taught Introduction to Sacred Scripture course to seminarians.`,
      },
      {
        title: "Translator",
        institution: "University of Navarra",
        date: ["Sep 2014 – Jul 2020"],
        location: "Surabaya, Indonesia",
        description: `I collaborated with some professors and the editors of Scripta Theologica journal of theology on the translation of abstracts and articles from Spanish to English, as well as on the revision thereof.`,
      },
      {
        title: "Lab Coordinator",
        institution: "Missouri Western State University",
        date: ["Mar — Dec 2011"],
        location: "Missouri, USA",
        description: `In this University's Department of English and Modern Languages, I administered placement tests for incoming freshmen, organized teaching materials for Reading 095 faculty members, and assisted the director in putting together the end-of-semester report. Finally, I composed a Reading 095 Lab Coordinator Manual for future use.`,
      },
      {
        title: "Piano Instructor",
        institution: "Concerto Music School",
        date: ["2008 – 2010"],
        location: "Jakarta, Indonesia",
        description: `I focused on providing elementary music instructions to children as well as giving private piano lessons.`,
      },
    ],
  },
  {
    title: "Pastoral Experience",
    items: [
      {
        title: "Associate Priest",
        institution: "Parish of Santo Yakobus",
        date: ["Jun 2019 – Jul 2020"],
        location: "Surabaya",
        description: `I administered the sacraments, preached, and imparted catechesis to parishioners of different age groups. I was in charge of St. John Paul II’s Chapel attached to the parish. I also regularly gave talks to a group of young married couples.`,
      },
      {
        title: "Chaplain",
        subtitle: "Pilgrimage to Holy Land",
        date: ["Oct 2029"],
        location: "Israel",
        description: `I accompanied a group of thirteen pilgrims from Indonesia. I celebrated Mass daily, gave meditations, and provided doctrinal as well as historical explanations of the places we visited.`,
      },
      {
        title: "Spiritual Director",
        institution: "St. Vincent de Paul’s Catholic Hospital’s Nursing School",
        date: ["Feb – May 2019"],
        location: "Surabaya",
        description: `I gave a series of recollections and catechesis classes to Catholic students at St. Vincent de Paul’s Catholic Hospital’s Nursing School.`,
      },
      {
        title: "Transitional Deacon",
        institution: "Cathedral of the Sacred Heart",
        location: "Surabaya",
        date: ["Sep 2018 – May 2019"],
      },
    ],
  },
  {
    title: "Volunteer Experience",
    items: [
      {
        title: "Organist",
        institution: "Clínica Universidad de Navarra",
        date: ["Sep 2016 – Jun 2018"],
        location: "Pamplona, Spain",
        description: `I helped the University of Navarra's chaplain for English-speaking students, Fr. José Alviar, organize the choir for the Mass celebrated in English on Sundays during the entire school year.`,
      },
      {
        title: "Pilgrim Guide",
        institution: "Shrine of Torreciudad",
        date: ["Jul 2017"],
        location: "Huesca, Spain",
        description: `I toured the pilgrims around the Shrine and gave them succinct historical explanations of this pilgrimage site. I also assisted the staff at the Information Service Center in attending to the needs of the visitors.`,
      },
      {
        title: "Caretaker",
        institution: "Centro de Apoio a Deficientes João Paulo II",
        date: ["Jun 2017"],
        location: "Fátima, Portugal",
        description: `I took care of those living with mental illnesses by changing their soiled bedding, feeding them, taking them out for a walk, and entertaining them.`,
      },
      {
        title: "Organist",
        institution: "Catholic Newman Center",
        date: ["2010 – 2011"],
        location: "Missouri, USA",
        description: `I selected the hymns and accompanied the assembly in Sunday Masses celebrated at Missouri Western State University’s Catholic Newman Center.`,
      },
      {
        title: "Vice President",
        institution: "Catholic Newman Center",
        date: ["2010 – 2011"],
        location: "Missouri, USA",
        description: `I assisted the Director in preparing and carrying out Missouri Western State University’s Catholic Newman Center's programs, such as summer fundraising and dinner after Sunday Mass.`,
      },
    ],
  },
  {
    title: "Languages",
    items: [
      { title: "English", badges: ["Reading", "Speaking", "Writing"] },
      { title: "Spanish", badges: ["Reading", "Speaking", "Writing"] },
      { title: "Italian", badges: ["Reading", "Speaking", "Writing"] },
      { title: "Bahasa Indonesia", badges: ["Reading", "Speaking", "Writing"] },
      { title: "Latin", badges: ["Reading"] },
      { title: "French", badges: ["Reading"] },
    ],
  },
];

export const getOrcidToken = async () => {
  const obj = {
    client_id: process.env.ORCID_CLIENT_ID,
    client_secret: process.env.ORCID_CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "/read-public",
  };
  const formData = new URLSearchParams();

  Object.keys(obj).map((key) => {
    formData.append(key, obj[key as keyof typeof obj] as string);
  });
  const authRes = await fetch("https://orcid.org/oauth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });
  return await authRes.json();
};

const getOrcidData = async () => {
  const ORCID_ID = `0000-0001-6563-8863`;

  // const tok = await getOrcidToken();
  // console.log(tok);

  const url = `https://pub.orcid.org/v3.0/${ORCID_ID}/record`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ORCID_CLIENT_ACCESS_TOKEN}`,
    },
  });
  console.log(res);
  const json = await res.json();
  return json;
};

export const getCvList = async () => {
  const data = await getOrcidData();

  const works = data["activities-summary"].works as {
    "last-modified-date": { value: number };
    group: Array<{
      "last-modified-date": { value: number };
      "external-ids": {
        "external-id": Array<ExternalId>;
      };
      "work-summary": Array<{
        "put-code": number;
        "created-date": { value: number };
        "last-modified-date": { value: number };
        source: {
          "source-orcid": null;
          "source-client-id": {
            uri: string;
            path: string;
            host: "orcid.org" | null;
          };
          "source-name": {
            value: "Crossref" | null;
          };
          "assertion-origin-orcid": null;
          "assertion-origin-client-id": null;
          "assertion-origin-name": null;
        };
        title: {
          title: {
            value: string;
          };
          subtitle: string | null;
          "translated-title": string | null;
        };
        "external-ids": {
          "external-id": Array<ExternalId>;
        };
        url: {
          value: string;
        };
        type:
          | "journal-article"
          | "magazine-article"
          | "conference-paper"
          | "conference-presentation"
          | "book"
          | "book-review"
          | null;
        "publication-date": {
          year: {
            value: string | null;
          } | null;
          month: {
            value: string | null;
          } | null;
          day: {
            value: string | null;
          } | null;
        };
        "journal-title": {
          value: string;
        };
        visibility: "public";
        path: string;
        "display-index": string;
      }>;
    }>;
  };

  const worksItem: CvSection = {
    title: "Works",
    items: works.group.map((w) => {
      const work = w["work-summary"][0];

      const pubDate = work["publication-date"];
      const ymd = `${pubDate.year?.value || new Date().getFullYear()}-${pubDate.month?.value || "01"}-${pubDate.day?.value || "01"}`;
      const date = new Date(ymd).toLocaleDateString("en-US", {
        year: "numeric",
        month: pubDate.month?.value ? "short" : undefined,
        day: pubDate.day?.value ? "numeric" : undefined,
      });

      const subtitle = work.title.subtitle || "";
      const type = work.type;
      const typeString = type?.replace(/\-/g, " ");

      return {
        title: work.title.title.value,
        subtitle: work["journal-title"].value,
        date: [date],
        link: work.url.value,
        description: subtitle,
        badges: [titleCase(typeString || "")],
      };
    }),
  };

  const worksIndex = 1;

  const cvList = [
    ...baseCvList.slice(0, worksIndex),
    worksItem,
    ...baseCvList.slice(worksIndex),
  ];

  return cvList;
};
