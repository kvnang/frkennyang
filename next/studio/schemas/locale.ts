const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'id', title: 'Bahasa Indonesia'},
]

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

const fieldsets = [
  {
    title: 'Translations',
    name: 'translations',
    options: {collapsible: true},
  },
]

const getFields = (type: string) =>
  supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type,
    fieldset: lang.isDefault ? null : 'translations',
  }))

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields('string'),
}

const localeText = {
  title: 'Localized text',
  name: 'localeText',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields('text'),
}

const localeBlockContent = {
  title: 'Localized block content',
  name: 'localeBlockContent',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets,
  // Dynamically define one field per language
  fields: getFields('blockContent'),
}

export {localeString, localeText, localeBlockContent, baseLanguage}
