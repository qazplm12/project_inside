import React, {useEffect, useState} from 'react';
import axios from "axios";

function ChallengeListTableTd(props) {
    const [solvedState, setSolvedState] = useState([]);
    const challengeIdx = props.challengeIdx;

    useEffect(() => {
        axios.get(`http://localhost:8080/server/challengeListState?userId=test`)    // 로그인 정보 넣기
            .then(res => {
                // console.log("통신 성공 : " + res.data);

                setSolvedState(res.data);
            })
            .catch(err => {
                console.log("통신 실패 : " + err);
            });
    }, []);

    return (
        <td>
            {
                solvedState.map((item, index) => {
                    if (item == challengeIdx) {
                        return (
                            <strong><i className="bi bi-check-lg text-primary"></i></strong>
                        )
                    }
                    else {

                    }
                })
            }
        </td>
    )
}

export default ChallengeListTableTd;