import React from "react";
import {Button} from "react-bootstrap";

function ProjectSide(props){
    return(
        <div className={"me-5 pe-2"}>
            <ul className={'list-group theme-border'}>
                <li className={'list-group-item p-2 pt-4'}>
                    <img src={'/images/sakura.jpg'} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                    <p className={'pt-3'}>userNick</p>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={'col-sm-5'}>
                            <p className={'text-start'}>내 랭킹 : 1</p>
                        </div>
                        <div className={'col-sm-5 pe-0 ps-3'}>
                            <p className={'text-start'}>내 점수 : 100</p>
                        </div>
                    </div>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={'col-sm-5'}>
                            <p className={'text-start'}>내 레벨 : 3</p>
                        </div>
                        <div className={'col-sm-5 pe-0 ps-3'}>
                            <p className={'text-start'}>내 문제 : 10</p>
                        </div>
                    </div>
                </li>
                <div className={"theme-border pt-3 pb-3"}>
                    <Button type={"button"} className={"theme-btn"}
                            onClick={() => {
                                window.location.href = 'http://localhost:3000/pi/ToyRegis';
                            }}
                    >프로젝트 등록</Button>
                </div>
            </ul>
        </div>
    )
}

export default ProjectSide;