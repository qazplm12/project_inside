import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import ProjectDate from "./detailcomponent/ProjectDate";

function ToyDetail(props) {

    const {projectIdx} = useParams();
    const [toyProject, setToyProject] = useState([]);
    const [likeProject, setLikeProject] =useState(false);

    // 참여 신청
    const [matchingMemberAccept, setMatchingMemberAccept] = useState(0)

    // 회원 유무 체크
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        console.log("userIn?::"+userInfo);
    }, [userInfo]);

    // 회원 정보 가져 오기
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/pi/toyProject/sideProfile", {
            userInfo: userInfo
        })
            .then(response => {
                console.log('성공')
                console.log('response.data 정체 ::'+response.data)
                setUserNames(response.data)
            })
            .catch((error) =>{
                console.log("userInfo side value:::"+error)
            });
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8080/pi/toyProject/toyDetail/${projectIdx}`)
            .then(response  => {
                setToyProject(response.data);
                console.log('성공')
            })
            .catch((error) => {
                console.log("에로 로그"+error)
            })
    }, [projectIdx]);

    const projectLike  = (e) =>{
        setLikeProject(likeProject => !likeProject);

        const formData = new FormData()
        formData.append("projectIdx",projectIdx);
        formData.append("matchingLeaderNick", userNames.personId)
        formData.append("matchingMemberNick",userNames.personNickName);

        if (likeProject) {
            alert('참여 신청을 하였습니다.');
            axios({
                method : 'POST',
                url : 'http://localhost:8080/pi/toyProject/projectApplication',
                data : formData
            })
                .then(function(data){
                    console.log('확인'+data)
                })
                .catch(function(err){
                    console.log('실패')
                    console.log(err)
                })
        } else {
            alert('참여 신청을 취소하셨습니다.');
            axios.post(`http://localhost:8080/pi/toyProject/projectCancel`)
                .then(response=>{

                })
                .catch((error) =>{

                })
        }
    }

        const modules = {
            toolbar: false
        };

    return (
        <Container>
                <form onSubmit={projectLike}>
            {/* 썸내일 */}
            <Row className={"my-3"}>
                <Col sm={8} className={"mx-auto d-block"}>
                    <input type={"hidden"} name={projectIdx} value={projectIdx}/>
                    <div className={"p-2 "}>
                        <img src={"/images/thumbnail/" + toyProject.projectThumbnail} className={"rounded-5"}  style={{ width: "850px", height: "630px" }} />
                    </div>
                </Col>
            </Row>
            {/* 프로젝트 기본 정보및 개설자 정보 */}
            <Row className={"py-3 mt-2"}>
                <Col sm={8}>
                    <div className={'me-5 pe-5'}>
                        <span className={"fs-1 text-secondary fw-bold"}> {toyProject.projectTitle}</span>
                    </div>
                </Col>
            </Row>
            {/* 등록자 프로필 */}
            <Row className={"py-5 border-top mx-auto rounded-1 mt-2"}>
                <Col sm={6}>
                    <div className={'box mx-auto'}>
                        <img src={"/images/profile.jpg"} className={"rounded-circle profile"}/>
                    </div>
                    <div className={"mt-5"}>
                        <span className={"text-secondary fs-5"}>프로젝트 관리자 프로필 <br/>
                                <i className="bi bi-envelope-open-heart"></i>
                        <span className={"fw-bold ms-3"}>{userNames.personId}</span></span>
                    </div>
                </Col>
                <Col sm={6}>
                {/*  관리자 닉네임, 레벨, 기술스팩   */}
                    <div>
                        <span><i className="bi bi-person-bounding-box text-danger-emphasis fs-1 fw-bold"></i></span>
                        <span className={"ms-3 text-secondary fs-5"}> {userNames.personNickName}</span>
                    </div>
                    <div className={"mt-5"}>
                        <span><i className="bi bi-star-fill text-danger-emphasis fs-1 fw-bold me-5"></i></span>
                        <span className={"text-secondary text-start"}>Lv. {userNames.personLevel}</span>
                    </div>
                    <div className={"mt-5"}>
                            <span><i className="bi bi-gear-wide-connected text-danger-emphasis fs-1 fw-bold ms-5 ps-5"></i></span>
                        <span className={"ms-3 text-secondary text-center"}>{userNames.personLanguage}</span>
                    </div>
                </Col>
            </Row>
            {/*총 모집 인원 / 참여가능레벨 / 날짜 */}
            <Row className={"py-5 border-top mx-auto rounded-1 mt-2"}>
                <div>
                    <span className={"fw-bold fs-3 text-secondary"}>[프로젝트 상세]</span>
                </div>
            </Row>
            <Row>
                <Col sm={6}>
                    <div>
                        <span><i className="text-danger-emphasis fs-3 bi bi-people-fill"></i></span>
                        <span className={"fs-5 ms-3 mx-auto text-secondary text-start"} >{toyProject.projectMember} 명</span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span><i className="text-danger-emphasis fs-3 bi bi-star-fill me-2"></i></span>
                        <span className={"fs-5 mx-auto text-secondary text-center ms-4"}>Lv. {toyProject.projectLevel}</span>
                    </div>
                </Col>
                <Col sm={6}>
                    <div>
                        <span><i className="text-danger-emphasis fs-3 bi bi-calendar3"></i></span>
                        <span className={"fs-5 ms-3 mx-auto text-secondary text-center ms-3"}><ProjectDate date={toyProject.projectDate}/></span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span><i className="text-danger-emphasis fs-3 bi bi-gear-wide-connected ms-5"></i></span>
                        <span className={"fs-5 mx-auto text-secondary text-center ps-4"}>{toyProject.projectLanguage}</span>
                    </div>
                </Col>
            </Row>
            {/* 프로젝트 상세 내용 */}
            <Row>
                <Col>
                    <div className={"mt-5"}>
                        <span className={"text-secondary fs-3 fw-bold"}>프로젝트 내용</span>
                    </div>
                    <div>
                        <ReactQuill value={toyProject.projectContent} readOnly={true} modules={modules}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12} >
                    <div className={'py-4 d-flex justify-content-end'}>
                        <span onClick={projectLike} className={"mx-auto"}>
                            {likeProject ? (
                                <button type={'submit'} className={'theme-btn fw-bold'}><h1 className={'m-2'}>프로젝트 참여 신청</h1></button>
                            ) : (
                                <Button type={'submit'} className={'btn btn-secondary fw-bold'}><h1 className={'m-2'}>참여 신청 취소</h1></Button>
                                )}
                        </span>
                    </div>
                </Col>
            </Row>
                </form>
        </Container>
    )
}

export default ToyDetail;