import React from 'react';

function Solved(props) {

    return (
        <div className={'container-sm  my-3'}>
            <div className={'d-flex'}>
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
                    <select name="" id="" className={'theme-select'}>
                        <option value={'전체 언어'} selected={true}>전체 언어</option>
                        <option value={'Java'}>Java</option>
                        <option value={'JavaScript'}>JavaScript</option>
                        <option value={'Python'}>Python</option>
                    </select>
                </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home">
                    <div className={'d-flex align-items-center'}>
                        <div className={'d-flex align-items-center me-auto'}>
                            <img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                            <p className={'mb-0 ms-3'}>nick</p>
                        </div>
                        <div className={'me-2'}>
                            <p className={'mb-0'}>사용언어</p>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile">나의 풀이
                </div>
            </div>
        </div>
    )
}

export default Solved;