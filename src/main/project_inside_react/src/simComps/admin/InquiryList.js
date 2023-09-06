import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Pagination, Table} from "react-bootstrap";
import axios from "axios";
import DisabledButton from "../commons/DisabledButton";

const inquirysPerPage = 7; // 한 페이지에 표시할 문의 수

const categoryList = [
    "계정",
    "알고리즘 문제",
    "풀이 채점",
    "프로젝트 생성 / 참여",
    "기타",
]

function InquiryList(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));
    const [inquiryList, setInquiryList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 유저 리스트 계산
    const indexOfLastInquiry = currentPage * inquirysPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - inquirysPerPage;
    const currentInquiry = inquiryList.slice(indexOfFirstInquiry, indexOfLastInquiry);

    // 모달 관련
    const [target, setTarget] = useState(null);
    const [show, setShow] = useState(false);

    const [answer, setAnswer] = useState("");

    useEffect(() => {
        axios.post('http://localhost:8081/simServer/getInquiryList', null, {
            params: {
                personNickName: userInfo.personId,
            }
        })
            .then((resp) => {
                setInquiryList(resp.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [])

    const sendAnswer = () => {

        axios.post('http://localhost:8081/simServer/sendInquiryAnswer', null, {
            params: {
                personNickName: userInfo.personId,
                inquiryTitle : target.inquiryTitle,
                inquiryIdx: target.inquiryIdx,
                inquiryAnswer: answer,
                inquiryPersonNick: target.inquiryPersonNick,
            }
        })
            .then((resp) => {
                setInquiryList(resp.data);
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
            <Table style={{fontSize: "12px"}}>
                <colgroup>
                    <col width={"8%"}/>
                    <col width={"18%"}/>
                    <col width={"20%"}/>
                    <col/>
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
                    <th>상태</th>
                    {/* 다른 필드들도 추가 */}
                </tr>
                </thead>
                <tbody>
                {currentInquiry.map((inquiry, index, array) => (
                    <tr key={index}>
                        <td className={'py-3'}>
                            {inquiry.inquiryIdx}
                        </td>
                        <td className={'py-3'}>{inquiry.inquiryDt}</td>
                        <td className={'py-3'}>
                            {
                                inquiry.inquiryCategory === 0 ? categoryList[0] :
                                    inquiry.inquiryCategory === 1 ? categoryList[1] :
                                        inquiry.inquiryCategory === 2 ? categoryList[2] :
                                            inquiry.inquiryCategory === 3 ? categoryList[3] :
                                                inquiry.inquiryCategory === 4 ? categoryList[4] : ""
                            }
                        </td>
                        <td className={'py-3'}><a className={'theme-link'} onClick={
                            () => setTarget(array[index])
                        }>{inquiry.inquiryTitle}</a>
                        </td>
                        <td className={'py-3'}>{inquiry.inquiryPersonNick}</td>
                        <td className={'py-3'}>{
                            inquiry.inquiryStatus === "1"
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
                        <Modal.Title>{target ? target.inquiryTitle : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'pb-5'}>
                        {/* 글이 길면 넘어가짐*/}
                        {target ? target.inquiryContent : ""}
                        <div className={'text-muted me-3 position-absolute'} style={{top: "0px", right: "0px"}}>
                            <small>
                                <p className={'text-end mb-0'}>{target ? target.inquiryDt : ""} (문의 종류 : <span className={'text-end'}>
                                                                    {target ?
                                                                        target.inquiryCategory === 0 ? categoryList[0] :
                                                                            target.inquiryCategory === 1 ? categoryList[1] :
                                                                                target.inquiryCategory === 2 ? categoryList[2] :
                                                                                    target.inquiryCategory === 3 ? categoryList[3] :
                                                                                        target.inquiryCategory === 4 ? categoryList[4] : ""
                                                                        : ""
                                                                    }
                                    )</span></p>
                                <p className={'text-end mb-0'}>{target ? target.inquiryPeronNick : ""}</p>

                            </small>
                        </div>
                    </Modal.Body>

                    {/* 문의 답변*/}
                    <Modal.Body className={'border-top'}>
                        {
                            target ? target.inquiryStatus === "1" ? ""
                                    : <h4>답변 내용</h4>
                                :<h4>답변 작성</h4>
                        }
                        <Form.Control
                            as="textarea"
                            style={{height: '100px'}}
                            onChange={e => setAnswer(e.target.value)}
                            // 답변 완료된 상태면 readOnly
                            readOnly={target ? target.inquiryStatus !== "1" : false}
                        >
                            {target ? target.inquiryStatus === "1" ? "" : target.inquiryAnswer : ""}
                        </Form.Control>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className={'theme-outline-btn'} onClick={handleClose}>
                            닫기
                        </button>
                        <DisabledButton onClick={sendAnswer} btnText={'답변'} disabled={target ? target.inquiryStatus === "1" ? "" : "disabled" : ""}/>
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
                {Array.from({length: Math.ceil(inquiryList.length / inquirysPerPage)}, (_, index) => {
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
                    currentPage + 1 < Math.ceil(inquiryList.length / inquirysPerPage)
                        ? () => handlePageChange(currentPage + 1)
                        : () => handlePageChange(Math.ceil(inquiryList.length / inquirysPerPage))
                }/>
                <Pagination.Last
                    onClick={() => handlePageChange(Math.ceil(inquiryList.length / inquirysPerPage))}/>
            </Pagination>
        </div>
    );
}

export default InquiryList;