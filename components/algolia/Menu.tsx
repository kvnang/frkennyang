import React, { useContext } from 'react';
import { MenuProps, useMenu } from 'react-instantsearch-hooks-web';
import { LangContext } from '@/components/LangContext';

function Menu(props: MenuProps) {
  const { refine, items } = useMenu(props);
  const { setLang } = useContext(LangContext);
  return (
    <div className="search-filter__menu__inner">
      <ul>
        {items.map((item) => (
          <li key={item.value} className={item.isRefined ? `selected` : ''}>
            <button
              type="button"
              onClick={(e) => {
                if (!item.isRefined) {
                  e.preventDefault();
                  refine(item.value);
                  setLang(item.value);
                }
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
