import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CodeEditor from "../solved/CodeEditor";
import AnswerModal from "./AnswerModal";
import QuestionModal from "./QuestionModal";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import AnswerBody from "./AnswerBody";

function QnA(props) {
    const [qnaList, setQnaList] = useState([]);
    const [questionIdx, setQuestionIdx] = useState('');
    const [questionLanguage, setQuestionLanguage] = useState('');
    const [questionModalShow, setQuestionModalShow] = React.useState(false);
    const [AnswerModalShow, setAnswerModalShow] = React.useState(false);

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/server/QnAList?idx=${idx}`)
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' + res.data);
                setQnaList(res.data);
            })
            .catch(err => {
                alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }, [questionModalShow, AnswerModalShow]);

    const handleBack = (e) => {
        navigate(`/codeChallenge?idx=${idx}`);
    }

    return (
        <div className={'container-sm'}>
            <div className={'d-flex justify-content-end mt-3'}>
                <button className={'btn btn-secondary me-2'} onClick={handleBack}>문제 페이지로</button>
                <button className={'theme-btn'} onClick={() => setQuestionModalShow(true)}>질문 작성하기</button>
            </div>
            <hr/>
            <Accordion defaultActiveKey="0">
                {
                    qnaList.map((item, index) => {
                        return (
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>
                                    <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                                    <div className={'d-flex flex-column ms-3 w-100'}>
                                        <div className={'pb-2'}>
                                            <span>{item.questionTitle}</span>
                                        </div>
                                        <div className={'d-flex justify-content-start'}>
                                            <span className={'me-3'}><i className="bi bi-person-fill"></i> {item.questionNick}</span>
                                            <span className={'me-3'}><i className="bi bi-calendar-week"></i> {item.questionDate}</span>
                                            <span className={'me-3'}><i className="bi bi-chat-dots-fill"></i> {item.questionCount}</span>
                                        </div>
                                    </div>
                                    <div className={'me-5'}>
                                        <span className={'badge bg-secondary p-2'}>{item.questionLanguage}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <p className={'text-start'}>{item.questionContent}</p>
                                        <CodeEditor language={item.questionLanguage} code={item.questionCode} readOnly={true}/>
                                    </div>
                                    <hr className={'my-5'}/>
                                    <div className={'d-flex justify-content-start mb-4'}>
                                        <h5 className={'align-middle me-auto mb-0 mt-1'}>{item.questionCount} 개의 답변</h5>
                                        <button className={'btn btn-primary me-2'} onClick={() => {
                                            setQuestionIdx(item.questionIdx)
                                            setQuestionLanguage(item.questionLanguage)
                                            setAnswerModalShow(true)
                                        }}>답변 작성하기</button>
                                    </div>
                                    <AnswerBody questionIdx={item.questionIdx} AnswerModalShow={AnswerModalShow} />
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })
                }
                <QuestionModal questionModalShow={questionModalShow} setQuestionModalShow={setQuestionModalShow} idx={idx} />
                <AnswerModal AnswerModalShow={AnswerModalShow} setAnswerModalShow={setAnswerModalShow} idx={questionIdx} language={questionLanguage} />
            </Accordion>
        </div>
    )
}

export default QnA;