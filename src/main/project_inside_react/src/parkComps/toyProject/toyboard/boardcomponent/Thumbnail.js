import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import toyStyles from "../../layout/toyStyles.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Thumbnail(props) {
    const {projectTitle, projectThumbnail, projectIdx, projectLanguage,projectMember,projectLike,projectLevel,projectFull} = props.toyProject;
    // 기본적으로 false 로 주는 이유는 아이콘의 불이 꺼진에 default 로 설정하기 위해서
    const [iconCheck, setIconCheck] = useState(false);
    const [recruitMent, setRecruitMent] = useState(true);
    const [likeCount, setLikeCount] = useState(projectLike);
    // const [toyIdx, setToyIdx] =useState('')

    // 회원 유무 체크
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        console.log("userIn?::"+userInfo);
    }, [userInfo]);


    // 모달 창 open, close 관련 필드 이다.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 현재 인원 계산용
    const [matchingList, setMatchingList] = useState([]);


    // (2-1) 새로 entity 을 만든다 아니면 테이블을 추가 시켜준다. -> 그리고 내 이메일 주소와 클릭한 idx 값을 저장을 시켜 준다.
    //      단, 반대로 아이콘의 불을 끄면 즉 취소하면 삭제 시켜 줘야 한다.

    // (2-2) 화면에 썸내일 뿌려 줄때 는 쿼리문을 바꿔야 한다. -> 이부분을 컴포넌트로 뺴면 조인문을 안써도 되고 괜찮은 생각인거 같다.

    const likeProject = (projectIdx) =>{
    // 좋아요 클릭 로직
    // 1. 클릭시 불이 들어 왔다 안왔다 해야 된다.
        setIconCheck(!iconCheck); // 이걸 통해서 icon 의 반응한다.
    // 2. 비 회원이 클릭시 '회원 만 가능한 시스템 입니다.' 라고 화면에 띄어 준다.
        // (clear)
    // 3. 회원이 클릭시 마이페이지에 내가 찜한 목록을 보여 주도록 한다. (미정)

    // 4. 회원이 클릭시 [1-1] +1 -1 이 실시간으로 동작이 되어야 한다. 그리고 [1-2] db 와 연동이 되어야 한다.

    if(userInfo != null){
        const updatedLikeCount = iconCheck ? (likeCount - 1) : (likeCount + 1);

        if(iconCheck){
        //[1-1] +1 -1 이 실시간으로 동작이 되어야 한다.
            setLikeCount(updatedLikeCount);
            //[1-2] db 와 연동이 되어야 한다
            axios.post(
                'http://localhost:8081/pi/toyProject/likeMinProjectCheck',
                {
                    projectIdx
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log('좋아요 -1 전송을 위한 플래그');
                    setIconCheck(!iconCheck);
                })
                .catch((error) => {
                    console.log('좋아요 -1 전송을 위한 플래그 실패');
                });

            // 5. 내가 찜한 거는 아이콘에 불이 들어 있어야 한다.
            //  --> 찜한 거만 볼려 클릭시 idx(프로젝트 번호) 에 저장이 되어야 하고
            //      이 저장된 값을 boardList 화면에 들어 오면 클릭된 idx 를 뿌려야 한다

            const formData = new FormData();
            formData.append("projectIdx", projectIdx)
            formData.append("personId", userInfo ? userInfo.personId : "")

            axios.post(
                'http://localhost:8081/pi/toyProject/likeMinView',formData)
                .then(response =>{
                    console.log('성공')
                })
                .catch((error) =>{
                    console.log("error min value :::"+error)
                });
        }
        else {
        //[1-1] +1 -1 이 실시간으로 동작이 되어야 한다.
            setLikeCount(updatedLikeCount);
            //[1-2] db 와 연동이 되어야 한다
            axios.post('http://localhost:8081/pi/toyProject/likePlusProjectCheck',
                {
                    projectIdx
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log('좋아요 +1 전송을 위한 플래그');
                    setLikeCount(updatedLikeCount);
                    setIconCheck(!iconCheck);
                })
                .catch((error) => {
                    console.log('좋아요 전송을 위한 플래그 실패');
                });

            // 5. 내가 찜한 거는 아이콘에 불이 들어 있어야 한다.
            //  --> 찜한 거만 볼려 클릭시 idx(프로젝트 번호) 에 저장이 되어야 하고
            //      이 저장된 값을 boardList 화면에 들어 오면 클릭된 idx 를 뿌려야 한다
            const formData = new FormData();
            formData.append("projectIdx", projectIdx)
            formData.append("personId", userInfo ? userInfo.personId : "")

            axios.post(
                'http://localhost:8081/pi/toyProject/likePlus',formData)
                .then(response =>{
                    console.log('성공')
                })
                .catch((error) =>{
                    console.log("error value :::"+error)
                })
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
            const formData = new FormData();
            formData.append("personId", userInfo ? userInfo.personId : "")

            // 이제 화면에 뿌려주는 부분
            axios.post('http://localhost:8081/pi/toyProject/likePlusView', formData)
                .then(response => {
                    const likeDataArray = response.data;

                    const projectIdxArray = likeDataArray
                        .filter(item => item.memberId === userInfo.personId && item.likeCheck === 1)
                        .map(item => item.projectIdx);

                    console.log("projectIdxArray"+projectIdxArray)

                    const projectIdxSet = new Set(projectIdxArray);
                    console.log("projectIdxSet"+projectIdxSet)
                    console.log("+1 부분::"+projectIdxSet.toString())
                    const uniqueProjectIdxArray = Array.from(projectIdxSet);

                    if (uniqueProjectIdxArray.includes(projectIdx)) {
                        setIconCheck(!iconCheck);
                    }
                })
                .catch((error) => {
                    console.log("plus view error message :::" + error)
                })



        axios.post("http://localhost:8081/simServer/getMatchingAllList", null, {
            params: {
                matchingProjectIdx: projectIdx
            }
        })
            .then((res) => {
                setMatchingList(res.data)
            })
            .catch((error) => {

            });

    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append("personId", userInfo ? userInfo.personId : "")

        // 이제 화면에 뿌려주는 부분
        axios.post('http://localhost:8081/pi/toyProject/likeMinView', formData)
            .then(response => {
                const likeDataArray = response.data;

                const projectIdxArray = likeDataArray
                    .filter(item => item.memberId === userInfo.personId && item.likeCheck != 0)
                    .map(item => item.projectIdx);

                console.log("projectIdxArray"+projectIdxArray)

                const projectIdxSet = new Set(projectIdxArray);
                console.log("projectIdxSet"+projectIdxSet)
                console.log("+1 부분::"+projectIdxSet.toString())
                const uniqueProjectIdxArray = Array.from(projectIdxSet);

                if (uniqueProjectIdxArray.includes(projectIdx)) {
                    setIconCheck(!iconCheck);
                }
            })
            .catch((error) => {
                console.log("plus view error message :::" + error)
            })
    }, []);

    ////////////////////////////////////////////////////

    const recruitMentChange = (e) =>{
        setRecruitMent(!recruitMent);
    }

    return (
        <Card className={"ms-3"} key={projectIdx}>
        <Link to={`/pi/toyDetail/${projectIdx}`}>
            <Card.Header className={"p-0"}>
                <Card.Img variant="top" src={"/images/thumbnail/" + projectThumbnail} className={"cardImg"}/>
            </Card.Header>
        </Link>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col sm={8} className={"float-start"}>
                            <div className={"fw-bold text-start"}>
                                <span className={"theme-font"}>
                                    {projectTitle}
                                </span>
                            </div>
                        </Col>
                            <Col sm={2} >
                                <div className={"float-end "}>
                                <span onClick={() => likeProject(projectIdx)}>
                                    {/* (비회원일떄) ? (모달창으로 회원전용입니다.) : (회원일떄) ? (참일떄): (거짓일떄) */}
                                    {
                                        (userInfo == null) ? <span variant="primary" onClick={handleShow}><i className="bi bi-heart theme-font fs-2 ms-2"></i></span>
                                            : iconCheck ?
                                                (<i className="bi bi-heart-fill text-danger theme-font fs-2 ms-2"></i>)
                                                :
                                                (<i className="bi bi-heart theme-font fs-2 ms-2"></i>)
                                    }
                                </span>
                                </div>
                                <div>
                                    <Modal show={show} onHide={handleShow}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                            <div>
                                                <span>회원 전용 입니다.</span>
                                            </div>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className={"d-flex justify-content-center"}>
                                                <Button type={"button"} onClick={() =>{
                                                    window.location.href='http://localhost:3000/userAuth/login';
                                                }}>회원 가입 하러 가기</Button>
                                                <Button type={"button"} className={"ms-3"} variant="primary" onClick={handleClose}>
                                                    취소
                                                </Button>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </Col>
                            <Col sm={2} >
                                <div className={"float-start mt-2"}>
                                    <span>
                                        {likeCount}
                                   </span>
                                </div>
                            </Col>
                    </Row>
                </Card.Title>
                <Row>
                    <Col sm={6}>
                        <div className={"mb-5"}>
                            <span className={"text-start d-block theme-font"}>인원 : {matchingList.filter(item => item.matchingMemberAccept === "3").length}명 / {projectMember}명<br/></span>
                        </div>
                        <div className={"d-flex"}>
                            <span className={"mt-4 text-start bg-danger-subtle rounded-1 theme-font fw-bold"}>{projectLanguage}</span>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={"mt-1 ms-5"}>
                            <span className={"theme-font fw-bold"}>참여가능 레벨</span><br/>
                            <span className={"theme-font"}>Lv.{projectLevel}</span>
                        </div>
                        <div className={"mt-5 ms-5"}>
                            <span className={"text-success-emphasis"} onChange={recruitMentChange} >
                                {projectFull === "Y" ?
                                    <span className={"theme-font"}>모집 완료</span>
                                    :
                                    <span className={"theme-font"}>모집 중</span>}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
export default Thumbnail;