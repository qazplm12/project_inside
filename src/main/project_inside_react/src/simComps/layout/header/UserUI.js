import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {OverlayTrigger, Popover} from "react-bootstrap";

function UserUI(props) {

    // 로그인 시 보여줄 UI
    if (props.isLoggedIn)
        return (
            <div className={'d-flex align-items-center me-5'}>
                <OverlayTrigger
                    trigger="click"
                    key={'ui1'}
                    placement={'bottom'}
                    overlay={
                        <Popover>
                            <Popover.Header as="h3">
                                프로필 들어갈 자리
                            </Popover.Header>
                            <Popover.Body>
                                컴포넌트 들어갈 자리
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <a className={'theme-link'}>이메일 들어갈 자리</a>
                </OverlayTrigger>
                <OverlayTrigger
                    trigger="click"
                    key={'ui2'}
                    placement={'bottom'}
                    overlay={
                        <Popover>
                            <Popover.Header as="h3">
                                생략 가능
                            </Popover.Header>
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
            <Link to={'/pi/login'} className={'theme-link px-2 m-0'}>로그인</Link>
        </h5>
        <h5>
            <Link to={'/pi/signup'} className={'theme-link px-2 m-0'}>회원가입</Link>
        </h5>
    </div>

}

export default UserUI;