import React, {useState} from 'react';

function CodeRunner(props) {
    const [code, setCode] = useState(`var message = "Hello JavaScript";
console.log(message)`);

    const sendCode = (e) => {
        setCode(e.target.value);
        props.getCode(code);
    }

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
                <div className={'col-sm border border-1 border-top-0 border-bottom-0'} style={{height: '36vh'}} >
                    <textarea name="" id="" cols="30" rows="10" value={code} onChange={sendCode}></textarea>
                    {/*<div className={'code-idx'}>*/}
                    {/*    <div>1</div>*/}
                    {/*</div>*/}
                    {/*<div className={'code-text'}>*/}
                    {/*    <div>Hello World!</div>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={'row'}>

                <div className={'col-sm border border-1'}>
                    <div className={'p-2'}>
                        <h5 className={'text-start m-0 py-1'}><b>RESULT</b></h5>
                    </div>
                </div>
            </div>
            <div className={'row'}>

                <div className={'col-sm border border-1 border-top-0'} style={{height: '36vh'}}>
                    <textarea name="" id="" cols="30" rows="10">실행 결과 확인</textarea>
                </div>
            </div>
        </div>
    )
}

export default CodeRunner;