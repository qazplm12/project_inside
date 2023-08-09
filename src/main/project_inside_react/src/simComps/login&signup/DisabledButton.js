import React, {useState} from 'react';

function DisabledButton(props) {
    const [disabled, setDisabled] = useState(true);

    return (
        <>
            {props.disabled
                ? <button type={'submit'} className={'theme-btn-disabled py-2'} disabled='disabled'>{props.btnText}</button>
                : <button type={'submit'} className={'theme-btn py-2'}>{props.btnText}</button>
            }
        </>
    )
}

export default DisabledButton;