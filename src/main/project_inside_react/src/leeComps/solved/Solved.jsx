import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import SolvedListItems from "./SolvedListItems";

function Solved(props) {
    const [solvedList, setSolvedList] = useState([]);
    const [language, setLanguage] = useState('전체 언어');
    const [userId, setUserId] = useState('test');   // 로그인 구현되면 userNick 으로 바꿀 것

    const [params, setParams] = useSearchParams();
    const idx = params.get('idx');

    useEffect(() => {   // 모든 풀이 리스트
        axios.get(`http://localhost:8080/server/solvedList?idx=${idx}`)
            .then(res => {
                // alert('통신 성공 : ' + res.data);
                // console.log('통신 성공 : ' + res.data);

                setSolvedList(res.data);
            })
            .catch(err => {
                alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }, [])

    return (
        <div className={'container-sm  my-3'}>
            <div className={'d-flex mt-4 mb-4'}>
                <div className="nav nav-pills mb-3 me-auto">
                    <div className="btn-group nav-item">
                        <button className="btn nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button">모든 풀이
                        </button>
                        <button className="btn nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button">나의 풀이
                        </button>
                    </div>
                </div>
                <div className={'me-2'}>
                    <select name="" id="" className={'theme-select'} value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value={'전체 언어'} selected={true}>전체 언어</option>
                        <option value={'Java'}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home">
                    {
                        solvedList.map((item, index) => {
                            if (language == '전체 언어') {
                                return (
                                    <SolvedListItems sendItem={item} readOnly={true}/>
                                )
                            }
                            else if (language == item.solvedLanguage) {
                                return (
                                    <SolvedListItems sendItem={item} readOnly={true}/>
                                )
                            }
                        })
                    }
                </div>
                <div className="tab-pane fade" id="pills-profile">
                    {
                        solvedList.map((item, index) => {
                            if (userId == item.solvedId && language == '전체 언어') {
                                return (
                                    <SolvedListItems sendItem={item} readOnly={true}/>
                                )
                            }
                            else if (userId == item.solvedId && language == item.solvedLanguage) {
                                return (
                                    <SolvedListItems sendItem={item} readOnly={true}/>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Solved;