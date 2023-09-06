import React, {useEffect, useState} from 'react';
import {Col, ListGroup, Row, Tab} from "react-bootstrap";
import Profile from "./Account/Profile";
import MyCard from "./MyCard";
import MyStack from "./Account/MyStack";
import ChangePassword from "./Account/ChangePassword";
import MyInquiry from "./MyInquiry";
import {Link, useParams} from "react-router-dom";
import MyProjectCard from "./project/MyProjectCard";
import axios from "axios";
import MyJoinProjectCard from "./project/MyJoinProjectCard";


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

    // 풀이 리스트
    const [solved, setSolved] = useState([]);

    // 문제 질문 리스트
    const [question, setQuestion] = useState([])
    // 질문 답변 리스트
    const [answer, setAnswer] = useState([]);
    // 꼼수용 state
    const [time, setTime] = useState(0);


    const fetchRequestMembers = () => {
        console.log('최신화');
        axios.post("http://localhost:8081/simServer/getMyProject", null, {
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
        axios.post("http://localhost:8081/simServer/getJoinProject", null, {
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
        axios.post("http://localhost:8081/simServer/getMyMatchingList", null, {
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
        axios.post("http://localhost:8081/simServer/getMyProject", null, {
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
        axios.post("http://localhost:8081/simServer/getJoinProject", null, {
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
        axios.post("http://localhost:8081/simServer/getMyMatchingList", null, {
            params: {
                matchingMemberNick: userInfo.personNickName
            }
        })
            .then((res) => {
                setMyMatchingList(res.data);
            })
            .catch((error) => {

            });
        // 내가 푼 문제 리스트 가져오기
        axios.post("http://localhost:8081/simServer/getMySolutionList", null, {
            params: {
                solvedNick: userInfo.personNickName
            }
        })
            .then((res) => {
                setSolved(res.data);
            })
            .catch((error) => {

            });

        // 내 질문 리스트 가져오기
        axios.post("http://localhost:8081/simServer/getMyQuestionList", null, {
            params: {
                questionNick: userInfo.personNickName
            }
        })
            .then((res) => {
                console.log(res.data)
                setQuestion(res.data);
            })
            .catch((error) => {

            });

        // 내 답변 리스트 가져오기
        axios.post("http://localhost:8081/simServer/getMyAnswerList", null, {
            params: {
                answerNick: userInfo.personNickName
            }
        })
            .then((res) => {
                console.log(res.data)
                setAnswer(res.data);
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
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#/pi/myPage/profile/0"
                                        onClick={() => activateTab('#profile')}>
                            계정 관리
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#/pi/myPage/project/0"
                                        onClick={() => activateTab('#project')}>
                            프로젝트
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#/pi/myPage/solution/0"
                                        onClick={() => activateTab('#solution')}>
                            문제 풀이
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#/pi/myPage/question/0"
                                        onClick={() => activateTab('#question')}>
                            질문 / 답변
                        </ListGroup.Item>
                        <ListGroup.Item className={'py-3'} variant={'light'} action href="#/pi/myPage/inquiry/0"
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
                                <div className={'text-start'}>
                                    {
                                        solved.length > 0
                                            ?
                                            solved.map((item, index, array) => (
                                                <Link to={`/pi/solved?idx=${item.challengeEntity.challengeIdx}`}
                                                      key={index}
                                                      className={'theme-bg text-decoration-none custom-token rounded-3 m-2 px-3'}
                                                >
                                                    <span
                                                        className={'text-black'}><small><strong>{item.solvedLanguage}</strong> </small> </span>
                                                    <p className={'m-0'}>
                                                        <strong>{item.challengeEntity.challengeTitle}</strong></p>
                                                </Link>
                                            ))
                                            : <h3 className={'my-3 text-center'}>해결한 문제가 없습니다.</h3>
                                    }
                                </div>
                            </MyCard>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#question">
                            <h2 className={'text-start ms-5 mt-5'}>질문 / 답변</h2>
                            <MyCard title={'내가 작성한 질문'}>
                                {
                                    question.length > 0
                                        ?
                                        question.map((item, index, array) => (
                                            <Link to={`/pi/QnA?idx=${item.challengeEntity.challengeIdx}`} key={index}
                                                  className={'text-decoration-none m-2 px-3'}
                                            >
                                                <Row className={'p-2 form-control d-flex'}>
                                                    <Col sm={2} className={'mt-3'}>
                                                        <div className={'theme-border mb-4 theme-font'}>
                                                            <h3 className={'my-3'}><strong>{item.questionCount}</strong>
                                                            </h3>
                                                            <p>답변</p>
                                                        </div>
                                                    </Col>
                                                    <Col sm={10} className={'text-start mt-3'}>
                                                        <h5 className={'d-inline theme-font opacity-75 me-2'}>{item.challengeEntity.challengeTitle}</h5>
                                                        <span
                                                            className={'theme-bg custom-token rounded-3 px-2 py-1'}>{item.questionLanguage}</span>
                                                        <h4 className={'text-black mb-0'}>{item.questionTitle}</h4>
                                                        <p className={'text-muted mt-1'}>{item.questionContent}</p>
                                                    </Col>
                                                </Row>
                                            </Link>
                                        ))
                                        : <h3 className={'my-3 text-center'}>작성한 질문이 없습니다.</h3>
                                }
                            </MyCard>
                            <MyCard title={'내가 작성한 답변'}>
                                {
                                    answer.length > 0
                                        ?
                                        answer.map((item, index, array) => (
                                            <Link to={`/pi/QnA?idx=${item.challengeEntity.challengeIdx}`} key={index}
                                                  className={'text-decoration-none m-2 px-3'}
                                            >
                                                <div className={'form-control d-flex'}>
                                                    <div className={'text-start'}>
                                                        <h5 className={'d-inline theme-font opacity-75 me-2'}>{item.challengeEntity.challengeTitle}</h5>
                                                        <span
                                                            className={'theme-bg custom-token rounded-3 px-2 py-1'}>{item.answerLanguage}</span>
                                                        <p className={'text-black mb-0'}><strong>{item.answerContent}</strong></p>
                                                        <p className={'text-muted mt-1'}>{item.questionEntity.questionTitle}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                        : <h3 className={'my-3 text-center'}>작성한 질문이 없습니다.</h3>
                                }
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