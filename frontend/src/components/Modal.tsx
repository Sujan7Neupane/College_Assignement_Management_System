import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>

        <div className="py-4">{children}</div>
      </div>

      {/* for outside close on click */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
