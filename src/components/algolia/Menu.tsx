import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import styled from 'styled-components';

interface Props {
  items: Array<{
    value: string;
    label: string;
    isRefined: boolean;
  }>;
  // currentRefinement: string;
  refine: Function;
  // isFromSearch: boolean;
  // searchForItems: Function;
  // createURL: Function;
  setLang?: Function;
}

const MenuStyles = styled.div`
  display: flex;
  justify-content: flex-end;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: -0.5rem -0.75rem;
  }
  li {
    margin: 0.5rem 0;

    line-height: 1;
    text-align: center;

    &:not(:last-child) {
      position: relative;
      border-right: 1px solid var(--grey);
    }

    &:hover {
      button {
        opacity: 1;
      }
    }

    &.selected {
      button {
        opacity: 1;
        font-weight: 600;
      }
    }

    button {
      opacity: 0.75;
      padding: 0 0.75rem;
      text-transform: uppercase;
      transition: opacity var(--transition);
    }
  }
`;

const Menu = ({ items, refine, setLang }: Props) => (
  <MenuStyles className="menu">
    <ul>
      {items.map((item) => (
        <li key={item.value} className={item.isRefined ? `selected` : ''}>
          <button
            type="button"
            onClick={(e) => {
              if (!item.isRefined) {
                e.preventDefault();
                refine(item.value);
                if (typeof setLang !== 'undefined') {
                  setLang(item.value);
                }
              }
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </MenuStyles>
);

export default connectMenu(Menu);
