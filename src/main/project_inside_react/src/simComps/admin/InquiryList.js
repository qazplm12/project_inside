import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Pagination, Table} from "react-bootstrap";
import axios from "axios";

const inquirysPerPage = 7; // 한 페이지에 표시할 문의 수


const dummyInquiryList = [
    {
        idx : 1,
        category: "문제 풀이1",
        inquiryDt: "2023-08-10",
        title: "문의 제목1",
        content: "문의 내용1",
        nick: "문의자 닉네임1",
    }, {
        idx : 2,
        category: "문제 풀이2",
        inquiryDt: "2023-08-10",
        title: "문의 제목2",
        content: "문의 내용2",
        nick: "문의자 닉네임2",
    }, {
        idx : 3,
        category: "문제 풀이3",
        inquiryDt: "2023-08-10",
        title: "문의 제목3",
        content: "문의 내용3",
        nick: "문의자 닉네임3",
    }, {
        idx : 4,
        category: "문제 풀이4",
        inquiryDt: "2023-08-10",
        title: "문의 제목4",
        content: "문의 내용4",
        nick: "문의자 닉네임4",
    }, {
        idx : 5,
        category: "문제 풀이5",
        inquiryDt: "2023-08-10",
        title: "문의 제목5",
        content: "문의 내용5",
        nick: "문의자 닉네임5",
    }, {
        idx : 6,
        category: "문제 풀이6",
        inquiryDt: "2023-08-10",
        title: "문의 제목6",
        content: "문의 내용6",
        nick: "문의자 닉네임6",
    }, {
        idx : 7,
        category: "문제 풀이7",
        inquiryDt: "2023-08-10",
        title: "문의 제목7",
        content: "문의 내용7",
        nick: "문의자 닉네임7",
    }, {
        idx : 8,
        category: "문제 풀이8",
        inquiryDt: "2023-08-10",
        title: "문의 제목8",
        content: "문의 내용8",
        nick: "문의자 닉네임8",
    }, {
        idx : 9,
        category: "문제 풀이9",
        inquiryDt: "2023-08-10",
        title: "문의 제목9",
        content: "문의 내용9",
        nick: "문의자 닉네임9",
    },
]

function InquiryList(props) {

    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 유저 리스트 계산
    const indexOfLastInquiry = currentPage * inquirysPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - inquirysPerPage;
    const currentInquiry = dummyInquiryList.slice(indexOfFirstInquiry, indexOfLastInquiry);

    // 모달 관련
    const [target, setTarget] = useState(null);
    const [show, setShow] = useState(false);

    const [answer, setAnswer] = useState("");

    const sendAnswer = () => {
        axios.post('http://localhost:8080/simServer/sendAnswer', null, {
            params: {
                inquiryIdx: target.idx,
                inquiryAnswer: answer,
                inquiryPersonNick: target.nick,
            }
        })
            .then((resp) => {
                setShow(false);
            })
            .catch((err) => {
                alert(err);
            });
    }

    const handleClose = () => {
        setShow(false);
        setTarget(null);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (target != null) {
            handleShow();
        }
    }, [target]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Table style={{fontSize : "12px"}}>
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
                    <th>닉네임</th>
                    {/* 다른 필드들도 추가 */}
                </tr>
                </thead>
                <tbody>
                {currentInquiry.map((inquiry, index, array) => (
                    <tr key={index}>
                        <td className={'py-3'}>{inquiry.idx}</td>
                        <td className={'py-3'}>{inquiry.inquiryDt}</td>
                        <td className={'py-3'}>{inquiry.category}</td>
                        <td className={'py-3'}><a className={'theme-link'} onClick={
                            () => setTarget(array[index])
                        }>{inquiry.title}</a>
                        </td>
                        <td className={'py-3'}>{inquiry.nick}</td>
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
                        <h4>답변 작성</h4>
                        <Form.Control
                            as="textarea"
                            style={{ height: '100px' }}
                            onChange={e => setAnswer(e.target.value)}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button type={'button'} variant="primary" onClick={sendAnswer}>답변</Button>
                    </Modal.Footer>
                </Modal>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)}/>
                <Pagination.Prev onClick={
                    currentPage - 1 > 0
                        ? () => handlePageChange(currentPage - 1)
                        : () => handlePageChange(1)
                }/>
                {Array.from({length: Math.ceil(dummyInquiryList.length / inquirysPerPage)}, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    );
                })}
                <Pagination.Next onClick={
                    currentPage + 1 < Math.ceil(dummyInquiryList.length / inquirysPerPage)
                        ? () => handlePageChange(currentPage + 1)
                        : () => handlePageChange(Math.ceil(dummyInquiryList.length / inquirysPerPage))
                }/>
                <Pagination.Last
                    onClick={() => handlePageChange(Math.ceil(dummyInquiryList.length / inquirysPerPage))}/>
            </Pagination>
        </div>
    )
}

export default InquiryList;