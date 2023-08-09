import React from 'react';

function ProjectCard(props) {
    return (
        <div className={'bg-light col-sm-3 py-5 text-start'}>
            <img src="" alt="프로젝트 썸네일" className={'d-block'}/>
            <h5 className={'mt-3'}>프로젝트 명</h5> <span></span>
            <p>프로젝트 설명</p>
            <p>모집인원 : 총 5명 모집중(현재 4 / 5)</p>
            <p>요구 레벨 : lv.2</p>
        </div>
    )
}

export default ProjectCard;