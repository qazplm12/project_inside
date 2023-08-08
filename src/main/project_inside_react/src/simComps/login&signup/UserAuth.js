import React from 'react';
import LogoNoBg from "../layout/header/LogoNoBg";
import LoginForm from "./LoginForm";
import {Tab, Tabs} from "react-bootstrap";
import {useParams} from "react-router-dom";
import SignupForm from "./SignupForm";
import HappyCat from "./HappyCat";
import "./UserAuth.css";

function UserAuth(props) {

    // 로그인 누르면 로그인 탭, 회원가입 누르면 회원가입 탭이 먼저 나오게해주기 위함
    let {into} = useParams()

    return (
        <div className={'theme-bg py-5'} style={{height:'100vh'}}>
            {/* 이동하는 gif */}
            <div className={'position-absolute top-50 start-50 '}>
                <HappyCat />
            </div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-8 text-start py-5'}>
                        <LogoNoBg/>
                        <h1 className={'pt-5 mt-5 display-4 ms-5'}>Project Inside</h1>
                        <p className={'ms-5'}>쏼라쏼라</p>
                    </div>
                    <div className={'col-4 my-5 bg-white pt-0 rounded-3 shadow-lg'} style={{border:"1px solid gray"}}>
                        <Tabs
                            defaultActiveKey={into}
                            className="mt-2 border-0"
                            fill
                        >
                            <Tab
                                eventKey="login" title="로그인"
                                className={'mt-3'}>
                                <LoginForm/>
                            </Tab>
                            <Tab
                                eventKey="signup" title="회원가입"
                                className={'mt-3'}>
                                <SignupForm />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAuth;