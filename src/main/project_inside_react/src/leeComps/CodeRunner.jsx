import React, {useEffect, useState} from 'react';

function CodeRunner(props) {
    const [code, setCode] = useState(`var message = "Hello JavaScript";
console.log(message)`);
    const [result, setResult] = useState('');

    useEffect(() => {
        setResult(props.sendResult);
    }); // []가 없기 때문에, 상시로 어떤 값이든 바뀔때 마다 실행됨

    useEffect(() => {   // 입력 값이 밀릴때 방법
        setCode(code)
        props.getCode(code);

        console.log(code)
    }, [code]);

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
                    {/*<div className={'code-idx'}>*/}
                    {/*    <div>1</div>*/}
                    {/*</div>*/}
                    {/*<div className={'code-text'}>*/}
                    {/*    <div>Hello World!</div>*/}
                    {/*</div>*/}
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
                    <textarea name="" id="" cols="30" rows="10" value={result}>실행 결과 확인</textarea>
                </div>
            </div>
        </div>
    )
}

export default CodeRunner;