import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactQuill from "react-quill";

function ToyDetail(props) {

    const {projectIdx} = useParams();
    const [toyProject, setToyProject] = useState([])


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

    return (
        <Container>
            {/* 썸내일 */}
            <Row className={"my-5"}>
                <Col sm={8} className={"mx-auto d-block"}>
                    <img src={"/images/thumbnail/" + toyProject.projectThumbnail} className={"w-100 h-100"}/>
                </Col>
            </Row>
            {/* 프로젝트 기본 정보및 개설자 정보 */}
            <Row className={"my-5"}>
                <Col sm className={"pe-5 me-5"}>
                    <span className={"theme-font"}>프로젝트명 : {toyProject.projectTitle}   </span>
                    {/* {projectBoard.map(item =>(
                        <span key={item.id}>{item.projectTitle}</span>
                    ))} */}
                </Col>
                <Col sm>
                    {/*상항 연산자를 통해서 구현해 보기*/}
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-heart-fill"></i>
                </Col>
            </Row>
            {/*총 모집 인원 / 참여가능레벨 / 날짜 */}
            <Row className={"my-5"}>
                <Col sm>
                    <span className={"theme-font"}>총 모집 인원 : {toyProject.projectMember}</span>
                </Col>
                <Col sm>
                    <span className={"theme-font"}>참여 가능 레벨 : {toyProject.projectLevel}</span>
                </Col>
                <Col sm>
                    <span className={"theme-font"}>날짜 : {toyProject.projectDate}</span>
                </Col>
            </Row>
            {/* 기술스택 */}
            <Row>
                <Col sm className={"ps-3"}>
                    <p className={"theme-font "}>기술 스택 : {toyProject.projectLanguage}</p>

                </Col>
            </Row>
            <Row>
                <Col sm>
                    {/* <span><img src={""} /> </span> */}
                </Col>
            </Row>
            {/* 등록자 프로필 */}
            <Row>
                <span className={"theme-font"}>등록자 프로필</span>
            </Row>
            {/* 프로젝트 상세 내용 */}
            <Row>
                <Col>
                    <span className={"theme-font fs-3 fw-bold"}>프로젝트 내용</span>
                    <div>
                        <ReactQuill value={toyProject.projectContent} readOnly={true} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ToyDetail;