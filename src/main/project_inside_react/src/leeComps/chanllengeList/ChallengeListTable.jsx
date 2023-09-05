import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ChallengeListTableTd from "./ChallengeListTableTd";
import ChallengeListPaging from "./ChallengeListPaging";

function ChallengeListTable(props) {
    const getChallengeList = props.sendChallengeList; //리스트에 나타낼 아이템
    const getSearch = props.sendSearch;

    // const [items, setItems] = React.useState([])  //리스트에 나타낼 아이템
    const [count, setCount] = useState(0); //아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postPerPage] = useState(15); //페이지당 아이템 개수

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    const setPage = (e) => {
        setCurrentPage(e);
    };


    // setChallengeList(getChallengeList); // 얘가 무한 랜더링
    // console.log(getChallengeList);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/server/challengeList")
    //         .then(res => {
    //             console.log("통신 성공 : " + res.data);
    //
    //             setChallengeList(res.data);
    //         })
    //         .catch(err => {
    //             console.log("통신 에러 : " + err);
    //         });
    // }, []);

    useEffect (() => {
        setCount(getChallengeList.length);
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(getChallengeList.slice(indexOfFirstPost, indexOfLastPost));
    }, [currentPage, indexOfFirstPost, indexOfLastPost, getChallengeList, postPerPage])

    return (
        <div>
            <table className={'table table-borderless table-hover border'}>
                <colgroup>
                    <col width={'10%'}/>
                    <col width={'35%'}/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                </colgroup>
                <thead className={'border'}>
                <tr>
                    <th>상태</th>
                    <th>제목</th>
                    <th>난이도</th>
                    <th>완료한 사람</th>
                    <th>정답률</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentPosts.map((item, index) => {
                        if (getSearch == null) {
                            return (
                                    <tr key={index}>
                                        <ChallengeListTableTd challengeIdx={item.challengeIdx}></ChallengeListTableTd>
                                        {/*<td><Link to={`http://localhost:3000/codeChallenge?idx=${item.challengeIdx}`} className={'theme-link'}>{item.challengeTitle}</Link></td>*/}
                                        <td><Link to={`/codeChallenge?idx=${item.challengeIdx}`} className={'theme-link'}>{item.challengeTitle}</Link></td>
                                        <td>Lv.{item.challengeClass}</td>
                                        <td>{item.challengeCompletePerson}명</td>
                                        <td>{item.challengeCorrectPercent}%</td>
                                    </tr>
                            );
                        }
                        else if (item.challengeTitle.includes(getSearch)) { // includes : 제목에 검색어가 포함되면 true
                            return (
                                    <tr key={index}>
                                        <ChallengeListTableTd challengeIdx={item.challengeIdx}></ChallengeListTableTd>
                                        {/*<td><Link to={`http://localhost:3000/codeChallenge?idx=${item.challengeIdx}`} className={'theme-link'}>{item.challengeTitle}</Link></td>*/}
                                        <td><Link to={`/codeChallenge?idx=${item.challengeIdx}`} className={'theme-link'}>{item.challengeTitle}</Link></td>
                                        <td>Lv.{item.challengeClass}</td>
                                        <td>{item.challengeCompletePerson}명</td>
                                        <td>{item.challengeCorrectPercent}%</td>
                                    </tr>
                            );
                        }
                    })
                }
                </tbody>
            </table>

            <ChallengeListPaging page={currentPage} count={count} setPage={setPage} postPerPage={postPerPage} />
        </div>
    )
}

export default ChallengeListTable;