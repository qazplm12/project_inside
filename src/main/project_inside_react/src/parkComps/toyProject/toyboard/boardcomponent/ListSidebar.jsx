import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function ListSidebar(props) {
    const [totalChallenge, setTotalChallenge] = useState('');
    const [ranking, setRanking] = useState('');
    const [toyAnnony, setToyAnnony] = useState('');
    const [toyUser, setToyUser] = useState('');
    const [random, setRandom] = useState('');
    const [userDetail, setUserDetail] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        const rank = async() => {
            try {
                const result1 = await axios.get(`http://localhost:8080/server/userRank`);
                const userRank = result1.data;
                const result2 = await axios.get(`http://localhost:8080/server/numRank`);
                const numRank = result2.data;

                for (let i = 0; i < userRank.length; i++) {
                    if (userRank[i] == userInfo?.personId) {
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
                setToyUser(res.data); // 프로젝트 정보를 담음
                // console.log(res.data);
                let math = Math.floor(Math.random() * res.data.length);
                setRandom(math);
                // console.log("랜덤 뽑기 : " + math);
            })
            .catch(err => {

            })
        axios.get(`http://localhost:8080/server/userDetail?userId=${userInfo?.personId}`)
            .then(res => {
                setUserDetail(res.data);
            })
            .catch(err => {
                console.log("코드챌린지 에러 : " + err)
            });
        rank();

    }, []);

    // 자바스크립트로 split 하는 방법
    // const beforeSplit = 'hello, world, java, javaScript';
    // console.log("beforeSplit : " + beforeSplit);
    // let afterSplit = [];
    // afterSplit = beforeSplit.split(', ');
    // console.log("afterSplit : " + afterSplit)

    // console.log(toyAnnony.projectThumbnail);
    // console.log(userInfo.personImgPath);

    if (userInfo == null) {
        return (
            <div>
                <ul className={'list-group'}>
                    <li className={'list-group-item p-2 py-4'}>
                        <p className={'my-3'}>로그인 정보가 없습니다!</p>
                        <Link className={'d-block theme-btn mx-auto mt-4 mb-3 px-0 text-decoration-none fs-5 w-50'} to={'/userAuth/login'}>로그인</Link>
                    </li>
                    <li className={'list-group-item p-2 py-4'}>
                        <p className={'mt-3'}>최근 등록된 프로젝트</p>
                        {/*<img src={'/images/profile.jpg'} alt="" className={'rounded w-100'} style={{maxWidth: "10em"}}/>*/}
                        <img src={toyAnnony.projectThumbnail === ('' || undefined) ? "/images/ProjectImg.png" : `/images/thumbnail/${toyAnnony.projectThumbnail}`} alt="" className={'rounded w-100 my-3'} style={{maxWidth: "10em"}}/>
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
                        <img src={userInfo?.personImgPath === null ? "/images/ProfileImg.png" : `/images/profileImg/${userInfo?.personImgPath}`} alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
                        <h4 className={'text-center theme-font py-2'}><strong>{userInfo.personNickName}</strong><span className={'fs-5 ms-1'}>(Lv.{userDetail.personLevel})</span></h4>
                        {/*<div className={'m-3 ms-5 ps-2 col-sm-8 mx-auto'}>*/}
                        {/*    <p className={'text-start mb-2'}>내 랭킹 : <span className={'mx-4'}></span> {userInfo.personLevel} </p>*/}
                        {/*    <p className={'text-start'}>내 점수 : <span className={'mx-4'}></span> {userInfo.personTotalScore} </p>*/}
                        {/*    <p className={'text-start'}>내 문제 : <span className={'mx-4'}></span> {totalChallenge} </p>*/}
                        {/*</div>*/}


                        <div className={'row justify-content-center'}>
                            <div className={'col-sm-4 text-center pe-0'}>
                                <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-trophy theme-font"></i> 랭킹</b></span>
                                <p className={'mt-2'}>{ranking} 등</p>
                            </div>
                            <div className={'col-sm-3 text-center px-0'}>
                                <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-table theme-font"></i> 점수</b></span>
                                <p className={'mt-2'}>{userDetail.personTotalScore} 점</p>
                            </div>
                            <div className={'col-sm-4 text-center ps-0'}>
                                <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-lightbulb theme-font"></i> 문제</b></span>
                                <p className={'mt-2'}>{totalChallenge} 개</p>
                            </div>
                        </div>
                    </li>
                    {
                        userInfo?.personLanguage
                            ?
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
                            :
                            <li className={'list-group-item p-2 py-4'}>
                                <p className={'mt-3'}>{userInfo.personNickName}님! 추천 프로젝트가 없습니다!</p>
                                <p>선호하는 언어를 등록해주세요</p>
                                <Link to={'/pi/myPage/profile/0#profile'} className={'d-block theme-btn mx-auto mt-4 mb-3 px-0 text-decoration-none fs-5 w-75'}>언어 등록하기</Link>
                            </li>
                    }
                </ul>
            </div>
        )
    }
}

export default ListSidebar;