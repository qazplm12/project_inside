import React, {useEffect, useState} from 'react';
import HeaderNavbar from "./HeaderNavbar";
import Logo from "../../commons/Logo";
import UserUI from "./UserUI";
import {Link} from "react-router-dom";
import {logout} from "../../../service/Service";

function Header(props) {

    // 0 - 비회원 / 1 - 회원 / 2 - 어드민
    const [isUser, setIsUser] = useState(0);
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        if (userInfo) {
            if (userInfo.personNickName === "admin") {
                setIsUser(2)
            } else if (userInfo) {
                setIsUser(1);
            }
        }
    }, [])


    return (
        <header>
            <div className={'d-flex justify-content-between container'}>
                <Logo/>
                {/* 조건부 렌더링 */}
                {/*<UserUI isLoggedIn={false}/>*/}
                {
                    isUser === 0 ?
                        <div className={'d-flex justify-content-around align-items-center me-5'}>
                            <h5>
                                <Link to={'/userAuth/login'} className={'theme-link px-2 m-0'}>로그인</Link>
                            </h5>
                            <h5>
                                <Link to={'/userAuth/signup'} className={'theme-link px-2 m-0'}>회원가입</Link>
                            </h5>
                        </div> :
                        isUser === 1 ? <UserUI/>
                            :
                            <div className={'d-flex justify-content-around align-items-center me-5'}>
                                <Link to={'admin'} className={'theme-link me-4'}><h4>관리자 페이지</h4></Link>
                                <a type={'button'} onClick={logout} className={'theme-link'}><h4>로그아웃</h4></a>
                            </div>
                }
            </div>
            <div className={'theme-bg'}>
                <HeaderNavbar/>
            </div>
        </header>
    );
}

export default Header;