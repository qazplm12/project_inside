import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

function ProjectSide(props){

    // 회원 유무 체크
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        console.log("userIn?::"+userInfo);
    }, [userInfo]);

    // 회원 정보 가져 오기
    const [userNames, setUserNames] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/pi/toyProject/codeSearch")
            .then(response => {
                setUserNames(response.data)
            })
            .catch((error) =>{
               console.log("userInfo side value:::"+error)
            });
    }, []);

    if(userInfo != null){

        return(
            <>
        {userNames.map(item => (
            <div className={"me-5 pe-2"}>
                <ul className={'list-group theme-border'}>
                    <li className={'list-group-item p-2 pt-4'}>
                        <img src={'/images/sakura.jpg'} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                        <p className={'pt-3'}>userNick</p>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>내 랭킹 : {item.personId}</p>
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
        ))};
            </>
        )}
    else if(userInfo == null){
        return(
            <div className={"border border-2 theme-border py-5"}>
                <div>
                    <img src={"/static/media/logo_pi.371eebd9846845f6cd1d.jpg"} className={"sideImg"}/>
                </div>
                <div className={"mt-5"}>
                    <Button type={"button"} className={"theme-btn"}>회원 가입</Button>
                </div>
            </div>
        )
    }
}


export default ProjectSide;