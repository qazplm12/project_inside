import React, {useEffect, useState} from 'react';
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./Token.css";
import axios from "axios";

// 가상 유저
import person from "../../commons/Person";
import {update} from "../../../service/Service";

function TypeAhead(props) {

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    // 수정시 컴포넌트를 사용할때 매개변수를 부여, 서버에서 personLanguage를 불러와서 사용, 스트링 > 배열로 파싱해야함
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [tokenValues, setTokenValues] = useState([]);

    useEffect(() =>{
        if(userInfo.personLanguage){
            setSelectedTags(userInfo.personLanguage.split(', '));
        }
    }, [])

    // 기술 스택 종류
    const options = ["Python",
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "Java",
        "C#",
        "C++",
        "Ruby",
        "PHP",
        "Swift",
        "SQL",
        "MongoDB",
        "MySQL",
        "Git",
        "Docker",
        "AWS",
        "Azure",
        "REST API",
        "GraphQL",
        "Redux",
        "Vue.js",
        "Angular",
        "Spring Boot",
        "ASP.NET",
        "Ruby on Rails",
        "Laravel",
        "Flutter",
        "Kotlin",
        "Objective-C",
        "Unity",
        "TensorFlow",
        "PyTorch",
        "Jupyter Notebook",
        "Webpack",
        "Babel",
        "Sass",
        "Jenkins",
        "Travis CI",
        "CircleCI",
        "Kubernetes",
        "GraphQL",
        "OAuth",
        "JSON",
        "XML",
        "Webpack"];

    const handleSearch = (query) => {
        const filteredResults = options.filter(option =>
            option.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleTagRemoval = (tagToRemove) => {
        const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(updatedTags);
        updateTokenValues(updatedTags);
    };

    const handleTagSelection = (selected) => {
        setSelectedTags(selected);
        updateTokenValues(selected);
    };

    const updateTokenValues = (newSelectedTags) => {
        const newTokenValues = newSelectedTags.map(tag => tag.toLowerCase());
        setTokenValues(newTokenValues);
    };

    // 서버로 전송
    const sendTokenValues = () => {
        // 보내기 전 배열 > 문자열로 파싱
        const param = tokenValues.join(', ');
        console.log(param);
        axios.post('http://localhost:8080/simServer/updatePersonInfo', null, {
            params: {
                personId : userInfo.personId,
                personLanguage: param
            }
        })
            .then((resp) => {
                update(userInfo.personId, userInfo.personPassword);
                props.changeMode(true);
            })
            .catch((error) => {
                alert("프로필 업데이트 실패");
                console.error(error);
            });
        setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    return (
        <div>
            {/* 토큰 리스트 */}
            <div className="text-start">
                <h5 className={'mt-2'}>자신있는 기술을 선택하세요</h5>
                {selectedTags.map((tag, index) => (
                    // 토큰(태그)
                    <div key={index} className="custom-token theme-bg">
                        <div className={'d-flex'}>
                            <span>{tag}</span>
                            <button
                                className="btn-close align-self-center d-block ms-1"
                                style={{width: "3px", height: "3px"}}
                                onClick={() => handleTagRemoval(tag)}
                            >
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Typeahead
                id="search-bar"
                labelKey="name"
                className={'w-50 m-1 mt-3'}
                placeholder={'기술명으로 검색'}
                multiple
                renderToken={(option, props, index) => (
                    <span style={{display: 'none'}} key={index}></span>
                )}
                selected={selectedTags}
                onChange={handleTagSelection}
                options={searchResults}
                onInputChange={handleSearch}
                minLength={1}
            />
            {/* 버튼 */}
            <button type={'button'} onClick={sendTokenValues} className={'float-end px-3 theme-btn ms-2'}>저장</button>
            <button type={'button'} onClick={()=>{props.changeMode(true)}} className={'float-end px-3 theme-outline-btn'}>취소</button>
        </div>
    );
}


export default TypeAhead;