import React from 'react';
import {Link} from "react-router-dom";

function Col2(props) {

    return (
        <div className={'col-sm-4 p-5'}>
            <div className={'d-flex justify-content-between'}>
                <p>최근 질문</p>
                {/* 링크 질문 페이지로 */}
                <Link to={'/pi/challenge'} className={'theme-link'}>더보기</Link>
            </div>
            <table className={'table'}>
                <colgroup>
                    <col width={'10%'}/>
                    <col width={'25%'}/>
                    <col width={'40%'}/>
                    <col width={'25%'}/>
                </colgroup>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>문제</th>
                    <th>난이도</th>
                    <th>비고</th>
                </tr>
                </thead>
                <tbody>
                {/* 맵 함수로 표현? */}
                <tr>
                    <td>1</td>
                    <td>문제1</td>
                    <td>1</td>
                    <td></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>문제2</td>
                    <td>0</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Col2;