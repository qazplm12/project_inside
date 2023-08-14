import React, {useState} from 'react';

function DisabledButton(props) {
    const [disabled, setDisabled] = useState(true);

    return (
        <>
            {props.disabled
                ? <button type={'button'} className={`theme-btn-disabled ${props.classAppend}`} disabled='disabled' onClick={props.onClick}>{props.btnText}</button>
                : <button type={'button'} className={`theme-btn ${props.classAppend}`} onClick={props.onClick}>{props.btnText}</button>
            }
        </>
    )
}

export default DisabledButton;