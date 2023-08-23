import React, {useMemo,useRef, useState} from 'react';
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import TypeAheadProject from "./TypeAheadProject";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";



const icons = Quill.import("ui/icons");
icons["bold"] = "<span>B</span>";

function Park(props) {

    const [projectCode, setProjectCode] = useState([]); // 선택한 기술 스택을 담을 상태

    const [projectTitle, setProjectTitle] = useState("");
    const [totalPerson, setTotalPerson] = useState("");
    const [projectThumbnail, setProjectThumbnail] = useState(null);
    const [levels, setLevels] = useState("1");

    const locationMove = useNavigate();

    const navigate = useNavigate();

    const handleTagSelectionInParent = (selectedTags) => {
        setProjectCode(selectedTags);
    };
    

    // quill 부분
    const quillRef = useRef()
    const [content, setContent] = useState("")
    // quill 부분

    const toyRegistered = e =>{
        e.preventDefault();

        console.log('project thumbnil', projectThumbnail)

        const formData = new FormData();
        formData.append("projectTitle",projectTitle)
        formData.append("totalPerson",totalPerson)
        formData.append("projectCode",projectCode.join(', '))
        formData.append("levels",levels)
        formData.append("content",content)
        formData.append("projectThumbnail",projectThumbnail)

        axios({
            method : 'POST',
            url : 'http://localhost:8080/pi/toyProject/ToyRegis',
            data : formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(function(data){
            locationMove("/pi/toyListBoard")
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
                    [{ align: [] }, "video", "image"],
                ],
            },
        }
    }, [])

    return (
        <div className={"container my-3"}>
            <form onSubmit={toyRegistered}>
            <div className={"row mb-5 border border-1 rounded py-3"}>
                <div className={"col-sm-12 d-flex "}>
                    {/* 프로젝트 / 프로젝트이미지 등록 */}
                    <div className={"col-sm-6 d-flex"}>
                        <div className={"col-sm-3"}>
                            <label htmlFor={"project-name"} className={"form-label theme-font"}>프로젝트 명:</label>
                        </div>
                        <div className={"col-sm"}>
                            <input type={"text"} className={"form-control"} id={"project-name"} name={projectTitle} 
                                onChange={(e) => setProjectTitle(e.target.value)} placeholder={"프로젝트 명을 입력해주세요"}/>
                        </div>
                    </div>
                    <div className={"col-sm-6 d-flex "}>
                        <div className={"col-sm-3"}>
                            <label htmlFor={"project-image"} className={"form-label theme-font"}>프로젝트 이미지:</label>
                        </div>
                        <div className={"col-sm"}>
                            <input type={"file"} className={"form-control"} id={"project-image"}
                            onChange={(e) => setProjectThumbnail(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row mb-5 border border-1 rounded py-3"}>
                {/* 기술 스택 컴포 넌트 */}
                <TypeAheadProject onTagSelection={handleTagSelectionInParent} />
            </div>
            <div className={"row mb-5 border border-1 rounded py-3"}>
                {/* 모집 인원 / 참여 가능한 레벨 */}
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"total-person"} className={"form-label theme-font"}>모집인원</label>
                    </div>
                    <div className={"col-sm d-flex"}>
                        <input id={"total-person"} name={totalPerson} 
                            onChange={(e) => setTotalPerson(e.target.value)} className={"form-control me-3"}/><span className={'theme-font'}>명</span>
                    </div>
                </div>
                <div className={"col-sm-6 d-flex"}>
                    <div className={"col-sm-3"}>
                        <label htmlFor={"level"} className={"form-label theme-font"}>참여가능레벨</label>
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
                    <p className={"fs-3 fw-bold text-start theme-font"}>상세 내용</p>
                </div>
                <div name={"detailContent"}>
                    {/*  이곳은 quill 라는 에디터를 사용하여 상세 내용을 작업을 합니다.  */}
                    <ReactQuill
                        style={{ width: "auto", height: "600px" }}
                        placeholder="프로젝트 상세 내용을 입력해 주세요"
                        theme="snow"
                        ref={quillRef}
                        value={content || ''}
                        onChange={(content, delta, source, editor) => setContent(editor.getHTML())}
                        // onChange={(e) => setContent(e.target.value)}
                        modules={modules}
                    />
                </div>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-sm-12"}>
                    <div className={"d-block text-end mt-3"}>
                        <Button type={"submit"} className={"btn  btn-lg btn-primary theme-btn"}>등록</Button>
                        <Button type={"button"} className={"btn btn-lg  btn-danger theme-btn ms-3"} onClick={() => navigate(-1)}>취소</Button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Park;