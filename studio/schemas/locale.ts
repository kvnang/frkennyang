import { FieldsetDefinition } from "@sanity/types";

const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "id", title: "Bahasa Indonesia" },
];

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

const fieldsets: Array<FieldsetDefinition> = [
  {
    title: "Translations",
    name: "translations",
    options: {
      collapsible: true,
      collapsed: true,
    },
  },
];

const getFields = (type: string) =>
  supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type,
    fieldset: lang.isDefault ? undefined : "translations",
  }));

const localeString = {
  title: "Localized string",
  name: "localeString",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields("string"),
};

const localeText = {
  title: "Localized text",
  name: "localeText",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields("text"),
};

const localeBlockContent = {
  title: "Localized block content",
  name: "localeBlockContent",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields("blockContent"),
};

const localeBlockContentSimple = {
  title: "Localized block content (simple)",
  name: "localeBlockContentSimple",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields("blockContentSimple"),
};

export {
  localeString,
  localeText,
  localeBlockContent,
  localeBlockContentSimple,
  baseLanguage,
};
