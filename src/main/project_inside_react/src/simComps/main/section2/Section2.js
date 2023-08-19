import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard";
import axios from "axios";

function Section2(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/simServer/getProjectList", null )
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {

            });
    }, []);


    return (
        <section className={'container'}>
            <div className={'d-flex justify-content-between mb-3'}>
                <h5>모집중인 프로젝트</h5>
                <Link to={'/pi/project'} className={'theme-link'}>더보기</Link>
            </div>
            <div className={'row d-flex justify-content-between'}>
                {/* 최신순으로 3개 가져오기 */}
                {
                    data.map((item, index) => {
                        if(index < 3){
                            return <ProjectCard toyProject={item}/>
                        }
                    })
                }
                {/*<ProjectCard toyProject={data}/>*/}
                {/*<ProjectCard/>*/}
                {/*<ProjectCard/>*/}
            </div>
        </section>
    );
}

export default Section2;