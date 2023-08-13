import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ChallengeListTable from "./ChallengeListTable";
import ChallengeListSidebar from "./ChallengeListSidebar";

function ChallengeList(props) {
    const [solvedState, setSolvedState] = useState('9');
    const [challengeClass, setChallengeClass] = useState('9');
    const [userId, setUserId] = useState('test');
    const [sendChallengeList, setSendChallengeList] = useState('');

    useEffect(() => {
        setSolvedState(solvedState);
        setChallengeClass(challengeClass);

        axios.get(`http://localhost:8080/server/challengeListClass?id=${userId}&challengeClass=${challengeClass}&solvedState=${solvedState}`)
            .then(res => {
                console.log("통신 성공 : " + res)

                setSendChallengeList(res.data);
            })
            .catch(err => {
                console.log("통신 에러 : " + err)
            });

    }, [solvedState,challengeClass]);

    return (
        <div className={'container-sm my-3'}>
            <div className={'row'}>
                <div className={'col-sm-9'}>
                    <h1>문제 리스트 페이지</h1>
                    <div className={'row'}>
                        <div className={'col-3'}>
                            <select name="" id="" className={'form-select me-2'} value={solvedState} onChange={e => setSolvedState(e.target.value)}>
                                <option value="9" hidden={true}>상태</option>
                                <option value="1">해결한 문제</option>
                                <option value="0">해결 못 한 문제</option>
                                <option value="9">전체 문제</option>
                            </select>
                        </div>
                        <div className={'col-3'}>
                            <select name="" id="" className={'form-select me-2'} value={challengeClass} onChange={e => setChallengeClass(e.target.value)}>
                                <option value="9" hidden={true}>난이도</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="9">전체 난이도</option>
                            </select>
                        </div>
                        <div className={'col-6'}>
                            <input type="text" className={'form-control'} placeholder={'내용을 입력해주세요'}/>
                        </div>
                    </div>

                    <ChallengeListTable sendChallengeList={sendChallengeList}/>
                </div>
                <div className={'col-sm-3'}>
                    <ChallengeListSidebar/>
                    <Link to={`http://localhost:3000/lee?idx=1`} className={'btn btn-primary'}>문제로 이동</Link>
                </div>
            </div>

        </div>
    )
}

export default ChallengeList;