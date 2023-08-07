import React from 'react';
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";

function Section2(props) {

    return (
        <section className={'container'}>
            <div className={'d-flex justify-content-between'}>
                <h5>모집중인 프로젝트</h5>
                <Link to={'/pi/project'} className={'theme-link'}>더보기</Link>
            </div>
            <div className={'row d-flex justify-content-between'}>
                {/* 최신순으로 3개 가져오기 or 랜덤으로 3개 가져오기*/}
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div>
        </section>
    )
}

export default Section2;