import React, {useEffect, useState} from 'react';

function CodeRunner(props) {
    const getChallenge = props.sendChallenge;
    const getResult = props.sendResult;

    const [code, setCode] = useState(getChallenge.challengeTemplateJava);  // 문자열은 유지 되는데 왜 db에서 불러오는건 안되는지 모르겠엄

    useEffect(() => {
        setCode(getChallenge.challengeTemplateJava);
    }, [getChallenge]);

    useEffect(() => {   // 입력 값이 밀릴때 방법
        setCode(code)
        props.getCode(code);

        console.log(code)
    }, [code, props.getCode]);

    return (
        <div className={'container-sm'}>
            <div className={'row'}>
                <div className={'col-sm border border-1'}>
                    <div className={'p-2'}>
                        <h5 className={'text-start m-0 py-1'}><b>SOLUTION</b></h5>
                    </div>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm border border-1 border-top-0'} style={{height: '36vh'}} >
                    <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
                </div>
            </div>
            <div className={'row'}>

                <div className={'col-sm border border-1 border-top-0'}>
                    <div className={'p-2'}>
                        <h5 className={'text-start m-0 py-1'}><b>RESULT</b></h5>
                    </div>
                </div>
            </div>
            <div className={'row'}>

                <div className={'col-sm border border-1 border-top-0'} style={{height: '36vh'}}>
                    <textarea name="" id="" cols="30" rows="10" value={getResult}>실행 결과 확인</textarea>
                </div>
            </div>
        </div>
    )
}

export default CodeRunner;