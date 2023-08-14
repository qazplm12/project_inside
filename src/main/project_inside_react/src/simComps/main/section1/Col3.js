import React from 'react';
import Language from "./Language";

function Col3(props) {

    return (
        <div className={'col-sm-4 p-5'}>
            <h6 className={'text-start mb-3'}>언어별 공식문서</h6>
            <div className={'d-flex justify-content-around mb-4'}>
                <Language
                    name={"python"}
                    href={"https://docs.python.org/ko/3/"}
                    logoSrc={"/images/language/python.png"}
                />
                <Language
                    name={"C"}
                    href={"https://learn.microsoft.com/ko-kr/cpp/c-language/c-language-reference?view=msvc-170"}
                    logoSrc={"/images/language/C.png"}
                />
                <Language
                    name={"java"}
                    href={"https://docs.oracle.com/javase/8/docs/api/"}
                    logoSrc={"/images/language/java.jpg"}
                />
            </div>
            <div className={'d-flex justify-content-around'}>
                <Language
                    name={"C++"}
                    href={"https://learn.microsoft.com/ko-kr/cpp/cpp/?view=msvc-170"}
                    logoSrc={"/images/language/C++.png"}
                />
                <Language
                    name={"kotlin"}
                    href={"https://kotlinlang.org/docs/home.html"}
                    logoSrc={"/images/language/kotlin.jpg"}
                />
                <Language
                    name={"javascript"}
                    href={"https://developer.mozilla.org/ko/docs/Web/JavaScript"}
                    logoSrc={"/images/language/js.png"}
                />
            </div>
        </div>
    )
}

export default Col3;