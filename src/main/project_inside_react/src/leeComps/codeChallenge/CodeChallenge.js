import React, {useEffect, useState} from 'react';
import CodeRunner from "./CodeRunner";
import axios from "axios";
import ChallengeExplain from "./ChallengeExplain";
import {useSearchParams, useNavigate, Link} from "react-router-dom";
import logoNoBg from "../../images/logo_nobg.png";

function CodeChallenge(props) {
    const [language, setLanguage] = useState('JavaScript');
    const [code, setCode] = useState('');
    const [result, setResult] = useState('실행 결과가 여기에 표시됩니다.');
    const [sendChallenge, setSendChallenge] = useState([]);
    const [userTotalScore, setUserTotalScore] = useState('');
    const [challengeScore, setChallengeScore] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/server/challenge?idx=${idx}`)  // 문제 정보 호출
            .then(res => {
                // alert('통신 성공')
                // console.log(res.data);

                setSendChallenge(res.data);
                setChallengeScore(res.data.challengeScore);
                // console.log(res.data.challengeScore);
                // console.log(userInfo.personTotalScore);
            })
            .catch(err => {
                // alert('통신 실패')
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/server/userDetail?userId=${userInfo?.personId}`)
            .then(res => {
                setUserTotalScore(res.data.personTotalScore);
            })
            .catch(err => {
                console.log("코드챌린지 에러 : " + err)
            });
    }, [code]);

    const handleSelect = (e) => {
        setLanguage(e.target.value);
    }

    const getCode = (code) => { // 자식 컴포넌트로 부터 코드 접수
        setCode(code);  // 크롤링과 api에 전달하기 위해 코드 세팅 -- 이까지는 정상(템플릿 안됨)
    }

    const handleQnA = (e) => {
        navigate(`/pi/QnA?idx=${idx}`);
    }

    const handleSolved = (e) => {
        navigate(`/pi/solved?idx=${idx}`);
    }

    const handleReset = (e) => {
        setCode("");
    }

    const handleRun = (e) => {
        // e.preventDefault();
        let requestData = {};

        if (language == "Python") {
            // 코드를 JSON 형식으로 변환(자바언어가 textarea로 입력이 안되는 인코딩 이슈 발생)
            requestData = {
                code: code,
                language: language
            };
        }
        else {
            requestData = {
                code: code.replace(/\n/g, ''), // 줄바꿈 제거
                language: language
            };
        }

        // 셀리니움 호출
        axios.post('http://localhost:8080/server/challenge', requestData)
            .then(res => {
                // alert('axios 통신 성공');
                // console.log(res.data);

                setResult(res.data);
            })
            .catch(err => {
                // alert('axios 통신 실패' + err);
                console.log(err);
            });
    }

    const handleSubmit = (e) => {
        let requestData = {};
        let testCount = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let str = "";

        // 검산용 매개변수, 기댓값 가져오기
        axios.get(`http://localhost:8080/server/challengeScoring?idx=${idx}`)
            .then(res => {
                // alert('axios 통신 성공');
                // console.log("검증용 매개변수, 기댓값 : " + res.data);

                const scoreList = res.data;   // 변수 리스트에 저장하고
                const listLength = scoreList.length;
                for (const i in scoreList) {    // 리스트 만큼 반복문
                    // console.log("검증변수1 : " + scoreList[i].argu1);
                    // console.log("검증변수2 : " + scoreList[i].argu2);
                    // console.log("기댓값 : " + scoreList[i].expectedValue);

                    const argu1 = scoreList[i].argu1;
                    const argu2 = scoreList[i].argu2;
                    const argu3 = scoreList[i].argu3;
                    const expectedValue = scoreList[i].expectedValue;

                    // 검산용 매개변수로 치환
                    function replaceParameterValues(code, paramName, value) {
                        return code.replace(new RegExp(`${paramName}\\s*=\\s*\\d+`), `${paramName} = ${value}`);    // RegExp : 정규식을 생성하는 자바스크립트 객체, ${} : 매개변수, \\s*: 공백 문자(스페이스, 탭 등, 띄어쓰기없이 붙어있는 경우도 가능)을 나타냄.(*는 해당 문자가 0회 이상 반복될 수 있음을 나타냄), \\d+: 숫자를 나타냄(+는 해당 숫자가 1회 이상 반복될 수 있음을 나타냄)
                    }

                    // 검산용 매개변수 값
                    const validationNum1 = argu1;
                    const validationNum2 = argu2;
                    const validationNum3 = argu3;

                    // 매개변수 이름
                    const paramName1 = "num1";
                    const paramName2 = "num2";
                    const paramName3 = "num3";

                    // 매개변수 값을 변경한 코드 생성
                    let modifiedCode = replaceParameterValues(code, paramName1, validationNum1);
                    modifiedCode = replaceParameterValues(modifiedCode, paramName2, validationNum2);
                    modifiedCode = replaceParameterValues(modifiedCode, paramName3, validationNum3);

                    // setCode(modifiedCode);   // 이 조건문 속에선 setCode가 동작 안되는거같음
                    // console.log("잘 바뀌었을까요? \n" + modifiedCode);

                    switch (language) {
                        case "Java" :
                            // 매개변수 감지 및 치환을 위한 메소드
                        
                            requestData = {
                                code: modifiedCode,
                                compiler: "openjdk-jdk-15.0.3+2"
                            };
                            break;
                        case "JavaScript" :
                            requestData = {
                                code: modifiedCode,
                                compiler: "nodejs-16.14.0"
                            };
                            break;
                        case "Python" :
                            requestData = {
                                code: modifiedCode,
                                compiler: "cpython-3.10.2"
                            };
                            break;
                    }

                    axios.post(`https://wandbox.org/api/compile.json`, requestData)
                        .then(res => {
                            // alert('axios 통신 성공');   // 답 입력이 안되면 에러뜨니까 버튼 누르면 알람뜨도록 예외처리 필요
                            // console.log("컴파일이 된거같죠? " + res.data.program_output);
                            // console.log("기댓값 : " + expectedValue);

                            const respectCorrect = res.data.program_output.replace(/\n/g, '');  // api 특성상 줄바꿈이 있어서 if문 인식이 안되던것..

                            // console.log("컴파일이 된거같죠? " + respectCorrect);
                            // console.log("기댓값 : " + expectedValue);
                            // 조건문 사용
                            if (expectedValue == respectCorrect) {  // 정답 시
                                testCount++;
                                correctCount++;
                                // 카운트가 다 차면 최종 성공, 결과 출력
                                console.log("테스트" + testCount + " 성공!!" + respectCorrect);
                                str = str.concat(`테스트 ${testCount} 성공!! 입력값 : ${argu1}, ${argu2}, ${argu3} 기댓값 : ${expectedValue} \n`); // 기본 문자열에 append하는 느낌
                                setResult(str);
                                if (correctCount == listLength) { // const 로 변수를 선언해 준 다음 받으니 정상 작동.., 검산 전부 정답 시
                                    alert("최종 정답입니다");
                                    // 정답시 이벤트
                                    correct()
                                }
                                else if ((correctCount != listLength) && (testCount == listLength)) {  // 한번이라도 검산 틀리면 오답처리
                                    alert("오답입니다");
                                    // scoringLog 테이블 오답내역 넣기
                                    wrong()
                                }
                            }
                            else {  // 오답 시
                                testCount++;
                                wrongCount++;
                                console.log("테스트" + testCount + " 실패!!" + respectCorrect);
                                str = str.concat(`테스트 ${testCount} 실패.. 입력값 : ${argu1}, ${argu2}, ${argu3} 기댓값 : ${expectedValue} \n`);
                                setResult(str);
                                if (wrongCount == listLength) {
                                    alert("오답입니다");
                                    // scoringLog 테이블 오답내역 넣기
                                    wrong()
                                }
                                else if ((wrongCount != listLength) && (testCount == listLength)) {
                                    alert("오답입니다");
                                    // scoringLog 테이블 오답내역 넣기
                                    wrong()
                                }
                            }
                        })
                        .catch(err => {
                            // alert('axios 통신 실패' + err);
                            console.log(err);
                        });
                }   // 반복문 끝
            })
            .catch(err => {
                // alert('axios 통신 실패' + err);
                console.log(err);
            });
    }

    function correct() {
        const requestData = {   // 코드를 JSON 형식으로 변환(자바언어가 textarea로 입력이 안되는 인코딩 이슈 발생)
            userNick: userInfo.personNickName,
            idx: idx,
            language: language,
            code: code,
            score: `${challengeScore + userTotalScore}`,   // 덧셈 식 주의, jwt 로그인 하였기 때문에 최초 로그인 한 정보에서 업데이트 안되고 있음(걍 정보 불러옴..)
        };

        axios.post(`http://localhost:8080/server/challengeCorrect`, requestData)
            .then(res => {
                // alert("저장성공 : " + res.data);
            })
            .catch(err => {
                // alert("통신 실패 : " + err);
                console.log("통신 실패 정답 업뎃 실패 : " + err);
            });
    }

    function wrong() {
        axios.post(`http://localhost:8080/server/challengeWrong`, null, {
            params: { // params 하면 쿼리스트링으로 데이터 전달, data는 바디에 포함되어 데이터 전달.. data 사용하면 서버에서 못받음
                userNick: userInfo.personNickName,
                idx: idx
            }
        })
            .then(res => {
                // alert("저장성공 : " + res.data);
            })
            .catch(err => {
                // alert("통신 실패 : " + err);
                console.log("통신 실패 : " + err);
            });
    }

    return (
        <div className={'container-sm-fluid theme-bg'} style={{height: '100%'}}>
            <div className={'row'}>
                <nav className={'navbar navbar-expand py-0'}>
                    <Link className={'navbar-brand'} to={`/pi/main`}>
                        <img src={logoNoBg} alt="" className={'ms-3'} style={{width: '6rem'}}/>
                    </Link>
                    <div className={'collapse navbar-collapse'}>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <Link className={'nav-link'} to={`/pi/challengeList`}>알고리즘 문제</Link>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} disabled={true}><i className="bi bi-caret-right-fill"></i></a>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link'} to={`/pi/challengeList?&dif=${sendChallenge.challengeClass}`}>난이도 Lv.{sendChallenge.challengeClass}</Link>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} disabled={true}><i className="bi bi-caret-right-fill"></i></a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} disabled={true}>{sendChallenge.challengeTitle}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={'row'}>
                <div className={'d-flex border border-1 border-bottom-0 py-2'}>
                    <h5 className={'me-auto m-0 py-1 ps-2'}><b>문제 제목</b></h5>
                    <select name="" id="" className={'me-2 theme-select'} value={language} onChange={handleSelect}>
                        <option value={'Java'} selected={true}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm-5 border border-1 border-end-0 border-bottom-0 p-0'}>
                    <ChallengeExplain sendChallenge={sendChallenge}/>
                </div>
                <div className={'col-sm-7 p-0'}>
                    <CodeRunner id={'code-runner'} getCode={getCode} sendLanguage={language} sendReset={code} sendResult={result}/>
                </div>
            </div>
            <div className={'row'}>
                {
                    userInfo == null
                        ?
                        <div className={'d-flex justify-content-end py-2 border border-top'}>
                            <button className={'theme-btn me-2'} onClick={handleReset}>초기화</button>
                            <button className={'theme-btn me-2'} onClick={handleRun}>코드 실행</button>
                            <Link className={'theme-btn me-2 text-decoration-none'} to={`/userAuth/login`}>로그인</Link>
                        </div>
                        :
                        <div className={'d-flex py-2 border border-top'}>
                            <button className={'theme-btn ms-2 me-auto'} onClick={handleQnA}>질문하기</button>
                            <button className={'theme-btn me-2'} onClick={handleSolved}>다른 사람의 풀이</button>
                            <button className={'theme-btn me-2'} onClick={handleReset}>초기화</button>
                            <button className={'theme-btn me-2'} onClick={handleRun}>코드 실행</button>
                            <button className={'theme-btn me-2'} onClick={handleSubmit}>제출 후 채점하기</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default CodeChallenge;