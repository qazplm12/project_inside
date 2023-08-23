import React, {useState} from 'react';
import ReactQuill from "react-quill";
import {darcula} from "@uiw/codemirror-theme-darcula";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {python} from "@codemirror/lang-python";

function ChallengeWrite(props) {
    const [explain, setExplain] = useState('');
    const [limit, setLimit] = useState('');
    const [paramExample, setParamExample] = useState('');
    const [solutionExample, setSolutionExample] = useState('');
    const [javaCode, setJavaCode] = useState('');
    const [javaScriptCode, setJavaScriptCode] = useState('');
    const [pythonCode, setPythonCode] = useState('');

    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "underline"],
            ],
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
            <button className={'btn btn-primary my-5'}>작성 완료</button>
        </div>
    )
}

export default ChallengeWrite;