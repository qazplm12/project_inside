import React from 'react';
import {Col} from "react-bootstrap";

function Language(props) {

    return (
        <Col sm={4}>
            <a target={'_blank'} href={props.href} className={'ps-2'}><img src={props.logoSrc} alt="" className={'circle-background p-2 w-75 h-75'}/></a>
            <h6 className={`theme-font mt-1 text-center`}>{props.name}</h6>
        </Col>
    )
}

export default Language;