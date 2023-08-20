import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CodeEditor from "../solved/CodeEditor";
import AnswerModal from "./AnswerModal";
import QuestionModal from "./QuestionModal";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import AnswerBody from "./AnswerBody";

function QnA(props) {
    const [qnaList, setQnaList] = useState('');
    const [questionModalShow, setQuestionModalShow] = React.useState(false);
    const [AnswerModalShow, setAnswerModalShow] = React.useState(false);

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/server/QnAList?idx=${idx}`)
            .then(res => {
                // alert('통신 성공 : ' + res);
                console.log('통신 성공 : ' + res.data);
                setQnaList(res.data);
            })
            .catch(err => {
                alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }, []);

    const handleBack = (e) => {
        navigate(`/codeChallenge?idx=${idx}`);
    }

    return (
        <div className={'container-sm'}>
            <div className={'d-flex justify-content-end mt-3'}>
                <button className={'btn btn-secondary me-2'} onClick={handleBack}>문제 페이지로</button>
                <button className={'theme-btn'} onClick={() => setQuestionModalShow(true)}>질문 작성하기</button>
                <QuestionModal show={questionModalShow} onHide={() => setQuestionModalShow(false)} idx={idx} />
            </div>
            <hr/>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                        <div className={'d-flex flex-column ms-3 w-100'}>
                            <div className={'pb-2'}>
                                <span>질문 제목</span>
                            </div>
                            <div className={'d-flex justify-content-start'}>
                                <span className={'me-3'}><i className="bi bi-person-fill"></i> userNick</span>
                                <span className={'me-3'}><i className="bi bi-calendar-week"></i> 2023-08-19</span>
                                <span className={'me-3'}><i className="bi bi-chat-dots-fill"></i> 1</span>
                            </div>
                        </div>
                        <div className={'me-5'}>
                            <span className={'badge bg-secondary p-2'}>JavaScript</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p className={'text-start'}>아니 이개 외 않돼죠?</p>
                            <CodeEditor readOnly={true}/>
                        </div>
                        <hr className={'my-5'}/>
                        <div className={'d-flex justify-content-start mb-4'}>
                            <h5 className={'align-middle me-auto mb-0 mt-1'}>1 개의 답변</h5>
                            <button className={'btn btn-primary me-2'} onClick={() => setAnswerModalShow(true)}>답변 작성하기</button>

                            <AnswerModal show={AnswerModalShow} onHide={() => setAnswerModalShow(false)} idx={1} language={'JavaScript'} />
                        </div>
                        <div className={'d-flex'}>
                            <img src="/images/kazha.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                            <div className={'text-start ms-3'}>
                                <p className={'m-0'}><i className="bi bi-person-fill"></i> userNick</p>
                                <p className={'m-0'}><i className="bi bi-award"></i> Lv. 1</p>
                                <p className={'text-end'}><i className="bi bi-calendar-week"></i> 2023-08-19</p>
                            </div>
                        </div>
                        <p className={'text-start'}>그건 님이 바보이기 때문입니다 ㅋ.</p>
                        <CodeEditor readOnly={true}/>
                    </Accordion.Body>
                </Accordion.Item>
                {
                    qnaList.map((item, index) => {
                        return (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                                    <div className={'d-flex flex-column ms-3 w-100'}>
                                        <div className={'pb-2'}>
                                            <span>{item.questionTitle}</span>
                                        </div>
                                        <div className={'d-flex justify-content-start'}>
                                            <span className={'me-3'}><i className="bi bi-person-fill"></i> {item.questionNick}</span>
                                            <span className={'me-3'}><i className="bi bi-calendar-week"></i> {item.questionDate}</span>
                                            <span className={'me-3'}><i className="bi bi-chat-dots-fill"></i> 1</span>
                                        </div>
                                    </div>
                                    <div className={'me-5'}>
                                        <span className={'badge bg-secondary p-2'}>{item.questionLanguage}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <p className={'text-start'}>{item.questionTitle}</p>
                                        <CodeEditor language={item.questionLanguage} code={item.questionCode} readOnly={true}/>
                                    </div>
                                    <hr className={'my-5'}/>
                                    <div className={'d-flex justify-content-start mb-4'}>
                                        <h5 className={'align-middle me-auto mb-0 mt-1'}>1 개의 답변</h5>
                                        <button className={'btn btn-primary me-2'} onClick={() => setAnswerModalShow(true)}>답변 작성하기</button>
                                    </div>
                                    <AnswerBody questionIdx={item.questionIdx}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })
                }
                <AnswerModal show={AnswerModalShow} onHide={() => setAnswerModalShow(false)} idx={1} language={'JavaScript'} />
            </Accordion>
        </div>
    )
}

export default QnA;