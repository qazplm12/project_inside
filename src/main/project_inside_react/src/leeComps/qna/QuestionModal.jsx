import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CodeEditor from "../solved/CodeEditor";
import axios from "axios";

function QuestionModal(props) {
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');

    const idx = props.idx;

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const handleSubmit = (e) => {
        const requestData = {
            idx: idx,
            userNick: 'testNick',
            language: language,
            code: code,
            title: title,
            content: questionContent,
        };

        axios.post(`http://localhost:8080/server/Question`, requestData)
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
                    질문을 입력하세요
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>질문 내용</h5>
                <input type="text" className={'form-control mt-3'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'제목을 입력하세요'}/>
                <textarea className={'form-control mt-3'} cols="30" rows="5" value={questionContent} onChange={(e) => setQuestionContent(e.target.value)} placeholder={`내용을 입력하세요`}></textarea>
                <div className={'d-flex mt-3'}>
                    <h5 className={'me-auto mt-2 align-middle'}>질문 코드</h5>
                    <select name="" id="" className={'btn btn-secondary text-start'} value={language} onChange={handleSelect}>
                        <option value={'Java'} selected={true}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
                <CodeEditor setCode={setCode} sendSolvedContent={`코드를 입력하세요`}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuestionModal;