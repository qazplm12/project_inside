import React from 'react';
import {Accordion, Col} from "react-bootstrap";
import DashBoard from "./DashBoard";
import PersonList from "./PersonList";
import InquiryList from "./InquiryList";

function Admin(props) {

    return (
        <div className={'row'}>
            <div className={'d-flex justify-content-around'}>
                <Col sm={6} className={'my-5'}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h4 className={'text-start'}>PI 운영 현황</h4></Accordion.Header>
                            <Accordion.Body>
                                {/* 컴포넌트*/}
                                <DashBoard />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 className={'text-start'}>유저 리스트</h4></Accordion.Header>
                            <Accordion.Body>
                                {/* 컴포넌트*/}
                                <PersonList/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col sm={4} className={'my-5 pb-5'}>
                    <div>
                        <h4 className={'text-start'}>문의 사항</h4>
                        {/* 컴포넌트*/}
                        <InquiryList />
                    </div>
                </Col>
            </div>
        </div>
    )
}

export default Admin;