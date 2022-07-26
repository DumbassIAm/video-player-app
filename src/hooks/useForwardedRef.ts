import { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

const useForwardedRef = <T,>(ref: ForwardedRef<T>): MutableRefObject<T | null> => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}

export default useForwardedRef;