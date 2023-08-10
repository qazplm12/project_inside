import React, {useEffect, useState,} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import DisabledButton from "../commons/DisabledButton";
import axios from "axios";

function SignupForm(props) {


    // 이메일 입력
    const [mailVal, setMailVal] = useState("");

    // 인증번호 input태그 on/off 스위치
    const [authEl, setAuthEl] = useState(false);

    // 발급된 인증번호
    const [authCode, setAuthCode] = useState("");

    // 입력한 인증번호
    const [codeVal, setCodeVal] = useState("");

    // 인증 완료시 readonly 스위치
    const [authDone, setAuthDone] = useState(false);

    // 닉네임 입력
    const [nick, setNick] = useState("");

    // 닉네임 검사 텍스트 출력
    const [nickText, setNickText] = useState(0);

    // 비밀번호 확인
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // 비밀번호 확인 텍스트 출력
    const [passwordText, setPasswordText] = useState(false);

    const [disabled, setDisabled] = useState(true);

    const MatchCode = () => {

        if (authCode === codeVal) {
            // 인증 성공시 동작
            alert('인증되었습니다.')
            // 태그 스위치 off
            setAuthEl(false);
            // readonly 스위치 on
            setAuthDone(true);
        } else {
            // 인증 실패시 alert
            alert('인증번호를 다시 확인해주세요')
        }
    };


    // 이메일 중복 확인 & 이메일 인증번호 발송
    const EmailAuth = () => {
        // mailVal 가 비어있지 않으면 실행
        if (mailVal) {
            // authEl의 빠른 출력을 위한 타이머
            let timer = setTimeout(() => setAuthEl(true), 200)

            axios.post('http://localhost:8080/emailConfirm', null, {
                params: {
                    email: mailVal,
                }
            })
                .then((resp) => {

                    // 기존 유저 일때 alert창
                    if (resp.data == 1) {
                        alert('이미 가입된 이메일입니다.');
                        clearTimeout(timer);
                    } else {
                        // 신규 유저 일때 컴포넌트 추가(타이머에 저장된 함수 실행)

                        // 발급된 코드 저장
                        setAuthCode(resp.data);
                        // 추가 사항
                    }

                })
                .catch(() => {
                    // 이메일 형식이 아닐경우 err 출력
                    alert('잘못된 형식입니다.');

                });
        }
    };

    let nickTimer;

    useEffect(() => {
        clearTimeout(nickTimer);
        // nick이 공백일때 clear해주기
        if (nick === "") {
            setNickText(0);
        } else {
            nickTimer = setTimeout(() => {
                axios.post('http://localhost:8080/checkNick', null, {
                    params: {
                        nickName: nick,
                    }
                })
                    .then((resp) => {
                        // 존재하는 닉네임 일때
                        if (resp.data === 1) {
                            // p 텍스트 추가, 추가
                            setNickText(1);
                        } else {
                            // 사용가능한 닉네임 일때
                            setNickText(2);
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }, 100);
        }
    }, [nick]);

    useEffect(() => {
        if (!password1 || !password2) {
            setPasswordText(false);
        } else if (password2 && password1 === password2) {
            // password가 같으면 활성화
            setPasswordText(true);
        } else {
            setPasswordText(false);
        }
    }, [password2]);

    // 각 사항이 변경될 때마다 확인
    useEffect(() => {
        if (authDone && nickText === 2 && passwordText) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [authDone, nickText, passwordText]);

    return (
        <Form action="rhttp://localhost:8080/insetPerson" id={'frm'} method={'POST'}>
            <p className={'text-start mt-3'}><strong>이메일</strong></p>
            <InputGroup className="my-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-envelope"></i></InputGroup.Text>
                <Form.Control
                    placeholder="이메일을 입력해주세요"
                    aria-describedby="basic-addon1"
                    name={'personId'}
                    readOnly={authDone}
                    onChange={e => {
                        setMailVal(e.target.value)
                    }}
                />
                {/* 조건부 렌더링 - 이메일 인증 버튼 disabled */}
                {
                    authDone
                        ? <button type={'button'} className={'theme-btn-disabled py-2'} disabled='disabled'>이메일
                            인증</button>
                        : <button type={'button'} className={'theme-outline-btn'} onClick={() => EmailAuth()}>이메일
                            인증</button>
                }
            </InputGroup>
            {/* 조건부 렌더링 - 인증 번호 발급시 나타나고 인증 확인시 사라짐 */}
            {
                authEl ?
                    <InputGroup className="my-2">
                        <InputGroup.Text id="basic-addon2"><i className="bi bi-envelope"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="인증번호를 입력해주세요"
                            aria-describedby="basic-addon2"
                            onChange={e => {
                                setCodeVal(e.target.value)
                            }}
                        />
                        <button type={'button'} className={'theme-btn'} onClick={() => MatchCode()}>인증</button>
                    </InputGroup>
                    : ""
            }

            <p className={'text-start mt-3'}><strong>닉네임</strong></p>
            <InputGroup className="my-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-emoji-smile"></i></InputGroup.Text>
                <Form.Control
                    placeholder="닉네임을 입력해주세요"
                    aria-describedby="basic-addon1"
                    onChange={e => setNick(e.target.value)}
                    name={'personNickName'}
                />
            </InputGroup>
            {
                nickText !== 0
                    // 공백이 아니면
                    ? (nickText === 1
                        // 1일떄
                        ? <p className={'text-danger text-start'}>사용할 수 없는 닉네임입니다.</p>
                        // 2일때
                        : <p className={'theme-font text-start'}>사용 가능한 닉네임입니다.</p>)
                    // 공백이면
                    : ""

            }


            <div className={'my-5'}>
                <p className={'text-start mb-2'}><strong>비밀번호</strong></p>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon2"><i className="bi bi-lock"></i></InputGroup.Text>
                    <Form.Control
                        type={'password'}
                        placeholder="비밀번호를 입력해주세요"
                        aria-describedby="basic-addon2"
                        onChange={e => setPassword1(e.target.value)}
                    />
                </InputGroup>
                <p className={'text-start my-2'}><strong>비밀번호 확인</strong></p>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon3"><i className="bi bi-lock"></i></InputGroup.Text>
                    <Form.Control
                        type={'password'}
                        placeholder="비밀번호를 확인해주세요"
                        aria-describedby="basic-addon3"
                        onChange={e => setPassword2(e.target.value)}
                        name={'personPassword'}
                    />
                </InputGroup>
                {password2
                    ? (passwordText
                        ? ""
                        : <p className={'text-danger text-start'}>비밀번호가 일치하지 않습니다.</p>)
                    : ""}
            </div>
            <div className={'d-grid my-5'}>
                <DisabledButton btnText={'회원가입'} disabled={disabled}/>
            </div>
        </Form>
    );
}

export default SignupForm;