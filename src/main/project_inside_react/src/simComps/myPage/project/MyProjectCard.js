import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RequestMember from "./RequestMember";
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyProjectCard(props) {

    const {
        projectTitle,
        projectThumbnail,
        projectIdx,
        projectLanguage,
        projectMember,
        projectFull,
        projectFinish
    } = props.myProject[0];

    const [hiddenMode, setHiddenMode] = useState(true);
    const [leader, setLeader] = useState("");
    const [requestMembers, setRequestMembers] = useState([]);
    const [matching, setMatching] = useState([]);
    const [matchingList, setMatchingList] = useState([]);

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    // 멤버 리스트 보여줄때 personEntity객체에 matchingEntity 객체의 값 주입
    const modeHandler = () => {
        setHiddenMode(!hiddenMode);
    }

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getRequestMembers", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setRequestMembers(res.data);
            })
            .catch((error) => {

            });
        axios.post("http://localhost:8080/simServer/getMatchingAllList", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setMatchingList(res.data)
            })
            .catch((error) => {

            });
        axios.post("http://localhost:8080/simServer/getMatchingList", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setMatching(res.data)
            })
            .catch((error) => {

            });
    }, [])

    const fetchRequestMembers = () => {
        console.log('최신화');
        axios.post("http://localhost:8080/simServer/getRequestMembers", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setRequestMembers(res.data);
            })
            .catch((error) => {

            });
        axios.post("http://localhost:8080/simServer/getMatchingAllList", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setMatchingList(res.data)
            })
            .catch((error) => {

            });
        axios.post("http://localhost:8080/simServer/getMatchingList", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setMatching(res.data)
            })
            .catch((error) => {

            });
    };

    return (
        <div className={'col-sm p-2 text-start d-flex'}>
            <Card className={"ms-3"} key={projectIdx}>
                <Link to={`/pi/toyDetail/${projectIdx}`}>
                    <Card.Header className={"p-0"}>
                        <Card.Img variant="top" src={"/images/thumbnail/" + projectThumbnail} className={"cardImg"}/>
                    </Card.Header>
                </Link>
                <Card.Body>
                    <Card.Title>
                        <Col sm={6} className={"float-start mb-3"}>
                            <div className={"fw-bold text-start"}>
                            <span className={"theme-font"}>
                                {projectTitle}
                            </span>
                            </div>
                        </Col>
                    </Card.Title>
                    <Col sm={6} className={"float-start me-3"}>
                        <div className={"mb-1"}>
                            <span
                                className={"text-start d-block theme-font me-1"}>인원 : {matchingList.filter(item => item.matchingMemberAccept === "3").length}명 / {projectMember}명</span>
                        </div>
                        <div className={"d-flex"}>
                            <span
                                className={"mt-5 text-start bg-danger-subtle rounded-1 theme-font fw-bold"}>{projectLanguage}</span>
                        </div>
                    </Col>
                    <Col sm={6} className={"float-end"}>
                        {/* projectFull 값이 Y면 projectBoard로 보내주는 버튼 조건부 렌더링*/}
                        {
                            projectFull === "Y" || projectFinish === "Y"
                                ?
                                <div className={"mb-0 ms-2 ps-2"}>
                                    <Link type={'button'} className={'theme-btn text-decoration-none'}
                                          to={`/pi/projectBoard/${projectIdx}`}>프로젝트관리</Link>
                                </div>
                                :
                                <div className={"text-end mb-0"}>

                                    <button className={'theme-btn'}
                                            onClick={modeHandler}><small>요청 확인</small>
                                    </button>
                                </div>
                        }

                    </Col>
                </Card.Body>
            </Card>
            <div className={'mx-1'}>

            </div>
            <div hidden={hiddenMode} className={'col-sm px-5 mb-1'}
                 style={{
                     overflowY: 'scroll',
                     maxHeight: '45vh'
                 }}
            >
                <h4 className={'text-start mt-2'}>참여 요청</h4>
                {/* 맵 합수 사용*/}
                {requestMembers.length === matching.length ?
                    requestMembers.length > 0 ? requestMembers.map((item, index, array) => (
                            <RequestMember key={index} memberInfo={item}
                                           matchingIdx={matching[index].matchingIdx}
                                           fetchUpdateData={fetchRequestMembers}
                                           projectInfo={props.myProject[0]}
                            />
                        ))
                        : ""
                    : ""
                }
            </div>
        </div>
    )
}

export default MyProjectCard;