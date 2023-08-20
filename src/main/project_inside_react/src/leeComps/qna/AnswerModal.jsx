import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CodeEditor from "../solved/CodeEditor";
import axios from "axios";

function AnswerModal(props) {
    const [solvedContent, setSolvedContent] = useState('');
    const [code, setCode] = useState('');

    const idx = props.idx;
    const language = props.language;

    const handleSubmit = (e) => {
        const requestData = {
            idx: idx,
            userNick: 'testNick',
            language: language,
            code: code,
            content: solvedContent,
        };

        axios.post(`http://localhost:8080/server/Answer`, requestData)
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' + res);
            })
            .then(err => {
                alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }

    return (
        <Modal
            {...props}
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
                <textarea className={'form-control'} cols="30" rows="5" value={solvedContent} onChange={(e) => setSolvedContent(e.target.value)} placeholder={`내용을 입력하세요`}></textarea>
                <h5 className={'mt-3'}>답변 코드</h5>
                <CodeEditor setCode={setCode} sendSolvedContent={`코드를 입력하세요`}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AnswerModal;