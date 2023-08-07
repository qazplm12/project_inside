import React, {useState} from 'react';
import HeaderNavbar from "./HeaderNavbar";
import Logo from "./Logo";
import UserUI from "./UserUI";

function Header(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <header>
            <button className={'theme-outline-btn'}  onClick={() => {
                setIsLoggedIn(!isLoggedIn);
            }}> 로그인 / 로그아웃 전환(UI 확인용)</button>
            <div className={'d-flex justify-content-between container'}>
                <Logo/>
                {/* 조건부 렌더링 */}
                {/*<UserUI isLoggedIn={false}/>*/}
                <UserUI isLoggedIn={isLoggedIn}/>
            </div>
            <div className={'theme-bg'}>
                <HeaderNavbar/>
            </div>
        </header>
    );
}

export default Header;