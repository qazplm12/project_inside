import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ChallengeListTableTd from "./ChallengeListTableTd";

function ChallengeListTable(props) {
    // const [challengeList, setChallengeList] = useState([]);

    const getChallengeList = props.sendChallengeList;
    const getSearch = props.sendSearch;
    // setChallengeList(getChallengeList); // 얘가 무한 랜더링
    // console.log(getChallengeList);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/server/challengeList")
    //         .then(res => {
    //             console.log("통신 성공 : " + res.data);
    //
    //             setChallengeList(res.data);
    //         })
    //         .catch(err => {
    //             console.log("통신 에러 : " + err);
    //         });
    // }, []);

    return (
        <div>
            <table className={'table table-borderless table-hover border'}>
                <thead className={'border'}>
                <tr>
                    <th>상태</th>
                    <th>제목</th>
                    <th>난이도</th>
                    <th>완료한 사람</th>
                    <th>정답률</th>
                </tr>
                </thead>
                <tbody>
                {
                    getChallengeList.map((item, index) => {
                        if (getSearch == null) {
                            return (
                                <tr key={index}>
                                    <ChallengeListTableTd challengeIdx={item.challengeIdx}></ChallengeListTableTd>
                                    <td><Link to={`http://localhost:3000/lee?idx=${item.challengeIdx}`}>{item.challengeTitle}</Link></td>
                                    <td>{item.challengeClass}</td>
                                    <td>{item.challengeCompletePerson}</td>
                                    <td>{item.challengeCorrectPercent}%</td>
                                </tr>
                            );
                        }
                        else if (item.challengeTitle.includes(getSearch)) { // includes : 제목에 검색어가 포함되면 true
                            return (
                                <tr key={index}>
                                    <ChallengeListTableTd challengeIdx={item.challengeIdx}></ChallengeListTableTd>
                                    <td><Link to={`http://localhost:3000/lee?idx=${item.challengeIdx}`}>{item.challengeTitle}</Link></td>
                                    <td>{item.challengeClass}</td>
                                    <td>{item.challengeCompletePerson}</td>
                                    <td>{item.challengeCorrectPercent}%</td>
                                </tr>
                            );
                        }
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default ChallengeListTable;