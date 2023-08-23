import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import toyStyles from "../../toyStyles.css";

function Thumbnail(props) {
    const {projectTitle, projectThumbnail, projectIdx, projectLanguage,projectMember,projectLike,projectLevel} = props.toyProject;
    const [iconCheck, setIconCheck] = useState(true);
    const [recruitMent, setRecruitMent] = useState(true);
    const [likeCount, setLikeCount] = useState(projectLike);
    const [toyIdx, setToyIdx] =useState('')
    const updatedLikeCount = iconCheck ? likeCount - 1 : likeCount + 1;

    useEffect(() => {
        likeProject(projectIdx);
    }, [projectIdx]);

    const likeProject = (projectIdx) => {
        const updatedLikeCount = iconCheck ? (likeCount - 1) : (likeCount + 1);

        if (iconCheck) {
            console.log(`projectIdx:: projectIdx`);
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
                    setLikeCount(updatedLikeCount);
                    setIconCheck(!iconCheck);
                })
                .catch((error) => {
                    console.log('좋아요 -1 전송을 위한 플래그 실패');
                });
        }
        else {
            console.log('진실');
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
        }
    };




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
                                    {iconCheck ? (
                                        <i className="bi bi-heart-fill text-danger theme-font fs-2 ms-2"></i>
                                    ) : (
                                        <i className="bi bi-heart theme-font fs-2 ms-2"></i>
                                    )}
                                </span>
                                </div>
                            </Col>
                            <Col sm={2} >
                                <div className={"float-start mt-2"}>
                                    <span>
                                        {iconCheck ? (projectLike + 1) : (projectLike - 1)}
                                       </span>
                                </div>
                            </Col>
                    </Row>
                </Card.Title>
                <Row>
                    <Col sm={6}>
                        <div className={"mb-5"}>
                            <span className={"text-start d-block theme-font"}>인원 : 0명 / {projectMember}명<br/></span>
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
                                {recruitMent ?
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