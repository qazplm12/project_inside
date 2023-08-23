import React, {useState} from 'react';
import ReactQuill from "react-quill";
import {darcula} from "@uiw/codemirror-theme-darcula";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {python} from "@codemirror/lang-python";
import axios from "axios";

function ChallengeWrite(props) {
    const [explain, setExplain] = useState('');
    const [limit, setLimit] = useState('');
    const [paramExample, setParamExample] = useState('');
    const [solutionExample, setSolutionExample] = useState('');
    const [javaCode, setJavaCode] = useState('');
    const [javaScriptCode, setJavaScriptCode] = useState('');
    const [pythonCode, setPythonCode] = useState('');


    const [editorHtml, setEditorHtml] = useState('');
    const quillRef = React.useRef<ReactQuill>(null);
    const imageHandler = () => {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async() => {
            if (input.files) {
                const file = input.files[0];
                const formData = new FormData();

                formData.append("multipartFiles", file[0]);

                const res = await axios.post(`http://localhost:8080/uploadImage`, formData);
                if (quillRef.current) {
                    const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;
                }

                const fileName = file.name;

                console.log("파일데이터" + formData);
                console.log("파일이름" + fileName);

                const imageUrl = response.data.imageUrl;
                const newEditorHtml = `${editorHtml}<img src="${imageUrl}" alt="Uploaded Image" />`;
                setEditorHtml(newEditorHtml);
            }
        }

        axios.post(`http://localhost:8080/server/challengeWrite`, fd, {
            headers: {
                "Content-Type": `multipart/form-data; `,
            }
        })
            .then(res => {
                console.log("업로드 통신 성공 : " + res.data);
            })
            .catch(err => {
                console.log("업로드 통신 에러 : " + err);
            })
    }

    // const handleImageUpload = async (file) => {
    //     const formData = new FormData();
    //     formData.append('image', file);
    //
    //     try {
    //         const response = await axios.post(`http://localhost:8080/server/challengeWrite`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //
    //         // 이미지 업로드가 성공한 경우, 이미지 URL을 에디터에 삽입
    //         const imageUrl = response.data.imageUrl;
    //         const newEditorHtml = `${editorHtml}<img src="${imageUrl}" alt="Uploaded Image" />`;
    //         setEditorHtml(newEditorHtml);
    //     } catch (error) {
    //         console.error('Error uploading image', error);
    //     }
    // };

    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "underline"],
            ],
            handlers: {
                // image: () => {
                //     const input = document.createElement('input');
                //     input.setAttribute('type', 'file');
                //     input.setAttribute('accept', 'image/*');
                //     input.onchange = (e) => {
                //         const file = e.target.files[0];
                //         if (file) {
                //             handleImageUpload(file);
                //         }
                //     };
                //     input.click();
                // }
                image: imageHandler
            }
        },
    };

    const value1 = `${javaCode}`;
    const value2 = `${javaScriptCode}`;
    const value3 = `${pythonCode}`;

    const onChange1 = React.useCallback((value1, viewUpdate) => {
        console.log('value:1', value1);
        setJavaCode(value1);
    }, []);

    const onChange2 = React.useCallback((value2, viewUpdate) => {
        console.log('value:2', value2);
        setJavaScriptCode(value2);
    }, []);

    const onChange3 = React.useCallback((value3, viewUpdate) => {
        console.log('value:3', value3);
        setPythonCode(value3);
    }, []);

    // const handleSubmit = (e) => {
    //     const fd = new FormData();  // new FromData()로 새로운 객체 생성
    //     // 파일 데이터 저장
    //     Object.values(explain).forEach((explain) => fd.append("explain", explain));
    //
    //     const requestData = {
    //         explain: explain
    //     }
    //
    //     axios.post(`http://localhost:8080/server/challengeWrite`, fd, {
    //         headers: {
    //             "Content-Type": `multipart/form-data; `,
    //         }
    //     })
    //         .then(res => {
    //             console.log("업로드 통신 성공 : " + res.data);
    //         })
    //         .catch(err => {
    //             console.log("업로드 통신 에러 : " + err);
    //         })
    // }

    return (
        <div className={'container-sm'}>
            <h5 className={'my-5'}>문제 설명</h5>
            <ReactQuill
                value={explain}
                style={{ height: "300px" }}
                modules={modules}
                onChange={setExplain}
            />

            <h5 className={'my-5'}>제한 사항</h5>
            <ReactQuill
                value={limit}
                    style={{ height: "300px" }}
                    modules={modules}
                onChange={setLimit}
            />

            <h5 className={'my-5'}>입출력 예</h5>
            <ReactQuill
                value={paramExample}
                style={{ height: "300px" }}
                modules={modules}
                onChange={setParamExample}
            />

            <h5 className={'my-5'}>입출력 예 설명</h5>
            <ReactQuill
                value={solutionExample}
                style={{ height: "300px" }}
                modules={modules}
                onChange={setSolutionExample}
            />

            <h5 className={'my-5'}>템플릿 Java</h5>
            <CodeMirror
                value={value1}
                width="100%"
                height="200px"
                theme={darcula}
                extensions={[java()]}
                className={'text-start'}
                onChange={onChange1}
            />

            <h5 className={'my-5'}>템플릿 JavaScript</h5>
            <CodeMirror
                value={value2}
                width="100%"
                height="200px"
                theme={darcula}
                extensions={[javascript({jsx: true})]}
                className={'text-start'}
                onChange={onChange2}
            />

            <h5 className={'my-5'}>템플릿 Python</h5>
            <CodeMirror
                value={value3}
                width="100%"
                height="200px"
                theme={darcula}
                extensions={[python()]}
                className={'text-start'}
                onChange={onChange3}
            />

            <h5 className={'my-5'}>사진 업로드 테스트</h5>
            <ReactQuill
                value={editorHtml}
                style={{ height: "300px" }}
                modules={modules}
                onChange={setEditorHtml}
            />
            {/*<button className={'btn btn-primary my-5'} onClick={handleSubmit}>작성 완료</button>*/}
        </div>
    )
}

export default ChallengeWrite;