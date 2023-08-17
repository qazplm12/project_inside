import React from 'react';
import logoNoBg from '../../images/logo_nobg.png'
import {Link} from "react-router-dom";

function LogoNoBg(props) {

    return (
        // 메인주소 혹은 Route 설계
        <Link to={'/pi/main'}>
          <img src={logoNoBg} className={'m-2'} style={{width : '20rem'}} alt="로고"/>
        </Link>
    )
}

export default LogoNoBg;