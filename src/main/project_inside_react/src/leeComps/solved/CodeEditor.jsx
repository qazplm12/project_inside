import React from 'react';
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {python} from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import {darcula} from "@uiw/codemirror-theme-darcula";

function CodeEditor(props) {
    const language = props.language;
    const code = props.code;
    const readOnly = props.readOnly;

    const value = `${code}
    `
    let extensions = [];
    if (language == 'JavaScript') {
        extensions = [javascript({ jsx: true })];
    }
    else if (language == 'Java') {
        extensions = [java()];
    }
    else if (language == 'Python') {
        extensions = [python()];
    }

    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
        props.setCode(value);
    }, []);

    if (readOnly) {
        return (
            <div className={'form-control mt-3 p-3 bg-secondary'}>
                <CodeMirror
                    value={value}
                    // height="200px"
                    theme={darcula}
                    extensions={extensions}
                    className={'text-start'}
                    onChange={onChange}
                    readOnly={true}
                />
            </div>
        );
    }
    else {
        return (
            <div className={'form-control mt-3 p-3 bg-secondary'}>
                <CodeMirror
                    value={value}
                    // height="200px"
                    theme={darcula}
                    extensions={extensions}
                    className={'text-start'}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default CodeEditor;