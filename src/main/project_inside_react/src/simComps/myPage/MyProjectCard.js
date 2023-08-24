import React, {useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import RequestMember from "./RequestMember";
import axios from "axios";

function MyProjectCard(props) {


    const {projectTitle, projectThumbnail, projectIdx, projectLanguage, projectMember} = props.myProject;

    const [hiddenMode, setHiddenMode] = useState(true);
    const [leader, setLeader] = useState("");
    const [requestMembers, setRequestMembers] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getRequestMembers", null, {
            params: {
                matchingProjectIdx : projectIdx
            }
        } )
            .then((res) => {
                setRequestMembers(res.data.filter(item => item.matchingMemberAccept === "1"));
            })
            .catch((error) => {

            });
    }, []);

    const modeHandler = () => {
        setHiddenMode(!hiddenMode);
    }

    return (
        <div className={'col-sm p-2 text-start d-flex'}>
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
                            <span className={"text-start d-block theme-font"}>참여 인원 / 총 인원<br/>({requestMembers.length}/{projectMember})</span>
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
            <div className={'mx-2'}>

            </div>
            <div hidden={hiddenMode} className={'col-sm px-5 mb-1'}
            style={{overflowY : 'scroll',
                maxHeight : '45vh'
            }}
            >
                <h4 className={'text-start mt-2'}>참여 요청</h4>
                {/* 맵 합수 사용*/}
                {/*<RequestMember memberInfo={item.memberInfo}/>*/}
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