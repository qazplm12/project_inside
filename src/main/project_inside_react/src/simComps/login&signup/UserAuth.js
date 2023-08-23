import React, {useEffect, useState} from 'react';
import LogoNoBg from "../commons/LogoNoBg";
import LoginForm from "./LoginForm";
import {Tab, Tabs} from "react-bootstrap";
import {useParams} from "react-router-dom";
import SignupForm from "./SignupForm";
import HappyCat from "../commons/HappyCat";

function UserAuth(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    // 로그인 누르면 로그인 탭, 회원가입 누르면 회원가입 탭이 먼저 나오게해주기 위함
    let {into} = useParams()

    useEffect(() => {
        if(userInfo){
            alert('잘못된 접근입니다.');
            window.location.href = "/pi/main";
        }
        // 컴포넌트 마운트 시 스크롤 방지
        document.body.style.overflow = 'hidden';

        // 컴포넌트 언마운트 시 해제
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={'theme-bg py-5'} style={{height:'100vh'}}>
            {/* 누르면 사라지는 이동하는 gif */}
            <div className={'position-absolute top-50 start-50 '}>
                <HappyCat />
                <HappyCat />
            </div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-8 text-start py-5'}>
                        <LogoNoBg/>
                        <h1 className={'pt-5 mt-5 mb-3 ms-5 display-4'}><strong>Project Inside</strong></h1>
                        <p className={'ms-5 ps-1'}><strong className={'text-white'}>알고리즘 문제</strong>와 <strong className={'text-white'}>프로젝트 협업</strong> 두 마리 고양이를 모두 잡을 수 있는 플랫폼을 소개합니다.</p>
                        <p className={'ms-5 ps-1'}>문제 해결력과 협업 능력을 함께 키워가며, 멤버들과 함께 성장해나가세요.</p>
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