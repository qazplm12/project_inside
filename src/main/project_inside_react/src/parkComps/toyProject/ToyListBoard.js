import {Button,  Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";
import {useEffect, useState} from "react";
import axios from "axios";
import TypeSearchProject from "./TypeSearchProject";
import theme from "../../theme.css";


function ToyListBoard(props) {

    const [toyProjects, setToyProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/pi/toyProject/ToyListBoard")
            .then(response => {
                setToyProjects(response.data);
            })
            .catch(error => {
                console.log('전송실패'+error);
            });
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
                {/* <Button type={"btn .theme-btn me-3"}>최신순</Button> */}
                {/* <Button type={"btn .theme-btn ms-3"}>좋아요 순</Button> */}
                {/* <TypeSearchProject /> */}
            </Row>
            <Row className={"justify-content-center"}>
                {toyProjects.map(toyProject => (
                        <Thumbnail toyProject={toyProject} />
                ))}
            </Row>
        </Container>
    );
}

export default ToyListBoard;