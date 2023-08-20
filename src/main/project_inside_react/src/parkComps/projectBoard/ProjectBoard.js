import React, {useEffect, useState} from 'react';
import {Accordion, Button, Col, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {FrappeGantt} from "frappe-gantt-react";


function ProjectBoard(props) {
    
    // axios로 값 저장해서 불러오기
    const [tasks, setTasks] = useState(
        [
            {
                id: 'Task 1',
                name: 'Redesign website',
                start: '2023-08-01',
                end: '2023-08-07',
                progress: 20,
                // 진행률
            },
            {
                id: 'Task 2',
                name: 'Develop feature',
                start: '2023-08-04',
                end: '2023-08-10',
                progress: 50,
            },
            {
                id: 'Task 3',
                name: 'Develop feature',
                start: '2023-08-04',
                end: '2023-08-10',
                progress: 50,
            },
        ]
    )

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStartDay(null);
        setEndDay(null);
        setItemContent("");
    };
    const handleShow = () => setShow(true);

    // 일정추가 관련
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [itemContent, setItemContent] = useState("");


    const checkDate = (num) => {
        if (num <= startDay) {
            alert('시작일 보다 종료일이 빠를 수 없습니다.');
            document.getElementById('endDay').value = null;
        } else {
            setEndDay(num);
        }
    };
    const addItem = () => {

        if (startDay && endDay && itemContent) {
            const newTask =
                {
                    id: `Task ${tasks.length + 1}`,
                    name: itemContent,
                    start: startDay,
                    end: endDay,
                    progress: 1,
                };

            setTasks(prevTasks => [...prevTasks, newTask]);

            setStartDay(null);
            setEndDay(null);
            setItemContent("");

            handleClose();
        } else {
            alert('항목을 모두 채워주세요');
        }

    };

    return (
        <div className={'row'}>
            <div>
                <FrappeGantt
                    tasks={tasks}
                    onClick={task => console.log(task)}
                    onDateChange={(task, start, end) => console.log(task, start, end)}
                    onProgressChange={(task, progress) => console.log(task, progress)}
                    onTasksChange={tasks => console.log(tasks)}
                />
                <button className={'theme-btn float-end m-3'} onClick={handleShow}>일정 추가</button>
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
                    </div>
                </Modal.Body>
                <Modal.Body className={'border-top'}>
                    <h4>내용</h4>
                    <Form.Control
                        as="textarea"
                        style={{height: '100px'}}
                        onChange={e => setItemContent(e.target.value)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <button className={'theme-btn'} onClick={addItem}>
                        추가
                    </button>
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
    )
}

export default ProjectBoard;