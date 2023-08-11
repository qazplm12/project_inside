import React from 'react';

const projects = {
    project: 100,
    matching: 35,
    proceeding: 48,
    finished: 17,
}

function Projects(props) {

    return (
        <div className={'shadow'}>
            <h3 className={'py-5 border-bottom text-primary'}>프로젝트 현황</h3>
            <table className={'table'}>
                <thead>
                <tr>
                    <th className={'py-4'}> 생성된 프로젝트</th>
                    <th className={'py-4'}> 매칭중인 프로젝트</th>
                    <th className={'py-4'}> 진행중인 프로젝트</th>
                    <th className={'py-4'}> 완료된 프로젝트</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={'py-4'}>{projects.project}</td>
                    <td className={'py-4'}>{projects.matching}</td>
                    <td className={'py-4'}>{projects.proceeding}</td>
                    <td className={'py-4'}>{projects.finished}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Projects;