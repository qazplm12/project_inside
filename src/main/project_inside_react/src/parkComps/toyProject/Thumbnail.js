import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import toyStyles from "./toyStyles.css";

function Thumbnail(props) {
    const {projectTitle, projectThumbnail, projectIdx, projectLanguage,projectMember,projectLike} = props.toyProject;
    const [iconCheck, setIconCheck] = useState(true);
    const [recruitMent, setRecruitMent] = useState(true);

    const likeProject = (e, projectIdx) => {
        if (iconCheck) {
            console.log('거짓');
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
        }
        else if(!iconCheck) {
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
                    setIconCheck(!iconCheck)
                })
                .catch((error) => {
                    console.log('좋아요 전송을 위한 플래그 실패');
                });
        }
    };


    useEffect((e, projectIdx) => {
        likeProject(e, projectIdx)
    }, []);

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
                                <span onClick={likeProject}>
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
                                    <span>{projectLike}</span>
                                </div>
                            </Col>
                    </Row>
                </Card.Title>
                <Row>
                    <Col sm={6}>
                        <div className={"mb-5"}>
                            <span className={"text-start d-block theme-font"}>참여 인원 / 총 인원<br/>(0/{projectMember})</span>
                        </div>
                        <div className={"d-flex"}>
                            <span className={"text-start bg-danger-subtle rounded-1 theme-font fw-bold"}>{projectLanguage}</span>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={"mt-5 pt-5 ms-5"}>
                            <span className={"text-success-emphasis "} onChange={recruitMentChange} >
                                {recruitMent ? ("모집 완료") : ("모집 중")}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
export default Thumbnail;