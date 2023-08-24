import React, {useEffect, useState} from 'react';
import {Button, Form, FormSelect, Modal} from "react-bootstrap";
import axios from "axios";
import DisabledButton from "../../commons/DisabledButton";

function Inquiry(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // 유효성 검사를 위한 state
    const [disabled, setDisabled] = useState(true);

    //  카테고리 종류
    const categoryList = [
        "계정",
        "알고리즘 문제",
        "풀이 채점",
        "프로젝트 생성 / 참여",
        "기타",
    ]

    // 유효성 검사 / 모든 내용을 충족 시켜야 버튼 disabled가 풀림
    useEffect(() => {

        if (title.length > 0 && (category >= 0 && category !== "") && content.length > 0) {
            setDisabled(false);
            console.log('통과')
        } else {
            setDisabled(true);
        }
    }, [title, category, content]);

    const sendInquiry = () => {

        axios.post('http://localhost:8080/simServer/sendInquiry', null, {
            params: {
                // 사용자 정보도 보내야함
                personNickName: userInfo.personNickName,
                inquiryTitle: title,
                inquiryCategory: category,
                inquiryContent: content,
            }
        })
            .then((resp) => {
                alert('문의 작성 완료')
                handleClose()
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleClose = () => {
        props.showHandler();
    }

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
                             defaultValue={null}
                >
                    <option>문의 종류를 선택해주세요</option>
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
                <button className={'theme-outline-btn'} onClick={handleClose}>
                    닫기
                </button>
                <DisabledButton onClick={sendInquiry} btnText={'작성'} disabled={disabled}/>
            </Modal.Footer>
        </Modal>
    );
}

export default Inquiry;