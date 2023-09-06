import React, {useEffect, useState} from 'react';
import CodeEditor from "./CodeEditor";
import axios from "axios";

function SolvedListItems(props) {
    const [profile, setProfile] = useState(null);

    const getItem = props.sendItem;
    const readOnly = props.readOnly;

    useEffect(() => {
        axios.get('http://localhost:8081/server/userProfile')
            .then(res => {
                // setProfile(res.data);
                // console.log("이미지 경로 : " + res.data)

                for (let i = 0; i < res.data.length; i++) {
                    if ((res.data[i].personNickName) == getItem.solvedNick) {
                        setProfile(res.data[i].personImgPath);
                        // console.log("프로필 : " + res.data[i].personImgPath);
                    }
                }
            })
            .catch(err => {

            })
    }, []);
    
    return (
        <div className={'form-control mb-5 p-3'}>
            <div className={'d-flex align-items-center'}>
                <div className={'d-flex align-items-center me-auto'}>
                    {/*<img src="/images/sakura.jpg" alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>*/}
                    <img src={profile === null ? "/images/ProfileImg.png" : `/images/profileImg/${profile}`} alt="" className={'circle-background'} style={{maxWidth: "4em", maxHeight: "4em"}}/>
                    <p className={'mb-0 ms-3'}><i className="bi bi-person-fill"></i> {getItem.solvedNick}</p>
                </div>
                <div className={'me-2'}>
                    <p className={'badge theme-bg p-2 mb-0'}>{getItem.solvedLanguage}</p>
                </div>
            </div>
            <CodeEditor language={getItem.solvedLanguage} code={getItem.solvedContent} readOnly={readOnly}/>
        </div>
    )
}

export default SolvedListItems;