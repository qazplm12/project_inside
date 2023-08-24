import React, {useEffect, useState} from 'react';

function RequestMember(props) {

    const [memberInfo, setMemberInfo] = useState({});

    useEffect(() =>{
        setMemberInfo(props.memberInfo)
    }, [])

    const accept = () => {

    };

    const reject = () => {

    };

    return (
        <div className={'p-3 shadow mb-3'}>
            <div className={'row pe-5'}>
                <div className={'col-3'}>
                    <img src={'/images/profile.jpg'} alt="" className={'circle-background'}
                         style={{width: '3vw', height: '6vh'}}/>
                </div>
                <div className={'col ms-2 mt-2'}>
                    <p className={'m-0'}>아이디<small><span>(레벨)</span></small></p>
                    <p className={'mt-2 mb-0 theme-font'}><small><strong>보유 기술</strong></small></p>
                    {/*맵 함수로 language 풀어서 보여주기*/}
                    <span className={'theme-bg custom-token'} style={{cursor: 'auto'}}>java</span>
                    <span className={'theme-bg custom-token'} style={{cursor: 'auto'}}>spring</span>
                    <span className={'theme-bg custom-token'} style={{cursor: 'auto'}}>react</span>
                    <p></p>
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