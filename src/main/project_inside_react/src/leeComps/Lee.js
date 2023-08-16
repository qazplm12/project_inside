import React, {useEffect, useState} from 'react';
import CodeRunner from "./CodeRunner";
import axios from "axios";
import CodeChallenge from "./CodeChallenge";
import {useSearchParams} from "react-router-dom";

function Lee(props) {
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');
    const [sendChallenge, setSendChallenge] = useState([]);
    const [respectCorrect, setRespectCorrect] = useState('');

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    useEffect(() => {
        axios.get(`http://localhost:8080/server/challenge?idx=${idx}`)  // 문제 정보 호출
            .then(res => {
                // alert('통신 성공')
                // console.log(res.data);

                setSendChallenge(res.data);
            })
            .catch(err => {
                alert('통신 실패')
                console.log(err);
            });
    }, []);

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const getCode = (code) => {
        setCode(code);
    }

    const handleRun = (e) => {
        // e.preventDefault();

        // 코드를 JSON 형식으로 변환(자바언어가 textarea로 입력이 안되는 인코딩 이슈 발생)
        const requestData = {
            code: code.replace(/\n/g, ''), // 줄바꿈 제거
            language: language
        };

        // 셀리니움 호출
        axios.post('http://localhost:8080/server/challenge', requestData)
            .then(res => {
                // alert('axios 통신 성공');
                // console.log(res.data);

                setResult(res.data);
            })
            .catch(err => {
                alert('axios 통신 실패' + err);
                console.log(err);
            });
    }

    const handleSubmit = (e) => {
        let requestData = {};

        // 검산용 매개변수, 기대값 가져오기
        axios.get(`http://localhost:8080/server/challengeScoring?idx=${idx}`)
            .then(res => {
                // alert('axios 통신 성공');
                // console.log("검증용 매개변수, 기대값 : " + res.data);

                const scoreList = res.data;   // 변수 리스트에 저장하고
                for (const i in scoreList) {    // 리스트 만큼 반복문
                    // console.log("검증변수1 : " + scoreList[i].argu1);
                    // console.log("검증변수2 : " + scoreList[i].argu2);
                    // console.log("기대값 : " + scoreList[i].expectedValue);

                    const argu1 = scoreList[i].argu1;
                    const argu2 = scoreList[i].argu2;
                    const expectedValue = scoreList[i].expectedValue;

                    switch (language) {
                        case "Java" :
                            // 매개변수 감지 및 치환을 위한 메소드
                        function replaceParameterValues(code, paramName, value) {
                            return code.replace(new RegExp(`${paramName}\\s*=\\s*\\d+`), `${paramName} = ${value}`);    // RegExp : 정규식을 생성하는 자바스크립트 객체, ${} : 매개변수, \\s*: 공백 문자(스페이스, 탭 등, 띄어쓰기없이 붙어있는 경우도 가능)을 나타냄.(*는 해당 문자가 0회 이상 반복될 수 있음을 나타냄), \\d+: 숫자를 나타냄(+는 해당 숫자가 1회 이상 반복될 수 있음을 나타냄)
                        }

                            // 검산용 숫자
                            const validationNum1 = argu1;
                            const validationNum2 = argu2;

                            // 매개변수 이름
                            const paramName1 = "num1";
                            const paramName2 = "num2";

                            // 매개변수 값을 변경한 코드 생성
                            let modifiedCode = replaceParameterValues(code, paramName1, validationNum1);
                            modifiedCode = replaceParameterValues(modifiedCode, paramName2, validationNum2);

                            // setCode(modifiedCode);   // 이 조건문 속에선 setCode가 동작 안되는거같음
                            // console.log("잘 바뀌었을까요? \n" + modifiedCode);

                            requestData = {
                                code: modifiedCode,
                                compiler: "openjdk-jdk-15.0.3+2"
                            };
                            break;
                        case "JavaScript" :
                            requestData = {
                                code: code,
                                compiler: "nodejs-16.14.0"
                            };
                            break;
                        case "Python" :
                            requestData = {
                                code: code,
                                compiler: "cpython-3.10.2"
                            };
                            break;
                    }

                    axios.post(`https://wandbox.org/api/compile.json`, requestData)
                        .then(res => {
                            // alert('axios 통신 성공');   // 답 입력이 안되면 에러뜨니까 버튼 누르면 알람뜨도록 예외처리 필요
                            // console.log("컴파일이 된거같죠? " + res.data.program_output);
                            // console.log("기대값 : " + expectedValue);

                            setRespectCorrect(res.data.program_output);

                        })
                        .catch(err => {
                            alert('axios 통신 실패' + err);
                            console.log(err);
                        });


                    console.log("컴파일이 된거같죠? " + respectCorrect);
                    console.log("기대값 : " + expectedValue);
                    // 조건문 사용
                    if (expectedValue == respectCorrect) {
                        alert("테스트 통과");
                    }
                    else {
                        alert("테스트 실패");
                        break;
                    }
                }   // 반복문 끝

                // 반복문이랑 다 빠져 나오면 정답 테이블에 submit
                alert("최종 정답입니다");
            })
            .catch(err => {
                alert('axios 통신 실패' + err);
                console.log(err);
            });
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
                    <CodeChallenge sendChallenge={sendChallenge}/>
                </div>
                <div className={'col-sm-7 p-0'}>
                    <CodeRunner id={'code-runner'} style={{width: '100%', height: '25em'}} getCode={getCode} sendResult={result} sendChallenge={sendChallenge}/>
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