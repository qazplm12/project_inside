import React from 'react';
import "./Token.css";
// 가상 유저
import person from "../../commons/Person";

function MyLanguage(props) {

    return (
        <div className={'text-start'}>
            {/* 배열풀어서 나열하기 */}
            {person.language.split(', ').map((item, index) => {
                return(
                    <span key={index} className={'theme-bg custom-token'} style={{cursor : 'auto'}}>{item}</span>

                )
            })}
            <button type={'button'} onClick={() => {
                props.changeMode(false);
            }} className={'float-end px-3 theme-btn'}>주요기술 변경
            </button>
        </div>
    );
}

export default MyLanguage;