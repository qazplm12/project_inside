import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import TypeAheadProject from "./TypeAheadProject";
import Thumbnail from "./Thumbnail";
import theme from "../../theme.css";
import TypeSearchProject from "./TypeSearchProject";

function ToyListBoard(props) {

    return (
        <Container>
            <Row className={"justify-content-end"}>
                {/* 최신 순 / 좋아요 순 / 검색창 */}
                <Col sm>
                    <ButtonGroup>
                        <Button classNvame={'theme-btn'}>최신순</Button>
                        <Button className={'theme-btn ms-3'}>좋아요 순</Button>
                    </ButtonGroup>
                </Col>
                <Col sm>
                    <TypeSearchProject />
                </Col>
            </Row>
            <Row>
                {/*  3개 씩 리스트 뿌려 주기  이건 컴포 넌트 를 통해서 만들기*/}
                    <Thumbnail />
            </Row>
        </Container>
    )

}

export default ToyListBoard;