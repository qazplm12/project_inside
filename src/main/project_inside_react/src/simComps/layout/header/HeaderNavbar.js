import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavItem from "./NavItem";


function HeaderNavbar(props) {

    return (
        <nav className={"navbar navbar-expand-lg"}>
            <div className={"container"}>
                <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className={"navbar-nav me-auto ms-4 mb-2 mb-lg-0"}>
                        <NavItem name={'알고리즘 문제'} to={'/pi/challenge'}/>
                        <NavItem name={'프로젝트 모집'} to={'/pi/project'}/>
                        <NavItem name={'언어별 공식 문서'} to={'/pi/codeLanguage'}/>
                        <NavItem name={'문의'} to={'/pi/inquiry'}/>
                    </ul>
                    <form className={"d-flex"} role="search">
                        <select className="form-select w-50 me-2" aria-label="Default select example">
                            <option value="1" defaultChecked={true}>문제</option>
                            <option value="2">프로젝트</option>
                        </select>
                        <input className={"form-control me-2"} type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className={"btn btn-outline-light"} type="submit"><i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default HeaderNavbar;