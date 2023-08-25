import React, {useEffect, useState} from 'react';
import axios from "axios";

function RequestMember(props) {

    const [memberInfo, setMemberInfo] = useState(props.memberInfo);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setMemberInfo(props.memberInfo)
    }, [])

    const accept = () => {
        axios.post('http://localhost:8080/simServer/memberAccept', null, {
            params: {
                matchingIdx : props.matchingIdx
            }
        })
            .then(response => {
                alert('수락되었습니다.');
                props.setHidden(true);
            })
            .catch((error) => {
            });
    };

    const reject = () => {
        axios.post('http://localhost:8080/simServer/memberReject', null, {
            params: {
                matchingIdx : props.matchingIdx
            }
        })
            .then(response => {
                alert('거부되었습니다.');
                props.setHidden(true);
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