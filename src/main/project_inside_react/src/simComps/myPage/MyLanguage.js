import React from 'react';

function MyLanguage(props) {

    return (
        <>
            내 주요기술 리스트 출력
            <button type={'button'} onClick={() => {
                props.changeMode(false);
            }} className={'float-end px-3 theme-btn'}>주요기술 변경</button>
        </>
    )
}

export default MyLanguage;