import blockContent from './blockContent'
import category from './category'
import post from './post'
import format from './format'
import youtube from './youtube'
import book from './book'
import html from './html'
import {localeString, localeText, localeBlockContent} from './locale'

export const schemaTypes = [
  localeString,
  localeText,
  localeBlockContent,
  post,
  category,
  format,
  blockContent,
  youtube,
  book,
  html,
]
