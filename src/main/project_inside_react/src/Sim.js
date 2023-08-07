import React from 'react';
import Header from "./simComps/layout/header/Header";
import Main from "./simComps/main/Main";
import Footer from "./simComps/layout/footer/Footer";

function Sim(props) {

    return (
        <div>
            <p>sim 페이지</p>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Sim;