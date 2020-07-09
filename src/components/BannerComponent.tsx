import React, { FunctionComponent } from 'react';

interface BannerPropsI {
  display: string;
}

export const BannerComponent: FunctionComponent<BannerPropsI> = ({ display }) => {
  return <h2>{display}</h2>;
};
