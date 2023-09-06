import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import DisabledButton from "../commons/DisabledButton";

const categoryList = [
    "계정",
    "알고리즘 문제",
    "풀이 채점",
    "프로젝트 생성 / 참여",
    "기타",
]

function MyInquiry(props) {


    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    // 모달 관련
    const [target, setTarget] = useState(null);
    const [show, setShow] = useState(false);

    const [answer, setAnswer] = useState("")

    // 리스트
    const [myInquiryList, setMyInquiryList] = useState([]);

    const handleClose = () => {
        setShow(false);
        setTarget(null);
    };
    const handleShow = () => setShow(true)

    useEffect(() => {
        axios.post('http://localhost:8081/simServer/getInquiryList', null, {
            params: {
                personNickName: userInfo.personNickName,
            }
        })
            .then((resp) => {
                setMyInquiryList(resp.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [])


    const updateInquiry = () => {
        console.log(target.inquiryIdx);
        axios.post('http://localhost:8081/simServer/updateInquiry', null, {
            params: {
                inquiryIdx: target.inquiryIdx,
                personNickName: userInfo.personNickName,
                inquiryContent: answer,
            }
        })
            .then((resp) => {
                setMyInquiryList(resp.data);
                setShow(false);
                setTarget(null);
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
                    <col/>
                    <col/>
                    <col width={"40%"}/>
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
                {myInquiryList.length > 0
                    ?
                    myInquiryList.map((inquiry, index, array) => (

                        <tr key={index}>
                            <td className={'py-3'}>{index + 1}</td>
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
                            <td className={'py-3'}>{
                                inquiry.inquiryStatus === "1"
                                    ? <strong className={'text-danger'}>답변대기</strong>
                                    : <strong className={'text-success'}>답변완료</strong>
                            }</td>
                        </tr>
                    ))
                    : <tr>
                        <td colSpan={5}><h4 className={'py-3'}>문의사항이 없습니다.</h4></td>
                    </tr>
                }
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
                                <p className={'text-end  mb-0'}>{target ? target.inquiryDt : ""}</p>
                                <p className={'text-end'}>{target ? target.inquiryPersonNick : ""}</p>
                            </small>
                        </div>
                    </Modal.Body>

                    {/* 문의 답변*/}
                    <Modal.Body className={'border-top'}>
                        {
                            target ? target.inquiryStatus === "1"
                                    ? <h4>문의 내용 수정</h4>
                                    : <h4>답변 내용</h4>
                                : ""
                        }
                        <Form.Control
                            as="textarea"
                            style={{height: '100px'}}
                            onChange={e => setAnswer(e.target.value)}
                            // 답변 완료된 상태면 readOnly
                            readOnly={target ? target.inquiryStatus === "1" ? "" : "readOnly" : ""}
                        >
                            {target ? target.inquiryAnswer : ""}
                        </Form.Control>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className={'theme-outline-btn'} onClick={handleClose}>
                            닫기
                        </button>
                        <DisabledButton type={'button'} onClick={updateInquiry}
                                        btnText={'수정'} disabled={target ? target.inquiryStatus === "1" ? "" : "disabled" : ""} />
                    </Modal.Footer>
                </Modal>
            </Table>
        </div>
    )
}

export default MyInquiry;