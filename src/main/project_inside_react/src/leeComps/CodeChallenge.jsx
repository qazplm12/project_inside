import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";

function CodeChallenge(props) {
    const challenge = props.sendChallenge;

    return (
        <div className={'container-sm'} style={{height: '100%'}}>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{height: '25%'}}>
                <p><b>문제 설명</b></p>
                <p>{challenge.challengeExplain}</p>
            </div>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{height: '25%'}}>
                <p><b>제한사항</b></p>
                <p>{challenge.challengeLimit}</p>
            </div>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{height: '25%'}}>
                <p><b>입출력 예</b></p>
                <p>{challenge.challengeParamExample}</p>
            </div>
            <div className={'row text-start p-2'} style={{height: '25%'}}>
                <p><b>입출력 예 설명</b></p>
                <p>{challenge.challengeSolutionExample}</p>
            </div>
        </div>
    )
}

export default CodeChallenge;