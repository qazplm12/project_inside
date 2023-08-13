import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";
import theme from "../../theme.css";
import TypeSearchProject from "./TypeSearchProject";

function ToyListBoard(props) {

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
            <Row>
                {/*  3개 씩 리스트 뿌려 주기  이건 컴포 넌트 를 통해서 만들기*/}
                    <Thumbnail />
            </Row>
        </Container>
    )

}

export default ToyListBoard;