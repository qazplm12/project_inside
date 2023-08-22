import React, {useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import RequestMember from "./RequestMember";
import axios from "axios";

function MyProjectCard(props) {

    const {projectTitle, projectThumbnail, projectIdx, projectLanguage,projectMember} = props.toyProject;

    const [hiddenMode, setHiddenMode] = useState(true);
    const [requestMembers, setRequestMembers] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getRequestMembers", null )
            .then((res) => {
                // 로그인 된 계정의 닉네임과 비교
                // setData(res.data.filter(item => item.projectLeaderId === ))
                // setRequestMembers()
            })
            .catch((error) => {

            });
    }, []);

    const modeHandler = () => {
        setHiddenMode(!hiddenMode);
    }

    return (
        <div className={'col-sm p-5 text-start d-flex'}>
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
                        <div className={"mt-5 ms-3"}>
                            <button className={'theme-btn'}
                            onClick={modeHandler}>참여 요청 확인</button>
                        </div>
                    </Col>
                </Card.Body>
            </Card>
            <div className={'col-1'}>

            </div>
            <div hidden={hiddenMode} className={'shadow px-5 mb-3'}
            style={{overflowY : 'scroll',
                maxHeight : '45vh'
            }}
            >
                <h4 className={'text-start mt-2'}>참여 요청</h4>
                {/* 맵 합수 사용*/}
                <RequestMember />
                <RequestMember />
                <RequestMember />
                <RequestMember />
                <RequestMember />
            </div>
        </div>
    )
}

export default MyProjectCard;