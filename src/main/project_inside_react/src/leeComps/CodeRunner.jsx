import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";

function CodeRunner(props) {
    const getResult = props.sendResult;
    const getReset = props.sendReset;
    const getLanguage = props.sendLanguage;

    const [code, setCode] = useState('');
    const [challengeData, setChallengeData] = useState('');
    const [result, setResult] = useState('실행 결과 확인');

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    useEffect(() => {
        axios.get(`http://localhost:8080/server/challenge?idx=${idx}`)  // 문제 정보 호출
            .then(res => {
                setChallengeData(res.data);
                setCode(res.data.challengeTemplateJavaScript);
            })
            .catch(err => {
                alert('통신 실패')
                console.log(err);
            });
    }, []);

    useEffect(() => {   // 입력 값이 밀릴때 방법
        setCode(code)   // 입력한 코드로 업데이트
        props.getCode(code);    // 부모 컴포넌트로 코드 전송
        // console.log(code)
    }, [code]);

    useEffect(() => {   // 언어 정보가 바뀔때 마다 템플릿 변경
        if (getLanguage == 'JavaScript') {
            setCode(challengeData.challengeTemplateJavaScript);
        }
        else if (getLanguage == 'Java') {
            setCode(challengeData.challengeTemplateJava);
        }
        else if (getLanguage == 'Python') {
            setCode(challengeData.challengeTemplatePython);
        }
    }, [getLanguage]);

    useEffect(() => {
        setResult(getResult);
    }, [getResult]);

    useEffect(() => {   // 초기화 버튼
        setCode(getReset);
    }, [getReset]);

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
                    <textarea name="" id="" cols="30" rows="10" value={result}></textarea>
                </div>
            </div>
        </div>
    )
}

export default CodeRunner;