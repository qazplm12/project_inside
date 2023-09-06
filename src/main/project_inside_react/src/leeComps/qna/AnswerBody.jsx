import React, {useEffect, useState} from 'react';
import axios from "axios";
import CodeEditor from "../solved/CodeEditor";

function AnswerBody(props) {
    const [qnaItems, setQnaItems] = useState([]);
    const [array, setArray] = useState([]);

    const questionIdx = props.questionIdx;
    const AnswerModalShow = props.AnswerModalShow;

    useEffect(() => {
        axios.get(`http://localhost:8081/server/QnAItems?idx=${questionIdx}`)   // 문제번호로 조회해서 그 리스트만 가져오기
            .then(res => {
                // alert('통신 성공 : ' + res);
                // console.log('통신 성공 : ' + res);
                setQnaItems(res.data);

                const nickList = res.data;
                let arr = new Array(res.data.length).fill(0);    // qnaList와 같은 크기의 배열 선언
                axios.get('http://localhost:8081/server/userProfile')
                    .then(res => {
                        // setProfile(res.data);
                        // console.log("이미지 경로 : " + res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            for (let y = 0; y < nickList.length; y++) {
                                if ((res.data[i].personNickName) == nickList[y].answerNick) {
                                    // console.log("리스트 순서 : " + y);
                                    // console.log("사진 경로 : " + res.data[i].personImgPath);
                                    arr.splice(y, 1, res.data[i]);    // 해당 위치 배열 교체
                                }
                            }
                        }
                        // console.log("내가 만든 배열 : " + arr);
                        // console.log("내가 만든 길이 : " + arr.length);
                        setArray(arr);
                    })
                    .catch(err => {

                    })
            })
            .catch(err => {
                // alert('통신 실패 : ' + err);
                console.log('통신 실패 : ' + err);
            })
    }, [AnswerModalShow]);

    // console.log("만들어진 배열 : " + array[3]);

    // for (let item in qnaItems) {    // for문이 루프를 실행하지 않는듯 찾아보기(리액트에선 for 사용 불가)
    return (
        <div>
            {
                qnaItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className={'d-flex'}>
                                {/*<img src="/images/kazha.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>*/}
                                <img src={!array[index]?.personImgPath ? "/images/ProfileImg.png" : `/images/profileImg/${array[index]?.personImgPath}`} alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                                <div className={'text-start ms-3'}>
                                    <p className={'m-0'}><i className="bi bi-person-fill"></i> {item.answerNick}</p>
                                    <p className={'m-0'}><i className="bi bi-award"></i> Lv.{array[index]?.personLevel}</p>
                                    <p className={'text-end'}><i className="bi bi-calendar-week"></i> {item.answerDate}</p>
                                </div>
                            </div>
                            <p className={'text-start'}>{item.answerContent}</p>
                            <CodeEditor language={item.answerLanguage} code={item.answerCode} readOnly={true}/>
                            <hr className={'my-5'}/>
                        </div>
                    )
                })
            }
        </div>
    )
    // }
}

export default AnswerBody;