import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {OverlayTrigger, Popover} from "react-bootstrap";

// 가상 유저 정보
import person from "../../commons/Person";

function UserUI(props) {

    // 로그인 시 보여줄 UI
    if (props.isLoggedIn)
        return (
            <div className={'d-flex align-items-center me-5'}>
                {/* 관리자 페이지 / 조건부 렌더링 걸어줘야 함*/}
                <Link to={'admin'} className={'theme-link me-4'} >관리자 페이지</Link>
                <OverlayTrigger
                    trigger="click"
                    key={'ui1'}
                    placement={'bottom'}
                    rootClose
                    overlay={
                        <Popover>
                            <Popover.Body className={'text-center'}>
                                <h4 className={'text-muted my-auto'}>내 프로필</h4>
                            </Popover.Body>
                            <Popover.Header className={'theme-bg border-top rounded-0'}>
                                <div className={'p-5 py-2'}>
                                    <img src={person.imgSrc} alt="" className={'circle-background w-100'}/>
                                    <p className={'text-center m-0'}><strong>{person.email}</strong></p>
                                    <p className={'text-center text-muted'}><small><strong>{person.nickName}</strong>(Lv.{person.level})</small></p>
                                </div>
                            </Popover.Header>
                            <Popover.Body className={'text-center'}>
                                <Link to={'/pi/myPage'} className={'theme-link'}>마이 페이지</Link>
                                <hr/>
                                <Link to={'/pi/logout'} className={'theme-link'}>로그아웃</Link>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <a className={'theme-link fs-5'}>{person.email}</a>
                </OverlayTrigger>


                <OverlayTrigger
                    trigger="click"
                    key={'ui2'}
                    placement={'bottom'}
                    rootClose
                    overlay={
                        <Popover>
                            <Popover.Body>
                                알람 리스트 들어갈 자리
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <a className={'text-black ms-3'}>
                        {props.newMessage
                            ? <i className="bi bi-bell"></i>
                            : <i className="bi bi-bell-fill position-relative">
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    1 {/* 카운트 */}  </span>
                            </i>
                        }</a>
                </OverlayTrigger>

            </div>
        )
    // 비로그인 시 보여줄 UI
    return <div className={'d-flex justify-content-around align-items-center me-5'}>
        <h5>
            <Link to={'/userAuth/login'}className={'theme-link px-2 m-0'}>로그인</Link>
        </h5>
        <h5>
            <Link to={'/userAuth/signup'} className={'theme-link px-2 m-0'}>회원가입</Link>
        </h5>
    </div>

}

export default UserUI;