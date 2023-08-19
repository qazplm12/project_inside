import React, {useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import RequestMember from "./RequestMember";
import axios from "axios";

function MyJoinProjectCard(props) {

    const {projectTitle, projectThumbnail, projectIdx, projectLanguage,projectMember} = props.toyProject;
    const [iconCheck, setIconCheck] = useState(false);
    const [recruitMent, setRecruitMent] = useState(false);

    const likeProject = (e) => {
        setIconCheck(!iconCheck);
    }

    const recruitMentChange = (e) =>{
        setRecruitMent(!recruitMent);
    }


    return (
        <div className={'col-sm-6 p-5 text-start'}>
            <Card className={"ms-3"} key={projectIdx}>
                <Card.Header className={"p-0"}>
                    <Card.Img variant="top" src={"/images/thumbnail/" + projectThumbnail} className={"cardImg "}/>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <Col sm={6} className={"float-start"}>
                            <div className={"fw-bold text-start"}>
                            <span className={"theme-font"}>
                                {projectTitle}
                            </span>
                            </div>
                        </Col>
                        <Col sm={6} className={"float-end"}>
                            <div className={"text-center mb-5 pb-3"}>
                                <span onClick={likeProject}>
                                {iconCheck ? (
                                    <i className="bi bi-heart theme-font fs-2 ms-2"></i>

                                ) : (
                                    <i className="bi bi-heart-fill text-danger theme-font fs-2  ms-2"></i>
                                )}
                                </span>
                            </div>
                        </Col>
                    </Card.Title>
                    <Col sm={6} className={"float-start"}>
                        <div className={"mb-5"}>
                            <span className={"text-start d-block theme-font"}>참여 인원 / 총 인원<br/>(0/{projectMember})</span>
                        </div>
                        <div className={"d-flex"}>
                            <span className={"text-start bg-danger-subtle rounded-1 theme-font fw-bold"}>{projectLanguage}</span>
                        </div>
                    </Col>
                    <Col sm={6} className={"float-end"}>
                        <div className={"mt-3"}>
                        <span className={"text-success-emphasis "} onChange={recruitMentChange} >
                            {recruitMent ? ("모집 완료") : ("모집 중")}
                        </span>
                        </div>
                    </Col>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyJoinProjectCard;