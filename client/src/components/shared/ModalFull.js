import React from 'react';

const ModalFull = (props) => {
    const { setDialogIsOpen } = props;

    return ( 
        <dialog className="modal-full" open>
            <div className="modal-full-content">
            <button onClick={() => {setDialogIsOpen(false)}}>x</button>
                {props.children}
            </div>
        </dialog>
     );
}
 
export default ModalFull;