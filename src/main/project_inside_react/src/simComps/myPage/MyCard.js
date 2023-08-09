import React from 'react';
import {Card} from "react-bootstrap";

function MyCard(props) {

    return (
        <div className={'row m-5'}>
            <h4 className={'theme-font text-start mb-3'}>{props.title}</h4>
            <Card className={'ms-5'} style={{width: '60rem'}}>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyCard;