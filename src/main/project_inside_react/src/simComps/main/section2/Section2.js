import React from 'react';
import Col1 from "./Col1";
import Col2 from "./Col2";
import Col3 from "./Col3";

function Section2(props) {

    return (
        <section className={'container'}>
            <div className={'row d-flex justify-content-between'}>
                <Col1/>
                <Col2/>
                <Col3/>
            </div>
        </section>
    )
}

export default Section2;