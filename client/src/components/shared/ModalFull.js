import React from 'react';

const ModalFull = (props) => {
    const { closeFunction } = props;

    return ( 
        <div className="modal-full" >
            <div className="modal-full-content">
            <button onClick={closeFunction}>x</button>
                {props.children}
            </div>
        </div>
     );
}
 
export default ModalFull;