import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";


const myInquiryList = [
    {
        idx: 1,
        category: "문제 풀이1",
        inquiryDt: "2023-08-10",
        title: "문의 제목1",
        content: "문의 내용1",
        nick: "문의자 닉네임1",
        status: "2",
    }, {
        idx: 2,
        category: "문제 풀이2",
        inquiryDt: "2023-08-10",
        title: "문의 제목2",
        content: "문의 내용2",
        nick: "문의자 닉네임2",
        status: "1",
    }
]


function MyInquiry(props) {

    // 모달 관련
    const [target, setTarget] = useState(null);
    const [show, setShow] = useState(false);

    const [answer, setAnswer] = useState("")

    const handleClose = () => {
        setShow(false);
        setTarget(null);
    };
    const handleShow = () => setShow(true)

    const updateInquiry = () => {
        axios.post('http://localhost:8080/simServer/updateInquiry', null, {
            params: {
                inquiryIdx: target.idx,
                inquiryContent: answer,
            }
        })
            .then((resp) => {
                setShow(false);
            })
            .catch((err) => {
                alert(err);
            });
    }

    useEffect(() => {
        if (target != null) {
            handleShow();
        }
    }, [target]);


    return (
        <div className={'row m-2'}>
            <Table style={{fontSize: "12px"}}>
                <colgroup>
                    <col width={"8%"}/>
                    <col width={"18%"}/>
                    <col width={"20%"}/>
                    <col/>
                    <col/>
                    {/*<col width={'9%'}/>*/}
                </colgroup>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>날짜</th>
                    <th>종류</th>
                    <th>제목</th>
                    <th>상태</th>
                    {/* 다른 필드들도 추가 */}
                </tr>
                </thead>
                <tbody>
                {myInquiryList.map((inquiry, index, array) => (
                    <tr key={index}>
                        <td className={'py-3'}>{inquiry.idx}</td>
                        <td className={'py-3'}>{inquiry.inquiryDt}</td>
                        <td className={'py-3'}>{inquiry.category}</td>
                        <td className={'py-3'}><a className={'theme-link'} onClick={
                            () => setTarget(array[index])
                        }>{inquiry.title}</a>
                        </td>
                        <td className={'py-3'}>{
                            inquiry.status === "1"
                                ? <strong className={'text-danger'}>답변대기</strong>
                                : <strong className={'text-success'}>답변완료</strong>
                        }</td>
                    </tr>
                ))}
                </tbody>
                <Modal
                    size={'lg'}
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{target ? target.title : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'pb-5'}>
                        {/* 글이 길면 넘어가짐*/}
                        {target ? target.content : ""}
                        <div className={'text-muted me-3 position-absolute'} style={{top: "0px", right: "0px"}}>
                            <small>
                                <p className={'text-end  mb-0'}>{target ? target.inquiryDt : ""}</p>
                                <p className={'text-end'}>{target ? target.nick : ""}</p>
                            </small>
                        </div>
                    </Modal.Body>

                    {/* 문의 답변*/}
                    <Modal.Body className={'border-top'}>
                        {
                            target ? target.status === "1" 
                                ? <h4>문의 내용 수정</h4>
                                : <h4>문의 답변</h4>
                            : ""
                        }
                        <Form.Control
                            as="textarea"
                            style={{height: '100px'}}
                            onChange={e => setAnswer(e.target.value)}
                            // 답변 완료된 상태면 readOnly
                            readOnly={target ? target.status === "1" ? "" : "readOnly" : ""}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button type={'button'} variant="primary" onClick={updateInquiry}
                                disabled={target ? target.status === "1" ? "" : "disabled" : ""}>수정</Button>
                    </Modal.Footer>
                </Modal>
            </Table>
        </div>
    )
}

export default MyInquiry;