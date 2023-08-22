import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {login} from "../../service/Service";

function LoginForm(props) {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const doLogin = () => {

        login(userId, userPw);
    };

    useEffect(() => {
        console.log(userId, userPw)
    }, [userId, userPw]);

    return (
        <Form action="">
            <p className={'text-start mt-5'}><strong>이메일</strong></p>
            <InputGroup className="mb-5 py-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-envelope"></i></InputGroup.Text>
                <Form.Control
                    type={'email'}
                    placeholder="이메일을 입력해주세요"
                    onChange={e => setUserId(e.target.value)}
                    aria-describedby="basic-addon1"
                    name={'personId'}
                />
            </InputGroup>

            <p className={'text-start mt-5'}><strong>비밀번호</strong></p>
            <InputGroup className="mb-5 py-2">
                <InputGroup.Text id="basic-addon2"><i className="bi bi-lock"></i></InputGroup.Text>
                <Form.Control
                    type={'password'}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={e => setUserPw(e.target.value)}
                    aria-describedby="basic-addon2"
                    name={'personPassword'}
                />
            </InputGroup>
            <div className={'d-grid my-5'}>
            <button type={'button'} onClick={doLogin} className={'theme-btn py-2'}>로그인</button>
            </div>
        </Form>
    )
}

export default LoginForm;