import { useState, useEffect, useRef } from "react";
import BaseModal from "./components/BaseModal";
import BaseToast from "./components/BaseToast";
import BasePopover from "./components/BasePopover";
import TheSidebar from "./components/TheSidebar";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";

function App() {
  const [isModalOpen, setIsModalOpen] = useState();
  const contentWrapperRef = useRef();
  const popoverRef = useRef();
  const toastRef = useRef();

  let isScrollingEnabled = true;

  useEffect(() => {
    const contentWrapper = contentWrapperRef.current;

    contentWrapper.addEventListener("wheel", handleScrolling);

    return () => contentWrapper.removeEventListener("wheel", handleScrolling);
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function showPopover(title, description, target, offset) {
    popoverRef.current.show(title, description, target, offset);
  }

  function showToast(message) {
    toastRef.current.show(message);
  }

  function toggleScrolling(isEnabled) {
    isScrollingEnabled = isEnabled;
  }

  function handleScrolling(event) {
    if (isScrollingEnabled) return;

    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <>
      <div className="flex grow overflow-auto">
        <TheSidebar showPopover={showPopover} />
        <TheSidebarOverlay />
        <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
          <TheHeader />
          <TheMain
            showToast={showToast}
            openModal={openModal}
            toggleScrolling={toggleScrolling}
          />
        </div>
      </div>
      <TheRegistration />
      <BaseToast ref={toastRef} />
      <BasePopover ref={popoverRef} />
      {isModalOpen && <BaseModal onClose={closeModal} />}
    </>
  );
}

export default App;
