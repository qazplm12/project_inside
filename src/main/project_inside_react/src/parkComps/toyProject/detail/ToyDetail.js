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

    //  프로젝트 매니저 정보 가져 오기
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:8081/pi/toyProject/toyDetail/${projectIdx}`)
            .then(response => {
                setToyProject(response.data);
                console.log('성공')
            })
            .catch((error) => {
                console.log("에로 로그" + error)
            })

    }, []);


    useEffect(() => {
        if (toyProject) {
            axios.post("http://localhost:8081/pi/toyProject/sideProfile", null, {
                params: {
                    personId: toyProject.projectLeaderId
                }
            })
                .then(response => {
                    setUserNames(response.data)
                })
                .catch((error) => {
                    console.log("userInfo side value:::" + error)
                });
        }


        // 로그인 상태일때만 상태값 가져오기
        if (userInfo) {
            // 신청 / 취소 보여주기 조건부 렌더링 해주기 위함
            axios.post(`http://localhost:8081/simServer/getMyMatchingInfo`, null, {
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
            axios.post(`http://localhost:8081/simServer/isMatchMember`, null, {
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
            axios.post(`http://localhost:8081/simServer/checkRejectMember`, null, {
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
            } else if (myMatchingStatus.matchingMemberAccept === "3") {
                alert('이미 참여중인 프로젝트 입니다.');
            } else if (toyProject.projectFull === "Y") {
                alert('모집이 완료된 프로젝트 입니다.');
            } else {
                const formData = new FormData();
                formData.append("projectIdx", projectIdx);
                formData.append("projectLeaderId", toyProject.projectLeaderId);
                formData.append("matchingMemberNick", userInfo.personNickName);

                axios({
                    method: 'POST',
                    url: 'http://localhost:8081/pi/toyProject/projectApplication',
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
        formData.append("matchingMemberNick", userInfo.personNickName);

        axios.post(`http://localhost:8081/pi/toyProject/projectCancel`, formData)
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
            <Row className={""}>
                <Col sm={12}>
                    <div className={''}>
                        <span className={"fs-1 text-secondary fw-bold "}> {toyProject.projectTitle}</span>
                    </div>
                </Col>
            </Row>
            {/*총 모집 인원 / 참여가능레벨 / 날짜 */}
            <Row className={"py-5 border-top mx-auto rounded-1 mt-2"}>
                <div>
                    <span className={"fw-bold fs-3 text-secondary"}>[프로젝트 개요]</span>
                </div>
            </Row>
            <Row className={"mx-auto"}>
                <Col sm>
                    <div className={'row'}>
                        <div className={'col'}>
                            <div className={'d-flex'}>
                                <div className={'text-start me-auto'}>
                                    <div>
                                        <span><i className="me-2 text-danger-emphasis fs-3 bi bi-people-fill"></i><span
                                            className={'text-secondary'}> 총 모집 인원 : </span></span>
                                        <span
                                            className={"fs-5 mx-auto mx-1"}><strong>{toyProject.projectMember} 명</strong></span><br/>
                                    </div>
                                    <div className={"mt-2"}>
                                        <span><i className="me-2 text-danger-emphasis fs-3 bi bi-star-fill"></i><span
                                            className={'text-secondary'}> 참여가능 레벨 : </span></span>
                                        <span
                                            className={"fs-5"}><strong>Lv.{toyProject.projectLevel}</strong> </span>
                                    </div>
                                    <div className={"mt-2"}>
                                            <span><i
                                                className="me-2 text-danger-emphasis fs-3 bi bi-gear-wide-connected"></i><span
                                                className={'text-secondary'}> 주 사용 언어 / 기술 스텍 : </span></span>
                                        <span></span>
                                        <span
                                            className={"fs-5"}><strong>{toyProject.projectLanguage}</strong></span>
                                    </div>
                                </div>
                                <div>
                                    <span><i className="me-2 text-danger-emphasis fs-3 bi bi-calendar3"></i><span
                                        className={'text-secondary '}> 등록일 : </span></span>
                                    <span className={"fs-5 mx-auto"}><strong><ProjectDate
                                        date={toyProject.projectDate}/></strong></span><br/>
                                </div>
                            </div>
                            <div className="card my-4" style={{maxWidth: "540px"}}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={userNames?.personImgPath === null ? "/images/ProfileImg.png" : `/images/profileImg/${userNames?.personImgPath}`} className="img-fluid rounded-start"/>
                                    </div>
                                    <div className="col-md-8" style={{backgroundColor: 'rgba(200, 240, 240, 0.5)'}}>
                                        <div className="card-body text-start">
                                            <h5 className="card-title mb-4"><strong>PM({userNames.personNickName})
                                                프로필</strong></h5>
                                            <div className={'text-muted'}>
                                                <p className="card-text mb-1">레벨 : Lv.{userNames.personLevel}</p>
                                                <p className="card-text mb-1">이메일 : {userNames.personId}</p>
                                                <p className="card-text mb-1">보유 기술 : {userNames.personLanguage}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
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