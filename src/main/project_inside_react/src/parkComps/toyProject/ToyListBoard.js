import {Button,  Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";
import theme from "../../theme.css";
import TypeSearchProject from "./TypeSearchProject";
import {useEffect, useState} from "react";
import axios from "axios";

function ToyListBoard(props) {

    const [toyProject, setToyProject] = useState([]);

    useEffect(() => {
        axios.get("pi/toyProject/ToyListBoard")
            .then((e) =>{
                setToyProject(e.data);
            })
            .catch((error) =>{
                console.log('전송실패'+error);
            })
    }, []);

    return (
        <Container>
            <Row >
                <Col className={"mt-3 d-inline d-flex justify-content-end"}></Col>
                <Col className={"mt-3 mb-3 d-inline  d-flex justify-content-end"}>
                    <Button>최신 순</Button>
                    <Button className={"ms-3"}>좋아요 순</Button>
                </Col>
                <Col sm className=" pb-3"><TypeSearchProject /></Col>
            </Row>
            <Row>
                {/*  3개 씩 리스트 뿌려 주기  이건 컴포 넌트 를 통해서 만들기*/}
                    <Thumbnail  />
            </Row>
        </Container>
    )

}

export default ToyListBoard;