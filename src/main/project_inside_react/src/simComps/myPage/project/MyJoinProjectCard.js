import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

function MyJoinProjectCard(props) {

    const [joinMember, setJoinMember] = useState(0);

    const {
        projectTitle,
        projectThumbnail,
        projectIdx,
        projectLanguage,
        projectMember,
        projectLike,
        projectLevel,
        projectFull,
        projectFinish,
        matchingStatus,
        matchingIdx
    } = props.joinProject;

    // const [matchingStatus, setMatchingStatus] = useState(0);
    const [iconCheck, setIconCheck] = useState(false);
    const [likeCount, setLikeCount] = useState(projectLike);
    const [reRender, setReRender] = useState();

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    // 5. 내가 찜한 거는 아이콘에 불이 들어 있어야 한다.
    //  --> 찜한 거만 볼려 클릭시 idx(프로젝트 번호) 에 저장이 되어야 하고
    //      이 저장된 값을 boardList 화면에 들어 오면 클릭된 idx 를 뿌려야 한다.

    // (1) 새로 entity 을 만든다 아니면 테이블을 추가 시켜준다. -> 그리고 내 이메일 주소와 클릭한 idx 값을 저장을 시켜 준다.
    //      단, 반대로 아이콘의 불을 끄면 즉 취소하면 삭제 시켜 줘야 한다.

    // (2) 화면에 썸내일 뿌려 줄때 는 쿼리문을 바꿔야 한다. -> 이부분을 컴포넌트로 뺴면 조인문을 안써도 되고 괜찮은 생각인거 같다.

    const likeProject = (projectIdx) => {
        // 좋아요 클릭 로직
        // 1. 클릭시 불이 들어 왔다 안왔다 해야 된다.
        setIconCheck(!iconCheck); // 이걸 통해서 icon 의 반응한다.
        // 2. 비 회원이 클릭시 '회원 만 가능한 시스템 입니다.' 라고 화면에 띄어 준다.
        // (clear)
        // 3. 회원이 클릭시 마이페이지에 내가 찜한 목록을 보여 주도록 한다. (미정)

        // 4. 회원이 클릭시 [1-1] +1 -1 이 실시간으로 동작이 되어야 한다. 그리고 [1-2] db 와 연동이 되어야 한다.
        if (userInfo != null) {
            const updatedLikeCount = iconCheck ? (likeCount - 1) : (likeCount + 1);
            if (iconCheck) {
                //[1-1] +1 -1 이 실시간으로 동작이 되어야 한다.
                setLikeCount(updatedLikeCount);
                //[1-2] db 와 연동이 되어야 한다
                axios.post(
                    'http://localhost:8080/pi/toyProject/likeMinProjectCheck',
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
            } else {
                //[1-1] +1 -1 이 실시간으로 동작이 되어야 한다.
                setLikeCount(updatedLikeCount);
                //[1-2] db 와 연동이 되어야 한다
                axios.post('http://localhost:8080/pi/toyProject/likePlusProjectCheck',
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

                const formData = new FormData();
                formData.append("projectIdx", projectIdx)
                formData.append("personId", userInfo ? userInfo.personId : "")

                axios.post(
                    'http://localhost:8080/pi/toyProject/likePlus', formData)
                    .then(response => {
                        console.log('성공')
                    })
                    .catch((error) => {
                        console.log("error value :::" + error)
                    })
            }
        }

    }


    /////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const formData = new FormData();
        formData.append("personId", userInfo ? userInfo.personId : "")

        // 이제 화면에 뿌려주는 부분
        axios.post('http://localhost:8080/pi/toyProject/likePlusView', formData)
            .then(response => {
                const likeDataArray = response.data;

                const projectIdxArray = likeDataArray
                    .filter(item => item.memberId === userInfo.personId && item.likeCheck === 1)
                    .map(item => item.projectIdx);

                const projectIdxSet = new Set(projectIdxArray);
                const uniqueProjectIdxArray = Array.from(projectIdxSet);

                if (uniqueProjectIdxArray.includes(projectIdx)) {
                    setIconCheck(!iconCheck);
                }
            })
            .catch((error) => {
                console.log("plus view error message :::" + error)
            })

        axios.post('http://localhost:8080/simServer/getMyMatchingList', null, {
            params: {
                matcingMemberNick: userInfo.personNickName
            }
        })
            .then(res => {
                setJoinMember(res.data.filter(item => item.matchingMemberAccept === "3").length);
            })
            .catch((error) => {

            });
    }, []);

    useEffect(() => {

    }, [reRender])
    const cancelRequest = () => {
        let status;
        switch (matchingStatus) {
            case "1" :
                status = "[응답 대기중]";
                break;

            case "3" :
                status = "[요청 수락됨]";
                break;
        }
        if (window.confirm("정말 요청을 취소하시겠습니까?\n" +
            `현재 상태 : ${status}`)) {
            axios.post('http://localhost:8080/simServer/cancelRequest', null, {
                params: {
                    matchingIdx: matchingIdx
                }
            })
                .then(res => {
                    alert("취소되었습니다.");
                    props.fetchUpdateData();
                    setReRender(1);
                })
                .catch((error) => {

                });
        }
    };

    return (
        <div className={' col-sm-6 p-5 text-start'}>
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
                            <Col sm={2}>
                                <div className={"float-end "}>
                                <span onClick={() => likeProject(projectIdx)}>
                                    {/* (비회원일떄) ? (모달창으로 회원전용입니다.) : (회원일떄) ? (참일떄): (거짓일떄) */}
                                    {
                                        iconCheck ?
                                            (<i className="bi bi-heart-fill text-danger theme-font fs-2 ms-2"></i>)
                                            :
                                            (<i className="bi bi-heart theme-font fs-2 ms-2"></i>)
                                    }
                                </span>
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className={"float-start mt-2"}>
                                    <span>
                                        {likeCount}
                                   </span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col sm={5}>
                            <div className={"mb-5"}>
                                {
                                    projectFull !== "Y"
                                        ? <span
                                            className={"text-start d-block theme-font"}>인원 : {joinMember}명 / {projectMember}명<br/></span>
                                        : <span className={' d-block py-4'}></span>
                                }

                            </div>
                            <div className={"d-flex"}>
                                <div className={
                                    projectFull === "Y" || projectFinish === "Y"
                                        ? "mt-5"
                                        :
                                        'mt-5 pt-3'
                                }>
                                <span
                                    className={"mt-5 text-start bg-danger-subtle rounded-1 theme-font fw-bold"}>{projectLanguage}</span>
                                </div>
                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className={"mt-1 ms-5"}>
                                <span className={"d-block theme-font fw-bold text-end"}>참여 레벨</span><br/>
                                <span className={"d-block theme-font text-end"}>Lv.{projectLevel}</span>
                            </div>
                            <div className={"mt-5 text-end"}>
                                {projectFinish === "Y"
                                    ? <h5>
                                        <Link type={'button'} className={'theme-btn text-decoration-none'}
                                              to={`/pi/projectBoard/${projectIdx}`}>프로젝트 보기</Link>
                                    </h5>
                                    :
                                    matchingStatus === "3"
                                        ? projectFull === "Y"
                                            ?
                                            <h5>
                                                <Link type={'button'} className={'theme-btn text-decoration-none'}
                                                      to={`/pi/projectBoard/${projectIdx}`}>프로젝트 관리</Link>
                                            </h5>
                                            :
                                            <>
                                                <h5 className={"text-success"}>요청 수락됨</h5>
                                                <button className={'theme-btn fs-5'} onClick={cancelRequest}>요청 취소</button>
                                            </>

                                        :
                                        <>
                                            <h5 className={"text-danger"}>응답 대기중</h5>
                                            <button className={'theme-btn fs-5'} onClick={cancelRequest}>요청 취소</button>
                                        </>

                                }
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyJoinProjectCard;