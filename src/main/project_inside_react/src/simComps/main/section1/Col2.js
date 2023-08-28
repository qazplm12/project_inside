import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function Col2(props) {

    const [questionList, setQuestionList] = useState([]);
    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getQuestionListLatest", null)
            .then((res) => {
                const list = []
                for (let i = 0; i < 5; i++) {
                    list.push(res.data[i])
                }
                console.log(list)
                setQuestionList(list);
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

    return (
        <div className={'col-sm-4 p-4'}>
            <div className={'d-flex justify-content-between'}>
                <p>최근 질문</p>
                {/* 링크 질문 페이지로 */}
                <Link to={`/pi/QnA?idx=${questionList.length > 0 ? questionList[0].questionChallengeIdx : '2'}`}
                      className={'theme-link'}>더보기</Link>
            </div>
            <table className={'table'}>
                <colgroup>
                    <col width={'10%'}/>
                    <col width={'36%'}/>
                    <col/>
                    <col width={'18%'}/>
                </colgroup>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>문제</th>
                    <th>질문</th>
                    <th>정답률</th>
                </tr>
                </thead>
                <tbody>
                {/* 맵 함수로 표현? */}
                {
                    challengeList.length > 0 && questionList.length > 0
                        ?
                        challengeList.map((item, index, array) => (
                            index < 5
                                ?
                                <tr key={`Cl${index}`}>
                                    <td>{questionList ? questionList[index].questionIdx : ""}</td>
                                    <td className={'px-0'}>
                                        {item.challengeTitle.length < 9
                                            ? <Link className={'theme-link'}
                                                    to={`/codeChallenge?idx=${item.challengeIdx}`}>{item.challengeTitle}</Link>

                                            : <Link className={'theme-link'}
                                                    to={`/codeChallenge?idx=${item.challengeIdx}`}>{item.challengeTitle.slice(0, 8) + '...'}</Link>}
                                    </td>
                                    <td className={'px-0'}>
                                        {questionList[index].questionTitle.length < 9
                                            ? <Link className={'theme-link'}
                                                    to={`/pi/QnA?idx=${item.challengeIdx}`}>{questionList[index].questionTitle}</Link>

                                            : <Link className={'theme-link'}
                                                    to={`/pi/QnA?idx=${item.challengeIdx}`}>{questionList[index].questionTitle.slice(0, 8) + '...'}</Link>}
                                    </td>
                                    <td>{item.challengeCorrectPercent}%</td>
                                </tr>
                                : ""
                            ))
                        : ""
                }
                </tbody>
            </table>
        </div>
    )
}

export default Col2;