import React, {useEffect, useRef, useState} from 'react';
import "./Profile.css";
import {Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import DisabledButton from "../../commons/DisabledButton";

// 가상유저 정보
import person from "../../commons/Person";



function Profile(props) {
    const [mode, setMode] = useState(true);

    // 닉네임 관련
    // 출력용
    const [nickName, setNickName] = useState(person.nickName);
    // 수정용
    const [nickText, setNickText] = useState(0);

    // 이메일 출력용
    const [email, setEmail] = useState(person.email);

    // 프로필 사진 관련
    // 출력용
    const [image, setImage] = useState(person.imgSrc);
    // 수정용
    const [updateImg, setUpdateImg] = useState(null);

    // UI 개선용
    const selectFile = useRef(null);

    // 버튼 스위치
    const [disabled, setDisabled] = useState(false);


    // 닉네임 중복 검사
    useEffect(() => {
        // nickName이 공백이거나 같을때 clear해주기
        if (nickName === "" || person.nickName === nickName) {
            setNickText(0);
        } else {
            axios.post('http://localhost:8080/checkNick', null, {
                params: {
                    nickName: nickName,
                }
            })
                .then((resp) => {
                    // 존재하는 닉네임 일때
                    if (resp.data === 1) {
                        // p 텍스트 추가, 추가
                        setNickText(1);
                        // 버튼 disabled
                        setDisabled(true)
                    } else {
                        // 사용가능한 닉네임 일때
                        setNickText(2);
                        // 버튼 disabled 해제
                        setDisabled(false)
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, [nickName]);

    const updatePersonInfo = () => {
        const formData = new FormData();
        formData.append("personNickName", nickName);

        // 이미지가 선택되었을 때만 업로드
        if (updateImg) {
            formData.append("personProfileImg", updateImg[0]);
        }

        axios.post("http://localhost:8080/simServer/updatePersonInfo", formData)
            .then((resp) => {
                alert("프로필 업데이트 성공");
                // 필요한 업데이트 로직 추가
            })
            .catch((error) => {
                alert("프로필 업데이트 실패");
                console.error(error);
            });
        setMode(true);
    };


    return (
        <>
            {/* 이 안에서 p 태그 쓰면 콘솔 창에 에러 뜸 */}
            {
                mode
                    ?
                    // 저장된 화면
                    <div className={'row'}>
                        <div className={'mx-auto my-4'}>
                            {/* 이미지 소스는 로그인 유저 정보에서 가져오기 */}
                            <img src={image} alt="" className={'circle-background'}/>
                        </div>
                        <div className={'mt-4'}>
                            {/* 닉네임(레벨) */}
                            <h2 className={'text-center'}>{nickName}<small>{` (Lv.${person.level})`}</small></h2>
                            {/* 이메일 */}
                            <h4>{email}<small className={'fs-5 ms-3 text-success'}><strong>인증완료</strong><i
                                className="bi bi-check2-circle"></i></small></h4>

                        </div>
                        <div>
                            <button onClick={() => setMode(!mode)} type={'button'}
                                    className={'float-end theme-btn px-3'}>수정
                            </button>
                        </div>
                    </div>

                    :
                    // 수정 중인 화면
                    <Form>
                        <div className={'row'}>
                            <div className={'mx-auto my-4'}>
                                {/* 프로필 수정*/}
                                <input type="file" hidden={'hidden'} ref={selectFile}
                                       name={'personImage'} onChange={(e) => {
                                    setUpdateImg(e.target.files)
                                }}
                                />
                                <div className={'d-inline-block position-relative'}>
                                    <img src={image} alt="" className={'circle-background'}/>
                                    <button className={'theme-btn'}
                                            type={'button'}
                                            style={{position: 'absolute', bottom: '0px', right: '5%'}}
                                            onClick={() => selectFile.current.click()}
                                    ><i className="bi bi-pencil-fill"></i></button>
                                </div>
                            </div>

                            {/* 닉네임 */}
                            <p className={'text-start mt-3'}><strong>닉네임</strong></p>
                            <InputGroup>
                                <InputGroup.Text><i className="bi bi-emoji-smile"></i></InputGroup.Text>
                                <Form.Control type="text"
                                              value={nickName}
                                              name={'personNickName'}
                                              onChange={e => setNickName(e.target.value)}
                                />
                            </InputGroup>
                            {
                                nickText !== 0
                                    // 공백이 아니면
                                    ? (nickText === 1
                                        // 1일떄
                                        ? <p className={'text-danger text-start'}>사용할 수 없는 닉네임입니다.</p>
                                        // 2일때
                                        : <p className={'theme-font text-start'}>사용 가능한 닉네임입니다.</p>)
                                    // 공백이거나 자기 닉네임일때
                                    : ""

                            }
                            {/* 이메일 */}
                            <p className={'text-start mt-4'}><strong>이메일</strong><small className={'ms-1'}>인증완료<i
                                className="bi bi-check2-circle text-success"></i></small></p>
                            <InputGroup className={'mb-4'}>
                                <InputGroup.Text id="basic-addon2"><i className="bi bi-envelope"></i></InputGroup.Text>
                                <Form.Control
                                    value={email}
                                    readOnly={'readOnly'}
                                />
                            </InputGroup>
                            {/* 여기서 axios.put 실행 시키는 함수 호출*/}
                            <div className={''}>
                                <DisabledButton btnText={'저장'} disabled={disabled} onClick={updatePersonInfo}
                                                classAppend={'float-end ms-2 px-3'}/>
                                <button onClick={() => setMode(!mode)} type={'button'}
                                        className={'float-end theme-outline-btn px-3'}>취소
                                </button>
                            </div>
                        </div>
                    </Form>
            }

        </>
    )
}

export default Profile;