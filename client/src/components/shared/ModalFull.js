import React from 'react';
import './modal-full.css'

const ModalFull = ({ children, closeFunction }) => {
    
    return ( 
        <div className="modal-full" >
            <div className="modal-full-content">
            <button className="modal-close-button"onClick={closeFunction}><i class="fas fa-window-close"></i></button>
                {children}
            </div>
        </div>
     );
}
 
export default ModalFull;