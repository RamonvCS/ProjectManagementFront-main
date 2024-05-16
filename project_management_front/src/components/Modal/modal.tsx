import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}
// Se definen los props a utilizar en el modal

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  //Si el modal isOpen es Falso no muestra nada en pantalla
  // De lo contrario renderiza el Modal con la Informacion Correspondiente (Formulario as Children)

  return (
    <>
<div className="modal" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  <div className="modal-dialog modal-lg" style={{ width: '80%', maxHeight: '80%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px' }}>
      <div className="modal-body">
        {children}
      </div>
      <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{ position: 'absolute', top: '10px', right: '10px' }}></button>
    </div>
  </div>
</div>
</>
    
  );
};

export default Modal;
