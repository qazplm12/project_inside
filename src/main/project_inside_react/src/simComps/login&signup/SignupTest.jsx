import React, {useState} from 'react';
import axios from "axios";

function SignupTest(props) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nick, setNick] = useState('');

    const handleSubmit = (e) => {
        const requestData = {
            id: id,
            password: password,
            nick: nick
        }
        axios.post(`http://localhost:8080/server/signup`, requestData)
            .then(res => {
                console.log("통신 성공 : " + res);
            })
            .catch(err => {
                console.log("통신 실패 : " + err);
            })
    }

    return (
        <div>
            <p>ID</p>
            <input type="text" className={'form-control'} value={id} onChange={(e) => setId(e.target.value)}/>
            <p>PW</p>
            <input type="text" className={'form-control'} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p>NICK</p>
            <input type="text" className={'form-control'} value={nick} onChange={(e) => setNick(e.target.value)}/>

            <button className={'btn btn-primary'} onClick={handleSubmit}>회원가입</button>
        </div>
    )
}

export default SignupTest;