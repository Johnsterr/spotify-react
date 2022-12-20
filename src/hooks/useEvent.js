import { useEffect } from "react";

function useEvent(name, handler, shouldHandle = () => true, target = document) {
  useEffect(() => {
    if (!shouldHandle()) return;

    target = target instanceof Function ? target() : target;

    target.addEventListener(name, handler);

    return () => target.removeEventListener(name, handler);
  });
}

export default useEvent;