import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
/**
 * A modal component that can be used to display any content.
 * @param {string} heading - The heading for the modal.
 * @param {boolean} modalOpen - Whether the modal should be open or closed.
 * @param {function} closeModal - A function to be called when the modal is closed.
 * @param {ReactNode} children - The content for the modal.
 */
const Modal = ({ heading, modalOpen, closeModal, children }) => {
  const modalRef = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      event.stopImmediatePropagation();
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    },
    [closeModal]
  );
  useEffect(() => {
    if (modalOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, modalOpen]);
  return (
    <>
      {modalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-gray-950/50"></div>
          <div
            id="default-modal"
            tabIndex="-1"
            // aria-hidden={!modalOpen}
            // inert={!modalOpen ? "true" : "false"}
            className="fixed bottom-0 right-0 top-0 z-50 h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-white md:w-2/3 lg:w-1/2"
          >
            <div className="relative h-full max-h-full w-full p-4">
              <div className="relative">
                <div className="sticky top-0 z-50 flex items-center justify-between rounded-t border-b bg-white p-4 dark:border-gray-600 md:p-5">
                  <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-white">
                    {heading}
                  </h3>
                  <button
                    type="button"
                    className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={closeModal}
                  >
                    <X />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="relative min-h-screen p-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
