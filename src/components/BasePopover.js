import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import useClickAway from '../hooks/useClickAway';
import usePosition from "../hooks/usePopoverPosition.js";
import BaseButton from "./BaseButton.js";
import BasePopoverTriangle from "./BasePopoverTriangle.js";

function BasePopover(_, ref) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const nodeRef = useRef();
  const { move, target, setTarget, isSmallScreen } = usePosition(nodeRef, hide);
  const [classes, setClasses] = useState(getHiddenClasses);

  useClickAway(nodeRef, hide, shouldHide);

  function shouldHide(event) {
    return !target?.parentNode.contains(event.target);
  }

  useImperativeHandle(ref, () => ({ show }));

  function show(title, description, nextTarget, offset) {
    if (target === nextTarget) return;

    move(nextTarget, offset);
    setTitle(title);
    setDescription(description);
    setClasses("");
  }

  function hide() {
    setTarget(null);
    setClasses(getHiddenClasses);
  }

  function getHiddenClasses() {
    const translateClass = isSmallScreen ? "translate-y-1" : "translate-x-1";

    return `opacity-0 ${translateClass} pointer-events-none`;
  }

  return (
    <div
      className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none transition duration-300 ${classes}`}
      ref={nodeRef}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-xs">{description}</p>
      <div className="mt-6 text-right">
        <BaseButton onClick={hide}>Not now</BaseButton>
        <BaseButton primary>Log in</BaseButton>
      </div>
      <BasePopoverTriangle side={isSmallScreen ? "top" : "left"} />
    </div>
  );
}

export default forwardRef(BasePopover);
