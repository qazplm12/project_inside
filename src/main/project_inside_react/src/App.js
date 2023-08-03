import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Sim from "./Sim";
import Layout from "./Layout";
import Park from "./Park";
import Lee from "./Lee";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/pi'} element={<Layout/>}>
                        <Route path={'sim'} element={<Sim/>}></Route>
                        <Route path={'park'} element={<Park/>}></Route>
                        <Route path={'lee'} element={<Lee/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
