import React, {useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function ChallengeList(props) {
    


    return (
        <div className={'container-sm'}>
            <div className={'row'}>
                <div className={'col-sm-9'}>
                    <h1>문제 리스트 페이지</h1>
                    <div className={'row'}>
                        <div className={'col-3'}>
                            <select name="" id="" className={'form-select me-2'}>
                                <option value="">상태</option>
                                <option value="">푼 문제</option>
                                <option value="">안 푼 문제</option>
                            </select>
                        </div>
                        <div className={'col-3'}>
                            <select name="" id="" className={'form-select me-2'}>
                                <option value="">난이도</option>
                                <option value="">0</option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                            </select>
                        </div>
                        <div className={'col-6'}>
                            <input type="text" className={'form-control'} placeholder={'내용을 입력해주세요'}/>
                        </div>
                    </div>

                    <table className={'table table-borderless table-hover border'}>
                        <thead className={'border'}>
                        <tr>
                            <th>상태</th>
                            <th>제목</th>
                            <th>난이도</th>
                            <th>완료한 사람</th>
                            <th>정답률</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={'col-sm-3'}>
                    <sidebar></sidebar>
                    <Link to={`http://localhost:3000/lee?idx=1`} className={'btn btn-primary'}>문제로 이동</Link>
                </div>
            </div>

        </div>
    )
}

export default ChallengeList;