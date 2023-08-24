import React, {useEffect, useState} from 'react';

function ChallengeExplain(props) {
    const challenge = props.sendChallenge;

    return (
        <div className={'container-sm'} style={{overflow: "auto", height: '100%'}}>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{minHeight: '15%'}}>
                <p><b>문제 설명</b></p>
                <p dangerouslySetInnerHTML={{__html: challenge.challengeExplain}}></p>
            </div>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{minHeight: '15%'}}>
                <p><b>제한사항</b></p>
                <p dangerouslySetInnerHTML={{__html: challenge.challengeLimit}}></p>
            </div>
            <div className={'row border border-top-0 border-start-0 border-end-0 text-start p-2'} style={{minHeight: '15%'}}>
                <p><b>입출력 예</b></p>
                <p dangerouslySetInnerHTML={{__html: challenge.challengeParamExample}}></p>
            </div>
            <div className={'row text-start p-2'} style={{minHeight: '15%'}}>
                <p><b>입출력 예 설명</b></p>
                <p dangerouslySetInnerHTML={{__html: challenge.challengeSolutionExample}}></p>
            </div>
        </div>
    )
}

export default ChallengeExplain;