import React from 'react';
import HeaderNavbar from "./HeaderNavbar";
import Logo from "./Logo";
import UserUI from "./UserUI";

function Header(props) {

    return (
        <header>
            <div className={'d-flex justify-content-between container'}>
                <Logo />
                {/* 조건부 렌더링 */}
                {/*<UserUI isLoggedIn={false}/>*/}
                <UserUI isLoggedIn={true}/>
            </div>
            <div></div>
            <div className={'theme-bg'}>
                <HeaderNavbar />
            </div>
        </header>
    );
}

export default Header;