import './App.css';
import './theme.css'; // 메인테마 커스터 마이징
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import Lee from "./leeComps/Lee";
import Main from "./simComps/main/Main";
import UserAuth from "./simComps/login&signup/UserAuth";
import MyPage from "./simComps/myPage/MyPage";
import Park from "./parkComps/Park";
import Iframe from "./leeComps/Iframe";


function App(props) {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/pi'} element={<Layout/>}>
                        {/* 헤더, 푸터 필요한 컴포넌트들*/}
                        <Route path={'sim'} element={<Main/>}></Route>
                        <Route path={'myPage'} element={<MyPage/>}></Route>
                        <Route path={'park'} element={<Park/>}></Route>
                    </Route>
                    {/* 그 외 개별 컴포넌트들 */}
                    <Route path={'/userAuth/:into'} element={<UserAuth/>}></Route>
                    <Route path={'/lee'} element={<Lee/>}></Route>
                    <Route path={'/iframe'} element={<Iframe/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
