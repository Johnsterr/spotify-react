import { useState, useEffect, useRef } from "react";
import useClickAway from './useClickAway';
import usePosition from "./useContextMenuPosition";

function useContextMenu(items) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const move = usePosition(ref, isOpen);

  useClickAway(ref, close, () => isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleEsc({ key }) {
      if (key === "Escape") close();
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  });

  function open(event) {
    event.preventDefault();

    move(event.clientX, event.clientY);

    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return {
    ref,
    open,
    close,
    isOpen,
    items,
  };
}

export default useContextMenu;
