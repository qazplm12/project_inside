import React from 'react';

function ProjectBoardMember(props) {
    const pm = props.pm;
    const member = props.member;

    return (
        <div className={'form-control p-2'} style={{borderColor: 'rgba(140, 83, 248, 0.7)'}}>
            {/*=========== 제일 위는 관리자 한명 고정 map XX ===========*/}
            <p className={'me-3'}><i className="bi bi-person-gear"></i> 프로젝트 매니저</p>
            <div className={'d-flex py-1 px-2'} style={{
                backgroundColor: '#ebff82',
                borderRadius: '1em'
            }}>
                {/*<img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>*/}
                <img src={!pm.personImgPath ? "/images/ProfileImg.png" : `/images/profileImg/${pm.personImgPath}`} alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                <div className={'d-flex flex-column ms-3 w-100'}>
                    <div className={'d-flex justify-content-start pb-2'}>
                        <span className={'me-3'}><i className="bi bi-person-fill"></i> {pm.personNickName}</span>
                        <span className={'me-3'}><i className="bi bi-award"></i> Lv.{pm.personLevel}</span>
                        <span className={'me-3 badge theme-bg'}>{pm.personLanguage}</span>
                    </div>
                    <div className={'pb-2'}>
                        <span className={'d-flex justify-content-start'}>지금 하고 있는 일</span>
                    </div>
                </div>
            </div>
            <hr className={'theme-border'}/>
            <p className={'me-3'}><i className="bi bi-people"></i> 프로젝트 맴버</p>
            {/*=========== map 사용 ===========*/}
            {
                member.map((item, index) => {
                    return (
                        <div className={'d-flex py-1 px-2 mb-3'} style={{
                            backgroundColor: '#ACAAF1FF',
                            borderRadius: '1em'
                        }}>
                            {/*<img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>*/}
                            <img src={!item.personImgPath ? "/images/ProfileImg.png" : `/images/profileImg/${item.personImgPath}`} alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                            <div className={'d-flex flex-column ms-3 w-100'}>
                                <div className={'d-flex justify-content-start pb-2'}>
                                    <span className={'me-3'}><i className="bi bi-person-fill"></i> {item.personNickName}</span>
                                    <span className={'me-3'}><i className="bi bi-award"></i> {item.personLevel}</span>
                                    <span className={'me-3 badge theme-bg'}>{item.personLanguage}</span>
                                </div>
                                <div className={'pb-2'}>
                                    <span className={'d-flex justify-content-start'}>지금 하고 있는 일</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProjectBoardMember;