import React from 'react';

function ChallengeListSidebar(props) {

    return (
        <div>
            <ul className={'list-group'}>
                <li className={'list-group-item px-2'}>
                    <img src={'/images/sakura.jpg'} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                    <p>userNick</p>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={'col-sm-5'}>
                            <p className={'text-start'}>내 랭킹 : 1</p>
                        </div>
                        <div className={'col-sm-5 pe-0 ps-3'}>
                            <p className={'text-start'}>내 점수 : 100</p>
                        </div>
                    </div>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={'col-sm-5'}>
                            <p className={'text-start'}>내 레벨 : 3</p>
                        </div>
                        <div className={'col-sm-5 pe-0 ps-3'}>
                            <p className={'text-start'}>내 문제 : 10</p>
                        </div>
                    </div>
                </li>
                <li className={'list-group-item'}>
                    <img src={'/images/profile.jpg'} alt="" className={'rounded w-100 mt-3'} style={{maxWidth: "10em"}}/>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={'col-10 text-start mt-3'}>
                            <p>프로젝트 이름 : 람쥐이</p>
                            <p>프로젝트 인원 : 5명</p>
                            <p>사용 언어 : Java, JavaScript</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ChallengeListSidebar;