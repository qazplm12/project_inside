import React from 'react';

function Iframe(props) {

    return (
        <iframe src="https://qna.programmers.co.kr/code_runners" id={'iframe'} frameborder="0" style={{width: '100%', height: '100vh'}}></iframe>
    )
}

export default Iframe;