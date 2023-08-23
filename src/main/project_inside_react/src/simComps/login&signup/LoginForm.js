import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {login} from "../../service/Service";
import axios from "axios";

function LoginForm(props) {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const doLogin = () => {
        // const requestData = {
        //     personId: userId,
        //     personPassword: userPw,
        // }

        // axios.post("http://localhost:8080/login", requestData

        // axios.post('http://localhost:8080/login', requestData)
        axios.post("http://localhost:8080/login", null, {
            params: {
                personId: userId,
                personPassword: userPw,
            }
        })
            .then((resp) => {
                // 회원가입 완료시 토큰 발급, 메인화면 or 로그인 탭으로 이동
                alert('로그인 성공')
                window.location.href = '/pi/main'
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        console.log(userId, userPw)
    }, [userId, userPw]);

    return (
        // <Form action="">
        <Form action="http://localhost:8080/login" method={'post'}> {/* 8080포트 사용해야함 아니면 에러 */}
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
            {/* 로그인은 컨트롤에 따로 함수 안만들어도 됨 알아서 DetailService의 loadUserByUsername로 가기 때문, axios 사용하지 않고 form action에 직접 /login주소를 주고 버튼은 type submit.
            제대로 세션이 생성되지 않던 이유는 axios로 받아오는 데이터 타입때문 같음.. 이건 내 생각(form으로 보내면 DTO 혹은 각각 받아오니까)
            Spring Security는 기본적으로 "/login" 주소로 로그인 요청이 오는 것을 감지하고 처리 */}
                {/*<button type={'button'} onClick={doLogin} className={'theme-btn py-2'}>로그인</button>*/}
                <button type={'submit'} className={'theme-btn py-2'}>로그인</button>
            </div>
        </Form>
    )
}

export default LoginForm;