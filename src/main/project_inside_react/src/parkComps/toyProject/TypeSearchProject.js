import React, {useEffect, useRef, useState} from 'react';
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "../../simComps/myPage/Account/Token.css";
import {useSelector} from "react-redux";

// 기존 컴포넌트를 참고하여 input 텍스트 안에 기술스택 넣기
function TypeSearchProject(props) {

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

    const [tagLayerWidth, setTagLayerWidth] = useState(300);
    const tagLayerRef = useRef(null);

    const handleTagSelections = (tags) => {
        setSelectedTags(tags);
        props.handleTagChange(tags);
    };

    useEffect(() => {
        if (tagLayerRef.current) {
            const newWidth = tagLayerRef.current.scrollWidth + 20;
            setTagLayerWidth(newWidth);
        }
    }, [selectedTags]);

    const [tag, setTag] = useState('');




    const sendTagToParent = () => {
        props.onTagReceived(tag); // 콜백 함수 호출하여 데이터 전달
    };

    const handleTagChange = (tag) => {
        props.handleTagChange(tag)
    };

    return (
        <div>

            <div className={'d-flex'}>
                <p className={'my-auto mx-2 pt-2 ms-5 theme-font'}>스택 검색 :</p>
                <Typeahead
                    id="search-bar"
                    labelKey="name"
                    className={'m-1 mt-3 d-inline-block '} style={{ width: "75%" }}
                    placeholder={'기술명으로 검색'}
                    multiple
                    renderToken={(option, props, index) => (
                        <span style={{ display: 'none' }} key={index}></span>
                    )}
                    selected={selectedTags}
                    onChange={handleTagSelections}
                    options={searchResults}
                    onInputChange={handleSearch}
                    minLength={1}
                />
            </div>
            {/* 선택된 태그 레이어 */}
            <div
                ref={tagLayerRef}
                style={{
                    position: 'inherit',
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '10px',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    overflow: 'auto',
                    marginTop: '-42px',
                    marginLeft: '-200px',
                    height : '40px',
                    width: '330px', // 선택된 태그 레이어 고정 너비
                    left: '50%', // 왼쪽으로 중앙 정렬
                    transform: 'translateX(150%)', // 중앙 정렬을 위한 트랜스폼
                }}
            >
                {selectedTags.map((tag, index) => (
                    <div key={index} className="custom-token theme-bg">
                        <div className={'d-flex'}>
                            <span>{tag}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default TypeSearchProject;