import React, {useEffect, useState} from 'react';
import NavItem from "../../commons/NavItem";
import Inquiry from "./Inquiry";
import {OverlayTrigger, Popover} from "react-bootstrap";
import LanguageTab from "./LanguageTab";

function HeaderNavbar(props) {

    const [show, setShow] = useState(false);

    const showHandler = () => {
        setShow(false);
    };

    return (
        <nav className={"navbar navbar-expand-lg"}>
            <div className={"container"}>
                <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className={"navbar-nav me-auto ms-4 mb-2 mb-lg-0"}>
                        <NavItem name={'알고리즘 문제'} to={'/pi/challenge'}/>
                        <NavItem name={'프로젝트 모집'} to={'/pi/project'}/>
<<<<<<< HEAD
                        <NavItem name={'언어별 공식 문서'} to={'/pi/codeLanguage'}/>
                        <NavItem name={'문의'} to={'/pi/inquiry'}/>
=======
                        <li className={"nav-item"}>
                            <OverlayTrigger
                                trigger="click"
                                key={'ui3'}
                                placement={'bottom'}
                                rootClose
                                overlay={
                                    <Popover>
                                        <Popover.Body>
                                            <LanguageTab addClassName={'text-center'}/>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <a className={'theme-link-white'}>언어별 공식 문서</a>
                            </OverlayTrigger>
                        </li>
                        <li className={"nav-item"}>
                            {/* 부모 컴포넌트 영역에서 모달 on시키고, 자식 컴포넌트 영역에서 부모 컴포넌트의 함수를 실행시켜서 모달을 off 시킴 */}
                            <a onClick={() => {setShow(true)}} className={"theme-link-white mx-3"}>문의</a>
                            <Inquiry showHandler={showHandler} show={show} />
                        </li>
>>>>>>> origin/usBranch1
                    </ul>
                    <form className={"d-flex"} role="search">
                        <select className="form-select w-50 me-2" aria-label="Default select example">
                            <option value="1" defaultChecked={true}>문제</option>
                            <option value="2">프로젝트</option>
                        </select>
                        <input className={"form-control me-2"} type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className={"btn btn-outline-light"} type="submit"><i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default HeaderNavbar;