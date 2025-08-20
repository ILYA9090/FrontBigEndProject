import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type SpringType = typeof import('@react-spring/web');
export type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayolad {
  Spring?: SpringType;
  Gesture?: GestureType;
  isLoaded?: boolean;
}

type Children = {
  children: ReactNode;
};

const AnimationContext = createContext<AnimationContextPayolad>({});

const getAsyncAnimationModules = () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

export const useAnimationLibs = () =>
  useContext(AnimationContext) as Required<AnimationContextPayolad>;

export const AnimationProvider = ({ children }: Children) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);
  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded]
  );

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
