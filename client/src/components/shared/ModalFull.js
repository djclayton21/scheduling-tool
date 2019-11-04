import React from 'react';

const ModalFull = ({ children, closeFunction }) => {
    
    return ( 
        <div className="modal-full" >
            <div className="modal-full-content">
            <button onClick={closeFunction}>x</button>
                {children}
            </div>
        </div>
     );
}
 
export default ModalFull;