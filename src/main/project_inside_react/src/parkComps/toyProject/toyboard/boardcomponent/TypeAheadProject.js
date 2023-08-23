import React, {useState} from 'react';
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "../../../../simComps/myPage/Account/Token.css";


function TypeAheadProject(props) {

    // 수정시 컴포넌트를 사용할때 매개변수를 부여, 서버에서 personLanguage를 불러와서 사용, 스트링 > 배열로 파싱해야함
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [tokenValues, setTokenValues] = useState([]);

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
        props.onTagSelection(selected);
    };

    const updateTokenValues = (newSelectedTags) => {
        const newTokenValues = newSelectedTags.map(tag => tag.toLowerCase());
        setTokenValues(newTokenValues);
    };

    const handleTagClick = (tag) => {
        props.onTagClick(tag);
    };

    return (
        <div>

            <div className={'d-flex'}>
                <p className={'my-auto mx-2 pt-2 ms-5 theme-font' }>스택 검색 :</p>
                <Typeahead
                    id="search-bar"
                    labelKey="name"
                    className={'m-1 mt-3 d-inline-block'} style={{width : "40%"}}
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

                {/* 토큰 리스트 */}
                <p className={'my-auto ms-3 pt-2 theme-font'}>내가 선택한 기술 스택 :</p>
                <div className="text-end mt-3 ms-2">
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

            </div>
        </div>
    );
}


export default TypeAheadProject;