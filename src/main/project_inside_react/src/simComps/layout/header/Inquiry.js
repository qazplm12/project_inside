import React, {useEffect, useState} from 'react';
import {Button, Form, FormSelect, Modal} from "react-bootstrap";
import axios from "axios";

function Inquiry(props) {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    //  카테고리 종류
    const categoryList = [
        "문제",
        "프로젝트",
        "카테고리3",
        "카테고리4",
        "카테고리5",
    ]

    const sendInquiry = () => {
        // 유효성 검사 빈칸 예외

        axios.post('http://localhost:8080/simServer/sendInquiry', null, {
            params: {
                // 사용자 정보도 보내야함
                inquiryTitle: title,
                inquiryCategory: category,
                inquiryContent: content,
            }
        })
            .then((resp) => {
                setShow(false);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleClose = () => {
        props.showHandler();
    }
    const handleShow = () => setShow(true);

    return (
        <Modal
            size={'lg'}
            show={props.show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>문의하기</Modal.Title>
            </Modal.Header>
            {/* 카테고리 선택 리스트 사용*/}
            <Modal.Body className={'border-top pt-4 pb-2'}>
                <h6>카테고리</h6>
                <Form.Select className="me-2"
                             onChange={e => setCategory(e.target.value)}
                >
                    {categoryList.map((item, index) => (
                        <option key={index} value={index}>{item}</option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Body className={'pb-2'}>
                <h6>문의 제목</h6>
                <Form.Control
                    as="input"
                    type={'text'}
                    onChange={e => setTitle(e.target.value)}
                />
            </Modal.Body>
            <Modal.Body className={'pb-5'}>
                <h6>문의 내용</h6>
                <Form.Control
                    as="textarea"
                    style={{height: '100px'}}
                    onChange={e => setContent(e.target.value)}
                />
            </Modal.Body>

            {/* 문의 작성*/}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button type={'button'} variant="primary" onClick={sendInquiry}>작성</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Inquiry;