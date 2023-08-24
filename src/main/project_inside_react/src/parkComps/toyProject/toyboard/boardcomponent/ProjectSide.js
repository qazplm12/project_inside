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
            axios.post("http://localhost:8080/pi/toyProject/sideProfile", {
                userInfo: userInfo
            })
            .then(response => {
                console.log('성공')
                console.log('response.data 정체 ::'+response.data)
                setUserNames(response.data)
            })
            .catch((error) =>{
                console.log("userInfo side value:::"+error)
            });
    }, []);

    if(userInfo != null){
        return(
            <>
            <div className={"me-5 pe-2"}>
                <ul className={'list-group theme-border'}>
                    <li className={'list-group-item p-2 pt-4'}>
                        <img src={'/images/sakura.jpg'} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                        <div className={'row d-flex justify-content-center mt-5'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>닉네임 : {userNames.personNickName} </p>
                            </div>
                            <div className={'col-sm-5 pe-0 ps-3'}>
                                <p className={'text-start'}>내 랭킹 : {userNames.personLevel} </p>
                            </div>
                        </div>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>내 점수 :{userNames.personTotalScore} </p>
                            </div>
                            <div className={'col-sm-5 pe-0 ps-3'}>
                                <p className={'text-start'}>내 레벨 : LV. {userNames.personLevel}</p>
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
            </>
        )}
    else if(userInfo == null){
        return(
            <div className={"border border-2 theme-border py-5"}>
                <div>
                    <img src={"/static/media/logo_pi.371eebd9846845f6cd1d.jpg"} className={"sideImg"}/>
                </div>
                <div className={"mt-5"}>
                    <Button type={"button"} className={"theme-btn"}
                        onClick={() => {
                            window.location.href='http://localhost:3000/userAuth/login';
                        }}
                    >회원 가입</Button>
                </div>
            </div>
        )
    }
}


export default ProjectSide;