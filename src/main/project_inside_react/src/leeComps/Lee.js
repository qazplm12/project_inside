import React, {useState} from 'react';
import CodeRunner from "./CodeRunner";
import axios from "axios";
import CodeChallenge from "./CodeChallenge";

function Lee(props) {
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState(`var message = "Hello JavaScript";
console.log(message)`);
    const [result, setResult] = useState('');

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const getCode = (code) => {
        setCode(code);
    }

    const handleRun = (e) => {
        // e.preventDefault();

        // 코드를 JSON 형식으로 변환
        const requestData = {
            code: code.replace(/\n/g, ''), // 줄바꿈 제거
            language: language
        };

        // 셀리니움 호출
        axios.post('http://localhost:8080/server/challenge', requestData)
            .then(res => {
                // alert('axios 통신 성공');
                console.log(res.data);

                setResult(res.data);
            })
            .catch(err => {
                alert('axios 통신 실패' + err);
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        
    }

    return (
        <div className={'container-sm-fluid theme-bg'} style={{height: '100%'}}>
            <div className={'row'}>
                <div className={'py-2'}>
                    <h3><b>LOGO 각종 링크</b></h3>
                </div>
            </div>
            <div className={'row'}>
                <div className={'d-flex border border-1 border-bottom-0 py-2'}>
                    <h5 className={'me-auto m-0 py-1 ps-2'}><b>문제 제목</b></h5>
                    <select name="" id="" className={'me-2 theme-select'} value={language} onChange={handleSelect}>
                        <option value={'Java'} selected={true}>java</option>
                        <option value={'JavaScript'}>javascript</option>
                        <option value={'Python'}>python</option>
                    </select>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm-5 border border-1 border-end-0 p-0'}>
                    <CodeChallenge/>
                </div>
                <div className={'col-sm-7 p-0'}>
                    <CodeRunner id={'code-runner'} style={{width: '100%', height: '25em'}} getCode={getCode} sendResult={result}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'d-flex py-2'}>
                    <button className={'theme-btn ms-2'}>질문하기</button>
                    <button className={'theme-btn ms-2 me-auto'}>테스트 케이스 추가하기</button>
                    <button className={'theme-btn me-2'}>다른 사람의 풀이</button>
                    <button className={'theme-btn me-2'}>초기화</button>
                    <button className={'theme-btn me-2'} onClick={handleRun}>코드 실행</button>
                    <button className={'theme-btn me-2'} onClick={handleSubmit}>제출 후 채점하기</button>
                </div>
            </div>
        </div>
    )
}

export default Lee;