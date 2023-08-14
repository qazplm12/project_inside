import React, {useState} from 'react';
// import TypeAhead from "./TypeAhead";
import MyLanguage from "./MyLanguage";

function MyStack(props) {

    const [mode, setMode] = useState(true);

    return (
        <>
            {
                // mode
                // ? <MyLanguage changeMode={setMode} />
                // : <TypeAhead changeMode={setMode} />
            }

        </>
    )
}

export default MyStack;