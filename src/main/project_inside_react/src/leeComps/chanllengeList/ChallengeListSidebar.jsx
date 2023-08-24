import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function ChallengeListSidebar(props) {
    const [totalChallenge, setTotalChallenge] = useState('');
    const [userRank, setUserRank] = useState('');
    const [toyAnnony, setToyAnnony] = useState('');
    const [toyUser, setToyUser] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        axios.get(`http://localhost:8080/server/totalChallenge?userId=${userInfo?.personNickName}`)
            .then(res => {
                setTotalChallenge(res.data);
                // console.log("내 문제 : " + res.data);
            })
            .catch(err => {
                console.log('ChallengeListSidebar1 통신 에러 : ' + err);
            })
        axios.get(`http://localhost:8080/server/userRank?userId=${userInfo?.personId}`)
            .then(res => {
                setUserRank(res.data);
                // console.log("랭킹 : " + res.data);
            })
            .catch(err => {
                console.log('ChallengeListSidebar2 통신 에러 : ' + err);
            })
        axios.get(`http://localhost:8080/server/toyAnnony`)
            .then(res => {
                setToyAnnony(res.data);
            })
            .catch(err => {

            })
        axios.get(`http://localhost:8080/server/toyUser`)
            .then(res => {
                setToyUser(res.data);
            })
            .catch(err => {

            })
    }, []);

    if (userInfo == null) {
        return (
            <div>
                <ul className={'list-group'}>
                    <li className={'list-group-item p-2 py-4'}>
                        <p className={'my-3'}>로그인 정보가 없습니다!</p>
                        <Link className={'btn btn-primary btn-lg my-3'} to={'/userAuth/login'}>로그인</Link>
                    </li>
                    <li className={'list-group-item p-2 py-4'}>
                        <p className={'mt-3'}>최근 등록된 프로젝트</p>
                        {/*<img src={'/images/profile.jpg'} alt="" className={'rounded w-100'} style={{maxWidth: "10em"}}/>*/}
                        <img src={toyAnnony.projectThumbnail === null ? "images/ProjectImg.png" : `/images/thumbnail/${toyAnnony.projectThumbnail}`} alt="" className={'rounded w-100'} style={{maxWidth: "10em"}}/>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-10 text-start mt-3'}>
                                <p>프로젝트 이름 : {toyAnnony.projectTitle}</p>
                                <p>프로젝트 인원 : {toyAnnony.projectMember}명</p>
                                <p>사용 언어 : {toyAnnony.projectLanguage}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                <ul className={'list-group'}>
                    <li className={'list-group-item p-2 pt-4'}>
                        {/*<img src={'/images/sakura.jpg'} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>*/}
                        <img src={userInfo.personImgPath === null ? "images/ProfileImg.png" : `/images/profileImg/${userInfo.personImgPath}`} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                        <p className={'pt-3'}>{userInfo.personNickName}</p>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>내 랭킹 : {userRank}</p>
                            </div>
                            <div className={'col-sm-5 pe-0 ps-3'}>
                                <p className={'text-start'}>내 점수 : {userInfo.personTotalScore}</p>
                            </div>
                        </div>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>내 레벨 : {userInfo.personLevel}</p>
                            </div>
                            <div className={'col-sm-5 pe-0 ps-3'}>
                                <p className={'text-start'}>내 문제 : {totalChallenge}</p>
                            </div>
                        </div>
                    </li>
                    <li className={'list-group-item'}>
                        <img src={'/images/profile.jpg'} alt="" className={'rounded w-100 mt-3'} style={{maxWidth: "10em"}}/>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-10 text-start mt-3'}>
                                <p>프로젝트 이름 : 람쥐이</p>
                                <p>프로젝트 인원 : 5명</p>
                                <p>사용 언어 : Java, JavaScript</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ChallengeListSidebar;