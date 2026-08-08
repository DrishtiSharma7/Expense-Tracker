import { X } from "lucide-react";

// A generic modal/popup component. I made this reusable so I could just
// wrap whatever content I want inside it (right now I only use it for the
// Add Expense form, but it could be reused for other popups too).
//
// isOpen -> boolean, whether to show the modal or not
// onClose -> function to call when the user wants to close it (X button or backdrop click)
// title -> text shown at the top of the modal
// children -> whatever content goes inside (passed between <Modal> ... </Modal> tags)

function Modal({ isOpen, onClose, title, children }) {
  // if it's not open, render nothing at all
  if (!isOpen) return null;

  return (
    // dark semi-transparent backdrop, clicking it closes the modal
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation so clicking INSIDE the modal box doesn't close it */}
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
