import React from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";

function LoginForm(props) {

    return (
        <Form action="">
            <p className={'text-start mt-5'}><strong>이메일</strong></p>
            <InputGroup className="mb-5 py-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-envelope"></i></InputGroup.Text>
                <Form.Control
                    placeholder="이메일을 입력해주세요"
                    aria-describedby="basic-addon1"
                    name={'personId'}
                />
            </InputGroup>

            <p className={'text-start mt-5'}><strong>비밀번호</strong></p>
            <InputGroup className="mb-5 py-2">
                <InputGroup.Text id="basic-addon2"><i className="bi bi-lock"></i></InputGroup.Text>
                <Form.Control
                    placeholder="비밀번호를 입력해주세요"
                    aria-describedby="basic-addon2"
                    name={'personPassword'}
                />
            </InputGroup>
            <div className={'d-grid my-5'}>
            <button type={'submit'} className={'theme-btn py-2'}>로그인</button>
            </div>
        </Form>
    )
}

export default LoginForm;