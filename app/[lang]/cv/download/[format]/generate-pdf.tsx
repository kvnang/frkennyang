import { CV_UPDATED_AT, ORCID_ID } from "@/lib/constants";
import { getFontURL } from "@/lib/load-font";
import { CvSection } from "@/types";
import {
  renderToBuffer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 20,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
    // marginTop: 10,
    // marginBottom: 10,
    // flexGrow: 1,
  },
  mono: {
    fontFamily: "Geist Mono",
  },
});

const MyDocument = ({ data }: { data: CvSection[] }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          margin: 0,
          fontSize: 11,
          lineHeight: 1.4,
          fontFamily: "Inter",
        }}
      >
        <View style={{ ...styles.section, marginBottom: 40 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 400,
              fontFamily: "DM Serif Display",
              // textTransform: "uppercase",
            }}
          >
            {/* Curriculum Vitæ */}
            Kenny Ang
          </Text>
        </View>
        {/* <View style={{ ...styles.section }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              fontFamily: "DM Serif Display",
            }}
          >
            Kenny Ang
          </Text>
        </View> */}
        <View
          style={{
            ...styles.section,
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <View>
              <Text style={{ fontWeight: 600 }}>
                Pontifical University of the Holy Cross
              </Text>
              <Text>Via dei Farnesi 83, Rome 00186, Italy</Text>
            </View>
            <View>
              <Text>k.ang@pusc.it</Text>
              <Text>
                <Link
                  href="https://www.fatherkenny.com"
                  style={{ color: "#444" }}
                >
                  www.fatherkenny.com
                </Link>
              </Text>
              <Text>
                ORCID <Text style={{ ...styles.mono }}>{ORCID_ID}</Text>
              </Text>
            </View>
          </View>
          {/* <View style={{ width: 120, height: 120 }}>
            <Image
              src="https://fatherkenny.com/logo.jpg"
              style={{ width: 120, height: 120 }}
            />
          </View> */}
        </View>
        {data.map((section) => (
          <View style={{ ...styles.section }} key={section.title}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: "DM Serif Display",
              }}
            >
              {section.title}
            </Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {section.items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                  wrap={false}
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <Text style={{ fontWeight: 600, marginBottom: -2 }}>
                      {item.title}
                    </Text>
                    {item.badges?.length ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                        }}
                      >
                        {item.badges.map((badge) => (
                          <View
                            key={badge}
                            style={{
                              fontSize: 9,
                              backgroundColor: "#f3f3f3",
                              color: "#666",
                              lineHeight: 1.25,
                              paddingVertical: 2,
                              paddingHorizontal: 4,
                            }}
                          >
                            <Text>{badge}</Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                    {item.location || item.institution ? (
                      <View>
                        <Text style={{ fontSize: 9 }}>
                          {[item.institution, item.location]
                            .filter(Boolean)
                            .join(" / ")}
                        </Text>
                      </View>
                    ) : null}
                    {item.subtitle ? (
                      <View>
                        <Text style={{ fontSize: 9, fontStyle: "italic" }}>
                          {item.subtitle}
                        </Text>
                      </View>
                    ) : null}
                    {item.link ? (
                      <View>
                        <Text style={{ fontSize: 9, marginTop: -4 }}>
                          <Link href={item.link} style={{ color: "#444" }}>
                            {new URL(item.link).hostname}
                          </Link>
                        </Text>
                      </View>
                    ) : null}
                    {item.description ? (
                      <View>
                        <Text style={{ fontSize: 9, color: "#666" }}>
                          {item.description}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  {item.date ? (
                    <View style={{ paddingTop: 1, paddingBottom: 1 }}>
                      <Text style={{ ...styles.mono, fontSize: 9 }}>
                        {item.date.map((d) => d).join(", ")}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ))}
        <Colophon />
      </Page>
    </Document>
  );
};

function Colophon() {
  return (
    <View
      style={{
        ...styles.section,
        position: "absolute",
        bottom: 0,
        left: 0,
        paddingVertical: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      fixed
    >
      <Text
        style={{
          fontSize: 7,
          color: "#666",
          textTransform: "uppercase",
          ...styles.mono,
        }}
      >
        Kenny Ang / Curriculum Vitæ
      </Text>
      <Text
        style={{
          fontSize: 7,
          color: "#666",
          textTransform: "uppercase",
          ...styles.mono,
        }}
      >
        Updated{" "}
        {new Date(`${CV_UPDATED_AT}T12:00:00Z`).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        })}
      </Text>
    </View>
  );
}

export async function generatePdf({ data }: { data: CvSection[] }) {
  Font.register({
    family: "Inter",
    fonts: [
      { src: await getFontURL({ family: "Inter", weight: 400 }) },
      {
        src: await getFontURL({ family: "Inter", weight: 400 }),
        fontStyle: "italic",
      },
      {
        src: await getFontURL({ family: "Inter", weight: 600 }),
        fontWeight: 600,
      },
    ],
  });
  Font.register({
    family: "Geist Mono",
    fonts: [{ src: await getFontURL({ family: "Geist Mono", weight: 400 }) }],
  });
  Font.register({
    family: "DM Serif Display",
    fonts: [
      { src: await getFontURL({ family: "DM Serif Display", weight: 400 }) },
    ],
  });

  const buffer = await renderToBuffer(<MyDocument data={data} />);
  return buffer;
}
