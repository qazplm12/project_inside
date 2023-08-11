import React from 'react';
import {Col, Tab, Tabs} from "react-bootstrap";
import MyPieChart1 from "./MyPieChart1";
import MyPieChart2 from "./MyPieChart2";
import LanguageRank from "./LanguageRank";
import Projects from "./Projects";


function DashBoard(props) {

    return (
        <div>
            <div className={'row'}>
                <Col sm={5}>
                    <Tabs
                        defaultActiveKey="person"
                        className="mb-3 ms-2"
                        justify
                    >
                        <Tab eventKey="person"
                            // 탭 버튼(타이틀)
                             title={
                                 <div className={'m-o p-0'}>
                                     <p className={'mb-1 border-bottom'}>회원</p>
                                     {/* 총 회원 수 데이터 */}
                                     <h2 className={'mb-0 d-inline'}>123</h2><small>명</small>
                                 </div>
                             }>
                            {/* 차트 자리 */}
                            <MyPieChart1/>
                        </Tab>
                        <Tab eventKey="challenge"
                            // 탭 버튼(타이틀)
                             title={
                                 <div className={'m-o p-0'}>
                                     <p className={'mb-1 border-bottom'}>문제</p>
                                     {/* 총 문제 수 데이터*/}
                                     <h2 className={'mb-0 d-inline'}>123</h2><small>가지</small>
                                 </div>
                             }>
                            {/* 차트 자리 */}
                            <MyPieChart2 />
                        </Tab>
                    </Tabs>
                </Col>
                <Col sm={7}>
                    <LanguageRank />
                </Col>
            </div>
            <>
                <Projects />
            </>
        </div>
    )
}

export default DashBoard;