import React from 'react';
import logo from '../../../logo_pi.jpg'
import {Link} from "react-router-dom";

function Logo(props) {

    return (
        // 메인주소 혹은 Route 설계
        <Link to={''}>
          <img src={logo} className={'m-2'} style={{width : '10rem'}} alt="로고"/>
        </Link>
    )
}

export default Logo;