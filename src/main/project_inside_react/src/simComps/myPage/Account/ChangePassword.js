import React, {useEffect, useState} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import DisabledButton from "../../commons/DisabledButton";
import axios from "axios";

import person from "../../commons/Person";

function ChangePassword(props) {

    const [mode, setMode] = useState(true);

    // 기존 비밀번호
    const [myPassword, setMyPassword] = useState("");

    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [disabled, setDisabled] = useState(true);

    // 각 항목이 변경될때마다 충족 조건을 벗어나면 버튼에 disabled 걸어줌
    useEffect(() => {
        if (myPassword === person.password && newPassword1 === newPassword2) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newPassword1, newPassword2, myPassword]);

    useEffect(() => {

    }, [])

    const updatePersonInfo = () => {

        // 필요한 조건
        // 비밀번호가 공백이 아님

        // newPassword1, 2가 일치해야함

        // myPassword와 newPassword1,2 가 일치해야함
        // 일치하면 disabled(false) 넣어주기

        axios.post("http://localhost:8080/simServer/updatePersonInfo", null, {
            params: {
                personPassword: newPassword2
            }
        })
            .then((resp) => {
                alert("비밀번호 변경 성공");
                // 필요한 업데이트 로직 추가
                setMode(true);
            })
            .catch((error) => {
                alert("비밀번호 변경 실패");
                console.error(error);
            });
    };


    return (
        <>
            {/* 이 안에서 p 태그 쓰면 콘솔 창에 에러 뜸 */}
            {
                mode
                    ?
                    // 저장된 화면
                    <>
                        {/* 최근 업데이트 날짜에 {person.updateDt} 넣기 & 엔티티 추가 */}
                        <p className={'text-start my-0'} ><small>최근 업데이트 : 2023-08-10</small></p>
                        <div className={'d-flex'}>
                            <p className={'my-auto'}><strong>비밀번호</strong></p>
                            <button onClick={() => setMode(!mode)} type={'button'}
                                    className={'ms-auto theme-btn px-3'}>변경
                            </button>
                        </div>
                    </>
                    :
                    // 수정 중인 화면
                    <Form>
                        <div className={'row'}>
                            <div className={'my-2'}>
                                {/* 기존 비밀번호 */}
                                <p className={'text-start mt-3'}><strong>기존 비밀번호</strong></p>
                                <InputGroup>
                                    <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
                                    <Form.Control type="password"
                                                  placeholder="기존 비밀번호를 입력해주세요"
                                                  onChange={e => setMyPassword(e.target.value)}
                                    />
                                </InputGroup>
                                {
                                    myPassword !== ""
                                        // 공백이 아니면서
                                        ? (myPassword !== person.password
                                            // 비밀번호가 일치하지 않을때
                                            ? <p className={'text-danger text-start'}>기존 비밀번호와 일치하지 않습니다.</p>
                                            // 일치할때
                                            : "")
                                        // 공백일때
                                        : ""

                                }
                                <div className={'my-3'}>
                                    {/* 변경할 비밀번호 */}
                                    <p className={'text-start mb-2'}><strong>비밀번호</strong></p>
                                    <InputGroup>
                                        <InputGroup.Text><i
                                            className="bi bi-lock"></i></InputGroup.Text>
                                        <Form.Control
                                            type={'password'}
                                            placeholder="새로운 비밀번호를 입력해주세요"
                                            onChange={e => setNewPassword1(e.target.value)}
                                        />
                                    </InputGroup>
                                    <p className={'text-start my-2'}><strong>비밀번호 확인</strong></p>
                                    <InputGroup>
                                        <InputGroup.Text><i
                                            className="bi bi-lock"></i></InputGroup.Text>
                                        <Form.Control
                                            type={'password'}
                                            placeholder="새로운 비밀번호를 확인해주세요"
                                            onChange={e => setNewPassword2(e.target.value)}
                                            name={'personPassword'}
                                        />
                                    </InputGroup>
                                </div>
                                {
                                    newPassword2 !== ""
                                        // 공백이 아니면서
                                        ? (newPassword1 !== newPassword2
                                            // 비밀번호가 일치하지 않을때
                                            ? <p className={'text-danger text-start'}>비밀번호가 일치하지 않습니다.</p>
                                            // 일치할때
                                            : <p className={'text-success text-start'}>유효한 비밀번호입니다.</p>)
                                        // 공백일때
                                        : ""

                                }
                            </div>
                            {/* 여기서 axios.put 실행 시키는 함수 호출*/}
                            <div className={''}>
                                <DisabledButton btnText={'변경'} disabled={disabled} onClick={updatePersonInfo}
                                                classAppend={'float-end ms-2 px-3'}/>
                                <button onClick={() => setMode(!mode)} type={'button'}
                                        className={'float-end theme-outline-btn px-3'}>취소
                                </button>
                            </div>
                        </div>
                    </Form>
            }

        </>
    )
}

export default ChangePassword;