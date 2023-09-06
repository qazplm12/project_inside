import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function Col1(props) {

    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8081/simServer/getChallengeListLatest", null)
            .then((res) => {
                setChallengeList(res.data)
            })
            .catch((error) => {

            });
    }, []);

    return (
        <div className={'col-sm-4 p-4'}>
            <div className={'d-flex justify-content-between'}>
                <p>최신 문제</p>
                <Link to={'/pi/challengeList'} className={'theme-link'}>더보기</Link>
            </div>
            <table className={'table'}>
                <colgroup>
                    <col width={'10%'}/>
                    <col />
                    <col width={'18%'}/>
                    <col width={'18%'}/>
                </colgroup>
                <thead className={'theme-bg'}>
                <tr>
                    <th>No.</th>
                    <th>문제</th>
                    <th>난이도</th>
                    <th>정답률</th>
                </tr>
                </thead>
                <tbody>
                {/* 맵 함수로 표현? */}
                {
                    challengeList.map((item, index, array) => (
                        index < 5
                            ?
                            <tr key={index}>
                                <td>{item.challengeIdx}</td>
                                <td>
                                    {item.challengeTitle.length < 14
                                        ? <Link className={'theme-link'} to={`/codeChallenge?idx=${item.challengeIdx}`}>{item.challengeTitle}</Link>
                                        : <Link className={'theme-link'} to={`/codeChallenge?idx=${item.challengeIdx}`}>{item.challengeTitle.slice(0, 13)+ '...'}</Link>}
                                </td>
                                <td>Lv.{item.challengeClass}</td>
                                <td>{item.challengeCorrectPercent}%</td>
                            </tr>
                            : ""
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Col1;