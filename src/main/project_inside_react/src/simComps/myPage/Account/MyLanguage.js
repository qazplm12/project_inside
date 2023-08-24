import React, {useState} from 'react';
import "./Token.css";
// 가상 유저
import person from "../../commons/Person";

function MyLanguage(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    return (
        <div className={'text-start'}>
            {/* 배열풀어서 나열하기 */}
            {userInfo.personLanguage ?
                userInfo.personLanguage.split(', ').map((item, index) => {
                    return (
                        <span key={index} className={'theme-bg custom-token'} style={{cursor: 'auto'}}>{item}</span>
                    )
                })
                : <span className={'my-auto text-secondary'}><strong>주요기술 / 선호하는언어를 선택해주세요</strong></span>
            }
            <button type={'button'} onClick={() => {
                props.changeMode(false);
            }} className={'float-end px-3 theme-btn'}>주요기술 변경
            </button>
        </div>
    );
}

export default MyLanguage;