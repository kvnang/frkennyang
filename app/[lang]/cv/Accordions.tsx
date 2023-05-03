'use client';

import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemHead,
} from '@/components/Accordions';
import { cvList } from './cvList';

export function Accordions() {
  return (
    <>
      {cvList.map((cvGroup, j) => (
        <Accordion key={`accordion-${j}`}>
          <AccordionItem key={`accordion-cv-${j}`} id={cvGroup.title}>
            <AccordionItemHead>
              <h3 className="text-lg font-serif">{cvGroup.title}</h3>
            </AccordionItemHead>
            <AccordionItemBody>
              <ul>
                {cvGroup.items.map((cvItem, k) => {
                  const title = 'title' in cvItem ? cvItem.title : '';
                  const subtitle = 'subtitle' in cvItem ? cvItem.subtitle : '';
                  const meta = 'meta' in cvItem ? cvItem.meta : '';
                  const description =
                    'description' in cvItem ? cvItem.description : '';

                  return (
                    <li key={`accordion-cv-li-${k}`} className="mb-6 last:mb-0">
                      {(title || subtitle) && (
                        <h4 className="mb-1.5 font-semibold">
                          {title}
                          {title && subtitle ? (
                            <span className="font-normal"> / {subtitle}</span>
                          ) : null}
                          {!title && subtitle ? (
                            <span className="font-normal">{subtitle}</span>
                          ) : null}
                        </h4>
                      )}
                      {meta && <h6 className="opacity-80">{meta}</h6>}
                      {description && /\S/.test(description) && (
                        <div className="prose prose-white mt-2">
                          <p className="text-sm">{description}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}
