import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CodeEditor from "../solved/CodeEditor";
import axios from "axios";

function QuestionModal(props) {
    const [show, setShow] = useState(false);
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    const idx = props.idx;

    useEffect(() => {
        setShow(props.questionModalShow);
    }, [props.questionModalShow]);

    const handleClose = () => {
        setShow(false);
        props.setQuestionModalShow(false);
    };

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const handleSubmit = (e) => {
        const requestData = {
            idx: idx,
            userNick: userInfo.personNickName,
            language: language,
            code: code,
            title: title,
            content: questionContent,
        };

        axios.post(`http://localhost:8080/server/Question`, requestData)
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' + res);
                setShow(false); // 비동기 통신이기 때문에 axios 밖에 있으면 제대로 업뎃이 되지 않음.(아니면 async await 써야함)
                props.setQuestionModalShow(false);
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
                    질문을 입력하세요
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>질문 내용</h5>
                <input type="text" className={'form-control mt-3'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'제목을 입력하세요'}/>
                <textarea className={'form-control mt-3'} cols="30" rows="5" value={questionContent} onChange={(e) => setQuestionContent(e.target.value)} placeholder={`내용을 입력하세요`}></textarea>
                <div className={'d-flex mt-3'}>
                    <h5 className={'me-auto mt-2 align-middle'}>질문 코드</h5>
                    <select name="" id="" className={'theme-select text-start'} value={language} onChange={handleSelect}>
                        <option value={'Java'} selected={true}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
                <CodeEditor setCode={setCode} code={`코드를 입력하세요`}/>
            </Modal.Body>
            <Modal.Footer>
                <button className={"theme-outline-btn"} onClick={handleClose}>취소</button>
                <button className={'theme-btn'} onClick={handleSubmit}>확인</button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuestionModal;