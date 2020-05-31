import React, { ComponentType, createContext, DependencyList, useContext, useEffect } from 'react';
// import { observer } from 'mobx-react';

export type Connected<P, IK extends keyof P, A = {}> = A & Omit<P, IK>;
type MapStateToProps<T, W, I extends keyof W, A = {}> = (appStore: T, componentProps: Connected<W, I, A>) => Pick<W, I>;

export const createStoreContext = <T extends object>(initialAppState: T) => {
  const StoreContext = createContext<T>(initialAppState);
  const useStore = <P extends object>(mapStateToProps: (appStore: T) => P): ReturnType<typeof mapStateToProps> => {
    const store = useContext(StoreContext);

    return mapStateToProps(store);
  };

  const useStoreEffect = (func: (appStore: T) => void, deps?: DependencyList) => {
    const store = useContext(StoreContext);
    useEffect(() => {
      func(store);
    }, deps);
  };

  // const connect = <W, I extends keyof W, A = {}>(
  //   WrappedComponent: ComponentType<W>,
  //   mapStateToProps: MapStateToProps<T, W, I, A>,
  //   displayName?: any,
  // ): ComponentType<Connected<W, I, A>> => {
  //   const ObservedComponent = observer(WrappedComponent);
  //   const Component: ComponentType<Connected<W, I, A>> = (props) => {
  //     const injectedProps = useStore((appStore: T) => mapStateToProps(appStore, props));

  //     // @ts-ignore - address issue with subtyping on W
  //     return <ObservedComponent {...props} {...injectedProps} />;
  //   };

  //   // commenting out because it requires typescript 3.7+
  //   Component.displayName =
  //     displayName ?? `Connected(${ObservedComponent.displayName ?? ObservedComponent.name ?? 'Component'})`;

  //   return observer(Component);
  // };

  return {
    StoreContext,
    useStore,
    useStoreEffect,
  };
};
