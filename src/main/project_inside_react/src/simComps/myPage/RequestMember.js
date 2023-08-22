import React from 'react';

function RequestMember(props) {

    return (
        <div className={'p-3 shadow mb-3'}>
            <div className={'row pe-5'}>
                <div className={'col-3'}>
                    <img src={'/images/profile.jpg'} alt="" className={'circle-background'}
                         style={{width: '3vw', height: '6vh'}}/>
                </div>
                <div className={'col ms-2 mt-2'}>
                    <p className={'m-0'}>아이디<small><span>(레벨)</span></small></p>
                    <span>선호하는 언어</span>
                </div>
            </div>
            <div className={'d-flex justify-content-end mt-2'}>
                <button className={'theme-outline-btn me-2'}>거부</button>
                <button className={'theme-btn'}>수락</button>
            </div>
        </div>
    )
}

export default RequestMember;