import React, {useEffect, useState} from 'react';
import {Accordion, Button, Col, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {FrappeGantt} from "frappe-gantt-react";

function ProjectBoard(props) {

    // axios로 값 불러오기
    const [tasks, setTasks] = useState([{}])

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getTodoList", null, {
            params: {
                // 보드 idx 보내기
                todoMatchingIdx: 1
            }
        })
            .then((res) => {
                const newTask = res.data.map((item, index, array) => ({
                    id: index + 1,
                    idx: item.todoIdx,
                    name: item.todoTitle,
                    start: item.todoStartDate,
                    end: item.todoEndDate,
                    status: item.todoStatus,
                    user: item.todoMemberNick,
                    content: item.todoContent,
                    progress: Number(item.todoProgress),
                }));
                setTasks(newTask);
            })
            .catch((error) => {

            });
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStartDay(null);
        setEndDay(null);
        setItemContent("");
        setTarget(null);
    };
    const handleShow = e => {

        setShow(true);
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;
    const tomorrow = year + '-' + month + '-' + (Number(day) + 1);

    // 일정추가 관련
    const [startDay, setStartDay] = useState(dateString);
    const [endDay, setEndDay] = useState(tomorrow);
    const [itemName, setItemName] = useState("");
    const [itemContent, setItemContent] = useState("");
    const [itemStatus, setItemStatus] = useState(1);


    // 일정수정
    const [target, setTarget] = useState(null);
    const [targetTitle, setTargetTitle] = useState(null);
    const [targetStatus, setTargetStatus] = useState(null);
    const [targetStartDay, setTargetStartDay] = useState(null);
    const [targetEndDay, setTargetEndDay] = useState(null);
    const [targetItemContent, setTargetItemContent] = useState(null);
    const [targetProgress, setTargetProgress] = useState(null);
    // range 쓰던지

    useEffect(() => {
        setItemName(itemName)
        setItemContent(itemContent)

    }, [itemName, itemContent]);

    useEffect(() => {
        if (target) {
            console.log('settingTarget')
            setShow(true);
            setStartDay(null);
            setEndDay(null);
            setTargetTitle(target.name)
            setTargetStatus(target.status)
            setTargetStartDay(target.start)
            setTargetEndDay(target.end)
            setTargetItemContent(target.content)

        }
    }, [target]);

    const checkDate = (num) => {
        if (num <= startDay) {
            alert('시작일 보다 종료일이 빠를 수 없습니다.');
            document.getElementById('endDay').value = null;
        } else {
            setEndDay(num);
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {

            addItem();
            setStartDay(dateString);
            setEndDay(tomorrow);
            setItemName("");
            setItemContent("");
            setTarget(null);
        }
    };

    const addItem = () => {
        // axios insert 문으로 바꾸기
        if (startDay && endDay && itemName) {
            axios.post("http://localhost:8080/simServer/addTodoItem", null, {
                params: {
                    todoMatchingIdx: 1,
                    todoNickName: "tester1", // 로그인 정보에서 닉네임
                    todoTitle: itemName,
                    todoStatus: itemStatus,
                    todoContent: itemContent,
                    todoStartDay: startDay,
                    todoEndDay: endDay,
                }
            })
                .then((res) => {
                    const newTask = res.data.map((item, index, array) => ({
                        id: index + 1,
                        idx: item.todoIdx,
                        name: item.todoTitle,
                        start: item.todoStartDate,
                        end: item.todoEndDate,
                        status: item.todoStatus,
                        user: item.todoMemberNick,
                        content: item.todoContent,
                        progress: Number(item.todoProgress),
                    }));
                    setTasks(newTask);
                })
                .catch((error) => {

                });
            handleClose();
        } else {
            alert('항목을 채워주세요');
        }

    };

    const editItem = () => {
        console.log(target);
        axios.post("http://localhost:8080/simServer/editTodoItem", null, {
            params: {
                // idx 보내기
                todoMatchingIdx: 1,
                todoIdx: target.idx,
                todoNickName: target.user,
                todoStatus: targetStatus,
                todoTitle: targetTitle,
                todoContent: targetItemContent,
                todoStartDay: targetStartDay,
                todoEndDay: targetEndDay,
                todoProgress: 10,
                // range 셋팅
            }
        })
            .then((res) => {
                const newTask = res.data.map((item, index, array) => ({
                    id: index + 1,
                    idx: item.todoIdx,
                    name: item.todoTitle,
                    start: item.todoStartDate,
                    end: item.todoEndDate,
                    status: item.todoStatus,
                    user: item.todoMemberNick,
                    content: item.todoContent,
                    progress: Number(item.todoProgress),
                }));
                setTasks(newTask);
            })
            .catch((error) => {

            });
        handleClose();
    };

    const editStatus = (e, obj) => {
        console.log(obj)
        axios.post("http://localhost:8080/simServer/editTodoItem", null, {
            params: {
                // idx 보내기
                todoMatchingIdx : 1,
                todoIdx: obj.idx,
                todoNickName: obj.user,
                todoStatus: e.target.value,
                todoTitle: obj.name,
                todoContent: obj.content,
                todoStartDay: obj.start,
                todoEndDay: obj.end,
                todoProgress: 10,
            }
        })
            .then((res) => {
                const newTask = res.data.map((item, index, array) => ({
                    id: index + 1,
                    idx: item.todoIdx,
                    name: item.todoTitle,
                    start: item.todoStartDate,
                    end: item.todoEndDate,
                    status: item.todoStatus,
                    user: item.todoMemberNick,
                    content: item.todoContent,
                    progress: Number(item.todoProgress),
                }));
                setTasks(newTask);
            })
            .catch((error) => {

            });
    };

    return (
        <div className={'row'}>
            <div>
                <FrappeGantt
                    id={'gantt'}
                    tasks={tasks}
                    onClick={task => console.log(task)}
                    onDateChange={(task, start, end) => console.log(task, start, end)}
                    onProgressChange={(task, progress) => console.log(task, progress)}
                    onTasksChange={tasks => console.log(tasks)}
                />
            </div>
            <div className={'mt-3'}>
                <Table bordered hover size="sm" className={'container'}>
                    <colgroup>
                        <col width={'3%'}/>
                        <col/>
                        <col/>
                        <col width={'15%'}/>
                        <col width={'5%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th></th>
                        <th>제목</th>
                        <th>등록자</th>
                        <th>상태</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td colSpan={3}>
                            <Form.Control
                                as={'input'}
                                type={'text'}
                                value={itemName}
                                onChange={e => setItemName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            ></Form.Control></td>
                        <td>
                            <button type={'button'} className={'theme-btn border-0 fs-5'} onClick={e => handleShow(e)}>
                                <i className="bi bi-plus-square"></i></button>
                        </td>
                    </tr>
                    {tasks.map((item, index, array) => (
                        <tr key={item.id}>
                            <td></td>
                            <td><a type={'button'} onClick={() => setTarget(array[index])}
                                   className={'theme-link'}>{item.name}</a></td>
                            <td>{item.user}</td>
                            <td>
                                <Form.Select
                                value={item.status}
                                onChange={e => editStatus(e, array[index])}>
                                <option>상태</option>
                                <option value="1">할일</option>
                                <option value="2">진행중</option>
                                <option value="3">완료</option>
                                <option value="4">이슈발생</option>
                            </Form.Select>
                            </td>
                            <td></td>
                        </tr>
                    ))}

                    </tbody>
                </Table>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>일정 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'row'}>
                        <span><strong>제목</strong></span>
                        {
                            target
                                ?
                                target
                                    ? <Form.Control
                                        value={targetTitle}
                                        as={"input"}
                                        type={"text"}
                                        className={'mb-2 p-2'}
                                        onChange={e => setTargetTitle(e.target.value)}
                                    />
                                    : ""
                                : <Form.Control
                                    value={itemName}
                                    as={"input"}
                                    type={"text"}
                                    className={'mb-2 p-2'}
                                    onChange={e => setItemName(e.target.value)}
                                />
                        }
                        {
                            target
                                ?
                                target
                                    ?
                                    <Form.Select
                                        onChange={e => setTargetStatus(e.target.value)}
                                        value={targetStatus}
                                    >
                                        <option>상태</option>
                                        <option value="1">할일</option>
                                        <option value="2">진행중</option>
                                        <option value="3">완료</option>
                                        <option value="4">이슈발생</option>
                                    </Form.Select> : ""
                                : <Form.Select
                                    onChange={e => setItemStatus(e.target.value)}
                                    value={itemStatus}
                                >
                                    <option>상태</option>
                                    <option value="1">할일</option>
                                    <option value="2">진행중</option>
                                    <option value="3">완료</option>
                                    <option value="4">이슈발생</option>
                                </Form.Select>
                        }
                    </div>
                </Modal.Body>
                <Modal.Body>
                    <div className={'row'}>
                        {
                            target
                                ?
                                target
                                    ? <>
                                        <span><strong>시작일</strong></span>
                                        <Form.Control
                                            as={"input"}
                                            type={"date"}
                                            className={'mb-2 p-2'}
                                            value={targetStartDay}
                                            onChange={e => setTargetStartDay(e.target.value)}
                                        />
                                        <span><strong>종료일</strong></span>
                                        <Form.Control
                                            id={'endDay'}
                                            as={"input"}
                                            type={"date"}
                                            className={'mb-2 p-2'}
                                            value={targetEndDay}
                                            onChange={e => setTargetEndDay(e.target.value)}

                                        />
                                    </>
                                    : ""
                                :
                                <>
                                    <span><strong>시작일</strong></span>
                                    <Form.Control
                                        as={"input"}
                                        type={"date"}
                                        className={'mb-2 p-2'}
                                        onChange={e => setStartDay(e.target.value)}
                                    />
                                    <span><strong>종료일</strong></span>
                                    <Form.Control
                                        id={'endDay'}
                                        as={"input"}
                                        type={"date"}
                                        className={'mb-2 p-2'}
                                        onChange={e => checkDate(e.target.value)}
                                    />
                                </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Body className={'border-top'}>
                    <h4>내용</h4>
                    {
                        target
                            ?
                            target
                                ? <Form.Control
                                    as="textarea"
                                    style={{height: '100px'}}
                                    onChange={e => setTargetItemContent(e.target.value)}
                                >{targetItemContent}</Form.Control>
                                : ""
                            : <Form.Control
                                as="textarea"
                                style={{height: '100px'}}
                                onChange={e => setItemContent(e.target.value)}
                            ></Form.Control>


                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    {target
                        ? <button className={'theme-btn'} onClick={editItem}>
                            수정
                        </button>
                        : <button className={'theme-btn'} onClick={addItem}>
                            추가
                        </button>
                    }

                </Modal.Footer>
            </Modal>

            <div className={'d-flex justify-content-around'}>
                <Col sm={6} className={'my-5'}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h4 className={'text-start'}>아코디언1</h4></Accordion.Header>
                            <Accordion.Body>
                                {/* 컴포넌트*/}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 className={'text-start'}>아코디언2</h4></Accordion.Header>
                            <Accordion.Body>
                                {/* 컴포넌트*/}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col sm={4} className={'my-5 pb-5'}>
                    <div>
                        <h4 className={'text-start'}>콜2</h4>
                        {/* 컴포넌트*/}

                    </div>
                </Col>
            </div>
        </div>
    );
}

export default ProjectBoard;