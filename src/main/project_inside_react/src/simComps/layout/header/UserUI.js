import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {ListGroup, OverlayTrigger, Popover} from "react-bootstrap";

import axios from "axios";
import {logout} from "../../../service/Service";


function UserUI(props) {

    const [alarmList, setAlarmList] = useState([])
    const [alarmCount, setAlarmCount] = useState(0);

    const [target, setTarget] = useState({});
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));


    // 눌렀을때 A -> Y
    useEffect(() => {
        axios.post('http://localhost:8080/simServer/readAlarm', null, {
            params: {
                alarmIdx: target.alarmIdx
            }
        })
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            });
    }, [target]);

    useEffect(() => {
        axios.post('http://localhost:8080/simServer/getAlarmList', null, {
            params: {
                alarmToPerson: userInfo.personNickName,
            }
        })
            .then((res) => {
                setAlarmList(res.data.filter(item => item.alarmChecked !== "Y"));
                setAlarmCount(res.data.filter(item => item.alarmChecked === "N").length);

            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const navi = useNavigate();

    const doLogout = () => {
        logout();
        setTimeout(() => {
            navi('/userAuth/login')
        }, 100);
    }

    // 눌렀을때 N -> A
    const readAlarmList = () => {
        axios.post('http://localhost:8080/simServer/readAlarmList', null, {
            params: {
                alarmToPerson: userInfo.personNickName,
            }
        })
            .then((res) => {
            })
            .catch((err) => {
                console.log(err)
            });
    }


    return (
        <div className={'d-flex align-items-center me-5'}>
            {/* 관리자 페이지 / 조건부 렌더링 걸어줘야 함*/}
            <OverlayTrigger
                trigger="click"
                key={'ui1'}
                placement={'bottom'}
                rootClose
                overlay={
                    <Popover>
                        <Popover.Body className={'text-center'}>
                            <h4 className={'text-muted my-auto'}>내 프로필</h4>
                        </Popover.Body>
                        <Popover.Header className={'theme-bg border-top rounded-0 px-1'}>
                            <div className={'p-5 py-2'}>
                                <img
                                    src={userInfo.personImgPath === null ? "/images/ProfileImg.png" : `/images/profileImg/${userInfo.personImgPath}`}
                                    alt="" className={'circle-background w-100'}/>
                                <p className={'text-center m-0'}><strong>{userInfo.personId}</strong></p>
                                <p className={'text-center text-muted'}>
                                    <small><strong>{userInfo.personNickName}</strong>(Lv.{userInfo.personLevel})</small>
                                </p>
                            </div>
                        </Popover.Header>
                        <Popover.Body className={'text-center'}>
                            <Link to={'/pi/myPage/profile/0'} className={'theme-link'}>마이 페이지</Link>
                            <hr/>
                            <a type={'button'} onClick={doLogout} className={'theme-link'}>로그아웃</a>
                        </Popover.Body>
                    </Popover>
                }
            >
                <a className={'theme-link fs-5'}>{userInfo.personId}</a>
            </OverlayTrigger>

            <OverlayTrigger
                trigger="click"
                key={'ui2'}
                placement={'bottom'}
                rootClose
                overlay={
                    <Popover>
                        <Popover.Body className={'border-bottom py-2'}>
                            <h6 className={'m-0'}>알림</h6>
                        </Popover.Body>
                        <Popover.Body className={'px-0 py-0'}>
                            <div className={'m-0 border-bottom'}>
                                <ListGroup id={'list-group-alarm'}>
                                    {
                                        // item 수가 0일때
                                        alarmList.length < 1
                                            ? <p className={'p-3 m-0'}>알림 목록이 비었습니다.</p>
                                            :
                                            alarmList.map((item, index, array) => {
                                                switch (item.alarmFrom) {
                                                    // 프로젝트 참가 요청
                                                    case "projectReq":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/myPage/project/${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <strong
                                                                        className={'theme-font'}>{item.alarmFromPerson}</strong>님이
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? ` [${item.alarmContent}]`
                                                                            : ` [${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                    </strong>프로젝트에 참가를 요청했습니다.
                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )

                                                    // 프로젝트 참가 수락
                                                    case "projectAcc":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/myPage/project/${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? ` [${item.alarmContent}]`
                                                                            : ` [${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                    </strong>프로젝트 매니저가
                                                                    참여요청을 <strong
                                                                    className={'theme-font'}>수락</strong>했습니다.

                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )
                                                    // 프로젝트 참가 거절
                                                    case "projectRej":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/myPage/project/${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? ` [${item.alarmContent}]`
                                                                            : ` [${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                    </strong>프로젝트 매니저가
                                                                    참여요청을 <strong
                                                                    className={'theme-font'}>거절</strong>했습니다.

                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )

                                                    // 문제 질문 답변
                                                    case "question":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/QnA?idx=${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <strong
                                                                        className={'theme-font'}>{item.alarmFromPerson}</strong>님이

                                                                    {/* 문제 이름 */}
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? ` [${item.alarmContent}]`
                                                                            : ` [${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                    </strong>문제 질문에 대한 답변을 등록했습니다.
                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )

                                                    // 문의사항 답변
                                                    case "inquiry":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/myPage/inquiry/${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <span>문의사항 </span>
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? `[${item.alarmContent}]`
                                                                            : `[${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                        {/*[{item.alarmContent}]의*/}
                                                                    </strong> 의 답변이 등록 되었습니다.
                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )

                                                    // 프로젝트 매칭
                                                    case "projectMatched":
                                                        return (
                                                            <ListGroup.Item key={index} className={'py-3'}
                                                                            variant={'light'}
                                                                            action
                                                                            href={`/#/pi/projectBoard/${item.alarmContentIdx}`} // 링크}
                                                                            onClick={() => setTarget(array[index])}
                                                            >
                                                                <div className={"theme-link- mx-3"}>
                                                                    <span>신청한 프로젝트</span>
                                                                    <strong className={'theme-font'}>
                                                                        {/* 6글자 이상부터 줄임말*/}
                                                                        {item.alarmContent.length < 6
                                                                            ? `[${item.alarmContent}]`
                                                                            : `[${item.alarmContent.slice(0, 5) + '...'}]`}
                                                                        {/*[{item.alarmContent}]의*/}
                                                                    </strong> 의 매칭이 완료되었습니다.
                                                                    {/* N 뱃지*/}
                                                                    {item.alarmChecked === "N"
                                                                        ? <span
                                                                            className="badge rounded-pill bg-danger text-white ms-2">N</span>
                                                                        : ""}
                                                                </div>
                                                            </ListGroup.Item>
                                                        )

                                                }

                                            })}
                                </ListGroup>
                            </div>
                        </Popover.Body>
                    </Popover>
                }
            >
                <a className={'text-black ms-3'}
                   onClick={readAlarmList}
                >
                    {alarmCount > 0
                        ?
                        <i className="bi bi-bell-fill position-relative">
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {alarmCount} </span>
                        </i>
                        : <i className="bi bi-bell"></i>

                    }</a>
            </OverlayTrigger>

        </div>
    );
    // 비로그인 시 보여줄 UI
}

export default UserUI;