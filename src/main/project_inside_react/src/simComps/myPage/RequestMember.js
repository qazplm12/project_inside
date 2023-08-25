import React, {useEffect, useState} from 'react';
import axios from "axios";

function RequestMember(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));
    const [memberInfo, setMemberInfo] = useState(props.memberInfo);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setMemberInfo(props.memberInfo)
    }, [])

    const formData = new FormData();
    formData.append("matchingIdx", props.matchingIdx);
    formData.append("alarmToPerson", memberInfo.personNickName);
    formData.append("alarmContent", props.projectInfo.projectTitle);
    formData.append("alarmFromPerson", userInfo.personNickName);
    formData.append("alarmContentIdx", props.projectInfo.projectIdx);


    const accept = () => {
        formData.append("alarmFrom", "projectAcc");
        axios.post('http://localhost:8080/simServer/memberAccept', formData)
            .then(response => {
                alert('수락되었습니다.');
                props.fetchUpdateData();
            })
            .catch((error) => {
            });
    };

    const reject = () => {
        formData.append("alarmFrom", "projectRej");
        axios.post('http://localhost:8080/simServer/memberReject', formData)
            .then(response => {
                alert('거부되었습니다.');
                props.fetchUpdateData();
            })
            .catch((error) => {
            });
    };

    return (
        <div className={'p-3 shadow mb-3'}>
            <div className={'row pe-5'}>
                <div className={'col-3'}>
                    <img
                        src={memberInfo.personImgPath === null ? "/images/ProfileImg.png" : `/images/profileImg/${memberInfo.personImgPath}`}
                        alt="" className={'circle-background'} style={{width: '5vw', height: '10vh'}}/>
                </div>
                <div className={'col ms-2 mt-2'}>
                    <div className={'m-0'}><h5 className={'d-inline'}>{memberInfo ? memberInfo.personNickName : ""}</h5>
                        <small><span>(Lv.{memberInfo ? memberInfo.personLevel : ""})</span></small>
                    </div>
                    <p className={'mt-2 mb-0 theme-font'}><small><strong>보유 기술</strong></small></p>
                    {memberInfo.personLanguage ?
                        memberInfo.personLanguage.split(', ').map((item, index) => {
                            return (
                                <span key={item + index} className={'theme-bg custom-token'}
                                      style={{cursor: 'auto'}}>{item}</span>
                            )
                        })
                        : ""
                    }
                </div>
            </div>
            <div className={'d-flex justify-content-end mt-2'}>
                <button className={'theme-outline-btn me-2'} onClick={reject}>거부</button>
                <button className={'theme-btn'} onClick={accept}>수락</button>
            </div>
        </div>
    )
}

export default RequestMember;