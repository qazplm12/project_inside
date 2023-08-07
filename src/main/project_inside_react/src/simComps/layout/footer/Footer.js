import React from 'react';

function Footer(props) {

    return (
        <footer className={'container-fluid theme-bg py-4'}
                style={{bottom : '0px', position : 'absolute'}} // 임시 css 옵션
        >
            made by team2
        </footer>
    )
}

export default Footer;