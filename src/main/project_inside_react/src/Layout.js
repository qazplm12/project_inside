import React from 'react';
import {Link, Outlet} from "react-router-dom";

function Layout(props) {

    return (
        <div>
            <div className={'d-flex justify-content-around'}>
                <Link to={'/pi/sim'}>sim</Link>
                <Link to={'/pi/park'}>park</Link>
                <Link to={'/pi/lee'}>lee</Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default Layout;