import { useEffect, useRef } from "react";

const useEffectOnce = (effect) => {
  const cleanupFunc = useRef(null);
  const renderAfterCalled = useRef(false);
  const effectCalled = useRef(false);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      cleanupFunc.current = effect();
      effectCalled.current = true;
    }

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }
      if (cleanupFunc.current) {
        cleanupFunc.current();
      }
    };
  }, [effect]);
};

export default useEffectOnce;
