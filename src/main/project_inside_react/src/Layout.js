import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "./simComps/layout/header/Header";
import Footer from "./simComps/layout/footer/Footer";

function Layout(props) {

    return (
        <div>
            <Header/>
            <div className={'d-flex justify-content-around'}>
                <Link to={'/pi/sim'}>sim</Link>
                <Link to={'/pi/park'}>park</Link>
                <Link to={'/pi/lee'}>lee</Link>
            </div>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;