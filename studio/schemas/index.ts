import blockContent from "./blockContent";
import blockContentSimple from "./blockContentSimple";
import category from "./category";
import post from "./post";
import format from "./format";
import youtube from "./youtube";
import book from "./book";
import html from "./html";
import cv from "./cv";
import {
  localeString,
  localeText,
  localeBlockContent,
  localeBlockContentSimple,
} from "./locale";

export const schemaTypes = [
  localeString,
  localeText,
  localeBlockContent,
  localeBlockContentSimple,
  post,
  cv,
  category,
  format,
  blockContent,
  blockContentSimple,
  youtube,
  book,
  html,
];
