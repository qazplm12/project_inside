import React, {useState} from 'react';

function Profile(props) {
    const [mode, setMode] = useState(true)


    return (
        <>
            {/* 이 안에서 p 태그 쓰면 콘솔 창에 에러 뜸 */}
            {
                mode
                    ? <button onClick={() => setMode(!mode)} type={'button'} className={'float-end theme-btn px-3'}>수정</button>
                    : <>
                        <button onClick={() => setMode(!mode)} type={'button'} className={'float-end theme-btn ms-2 px-3'}>저장</button>
                        <button onClick={() => setMode(!mode)} type={'button'} className={'float-end theme-outline-btn px-3'}>취소</button>
                    </>
            }

        </>
    )
}

export default Profile;