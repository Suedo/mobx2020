import React, { createContext, DependencyList, useContext, useEffect } from 'react';
// import { observer } from 'mobx-react';

export const createStoreContext = <T extends object>(initialAppState: T) => {
  const StoreContext = createContext<T>(initialAppState);

  const useStore = <P extends object>(mapStateToProps: (appStore: T) => P): ReturnType<typeof mapStateToProps> => {
    const store = useContext(StoreContext);
    return mapStateToProps(store);
  };

  const useStoreEffect = (effectFunction: (appStore: T) => void, deps?: DependencyList) => {
    const store = useContext(StoreContext);
    useEffect(() => {
      effectFunction(store);
    }, deps);
  };

  return {
    StoreContext,
    useStore,
    useStoreEffect,
  };
};
