import React, {useEffect, useState} from 'react';
import axios from "axios";

function Projects(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));


    // 전체 프로젝트
    const [total, setTotal] = useState(0);
    // 매칭중인 프로젝트
    const [match, setMatch] = useState(0);
    // 진행중인 프로젝트
    const [full, setFull] = useState(0);
    // 완료된 프로젝트
    const [finished, setFinished] = useState(0);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getProjects", null, {
            params: {
                checking: userInfo.personNickName
            }
        })
            .then((res) => {
                console.log(res.data)
                setTotal(res.data.length)
                setMatch(res.data.filter(item => item.projectFull !== "Y" && item.projectFinish !== "Y").length)
                setFull(res.data.filter(item => item.projectFull === "Y" && item.projectFinish !== "Y").length)
                setFinished(res.data.filter(item => item.projectFinish === "Y").length)
            })
            .catch((error) => {
                alert('관리자만 열람 가능한 페이지입니다.');
                window.location.href = "/pi/main";
            });
    }, [])


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
                {
                    total > 0
                        ?
                        <tr>
                            <td className={'py-4'}>{total}</td>
                            <td className={'py-4'}>{match}</td>
                            <td className={'py-4'}>{full}</td>
                            <td className={'py-4'}>{finished}</td>
                        </tr>
                        : ""
                }
                </tbody>
            </table>
        </div>
    )
}

export default Projects;