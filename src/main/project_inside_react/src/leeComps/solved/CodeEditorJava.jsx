import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { darcula } from '@uiw/codemirror-theme-darcula';

function CodeEditorJava(props) {
    const getSolvedContent = props.sendSolvedContent;
    const value = `${getSolvedContent}
    `
    const extensions = [java()];

    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
    }, []);

    return (
        <div className={'form-control mt-3 p-3 bg-secondary'}>
            <CodeMirror
                value={value}
                // height="200px"
                theme={darcula}
                extensions={extensions}
                className={'text-start'}
            />
        </div>
    );
}

export default CodeEditorJava;