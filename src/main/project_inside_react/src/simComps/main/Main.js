import React, {useEffect, useState} from 'react';
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import axios from "axios";


function Main(props) {

    useEffect(() => {
        console.log(sessionStorage.getItem("ACCESS_TOKEN"));
    }, []);

    return (
        <div className={'my-5'}>
            <Section1 />
            <br/><br/><br/><br/>
            <Section2 />
        </div>
    )
}

export default Main;