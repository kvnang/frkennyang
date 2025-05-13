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
    backgroundColor: "",
    fontSize: 11,
    lineHeight: 1.4,
    gap: 20,
    fontFamily: "Inter",
  },
  section: {
    width: "100%",
    // marginTop: 10,
    // marginBottom: 10,
    // flexGrow: 1,
  },
});

const MyDocument = ({ data }: { data: CvSection[] }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <View style={styles.page}>
          <View style={{ ...styles.section, marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>
              CURRICULUM VITÆ
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Kenny Ang</Text>
          </View>
          <View style={{ ...styles.section }}>
            <Text>Pontifical University of the Holy Cross</Text>
            <Text>Via dei Farnesi 83, Rome 00186, Italy</Text>
            <Text>k.ang@pusc.it</Text>
            <Text>www.fatherkenny.com</Text>
            <Text>ORCID Record</Text>
          </View>
          {data.map((section) => (
            <View style={styles.section} key={section.title}>
              <Text
                style={{
                  marginBottom: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {section.title}
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {section.items.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.section,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 6,
                    }}
                    wrap
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
                                backgroundColor: "#e3e3e3",
                                lineHeight: 1.125,
                                paddingTop: 2,
                                paddingBottom: 2,
                                paddingRight: 4,
                                paddingLeft: 4,
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
                            <Link href={item.link} style={{ color: "#666" }}>
                              {new URL(item.link).hostname}
                            </Link>
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    {item.date ? (
                      <View style={{ paddingTop: 2, paddingBottom: 2 }}>
                        <Text style={{ fontFamily: "Geist Mono", fontSize: 9 }}>
                          {item.date.map((d) => d).join(", ")}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

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

  const buffer = await renderToBuffer(<MyDocument data={data} />);
  return buffer;
}
