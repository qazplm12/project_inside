import React, {useMemo,useRef, useState} from 'react';
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import codeLanguage from "./codeLanguage";
import "react-quill/dist/quill.snow.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';



const icons = Quill.import("ui/icons");
icons["bold"] = "<span>B</span>";

function Park(props) {

    const [projectCode, setProjectCode] = useState(''); // 선택한 기술 스택을 담을 상태
    const [selectedStacks, setSelectedStacks] = useState([]); // 선택한 기술 스택들을 담을 배열 상태

    const [projectTitle, setProjectTitle] = useState("");
    const [totalPerson, setTotalPerson] = useState("");
    const [levels, setLevels] = useState("1");

    

    // quill 부분
    const quillRef = useRef()
    const [content, setContent] = useState("")
    // quill 부분



    const handleProjectName = (event) => {
        const selectedValue = event.target.value;
        setProjectCode(selectedValue); // 선택한 기술 스택 상태 업데이트
        setSelectedStacks((prevStacks) => [...prevStacks, selectedValue]); // 선택한 기술 스택 배열에 추가
    };


    const toyRegistered = e =>{
        e.preventDefault();

        console.log('projectTitle'+projectTitle);
        console.log('totalPerson'+totalPerson);
        console.log('levels'+levels);

        axios({
            method : 'POST',
            url : 'http://localhost:8080/pi/toyProject/ToyRegis',
            params : {
                "projectTitle": projectTitle, 
                "totalPerson": totalPerson,
                "levels": levels,
                "content" : content
            }
        })
        .then(function(data){
            console.log('확인'+data)
        })
        .catch(function(err){
            console.log('실패')
            console.log(err)
        })

    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }, "link", "image"],
                ],
            },
        }
    }, [])

    return (
        <div className={"container my-3"}>
            <form onSubmit={toyRegistered} >
            <div className={"row mb-5 border border-1 rounded py-3"}>
                <div className={"col-sm-12 d-flex "}>
                    {/* 프로젝트 / 프로젝트이미지 등록 */}
                    <div className={"col-sm-6 d-flex"}>
                        <div className={"col-sm-3"}>
                            <label htmlFor={"project-name"} className={"form-label"}>프로젝트 명:</label>
                        </div>
                        <div className={"col-sm"}>
                            <input type={"text"} className={"form-control"} id={"project-name"} name={projectTitle} 
                                onChange={(e) => setProjectTitle(e.target.value)} placeholder={"프로젝트 명을 입력해주세요"}/>
                        </div>
                    </div>
                    <div className={"col-sm-6 d-flex "}>
                        <div className={"col-sm-3"}>
                            <label htmlFor={"project-image"} className={"form-label"}>프로젝트 이미지:</label>
                        </div>
                        <div className={"col-sm"}>
                            <input type={"file"} className={"form-control"} id={"project-image"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row mb-5 border border-1 rounded py-3"}>
                {/* 주사용 언어 / 선택한 언어 */}
                {/* <MyCard title={'주요기술 / 선호하는 언어'}>
                    <MyStack/>
                </MyCard> */}
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"project-code"} className={"form-label"}>기술 스택 :</label>
                    </div>
                    <div className={"col-sm"}>
                        <codeLanguage></codeLanguage>
                        {/* <select id={"project-code"} className={"form-select"} name={"projectCode"} onChange={handleProjectName}>
                            <option value={"SpringBoot"}>SpringBoot</option>
                            <option value={"BootStrap"}>BootStrap</option>
                            <option value={"JS"}>JS</option>
                            <option value={"React"}>React</option>
                            <option value={"Android"}>Android</option>
                        </select> */}
                    </div>
                    
                </div> 
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"code-store"} className={"form-label"}>내가 선택한 언어:</label>
                    </div>
                    <div className={"col-sm"}>
                        <input
                            type={"text"} className={"form-control"} id={"code-store"} value={selectedStacks.join(', ')} readOnly />
                    </div>
                </div>
            </div>
            <div className={"row mb-5 border border-1 rounded py-3"}>
                {/* 모집인원 / 참여가능한 레벨 */}
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"total-person"} className={"form-label"}>모집인원</label>
                    </div>
                    <div className={"col-sm d-flex"}>
                        <input id={"total-person"} name={totalPerson} 
                            onChange={(e) => setTotalPerson(e.target.value)} className={"form-control me-3"}/><span>명</span>
                    </div>
                </div>
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"level"} className={"form-label"}>참여가능레벨</label>
                    </div>
                    <div className={"col-sm"}>
                        <select className={"form-select"} id={"level"} name={levels} onChange={(e) => setLevels(e.target.value)}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={"row mb-5"}>
                <div className={"col-12"}>
                    <p className={"fs-3 fw-bold text-start"}>상세 내용</p>
                </div>
                <div name={"detailContent"}>
                    {/*  이곳은 quill 라는 에디터를 사용하여 상세 내용을 작업을 합니다.  */}
                    <ReactQuill
                        style={{ width: "auto", height: "600px" }}
                        placeholder="프로젝트 상세 내용을 입력해 주세요"
                        theme="snow"
                        ref={quillRef}
                        value={content}
                        onChange={(content, delta, source, editor) => setContent(editor.getHTML())}
                        // onChange={(e) => setContent(e.target.value)}
                        modules={modules}
                    />
                </div>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-sm-12"}>
                    <div className={"d-grid justify-content-md-end"}>
                        <button type={"submit"} className={"btn btn-primary"}>등록</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Park;