import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import ProjectDate from "./ProjectDate";

function ToyDetail(props) {

    const {projectIdx} = useParams();
    const [toyProject, setToyProject] = useState([]);
    const [likeProject, setLikeProject] =useState(false);

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

        if (!likeProject) {
            alert('참여 신청을 하였습니다.');
            // axios.post(`http://localhost:8080/pi/toyProject/projectApplication`)
            //     .then(response=>{
            //
            //     })
            //     .catch((error) =>{
            //
            //     })
        } else {
            alert('참여 신청을 취소하셨습니다.');
            // axios.post(`http://localhost:8080/pi/toyProject/projectCancel`)
            //     .then(response=>{
            //
            //     })
            //     .catch((error) =>{
            //
            //     })
        }
    }

    return (
        <Container>
            {/* 썸내일 */}
            <Row className={"my-5"}>
                <Col sm={8} className={"mx-auto d-block"}>
                    <div className={"p-2 "}>
                        <img src={"/images/thumbnail/" + toyProject.projectThumbnail} className={"w-100 h-75  rounded-5"}/>
                    </div>
                </Col>
            </Row>
            {/* 프로젝트 기본 정보및 개설자 정보 */}
            <Row className={"py-5 border border-1 rounded-4 mx-auto rounded-1"}>
                <Col sm={6} className={""}>
                        <span className={"theme-font"}>프로젝트명 : {toyProject.projectTitle}   </span>
                    {/* {projectBoard.map(item =>(
                        <span key={item.id}>{item.projectTitle}</span>
                    ))} */}
                </Col>
                <Col sm={6}>
                    <div>
                        <span className={"fs-3"} onClick={projectLike}>
                        {likeProject ? (
                            <i className="bi bi-heart-fill text-danger theme-font fs-2 ms-2"></i>
                            ) : (
                            <i className="bi bi-heart theme-font fs-2 ms-2"></i>
                        )}
                        </span>
                    </div>
                </Col>
            </Row>
            {/*총 모집 인원 / 참여가능레벨 / 날짜 */}
            <Row className={"py-5 border border-1 rounded-4 mx-auto rounded-1 mt-2"}>
                <Col sm={6}>
                    <div>
                        <span className={"theme-font text-start"} >총 모집 인원 : {toyProject.projectMember} 명</span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span className={"theme-font text-center"}>참여 가능 레벨 : {toyProject.projectLevel}</span>
                    </div>
                </Col>
                <Col sm={6}>
                    <div>
                        <span className={"theme-font text-center"}>날짜 :<ProjectDate date={toyProject.projectDate}/></span><br/>
                    </div>
                    <div className={"mt-4"}>
                        <span className={"theme-font text-center "}>기술 스택 : {toyProject.projectLanguage}</span>
                    </div>
                </Col>
            </Row>
            {/* 등록자 프로필 */}
            <Row className={"py-5 border border-1 rounded-4 mx-auto rounded-1 mt-2"}>
                <span className={"theme-font"}>등록자 프로필</span>
            </Row>
            {/* 프로젝트 상세 내용 */}
            <Row>
                <Col>
                    <div className={"mt-5"}>
                        <span className={"theme-font fs-3 fw-bold"}>프로젝트 내용</span>
                    </div>
                    <div>
                        <ReactQuill value={toyProject.projectContent} readOnly={true} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ToyDetail;