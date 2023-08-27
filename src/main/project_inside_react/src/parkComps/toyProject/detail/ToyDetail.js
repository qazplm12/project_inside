import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import ProjectDate from "./detailcomponent/ProjectDate";

function ToyDetail(props) {

    const {projectIdx} = useParams();
    const [toyProject, setToyProject] = useState([]);

    // 상태값
    const [myMatchingStatus, setMyMatchingStatus] = useState([]);
    const [rejected, setRejected] = useState(0);

    // 회원 유무 체크
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        console.log("userIn?::" + userInfo);
    }, [userInfo]);

    // 회원 정보 가져 오기
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        // 비회원은 에러 뜨길래 유저 정보 있을때만 실행하도록 수정
        if (userInfo) {
            axios.post("http://localhost:8080/pi/toyProject/sideProfile", {
                userInfo: userInfo
            })
                .then(response => {
                    console.log('성공')
                    console.log('response.data 정체 ::' + response.data)
                    setUserNames(response.data)
                })
                .catch((error) => {
                    console.log("userInfo side value:::" + error)
                });
        }
        axios.get(`http://localhost:8080/pi/toyProject/toyDetail/${projectIdx}`)
            .then(response => {
                setToyProject(response.data);
                console.log('성공')
            })
            .catch((error) => {
                console.log("에로 로그" + error)
            })

    }, []);


    useEffect(() => {

        // 로그인 상태일때만 상태값 가져오기
        if (userInfo) {
            // 신청 / 취소 보여주기 조건부 렌더링 해주기 위함
            axios.post(`http://localhost:8080/simServer/getMyMatchingInfo`, null, {
                params: {
                    matchingProjectIdx: toyProject.projectIdx,
                    nick: userInfo.personNickName,
                }
            })
                .then(res => {
                    console.log('----matching----')
                    setMyMatchingStatus(res.data);
                })
                .catch((error) => {
                    // 에러 발생시
                });

            // 매칭 완료시 조건부 렌더링 해주기 위함
            axios.post(`http://localhost:8080/simServer/isMatchMember`, null, {
                params: {
                    matchingProjectIdx: toyProject.projectIdx,
                    nick: userInfo.personNickName,
                }
            })
                .then(res => {
                    console.log('----isMatchMember----')
                    console.log(res.data);
                })
                .catch((error) => {
                    // 에러 발생시
                });

        // 거절 기록 있는지 확인
            axios.post(`http://localhost:8080/simServer/checkRejectMember`, null, {
                params: {
                    matchingProjectIdx: toyProject.projectIdx,
                    nick: userInfo.personNickName,
                }
            })
                .then(res => {
                    console.log('----rejected----')
                    setRejected(res.data);
                })
                .catch((error) => {
                    // 에러 발생시
                });
        }
    }, [toyProject])

    const sendReq = (e) => {

        if (userInfo) {
            console.log(myMatchingStatus);
            // 유저정보가 있을때만
            if (userInfo.personId === toyProject.projectLeaderId) {
                // 로그인 정보와 프로젝트 매니저 아이디 비교
                alert('매니저는 신청할 수 없습니다.');
            } else if (rejected > 0) {
                // 프로젝트 거부 당했을때 (0 : 기본값, 1이상 : 해당시)
                alert('거절 당한 프로젝트 입니다.');
            } else if(myMatchingStatus.matchingMemberAccept === "3"){
                alert('이미 참여중인 프로젝트 입니다.');
            }
            else if (toyProject.projectFull === "Y") {
                alert('모집이 완료된 프로젝트 입니다.');
            } else {
                const formData = new FormData();
                formData.append("projectIdx", projectIdx);
                formData.append("projectLeaderId", toyProject.projectLeaderId);
                formData.append("matchingMemberNick", userNames.personNickName);

                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/pi/toyProject/projectApplication',
                    data: formData
                })
                    .then(function (data) {
                        console.log('확인' + data)
                        alert('신청되었습니다..');
                        // 응답이 있을때만 세팅 해줘야함
                        setMyMatchingStatus(data.data);
                    })
                    .catch(function (err) {
                        console.log('실패')
                        console.log(err)
                    });
            }
        } else {
            alert('로그인이 필요합니다.');
        }

    }

    const cancelReq = (e) => {

        const formData = new FormData()
        formData.append("projectIdx", projectIdx);
        formData.append("projectLeaderId", toyProject.projectLeaderId)
        formData.append("matchingMemberNick", userNames.personNickName);

        axios.post(`http://localhost:8080/pi/toyProject/projectCancel`, formData)
            .then(response => {
                alert('신청이 취소되었습니다.');
                // 응답이 있을때만 세팅 해줘야함
                setMyMatchingStatus(response.data);
            })
            .catch((error) => {

            })

    }

    useEffect(() => {
        console.log('------myMatchingStatus-----');
        console.log(myMatchingStatus);
    }, [myMatchingStatus])

    const modules = {
        toolbar: false
    };

    return (
        <Container>
            {/* 썸내일 */}
            <Row className={"my-3"}>
                <Col sm={8} className={"mx-auto d-block"}>
                    <input type={"hidden"} name={projectIdx} value={projectIdx}/>
                    <div className={"p-2 "}>
                        <img src={"/images/thumbnail/" + toyProject.projectThumbnail} className={"rounded-5"}
                             style={{width: "850px", height: "630px"}}/>
                    </div>
                </Col>
            </Row>
            {/* 프로젝트 기본 정보및 개설자 정보 */}
            <Row className={"py-3 mt-2 "}>
                <Col sm={12}>
                    <div className={'ms-5 ps-3'}>
                        <span className={"fs-1 text-secondary fw-bold "}> {toyProject.projectTitle}</span>
                    </div>
                </Col>
            </Row>
            {/* 등록자 프로필 */}
            <Row className={"py-5 border-top mx-auto rounded-1 mt-2"}>
                {/*<Col sm={6}>*/}
                {/*</Col>*/}
                <Col sm={6}>
                    <div className={'box mx-auto'}>
                        <img src={"/images/profile.jpg"} className={"rounded-circle profile"}/>
                        <p>프로젝트 매니저 프로필</p>
                        <p>Lv.</p>
                        <p>이메일 : </p>
                    </div>
                    <div className={"mt-5"}>
                        <span className={"text-secondary fs-5"}>프로젝트 관리자 프로필 <br/>
                                <i className="bi bi-envelope-open-heart"></i>
                        <span className={"fw-bold ms-3"}>{toyProject.projectLeaderId}</span></span>
                    </div>
                    {/*  관리자 닉네임, 레벨, 기술스팩   */}
                    <div>
                        <span><i className="bi bi-person-bounding-box text-danger-emphasis fs-1 fw-bold"></i></span>
                        <span className={"ms-3 text-secondary fs-5"}> {toyProject.personNickName}</span>
                    </div>
                    <div className={"mt-5"}>
                        <span><i className="bi bi-star-fill text-danger-emphasis fs-1 fw-bold me-5"></i></span>
                        <span className={"text-secondary text-start"}>Lv. {toyProject.projectLevel}</span>
                    </div>
                    <div className={"mt-5"}>
                            <span><i
                                className="bi bi-gear-wide-connected text-danger-emphasis fs-1 fw-bold ms-5 ps-5"></i></span>
                        <span className={"ms-3 text-secondary text-center"}>{toyProject.projectLanguage}</span>
                    </div>
                </Col>
            </Row>
            {/*총 모집 인원 / 참여가능레벨 / 날짜 */}
            <Row className={"py-5 border-top mx-auto rounded-1 mt-2"}>
                <div>
                    <span className={"fw-bold fs-3 text-secondary"}>[프로젝트 상세]</span>
                </div>
            </Row>
            <Row className={"mx-auto"}>
                <Col sm>
                    <div>
                        <span><i className="text-danger-emphasis fs-3 bi bi-people-fill"></i></span>
                        <span
                            className={"fs-5 ms-3 mx-auto text-secondary text-start"}>{toyProject.projectMember} 명</span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span><i className="text-danger-emphasis fs-3 bi bi-star-fill me-2"></i></span>
                        <span
                            className={"fs-5 mx-auto text-secondary text-center ms-4"}>Lv. {toyProject.projectLevel}</span>
                    </div>
                    <div>
                        <span><i className="text-danger-emphasis fs-3 bi bi-calendar3"></i></span>
                        <span className={"fs-5 ms-3 mx-auto text-secondary text-center ms-3"}><ProjectDate
                            date={toyProject.projectDate}/></span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span><i className="text-danger-emphasis fs-3 bi bi-gear-wide-connected ms-5"></i></span>
                        <span
                            className={"fs-5 mx-auto text-secondary text-center ps-4"}>{toyProject.projectLanguage}</span>
                    </div>
                </Col>
                {/*<Col sm={6}>*/}
                {/*</Col>*/}
            </Row>
            {/* 프로젝트 상세 내용 */}
            <Row className={"border-top"}>
                <Col>
                    <div className={"my-5"}>
                        <span className={"text-secondary fs-3 fw-bold "}>[프로젝트 내용]</span>
                    </div>
                    <div>
                        <ReactQuill value={toyProject.projectContent} readOnly={true} modules={modules}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className={'py-4 d-flex justify-content-center'}>
                        {
                            myMatchingStatus.matchingMemberAccept === "1"
                                ?
                                // 신청한 상태일때만
                                <button type={'submit'} onClick={cancelReq} className={'btn btn-secondary fw-bold'}>
                                    <h1 className={'m-2'}>참여 신청 취소</h1></button>
                                :
                                // 나머지 전부
                                <button type={'submit'} onClick={sendReq} className={'theme-btn fw-bold'}><h1
                                    className={'m-2'}>프로젝트 참여 신청</h1></button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ToyDetail;