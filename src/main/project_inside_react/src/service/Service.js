import axios from "axios";

// 서버 접속 기본 주소
const BASE_URL = 'http://localhost:8080'

// axios로 서버와 통신을 위한 함수
// url와 method, 전달할 데이터를 매개변수로 받아 하나의 명령으로 통신
export async function postings(apiUrl, method, data) {
    // axios() 방식 사용 시 header 설정이 반드시 필요함
    // 서버와 통신 시 사용할 Content-Type을 설정
    let headers = {'Content-Type': 'application/json'};

//   사용자 인증 정보를 가지고 있는 JWT Token을 로컬 스토리지에서 'ACCESS TOKEN' 이란 변수명으로 저장된 값을 가져오기
    const accessToken = JSON.parse(sessionStorage.getItem("ACCESS_TOKEN"));
    if (accessToken && accessToken !== null) {
        // header에 사용자 인증 정보도 함께 전달
        // JWT 토큰 전달 시 반드시 'Bearer ' 이라는 접두사가 필요함
        headers.Authorization = `Bearer ${accessToken}`;
    }

    if (data != null) {
        // axios() 방식
        // axios 통신 시 header 정보를 추가하여 전달함

        // axios({
        //   url: BASE_URL + apiUrl,
        //   method: method,
        //   data: data,
        //   headers: headers
        // })
        //   .then(res => {
        //     alert("post|put|delete 통신 성공");
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     alert("post|put|delete 통신 실패");
        //   });

        // async / await 를 사용한 방식
        const {data} = await axios({
            url: BASE_URL + apiUrl,
            method: method,
            data: data,
            headers: headers
        });

        return data;
    } else {
        // axios() 방식

        // axios({
        //   url: BASE_URL + apiUrl,
        //   method: method,
        //   headers: headers
        // })
        //   .then(res => {
        //     alert("get 통신 성공");
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     alert("get 통신 실패");
        //   });

        const {data} = await axios({
            url: BASE_URL + apiUrl,
            method: method,
            headers: headers
        });

        return data;

        // axios.method() 방식
        // axios.method() 방식 사용 시 header 정보에 Content-Type 가 없어도 됨 (자동설정)
        // 인증 정보인 Authorization 에 jwt 토큰 정보만 함께 전달

        // axios.get('http://localhost:8080/todo/test', {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`
        //     }
        //   })
        //   .then(res => {
        //     alert("통신 성공");
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     alert("통신 실패");
        //   });
    }
}

export function login(userId, userPw) {
    axios.post(`${BASE_URL}/login`, {
        personId: userId,
        personPassword: userPw
    })
        .then(res => {
            // 브라우저의 로컬 스토리지에 ACCESS_TOKEN 이라는 변수를 만들고 받아온 서버에서 전달받은 데이터 중 token 정보를 저장함
            // 브라우저의 세션 스토리지에 저장해도 상관없음

            sessionStorage.setItem("ACCESS_TOKEN", JSON.stringify(res.data.token));
            sessionStorage.setItem("userInfo", JSON.stringify(res.data));


            window.location.href = '/pi/main';
        })
        .catch(err => {
            if (err.response.data.error === "fail") {
                alert('로그인 중 오류가 발생했습니다.');
            } else {
                alert(`차단된 계정입니다.\n\n차단 사유 : ${err.response.data.error}`);
            }
        });

}

export function update(userId, userPw) {
    axios.post(`${BASE_URL}/update`, {
        personId: userId,
        personPassword: userPw
    })
        .then(res => {
            alert("업데이트 완료");
            // 브라우저의 로컬 스토리지에 ACCESS_TOKEN 이라는 변수를 만들고 받아온 서버에서 전달받은 데이터 중 token 정보를 저장함
            // 브라우저의 세션 스토리지에 저장해도 상관없음
            sessionStorage.setItem("ACCESS_TOKEN", null);
            sessionStorage.setItem("userInfo", null);
            sessionStorage.removeItem('ACCESS_TOKEN');
            sessionStorage.removeItem('userInfo');

            sessionStorage.setItem("ACCESS_TOKEN", JSON.stringify(res.data.token));
            sessionStorage.setItem("userInfo", JSON.stringify(res.data));

        })
        .catch(err => {
            alert('업데이트 중 오류가 발생했습니다.');
            console.log(err);
        });

}

export function logout() {
    // 브라우저의 로컬 스토리지에 저장된 내용 중 ACCESS_TOKEN 변수에 저장된 내용을 삭제
    sessionStorage.setItem("ACCESS_TOKEN", null);
    sessionStorage.setItem("userInfo", null);
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.removeItem('userInfo');

    window.location.href = "/userAuth/login";
}

export function signUp(userDto) {
    axios.post(`${BASE_URL}/signup`, userDto)
        .then((res) => {
            alert("회원 가입이 완료되었습니다.");
            console.log(res);
            window.location.href = '/userAuth/login';
        })
        .catch((err) => {
            alert('회원 가입 중 오류가 발생했습니다.');
        });
}
