import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function Col2(props) {

    const [questionList, setQuestionList] = useState([]);
    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getQuestionListLatest", null)
            .then((res) => {
                setQuestionList(res.data)
            })
            .catch((error) => {

            });

        axios.post("http://localhost:8080/simServer/getChallengeList", null)
            .then((res) => {
                setChallengeList(res.data)
            })
            .catch((error) => {

            });
    }, []);

    const getChallengeTitle = (idx) => {
        console.log(challengeList)

        challengeList.find(idx => {
            return (challengeList.challengeTitle === idx)
        })
    }


    return (
        <div className={'col-sm-4 p-4'}>
            <div className={'d-flex justify-content-between'}>
                <p>최근 질문</p>
                {/* 링크 질문 페이지로 */}
                <Link to={'/pi/QnA?idx=1'} className={'theme-link'}>더보기</Link>
            </div>
            <table className={'table'}>
                <colgroup>
                    <col width={'10%'}/>
                    <col width={'25%'}/>
                    <col width={'40%'}/>
                    <col width={'25%'}/>
                </colgroup>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>문제</th>
                    <th>난이도</th>
                    <th>비고</th>
                </tr>
                </thead>
                <tbody>
                {/* 맵 함수로 표현? */}
                {
                    questionList.map((item, index, array) => (
                        index < 5
                            ?
                            <tr>
                                <td>{item.questionChallengeIdx}</td>
                                <td>
                                    {
                                        getChallengeTitle(item.questionChallengeIdx)
                                }
                                </td>
                                <td>{item.questionClass}</td>
                                <td>{item.questionCorrectPercent}</td>
                            </tr>
                            : ""
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Col2;