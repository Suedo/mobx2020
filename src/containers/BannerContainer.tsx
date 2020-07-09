import React from 'react';
import { observer } from 'mobx-react-lite';
import { BannerComponent } from '../components/BannerComponent';
import { useStore } from '../context/context';

export const Banner = observer(() => {
  const { bugStore, complaintStore, themeStore } = useStore();

  const display = `#Bugs: ${bugStore.bugCount}, #Complaints: ${complaintStore.complaintCount}, DarkMode: ${
    themeStore.isDarkMode ? 'On' : 'Off'
  }`;

  return <BannerComponent display={display} />;
});
