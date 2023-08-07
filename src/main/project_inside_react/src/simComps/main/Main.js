import React from 'react';
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";



function Main(props) {

    return (
        <div className={'my-5'}>
            <Section1 />
            <br/><br/><br/><br/>
            <Section2 />
        </div>
    )
}

export default Main;