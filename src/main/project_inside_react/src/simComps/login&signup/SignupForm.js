import React, {useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";

function SignupForm(props) {

    const [disabled, setDisabled] = useState(true);

    return (
        <Form action="">
            <p className={'text-start mt-3'}><strong>이메일</strong></p>
            <InputGroup className="my-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-envelope"></i></InputGroup.Text>
                <Form.Control
                    placeholder="이메일을 입력해주세요"
                    aria-describedby="basic-addon1"
                    name={'personId'}
                />
            </InputGroup>
            <p className={'text-start mt-3'}><strong>별명</strong></p>
            <InputGroup className="my-2">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-emoji-smile"></i></InputGroup.Text>
                <Form.Control
                    placeholder="별명을 입력해주세요"
                    aria-describedby="basic-addon1"
                    name={'personId'}
                />
            </InputGroup>
            <div className={'my-5'}>
                <p className={'text-start mb-2'}><strong>비밀번호</strong></p>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon2"><i className="bi bi-lock"></i></InputGroup.Text>
                    <Form.Control
                        placeholder="영문자 + 숫자 포함 최소 8자"
                        aria-describedby="basic-addon2"
                        name={'personPassword'}
                    />
                </InputGroup>

                <p className={'text-start my-2'}><strong>비밀번호 확인</strong></p>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon2"><i className="bi bi-lock"></i></InputGroup.Text>
                    <Form.Control
                        placeholder="비밀번호를 입력해주세요"
                        aria-describedby="basic-addon2"
                        name={'personPassword'}
                    />
                </InputGroup>
            </div>
            <div className={'d-grid my-5'}>
                {disabled
                    ?<button type={'submit'} className={'theme-btn-disabled py-2'} disabled='disabled'>회원가입</button>
                    :<button type={'submit'} className={'theme-btn py-2'}>회원가입</button>
                }


            </div>
        </Form>
    )
}

export default SignupForm;