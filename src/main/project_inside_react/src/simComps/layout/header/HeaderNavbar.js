import React, {useEffect, useState} from 'react';
import NavItem from "../../commons/NavItem";
import Inquiry from "./Inquiry";
import {OverlayTrigger, Popover} from "react-bootstrap";
import LanguageTab from "./LanguageTab";

function HeaderNavbar(props) {

    // 검색 연동용
    const [mode, setMode] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));


    useEffect(() => {
        console.log(mode)
        console.log(searchKeyword)
    }, [searchKeyword, mode]);


    useEffect(() => {
        if(userInfo){
            setIsLoggedIn(false);
        }
    }, [])

    const doSearch = () => {

        if (searchKeyword) {
            switch (mode) {
                case 1 :
                    return window.location.href = `challengeList?keyword=${searchKeyword}`;

                case 2 :
                    return window.location.href = `toyListBoard?keyword=${searchKeyword}`;
            }
        } else {
            alert('검색어를 입력해주세요');
            document.getElementById('searchBox').focus();
        }



    };


    const [show, setShow] = useState(false);

    const showHandler = () => {
        setShow(false);
    };

    const needLogin = () => {
        alert('로그인이 필요합니다.')
    };

    const uRAdmin = () => {
        alert('관리자는 문의를 작성할 수 없습니다.')
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
                        <NavItem name={'알고리즘 문제'} to={'/pi/challengeList'}/>
                        <NavItem name={'프로젝트 모집'} to={'/pi/toyListBoard'}/>
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
                            <a onClick={
                                isLoggedIn
                                    ? needLogin
                                    : userInfo.personId !== "admin" ?
                                    () => {setShow(true)}
                                        : uRAdmin
                            } className={"theme-link-white mx-3"}>문의</a>
                            <Inquiry showHandler={showHandler} show={show} />
                        </li>
                    </ul>
                    <form className={"d-flex"} role="search">
                        <select className="form-select w-50 me-2" aria-label="Default select example"
                                onChange={e => setMode(Number(e.target.value))}
                        >
                            <option value={1} defaultChecked={true}>문제</option>
                            <option value={2}>프로젝트</option>
                        </select>
                        <input className={"form-control me-2"} type="search" placeholder="Search"
                               id={'searchBox'}
                               onChange={e => setSearchKeyword(e.target.value)}
                               aria-label="Search"/>
                        <button className={"btn btn-outline-light"} type="button"
                                onClick={doSearch}
                        ><i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default HeaderNavbar;