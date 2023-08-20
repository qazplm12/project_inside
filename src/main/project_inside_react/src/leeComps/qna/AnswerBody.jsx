import React, {useEffect, useState} from 'react';
import axios from "axios";
import CodeEditor from "../solved/CodeEditor";

function AnswerBody(props) {
    const [qnaItems, setQnaItems] = useState('');
    const questionIdx = props.questionIdx;

    useEffect(() => {
        axios.get(`http://localhost:8080/server/QnAItems?idx=${questionIdx}`)   // 문제번호로 조회해서 그 리스트만 가져오기
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' + res);
                setQnaItems(res.data);
            })
            .catch(err => {
                alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }, []);

    for (let item in qnaItems) {    // for문이 루프를 실행하지 않는듯 찾아보기, qnaList.map이 먹통임 이유 찾기
        return (
            <div>
                <div className={'d-flex'}>
                    <img src="/images/kazha.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                    <div className={'text-start ms-3'}>
                        <p className={'m-0'}><i className="bi bi-person-fill"></i> {item.answerNick}</p>
                        <p className={'m-0'}><i className="bi bi-award"></i> Lv. 1</p>
                        <p className={'text-end'}><i className="bi bi-calendar-week"></i> {item.answerDate}</p>
                    </div>
                </div>
                <p className={'text-start'}>{item.answerContent}</p>
                <CodeEditor language={item.answerLanguage} code={item.answerCode} readOnly={true}/>
            </div>
        )
    }
}

export default AnswerBody;