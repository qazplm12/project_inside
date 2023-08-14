import './App.css';
import './theme.css'; // 메인테마 커스터 마이징
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import Lee from "./leeComps/Lee";
import Main from "./simComps/main/Main";
import UserAuth from "./simComps/login&signup/UserAuth";
import MyPage from "./simComps/myPage/MyPage";
import ChallengeList from "./leeComps/chanllengeList/ChallengeList";
import ToyRegis from "./parkComps/toyProject/ToyRegis";
import ToyDetail from "./parkComps/toyProject/ToyDetail";
import ToyListBoard from "./parkComps/toyProject/ToyListBoard";

function App(props) {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/pi'} element={<Layout/>}>
                        {/* 헤더, 푸터 필요한 컴포넌트들*/}
                        <Route path={'sim'} element={<Main/>}></Route>
                        <Route path={'myPage'} element={<MyPage/>}></Route>
                        <Route path={'toyDetail'} element={<ToyDetail/>}></Route>
                        <Route path={'ToyRegis'} element={<ToyRegis/>}></Route>
                        <Route path={'toyListBoard'} element={<ToyListBoard/>}></Route>
                        <Route path={'challengeList'} element={<ChallengeList/>}></Route>
                    </Route>
                    {/* 그 외 개별 컴포넌트들 */}
                    <Route path={'/userAuth/:into'} element={<UserAuth/>}></Route>
                    <Route path={'/lee'} element={<Lee/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
