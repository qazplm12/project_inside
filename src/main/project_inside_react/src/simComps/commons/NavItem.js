import React from 'react';
import {Link, NavLink} from "react-router-dom";

function NavItem(props) {

    return (
        <li className={"nav-item"}>
            {/* 컴포넌트 설계 완료시 NavLink 사용해보기 */}
            <Link className={"theme-link-white mx-3"} aria-current="page"
                  to={props.to}>
                {props.name}
            </Link>
        </li>
    )
}

export default NavItem;