import React from 'react';
import { observer } from 'mobx-react-lite';
import { HeaderComponent } from '../components/HeaderComponent';
import { useStore } from '../context/context';

export const AppHeader = observer(() => {
  return <HeaderComponent brand="MobX2020" />;
});

// https://stackoverflow.com/a/60569430/2715083
