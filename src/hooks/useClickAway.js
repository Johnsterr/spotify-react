import {useEffect} from 'react';

function useClickAway(ref, close, shouldPreventClosing = () => false) {
  useEffect(() => {
    function handleClickAway(event) {
      if (shouldPreventClosing(event)) return;

      if (!ref.current.contains(event.target)) close();
    }

    document.addEventListener('mousedown', handleClickAway);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });
}

export default useClickAway;