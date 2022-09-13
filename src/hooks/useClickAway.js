import { useEffect } from 'react';

function useClickAway(ref, handle, shouldHandle = () => true) {
  useEffect(() => {
    function handleMousedown(event) {
      if (shouldHandle(event) && !ref.current.contains(event.target)) handle();
    }

    document.addEventListener('mousedown', handleMousedown);

    return () => document.removeEventListener('mousedown', handleMousedown);
  });
}

export default useClickAway;