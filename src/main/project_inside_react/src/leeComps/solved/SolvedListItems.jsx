import React from 'react';
import CodeEditor from "./CodeEditor";

function SolvedListItems(props) {
    const getItem = props.sendItem;
    const readOnly = props.readOnly;

    return (
        <div className={'form-control mb-5 p-3'}>
            <div className={'d-flex align-items-center'}>
                <div className={'d-flex align-items-center me-auto'}>
                    <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                    <p className={'mb-0 ms-3'}>{getItem.solvedId}</p>
                </div>
                <div className={'me-2'}>
                    <p className={'mb-0'}>{getItem.solvedLanguage}</p>
                </div>
            </div>
            <CodeEditor language={getItem.solvedLanguage} code={getItem.solvedContent} readOnly={readOnly}/>
        </div>
    )
}

export default SolvedListItems;