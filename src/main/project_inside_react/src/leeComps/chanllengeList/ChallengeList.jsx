import React, {useEffect, useState} from 'react';
import axios from "axios";
import ChallengeListTable from "./ChallengeListTable";
import ChallengeListSidebar from "./ChallengeListSidebar";
import {useSearchParams} from "react-router-dom";

function ChallengeList(props) {
    const [solvedState, setSolvedState] = useState('9');
    const [challengeClass, setChallengeClass] = useState('9');
    const [userId, setUserId] = useState('test');
    const [search, setSearch] = useState('');
    const [sendChallengeList, setSendChallengeList] = useState([]);
    const [sendSearch, setSendSearch] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    const [params, setParams] = useSearchParams();  // 문제 푸는 페이지에서 받아오는 난이도 변수
    const dif = params.get('dif');

    useEffect(() => {
        setSolvedState(solvedState);
        setChallengeClass(challengeClass);
        setSearch(search);

        axios.get(`http://localhost:8080/server/challengeList?userNick=${userInfo?.personNickName}&challengeClass=${challengeClass}&solvedState=${solvedState}`)    // ChallengeListTableTd에도 로그인 정보 넣기(아마 루터에서 넣어줘야 할듯?)
            .then(res => {
                // console.log("통신 성공 : " + res)

                setSendChallengeList(res.data);
            })
            .catch(err => {
                console.log("통신 에러 : " + err)
            });
    }, [solvedState, challengeClass, search]);

    useEffect(() => {
        //  검색어 연동
        const params = window.location.search;
        const keyword = decodeURI(params.substring(9))
        if (params) {
            setSearch(keyword)
            setSendSearch(keyword)
        }
        let timer = setTimeout(()=>{ setChallengeClass(dif) }, 100);
    }, []);



    const handleSearch = (e) => {
        setSendSearch(search);  // 전달 이벤트
    }

    return (
        <div className={'container-sm my-3'}>
            <div className={'row'}>
                <div className={'col-sm-9'}>
                    <div className={'row'}>
                        <div className={'col-3'}>
                            {
                                userInfo == null
                                    ?
                                    <select name="" id="" className={'form-select me-2'} value={solvedState} onChange={(e) => setSolvedState(e.target.value)} disabled={true}>
                                        {/*<option value="9" hidden={true}>상태</option>*/}
                                        <option value="9" selected={true}>전체 문제</option>    {/* 비 로그인시 비활성화 */}
                                        <option value="1">해결한 문제</option>
                                        <option value="0">해결 못 한 문제</option>
                                    </select>
                                    :
                                    <select name="" id="" className={'form-select me-2'} value={solvedState} onChange={(e) => setSolvedState(e.target.value)}>
                                        {/*<option value="9" hidden={true}>상태</option>*/}
                                        <option value="9" selected={true}>전체 문제</option>
                                        <option value="1">해결한 문제</option>
                                        <option value="0">해결 못 한 문제</option>
                                    </select>
                            }
                        </div>
                        <div className={'col-3'}>
                            <select name="" id="" className={'form-select me-2'} value={challengeClass} onChange={(e) => setChallengeClass(e.target.value)}>
                                {/*<option value="9" hidden={true}>난이도</option>*/}
                                <option value="9" selected={true}>전체 난이도</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className={'col-6'}>
                            <div className={'input-group'}>
                                <input type="text" className={'form-control border-end-0'} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'문제 제목을 검색하세요'}/>
                                <button className={'input-group-text bg-body'} onClick={handleSearch}><b><i className="bi bi-search"></i></b></button>
                            </div>
                        </div>
                    </div>

                    <div className={'my-3'}>
                        <ChallengeListTable sendChallengeList={sendChallengeList} sendSearch={sendSearch}/>
                    </div>
                </div>
                <div className={'col-sm-3'}>
                    <ChallengeListSidebar/>
                </div>
            </div>
        {/*  ================================== 페이징 자리 ==================================  */}
        </div>
    )
}

export default ChallengeList;