import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout(props) {

    return (
        <div>
            <Header/>
            <Outlet/>
            {/* 푸터 아래에 위치시키기 위함 */}
            <div style={{height: "calc(30vh - 30px)"}}></div>
            <Footer/>
        </div>
    )
}

export default Layout;