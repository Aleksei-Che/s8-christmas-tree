interface ModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white relative rounded-lg shadow-lg w-1/3 p-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
    )
}

export default Modal;