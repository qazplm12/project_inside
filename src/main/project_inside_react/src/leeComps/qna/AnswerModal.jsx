import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CodeEditor from "../solved/CodeEditor";
import axios from "axios";

function AnswerModal(props) {
    const [show, setShow] = useState(false);
    const [answerContent, setAnswerContent] = useState('');
    const [code, setCode] = useState('');

    const idx = props.idx;
    const language = props.language;

    useEffect(() => {
        setShow(props.AnswerModalShow);
    }, [props.AnswerModalShow]);

    const handleClose = () => {
        setShow(false);
        props.setAnswerModalShow(false);
    };

    const handleSubmit = (e) => {
        const requestData = {
            idx: idx,
            userNick: 'testNick',
            language: language,
            code: code,
            content: answerContent,
        };

        axios.post(`http://localhost:8080/server/Answer`, requestData)
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' +
                setShow(false); // 비동기 통신이기 때문에 axios 밖에 있으면 제대로 업뎃이 되지 않음.(아니면 async await 써야함)
                props.setAnswerModalShow(false);
            })
            .then(err => {
                // alert('통신 실패 : ' + err);
                // console.log('통신 실패 : ' + err);   // 코드 에디터의 useCallback 때문에 통신이 한번만 돼서 처음꺼만 들어가지고 두번째꺼는 안들어가지는듯
            })
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    답변을 입력하세요
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>답변 내용</h5>
                <textarea className={'form-control'} cols="30" rows="5" value={answerContent} onChange={(e) => setAnswerContent(e.target.value)} placeholder={`내용을 입력하세요`}></textarea>
                <h5 className={'mt-3'}>답변 코드</h5>
                <CodeEditor setCode={setCode} code={`코드를 입력하세요`}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AnswerModal;