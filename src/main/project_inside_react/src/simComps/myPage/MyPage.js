import React, {useEffect, useState} from 'react';
import {Col, ListGroup, Row, Tab} from "react-bootstrap";
import Profile from "./Account/Profile";
import MyCard from "./MyCard";
import MyStack from "./Account/MyStack";
import ChangePassword from "./Account/ChangePassword";
import MyInquiry from "./MyInquiry";
import {useParams} from "react-router-dom";


function MyPage(props) {
    const {mode} = useParams();

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        setActiveTab(`#${mode}`);
    }, []);

    const activateTab = (tabKey) => {
        setActiveTab(tabKey);
    }



    return (
        <Tab.Container defaultActiveKey={mode} activeKey={activeTab}>
            <Row>
                <Col sm={1}></Col>
                <Col sm={2} className={'my-5 text-start'}>
                    <ListGroup id={'list-group-myPage'}>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#profile"  onClick={() => activateTab('#profile')}>
                            계정 관리
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#project" onClick={() => activateTab('#project')}>
                            프로젝트
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#solution" onClick={() => activateTab('#solution')}>
                            문제 풀이
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#question" onClick={() => activateTab('#question')}>
                            질문 / 답변
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#inquiry" onClick={() => activateTab('#inquiry')}>
                            문의사항
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#profile">
                            <h2 className={'text-start ms-5 mt-5'}>계정 관리</h2>
                            <MyCard title={'기본정보'}>
                                <Profile/>
                            </MyCard>
                            <MyCard title={'비밀번호'}>
                                <ChangePassword/>
                            </MyCard>
                            <MyCard title={'주요기술 / 선호하는 언어'}>
                                <MyStack/>
                            </MyCard>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#project">
                            <h2 className={'text-start ms-5 mt-5'}>프로젝트</h2>
                            <MyCard title={'내가 생성한 프로젝트'}>

                            </MyCard>
                            <MyCard title={'내가 참여한 프로젝트'}>

                            </MyCard>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#solution">
                            <h2 className={'text-start ms-5 mt-5'}>나의 풀이</h2>
                            <MyCard title={'풀이 확인'}>

                            </MyCard>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#question">
                            <h2 className={'text-start ms-5 mt-5'}>질문 / 답변</h2>
                            <MyCard title={'내가 작성한 질문'}>

                            </MyCard>
                            <MyCard title={'내가 작성한 답변'}>

                            </MyCard>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="#inquiry">
                            <h2 className={'text-start ms-5 mt-5'}>문의사항</h2>
                            <MyCard title={'내가 작성한 문의'}>
                                <MyInquiry />
                            </MyCard>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default MyPage;