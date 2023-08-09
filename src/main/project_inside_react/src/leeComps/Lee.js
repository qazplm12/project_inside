import React from 'react';

function Lee(props) {

    return (
        <div className={'container-sm'}>
            <div className={'row'}>
                <div className={'col-sm border border-1'}>
                    <h1>리액트 출력 테스트</h1>
                    <button className={'btn btn-primary'}  id={'text'} value={'100'}>asdf</button>
                </div>
                <div className={'col-sm'}>
                    <iframe src="https://qna.programmers.co.kr/code_runners" id={'iframe'} style={{width: '100%', height: '25em'}}></iframe>
                    <div className={'border border-1 width-100'} style={{height: '25em'}}>제출답안 체점


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lee;