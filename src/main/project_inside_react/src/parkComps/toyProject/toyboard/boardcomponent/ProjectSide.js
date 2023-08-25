// import React, {useEffect, useState} from "react";
// import {Button} from "react-bootstrap";
// import axios from "axios";
//
// function ProjectSide(props) {
//
//     // 랭킹 관련
//
//     const [ranking, setRanking] = useState('');
//     const [random, setRandom] = useState('');
//
//     useEffect(() => {
//         const rank = async() => {
//             try {
//                 const result1 = await axios.get(`http://localhost:8080/server/userRank`);
//                 const userRank = result1.data;
//                 const result2 = await axios.get(`http://localhost:8080/server/numRank`);
//                 const numRank = result2.data;
//
//                 for (let i = 0; i < userRank.length; i++) {
//                     if (userRank[i] == userInfo?.personId) {
//                         // console.log(userRank[i]);
//                         // console.log(numRank[i]);
//                         setRanking(numRank[i]);
//                     }
//                 }
//             }
//             catch (e) {
//                 console.log("err : " + e);
//             }
//         }
//         axios.get(`http://localhost:8080/server/totalChallenge?userNick=${userInfo?.personNickName}`)
//             .then(res => {
//                 setTotalChallenge(res.data);
//             })
//             .catch(err => {
//                 console.log('ChallengeListSidebar1 통신 에러 : ' + err);
//             })
//
//         axios.get(`http://localhost:8080/server/userDetail?userId=${userInfo?.personId}`)
//             .then(res => {
//                 setUserDetail(res.data);
//             })
//             .catch(err => {
//                 console.log("코드챌린지 에러 : " + err)
//             });
//         rank();
//
//     }, []);
//
//     // 회원 유무 체크
//     const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));
//
//     useEffect(() => {
//         console.log("userIn?::" + userInfo);
//     }, [userInfo]);
//
//
//     // 회원 정보 가져 오기
//     const [userNames, setUserNames] = useState([]);
//
//     useEffect(() => {
//         axios.post("http://localhost:8080/pi/toyProject/sideProfile", {
//             userInfo: userInfo
//         })
//             .then(response => {
//                 console.log('성공')
//                 console.log('test' + userInfo.personImgPath)
//                 console.log('response.data 정체 ::' + response.data)
//                 setUserNames(response.data)
//             })
//             .catch((error) => {
//                 console.log("userInfo side value:::" + error)
//             });
//     }, []);
//
//     if (userInfo != null) {
//         return (
//             <>
//                 <div className={"me-5 pe-2"}>
//                     <ul className={'list-group theme-border'}>
//                         <li className={'list-group-item p-2 pt-4'}>
//                             <img
//                                 src={
//                                 userInfo ?
//                                     userInfo.personImgPath === null
//                                         ? "/images/noImg/ProfileImg.jpg"
//                                         : `/images/profileImg/${userInfo.personImgPath}` :
//                                     ""}
//                                 alt="" className={'circle-background w-100'} style={{maxWidth: "10em"}}/>
//                             <h4 className={'text-center theme-font'}><strong>{userNames.personNickName}</strong><span
//                                 className={'fs-5 ms-1'}>(Lv.{userNames.personLevel})</span></h4>
//                             <div className={'row justify-content-center'}>
//                                 <div className={'col-sm-4 text-center pe-0'}>
//                                     <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-trophy theme-font"></i> 랭킹</b></span>
//                                     <p className={'mt-2'}>{userDetail.ranking} 등</p>
//                                 </div>
//                                 <div className={'col-sm-3 text-center px-0'}>
//                                     <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-table theme-font"></i> 점수</b></span>
//                                     <p className={'mt-2'}>{userDetail.personTotalScore} 점</p>
//                                 </div>
//                                 <div className={'col-sm-4 text-center ps-0'}>
//                                     <span className={'theme-font'} style={{fontSize: '1.2em'}}><b><i className="bi bi-lightbulb theme-font"></i> 문제</b></span>
//                                     <p className={'mt-2'}>{userDetail.totalChallenge} 개</p>
//                                 </div>
//                             </div>
//                         </li>
//                         <div className={"theme-border pt-3 pb-3"}>
//
//                             <Button type={"button"} className={"theme-btn"}
//                                     onClick={() => {
//                                         const formData = new FormData();
//                                         formData.append("personNickName", userNames.personNickName)
//                                         axios.post('http://localhost:8080/pi/toyProject/projectNullCheck', formData)
//                                             .then(res => {
//                                                 console.log(res.data)
//                                                 if (res.data == 1) {
//                                                     window.location.href = 'http://localhost:3000/pi/ToyRegis';
//                                                 } else {
//                                                     alert('이미 프로젝트를 생성 하셨습니다.')
//                                                 }
//                                             })
//                                     }}
//                             >프로젝트 등록</Button>
//                         </div>
//                     </ul>
//                 </div>
//             </>
//         )
//     } else if (userInfo == null) {
//         return (
//             <div className={"border border-2 theme-border py-5"}>
//                 <div>
//                     <img src={"/static/media/logo_pi.371eebd9846845f6cd1d.jpg"} className={"sideImg"}/>
//                 </div>
//                 <div className={"mt-5"}>
//                     <Button type={"button"} className={"theme-btn"}
//                             onClick={() => {
//                                 window.location.href = 'http://localhost:3000/userAuth/login';
//                             }}
//                     >회원 가입</Button>
//                 </div>
//             </div>
//         )
//     }
// }
//
//
// export default ProjectSide;