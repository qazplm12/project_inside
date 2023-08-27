import React from 'react';

function Footer(props) {

    return (
        <footer className={'container-fluid theme-bg py-4'}
        >
            <h4><strong>Project Inside made by team2</strong></h4>
            <div className={'row d-flex mx-auto'}>
                <div className={'col-5'}></div>
                <div className={'col-6 ps-5 ms-5 text-start'}>
                    <p className={'text-light mb-0'}>조장 : <small>심우석 </small></p>
                    <span className={'text-light mb-0'}>조원 : <small>박민성, 이지원 </small></span>
                    <span style={{color : 'rgba(140, 83, 248, 0.1)'}}>탈주자 : <small>우치하 준희 </small></span>
                </div>
            </div>



        </footer>
    )
}

export default Footer;