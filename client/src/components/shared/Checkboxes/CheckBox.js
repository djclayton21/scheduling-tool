import React from 'react';

const CheckBox = (props) => {
    const { name, isChecked, handleChange } = props;
    return (
            <label className="checkbox-label">
                <input type="checkbox" name={name} checked={isChecked} onChange={handleChange} />
            {name}</label>
    );
}
 
export default CheckBox;