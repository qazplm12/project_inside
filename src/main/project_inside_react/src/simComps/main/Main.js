import React, {useEffect, useState} from 'react';
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
;


function Main(props) {
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return (
        <div className={'my-5'}>
            <Section1 />
            <br/><br/><br/><br/>
            <Section2 />
        </div>
    )
}

export default Main;