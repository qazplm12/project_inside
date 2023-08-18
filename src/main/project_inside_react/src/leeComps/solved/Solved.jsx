import React from 'react';

function Solved(props) {

    return (
        <div className={'container-sm'}>
            <div className={'d-flex'}>
                <ul className="nav nav-pills mb-3 me-auto">
                    <li className="nav-item">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button">모든 풀이
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button">나의 풀이
                        </button>
                    </li>
                </ul>

                <div className={'me-2'}>
                    <select name="" id="" className={'theme-select'}>
                        <option value={'전체 언어'} selected={true}>전체 언어</option>
                        <option value={'Java'}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home">모든 풀이
                </div>
                <div className="tab-pane fade" id="pills-profile">나의 풀이
                </div>
            </div>
        </div>
    )
}

export default Solved;