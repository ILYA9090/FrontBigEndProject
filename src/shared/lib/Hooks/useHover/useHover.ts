import { useCallback, useMemo, useState } from 'react';

interface UseHoverFn {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHover = [boolean, UseHoverFn];

export const useHover = (): UseHover => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);
  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave]
  );
};
