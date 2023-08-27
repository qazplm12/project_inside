import React, {useEffect, useState} from 'react';
import {Accordion, Button, Col, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {FrappeGantt} from "frappe-gantt-react";
import ProjectBoardMember from "./ProjectBoardMember";
import ChallengeListPaging from "../../leeComps/chanllengeList/ChallengeListPaging";
import {useNavigate, useParams} from "react-router-dom";

function ProjectBoard(props) {
    const {idx} = useParams();  // 프로젝트 번호
    // axios로 값 불러오기
    const [tasks, setTasks] = useState([{}])
    const [pm, setPm] = useState('');
    const [member, setMember] = useState([]);
    const [todoIdx, setTodoIdx] = useState('');
    const [deleteCount, setDeleteCount] = useState(0);
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    const navigate = useNavigate();
    const [once, setOnce] = useState(0);

    const welcome = (e) => {
            alert('참여중인 프로젝트가 아닙니다.');
            navigate(`/pi/toyListBoard`);
    };

    const user = async() => {
        try {
            const result1 = await axios.get(`http://localhost:8080/server/userProfile`)    // 유저 리스트 가져오기
            const allUser = result1.data;
            const result2 = await axios.get(`http://localhost:8080/server/matching?idx=${idx}`)    // 매칭 정보 가져오기
            const matchUser = result2.data;

            const arr = [];

            for (let i = 0; i < allUser.length; i++) {
                for (let j = 0; j < matchUser.length; j++) {
                    if (allUser[i].personNickName == matchUser[j].matchingMemberNick && matchUser[j].matchingMemberAccept == "3") { // 멤버 추리기
                        arr.push(allUser[i]);
                        // if (userInfo.personNickName != matchUser[j].matchingMemberNick && matchUser.length == j + 1) {
                        //     welcome();
                        // }
                    }
                    else if (allUser[i].personNickName == matchUser[j].matchingLeaderNick) {
                        setPm(allUser[i]);
                        // if (userInfo.personNickName != matchUser[j].matchingLeaderNick && matchUser.length == j + 1) {  // 매니저 찾기
                        //     welcome();
                        // }
                    }
                }
            }
            setMember(arr);
        }
        catch (e) {
            console.log("err : " + e);
        }
    }

    const [count, setCount] = useState(0); //아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postPerPage] = useState(10); //페이지당 아이템 개수

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    const setPage = (e) => {
        setCurrentPage(e);
    };

    useEffect (() => {
        setCount(tasks.length);
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(tasks.slice(indexOfFirstPost, indexOfLastPost));
    }, [currentPage, indexOfFirstPost, indexOfLastPost, tasks, postPerPage])

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getTodoList", null, {
            params: {
                // 보드 idx 보내기
                todoMatchingIdx: idx
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
        setOnce(1);
        // console.log('---idx---');
        // console.log(idx);
    }, [deleteCount]);

    useEffect(() =>{
        if (once > 0) {
            user();
        }
    }, [once])

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStartDay(null);
        setEndDay(null);
        // setItemName(null);  // 이거 켜면 입력 느려짐
        setItemContent("");
        setProgress(0);
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
    const [itemStatus, setItemStatus] = useState("");
    const [progress, setProgress] = useState(0);


    // 일정수정
    const [target, setTarget] = useState(null);
    const [targetTitle, setTargetTitle] = useState(null);
    const [targetStatus, setTargetStatus] = useState(null);
    const [targetStartDay, setTargetStartDay] = useState(null);
    const [targetEndDay, setTargetEndDay] = useState(null);
    const [targetItemContent, setTargetItemContent] = useState(null);
    const [targetProgress, setTargetProgress] = useState(null);

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
            setTargetProgress(target.progress)

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

    const handleKeyDown = e => {    // 테이블에 있는 input에 엔터 누르면 발생
        if (e.key === 'Enter') {
            setStartDay(dateString);
            setEndDay(tomorrow);
            setItemName(itemName);
            setItemContent("");
            setTarget(null);
            setProgress(0);
            console.log("아이템 이름 : " + itemName);
            addItem();

            handleClose();
        }
    };

    const addItem = () => { // + 버튼 모달로 실행
        // axios insert 문으로 바꾸기
        if (startDay && endDay && itemName) {
            axios.post("http://localhost:8080/simServer/addTodoItem", null, {
                params: {
                    todoMatchingIdx: idx,
                    todoNickName: userInfo.personNickName, // 로그인 정보에서 닉네임
                    todoTitle: itemName,
                    todoStatus: itemStatus,
                    todoContent: itemContent,
                    todoStartDay: startDay,
                    todoEndDay: endDay,
                    todoProgress: progress
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

    const editItem = () => {    // 제목 누르고 수정 모달을 통해 수정하면 실행
        console.log(target);
        axios.post("http://localhost:8080/simServer/editTodoItem", null, {
            params: {
                // idx 보내기
                todoMatchingIdx: idx,
                todoIdx: target.idx,
                todoNickName: target.user,
                todoStatus: targetStatus,
                todoTitle: targetTitle,
                todoContent: targetItemContent,
                todoStartDay: targetStartDay,
                todoEndDay: targetEndDay,
                todoProgress: targetProgress,
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

    const editStatus = (e, obj) => {    // 리스트에서 상태 바뀌면 실행
        console.log(obj)
        axios.post("http://localhost:8080/simServer/editTodoItem", null, {
            params: {
                // idx 보내기
                todoMatchingIdx : idx,
                todoIdx: obj.idx,
                todoNickName: obj.user,
                todoStatus: e.target.value,
                todoTitle: obj.name,
                todoContent: obj.content,
                todoStartDay: obj.start,
                todoEndDay: obj.end,
                todoProgress: obj.progress,
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
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    {
                        target
                            ?
                            target
                                ? <Modal.Title>일정 수정</Modal.Title>
                                : ""
                            : <Modal.Title>일정 추가</Modal.Title>
                    }
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
                                        <option selected={true} hidden={true}>상태</option>
                                        <option value="1">할일</option>
                                        <option value="2">진행중</option>
                                        <option value="3">완료</option>
                                        <option value="4">이슈발생</option>
                                    </Form.Select> : ""
                                : <Form.Select
                                    onChange={e => setItemStatus(e.target.value)}
                                    value={itemStatus}
                                >
                                    <option selected={true} hidden={true}>상태</option>
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
                <Modal.Body>
                    <span><strong>진척도</strong></span>
                    {
                        target
                            ?
                            target
                                ? <>
                                    <Form.Label>({targetProgress}%)</Form.Label>
                                    <Form.Range value={targetProgress} onChange={(e) => setTargetProgress(e.target.value)}/>
                                </>
                                : ""
                            : <>
                                <Form.Label>({progress}%)</Form.Label>
                                <Form.Range value={progress} onChange={(e) => setProgress(e.target.value)}/>
                            </>
                    }
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

            <div className={'d-flex justify-content-center'}>
                <Col sm={5} className={'my-5 mx-4'}>
                    <ProjectBoardMember pm={pm} member={member} />
                </Col>
                <Col sm={6} className={'my-5 mx-4 pb-5'}>
                    <div>
                        <Table bordered hover size="sm" className={'container'}>
                            <colgroup>
                                <col width={'8%'}/>
                                <col width={'34%'}/>
                                <col width={'20%'}/>
                                <col width={'20%'}/>
                                <col width={'10%'}/>
                                <col width={'8%'}/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>등록자</th>
                                <th>상태</th>
                                <th>진척도</th>
                                <th>입력</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={5}>
                                    <div className={'d-flex justify-content-center'}>
                                        <Form.Control
                                            as={'input'}
                                            type={'text'}
                                            value={itemName}
                                            onChange={e => setItemName(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder={'제목을 입력하세요.'}
                                        ></Form.Control>
                                    </div>
                                </td>
                                <td>
                                    <button type={'button'} className={'theme-btn border-0 fs-5'} onClick={e => handleShow(e)}><i className="bi bi-plus-square"></i></button>
                                </td>
                            </tr>
                            {currentPosts.map((item, index, array) => (
                                <tr key={item.id}>
                                    <td className={'align-middle'}>{tasks.length - index - ((currentPage - 1) * 10)}</td>
                                    <td className={'align-middle'}><a type={'button'} onClick={() => setTarget(array[index])} className={'theme-link'}>{item.name}</a></td>
                                    <td className={'align-middle'}>{item.user}</td>
                                    <td className={'align-middle'}>
                                        <Form.Select
                                            value={item.status}
                                            onChange={e => editStatus(e, array[index])}>
                                            <option selected={true} hidden={true}>상태</option>
                                            <option value="1">할일</option>
                                            <option value="2">진행중</option>
                                            <option value="3">완료</option>
                                            <option value="4">이슈발생</option>
                                        </Form.Select>
                                    </td>
                                    <td className={'align-middle'}><b className={'theme-font'}>{item.progress}</b>%</td>
                                    <td className={'align-middle'}><button className={'btn btn-danger'} value={item.idx} onClick={
                                        e => {
                                            axios.delete(`http://localhost:8080/server/todoDelete?idx=${item.idx}`)
                                                .then(res => {
                                                    setDeleteCount(deleteCount + 1);
                                                    alert('삭제되었습니다.');
                                                })
                                                .catch(err => {

                                                })
                                        }
                                    }><i className="bi bi-dash-square"></i></button></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        <ChallengeListPaging page={currentPage} count={count} setPage={setPage} postPerPage={postPerPage} />
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default ProjectBoard;