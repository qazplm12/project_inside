import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python';
import { darcula } from '@uiw/codemirror-theme-darcula';

function CodeEditorPython(props) {
    const getSolvedContent = props.sendSolvedContent;
    const value = `${getSolvedContent}
    `
    const extensions = [python()];

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

export default CodeEditorPython;