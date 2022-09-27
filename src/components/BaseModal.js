import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useEvent from "../hooks/useEvent";

function BaseModal({ onClose: handleClose }) {
  const ref = useRef();
  const contentRef = useRef();

  useEffect(() => {
    setTimeout(animate);
  });

  useEvent("keydown", handleEsc);

  function handleEsc({ key }) {
    if (key === "Escape") close();
  }

  function close() {
    animate(true);

    setTimeout(handleClose, 500);
  }

  function animate(isClosing = false) {
    ref.current.classList.toggle("opacity-0", isClosing);
    contentRef.current.classList.toggle("-translate-y-10", isClosing);
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500"
      role="dialog"
      ref={ref}
      onClick={close}
    >
      <div
        className="flex flex-col relative bg-[#333] text-white h-80 w-[480px] rounded-xl -translate-y-10 transition-transform duration-500"
        ref={contentRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
          About recommanedations
        </h1>
        <div className="py-6 px-8 overflow-y-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quis impedit cum quo provident alias commodi expedita accusantium sit
          natus autem voluptates possimus ducimus necessitatibus numquam eum,
          nostrum saepe quidem. Aspernatur, aperiam! Labore est maxime velit
          doloremque saepe eos placeat blanditiis, consequatur, voluptatem
          obcaecati dolorem et quas quaerat neque odio, dicta tempora architecto
          optio voluptatum dolorum officia aliquam voluptates accusantium quis!
          Illum eaque quibusdam sit et. Enim excepturi cum numquam deserunt
          facere sit provident debitis tenetur voluptatem quidem. Fuga dolores
          animi aliquam accusantium molestiae iure molestias, harum voluptatibus
          sunt ratione, sapiente hic architecto ipsum quasi enim? Quasi
          perspiciatis nam nihil!
        </div>
      </div>
    </div>
  );
}

export default BaseModal;