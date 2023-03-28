
import { useEffect } from "react";

//вызвать обработчик по клику вне блока
export function сlickOutside(ref, handler) {
  useEffect(() => {
    const listener = (evt) => {
      if (!ref.current || ref.current.contains(evt.target)) {
        return;
      }
      handler(evt);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
