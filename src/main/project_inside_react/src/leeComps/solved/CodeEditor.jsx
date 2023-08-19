import React, {useState} from 'react';
import CodeEditorJavaScript from "./CodeEditorJavaScript";
import CodeEditorJava from "./CodeEditorJava";
import CodeEditorPython from "./CodeEditorPython";

function CodeEditor(props) {
    const getSolvedLanguage = props.sendSolvedLanguage;
    const getSolvedContent = props.sendSolvedContent;

    if (getSolvedLanguage == 'JavaScript') {
        return (
            <CodeEditorJavaScript sendSolvedContent={getSolvedContent}/>
        )
    }
    else if (getSolvedLanguage == 'Java') {
        return (
            <CodeEditorJava sendSolvedContent={getSolvedContent}/>
        )
    }
    else if (getSolvedLanguage == 'Python') {
        return (
            <CodeEditorPython sendSolvedContent={getSolvedContent}/>
        )
    }
}

export default CodeEditor;