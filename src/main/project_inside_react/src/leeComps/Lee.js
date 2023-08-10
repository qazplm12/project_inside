import React, {useState} from 'react';
import CodeRunner from "./CodeRunner";
import axios from "axios";

function Lee(props) {
    const [language, setLanguage] = useState('java');
    const [code, setCode] = useState(`var message = "Hello JavaScript";
console.log(message)`);

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const getCode = (code) => {
        setCode(code);
    }

    const handleRun = (e) => {
        // 셀리니움 호출
        axios.post('http://localhost:8080/server/test', null, {
            params: {
                language: language,
                code: code
            }
        })
            .then(res => {
                alert('axios 통신 성공');
                console.log(res.data);
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
                        <option value={'java'} selected={true}>java</option>
                        <option value={'javascript'}>javascript</option>
                        <option value={'python'}>python</option>
                    </select>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm border border-1 border-end-0 p-0'}>
                    <h1>문제 내용 출력</h1>
                    <button className={'btn btn-primary'}  id={'text'} value={'100'}>asdf</button>
                    <input type="text" value={language}/>
                    <input type="text" value={code}/>
                </div>
                <div className={'col-sm p-0'}>
                    <CodeRunner id={'code-runner'} style={{width: '100%', height: '25em'}} getCode={getCode}/>
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