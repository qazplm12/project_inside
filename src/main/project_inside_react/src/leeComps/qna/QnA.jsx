import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CodeEditor from "../solved/CodeEditor";
import CodeEditorJavaScript from "../solved/CodeEditorJavaScript";
import AnswerModal from "./AnswerModal";

function QnA(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className={'container-sm'}>
            <div className={'d-flex justify-content-end mt-3'}>
                <button className={'btn btn-secondary me-2'}>문제 페이지로</button>
                <button className={'theme-btn'}>질문 작성하기</button>
            </div>
            <hr/>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                        <div className={'d-flex flex-column ms-3'}>
                            <div className={'pb-2'}>
                                <span>질문 제목</span>
                            </div>
                            <div className={'d-flex justify-content-start'}>
                                <span className={'me-3'}><i className="bi bi-person-fill"></i> userNick</span>
                                <span className={'me-3'}><i className="bi bi-calendar-week"></i> 2023-08-19</span>
                                <span className={'me-3'}><i className="bi bi-chat-dots-fill"></i> 1</span>
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p className={'text-start'}>아니 이개 외 않돼죠?</p>
                            <CodeEditorJavaScript/>
                        </div>
                        <hr className={'my-5'}/>
                        <div className={'d-flex justify-content-start mb-4'}>
                            <h5 className={'align-middle me-auto mb-0 mt-1'}>1 개의 답변</h5>
                            <button className={'btn btn-primary me-2'} onClick={() => setModalShow(true)}>답변 작성하기</button>

                            <AnswerModal show={modalShow} onHide={() => setModalShow(false)}/>
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
                        <CodeEditorJavaScript/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default QnA;