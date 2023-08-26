import React, {useEffect, useState} from 'react';
import {Col, ListGroup, Row, Tab} from "react-bootstrap";
import Profile from "./Account/Profile";
import MyCard from "./MyCard";
import MyStack from "./Account/MyStack";
import ChangePassword from "./Account/ChangePassword";
import MyInquiry from "./MyInquiry";
import {useParams} from "react-router-dom";
import MyProjectCard from "./MyProjectCard";
import axios from "axios";
import MyJoinProjectCard from "./MyJoinProjectCard";


function MyPage(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    const {mode} = useParams();
    const {linkIdx} = useParams();

    const [activeTab, setActiveTab] = useState();

    // 내가 생성한 프로젝트
    const [myProject, setMyProject] = useState([]);
    // 내가 신청한 프로젝트
    const [myRequestProject, setMyRequestProject] = useState([]);
    // 내가 참여한 프로젝트
    const [joinProject, setJoinProject] = useState([]);
    // 내가 완료한 프로젝트
    const [myFinishedProject, setMyFinishedProject] = useState([]);
    // 매칭 리스트 가져오기
    const [myMatchingList, setMyMatchingList] = useState([]);
    // 꼼수용 state
    const [time, setTime] = useState(0);


    const fetchRequestMembers = () => {
        console.log('최신화');
        axios.post("http://localhost:8080/simServer/getMyProject", null, {
            params: {
                projectLeaderId: userInfo.personId
            }
        })
            .then((res) => {
                // 리스트를 가져와서 finish가 아닌 프로젝트만 가져오기
                setMyProject(res.data.filter(item => item.projectFinish !== "Y"))
                console.log(myProject);
            })
            .catch((error) => {

            });


        // 내가 신청한 && 참여한 프로젝트
        axios.post("http://localhost:8080/simServer/getJoinProject", null, {
            params: {
                matchingMemberNick: userInfo.personNickName
            }
        })
            .then((res) => {
                // 내가 신청한 프로젝트를 저장
                setMyRequestProject(res.data);
            })
            .catch((error) => {

            });
        // 참여 요청의 상태를 가져오기 위함
        axios.post("http://localhost:8080/simServer/getMyMatchingList", null, {
            params: {
                matchingMemberNick: userInfo.personNickName
            }
        })
            .then((res) => {
                setMyMatchingList(res.data);
            })
            .catch((error) => {

            });
        setTimeout(timer, 1000)
    };

    useEffect(() => {
        setActiveTab(`#${mode}`);
        console.log(linkIdx);
        // 내가 생성한 프로젝트
        axios.post("http://localhost:8080/simServer/getMyProject", null, {
            params: {
                projectLeaderId: userInfo.personId
            }
        })
            .then((res) => {
                // 리스트를 가져와서 finish가 아닌 프로젝트만 가져오기 
                setMyProject(res.data.filter(item => item.projectFinish !== "Y"))
                console.log(myProject);
            })
            .catch((error) => {

            });


        // 내가 신청한 && 참여한 프로젝트
        axios.post("http://localhost:8080/simServer/getJoinProject", null, {
            params: {
                matchingMemberNick: userInfo.personNickName
            }
        })
            .then((res) => {
                // 내가 신청한 프로젝트를 저장
                setMyRequestProject(res.data);
            })
            .catch((error) => {

            });
        // 참여 요청의 상태를 가져오기 위함
        axios.post("http://localhost:8080/simServer/getMyMatchingList", null, {
            params: {
                matchingMemberNick: userInfo.personNickName
            }
        })
            .then((res) => {
                setMyMatchingList(res.data);
            })
            .catch((error) => {

            });
        setTimeout(timer, 1000)
    }, []);

    // 렌더링 끝난 후 실행
    const timer = () => {
        if (time < 2) {
            setTime(time + 1)
        }
    };

    // 렌더링시 time 값 바뀜 > useEffect 동작
    useEffect(() => {
        // 자신이 신청한적 있는 프로젝트와 매칭리스트를 가져와서 entity에 없는 속성을 주입해주는 작업
        if (myRequestProject.length > 0) {
            for (let i = 0; i < myRequestProject.length; i++) {
                myRequestProject[i].matchingStatus = myMatchingList[i].matchingMemberAccept;
                myRequestProject[i].matchingIdx = myMatchingList[i].matchingIdx;
            }
            // 프로젝트가 완료되지않고, 멤버가 가득찬(매칭완료 O) 프로젝트를 걸러줌
            setJoinProject(myRequestProject.filter(item => item.projectFinish !== "Y" && item.projectFull === "Y"));
            // 완료된 프로젝트를 걸러줌
            setMyFinishedProject(myRequestProject.filter(item => item.projectFinish === "Y"));
            // 프로젝트가 완료되지않고, 멤버가 가득차지않은(매칭완료 X), 신청대기중이거나 신청 수락된 프로젝트를 걸러줌
            setMyRequestProject(myRequestProject.filter(item => item.projectFinish !== "Y" && item.projectFull !== "Y" && (item.matchingStatus === "1" || item.matchingStatus === "3")));
        }
    }, [time]);

    const activateTab = (tabKey) => {
        setActiveTab(tabKey);
    }

    return (
        <Tab.Container defaultActiveKey={mode} activeKey={activeTab}>
            <Row>
                <Col sm={1}></Col>
                <Col sm={2} className={'my-5 text-start'}>
                    <ListGroup id={'list-group-myPage'}>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#profile"
                                        onClick={() => activateTab('#profile')}>
                            계정 관리
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#project"
                                        onClick={() => activateTab('#project')}>
                            프로젝트
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#solution"
                                        onClick={() => activateTab('#solution')}>
                            문제 풀이
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#question"
                                        onClick={() => activateTab('#question')}>
                            질문 / 답변
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#inquiry"
                                        onClick={() => activateTab('#inquiry')}>
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
                                {
                                    myProject.length > 0
                                        ? <MyProjectCard myProject={myProject}/>
                                        : <h3 className={'my-3'}>생성한 프로젝트가 없습니다.</h3>
                                }

                            </MyCard>

                            <MyCard title={'내가 신청한 프로젝트'}>
                                <div className={'row p-0'}>
                                    {
                                        myRequestProject.length > 0
                                            ? myRequestProject[0].matchingStatus !== '' ?
                                                myRequestProject.map((item, index) => (
                                                    <MyJoinProjectCard joinProject={item} key={index}
                                                                       fetchUpdateData={fetchRequestMembers}
                                                    />
                                                ))
                                                : <h3 className={'my-3'}>신청한 프로젝트가 없습니다.</h3>
                                            : <h3 className={'my-3'}>신청한 프로젝트가 없습니다.</h3>
                                    }
                                </div>
                            </MyCard>

                            <MyCard title={'내가 참여한 프로젝트'}>
                                <div className={'row p-0'}>
                                    {
                                        joinProject.length > 0
                                            ?
                                            joinProject.map((item, index) => (
                                                <MyJoinProjectCard joinProject={item} key={index}/>
                                            ))
                                            // 맵 함수
                                            : <h3 className={'my-3'}>참여중인 프로젝트가 없습니다.</h3>

                                    }
                                </div>
                            </MyCard>


                            <MyCard title={'내가 완료한 프로젝트'}>
                                <div className={'row'}>
                                    {
                                        myFinishedProject.length > 0
                                            ?
                                            myFinishedProject.map((item, index) => (
                                                <MyJoinProjectCard joinProject={item} key={index}/>
                                            ))
                                            // 맵 함수
                                            : <h3 className={'my-3'}>완료한 프로젝트가 없습니다.</h3>

                                    }
                                </div>
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
                                <MyInquiry/>
                            </MyCard>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default MyPage;