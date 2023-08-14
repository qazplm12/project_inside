import React, {useEffect, useState} from 'react';
import {Table, Pagination, Modal, Form} from 'react-bootstrap';
import dummyPersonList from "../commons/DummyPersonList";
import DisabledButton from "../commons/DisabledButton";
import axios from "axios";
import person from "../commons/Person";

const usersPerPage = 3; // 한 페이지에 표시할 유저 수


const PersonList = () => {
    // 페이징 용 state
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 유저 리스트 계산
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = dummyPersonList.slice(indexOfFirstUser, indexOfLastUser);

    // 유저 차단용 state
    const [target, setTarget] = useState(null);

    useEffect(() => {
        if (target) {
            banning();
        }
    }, [target]);

    // 차단 메시지 전송용 state
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (content.length > 0) {
            setDisabled(false);
        }
    }, [content]);

    const banning = () => {
        handleShow();
    };

    const sendMsg = () => {
        if (window.confirm(`${target.nickName}님을 정말 차단하시겠습니까?`)) {
            axios.post('http://localhost:8080/simServer/banningPerson', null, {
                params: {
                    // 유저 특정 정보 보내기
                    personNickName : target.nickName,
                    personBannedMsg: content,
                }
            })
                .then((resp) => {
                    console.log(target.nickName);
                    console.log(content);
                    alert('차단되었습니다.');
                    handleClose();
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            alert('취소되었습니다.');
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Table>
                <colgroup>
                    <col width={'5%'}/>
                    <col/>
                    <col width={'9%'}/>
                    <col width={'25%'}/>
                    <col width={'12%'}/>
                    <col width={'10%'}/>
                </colgroup>
                <thead>
                <tr>
                    <th>프로필</th>
                    <th>아이디(메일)</th>
                    <th>레벨<br/>(총점수)</th>
                    <th>선호하는 언어</th>
                    <th>가입일</th>
                    <th>차단설정</th>
                    {/* 다른 필드들도 추가 */}
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index, array) => (
                    <tr key={index}>
                        <td><img src={user.imgSrc} alt="" className={'circle-background'}
                                 style={{width: '3vw', height: '6vh'}}/></td>
                        <td>{user.nickName}({user.email})</td>
                        <td>{user.level}</td>
                        <td>{user.language}</td>
                        <td>{user.jointDt}</td>
                        <td>
                            <button type={'button'} className={'btn btn-danger'}
                                    onClick={() => setTarget(array[index])}>차단
                            </button>
                        </td>
                    </tr>
                ))}
                <Modal
                    size={'lg'}
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>차단 메시지</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'pb-5'}>
                        <h6>차단 사유</h6>
                        <Form.Control
                            as="textarea"
                            style={{height: '100px'}}
                            onChange={e => setContent(e.target.value)}
                        />
                    </Modal.Body>

                    {/* 문의 작성*/}
                    <Modal.Footer>
                        <button className={'theme-outline-btn'} onClick={handleClose}>
                            닫기
                        </button>
                        <DisabledButton onClick={sendMsg} btnText={'전송'} disabled={disabled}/>
                    </Modal.Footer>
                </Modal>
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)}/>
                <Pagination.Prev onClick={
                    currentPage - 1 > 0
                        ? () => handlePageChange(currentPage - 1)
                        : () => handlePageChange(1)
                }/>
                {Array.from({length: Math.ceil(dummyPersonList.length / usersPerPage)}, (_, index) => {
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
                    currentPage + 1 < Math.ceil(dummyPersonList.length / usersPerPage)
                        ? () => handlePageChange(currentPage + 1)
                        : () => handlePageChange(Math.ceil(dummyPersonList.length / usersPerPage))
                }/>
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(dummyPersonList.length / usersPerPage))}/>
            </Pagination>
        </div>
    );
};

export default PersonList;