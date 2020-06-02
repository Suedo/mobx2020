import React, { FunctionComponent } from 'react';
import { useStore } from '../context/context';
import { Observer } from 'mobx-react-lite';

interface TogglePropsI {}

export const ToggleComponent: FunctionComponent<TogglePropsI> = (props) => {
  const { themeStore } = useStore();

  // Ideally a component should not need to deal with stores and observers. That's container's job
  // but it's a small project and just going with it
  return (
    <Observer>
      {() => (
        <>
          <input
            type="checkbox"
            id="darkmodetoggle"
            onChange={() => {
              console.log('changing darkmode from present value:' + themeStore.isDarkMode);
              themeStore.toggleDarkMode();
            }}
          />
          <label htmlFor="darkmodetoggle">{themeStore.isDarkMode ? 'Lumos' : 'Nox'}</label>
        </>
      )}
    </Observer>
  );
};

/*
A simple HTML+CSS toggle: https://codepen.io/liamj/pen/QYyBzz
*/
