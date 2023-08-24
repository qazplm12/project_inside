import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function ChallengeListSidebar(props) {
    const [totalChallenge, setTotalChallenge] = useState('');
    const [ranking, setRanking] = useState('');
    const [toyAnnony, setToyAnnony] = useState('');
    const [toyUser, setToyUser] = useState('');
    const [random, setRandom] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        const rank = async() => {
            try {
                const result1 = await axios.get(`http://localhost:8080/server/userRank`);
                const userRank = result1.data;
                const result2 = await axios.get(`http://localhost:8080/server/numRank`);
                const numRank = result2.data;

                for (let i = 0; i < userRank.length; i++) {
                    if (userRank[i] == userInfo.personId) {
                        // console.log(userRank[i]);
                        // console.log(numRank[i]);
                        setRanking(numRank[i]);
                    }
                }
            }
            catch (e) {
                console.log("err : " + e);
            }
        }
        axios.get(`http://localhost:8080/server/totalChallenge?userNick=${userInfo?.personNickName}`)
            .then(res => {
                setTotalChallenge(res.data);
            })
            .catch(err => {
                console.log('ChallengeListSidebar1 통신 에러 : ' + err);
            })
        axios.get(`http://localhost:8080/server/toyAnnony`)
            .then(res => {
                setToyAnnony(res.data);
            })
            .catch(err => {

            })
        axios.get(`http://localhost:8080/server/toyUser?language=${userInfo?.personLanguage}`)
            .then(res => {
                setToyUser(res.data);
                // console.log(res.data);
                let math = Math.floor(Math.random() * res.data.length);
                setRandom(math);
                // console.log("랜덤 뽑기 : " + math);
            })
            .catch(err => {

            })
        rank();

    }, []);

    // 자바스크립트로 split 하는 방법
    // const beforeSplit = 'hello, world, java, javaScript';
    // console.log("beforeSplit : " + beforeSplit);
    // let afterSplit = [];
    // afterSplit = beforeSplit.split(', ');
    // console.log("afterSplit : " + afterSplit)

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
                        <img src={toyAnnony.projectThumbnail === '' ? "/images/ProjectImg.png" : `/images/thumbnail/${toyAnnony.projectThumbnail}`} alt="" className={'rounded w-100 my-3'} style={{maxWidth: "10em"}}/>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-8 text-start mt-3'}>
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
                        <img src={userInfo.personImgPath === null ? "/images/ProfileImg.png" : `/images/profileImg/${userInfo.personImgPath}`} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                        <p className={'pt-3'}>{userInfo.personNickName}</p>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-sm-5'}>
                                <p className={'text-start'}>내 랭킹 : {ranking}</p>
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
                    <li className={'list-group-item p-2 py-4'}>
                        <p className={'mt-3'}>{userInfo.personNickName}님 추천 프로젝트</p>
                        {/*<img src={'/images/profile.jpg'} alt="" className={'rounded w-100 mt-3'} style={{maxWidth: "10em"}}/>*/}
                        <img src={toyUser[random]?.projectThumbnail === '' ? "/images/ProjectImg.png" : `/images/thumbnail/${toyUser[random]?.projectThumbnail}`} alt="" className={'rounded w-100 my-3'} style={{maxWidth: "10em"}}/>
                        <div className={'row d-flex justify-content-center'}>
                            <div className={'col-10 text-start mt-3'}>
                                <p>프로젝트 이름 : {toyUser[random]?.projectTitle}</p>
                                <p>프로젝트 인원 : {toyUser[random]?.projectMember}명</p>
                                <p>사용 언어 : {toyUser[random]?.projectLanguage}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ChallengeListSidebar;