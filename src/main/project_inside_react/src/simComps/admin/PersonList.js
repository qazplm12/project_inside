import React, {useState} from 'react';
import {Table, Pagination} from 'react-bootstrap';
import dummyPersonList from "../commons/DummyPersonList";

const usersPerPage = 3; // 한 페이지에 표시할 유저 수


const PersonList = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 유저 리스트 계산
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = dummyPersonList.slice(indexOfFirstUser, indexOfLastUser);

    const banning = () => {

    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Table>
                <colgroup>
                    <col width={'5%'}/>
                    <col />
                    <col width={'9%'}/>
                    <col width={'25%'}/>
                    <col width={'12%'}/>
                    <col width={'10%'}/>
                </colgroup>
                <thead>
                <tr>
                    <th>프로필</th>
                    <th>아이디(메일)</th>
                    <th>레벨<br/>(총점수)</th>
                    <th>선호하는 언어</th>
                    <th>가입일</th>
                    <th>차단설정</th>
                    {/* 다른 필드들도 추가 */}
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={index}>
                        <td><img src={user.imgSrc} alt="" className={'circle-background'}
                                 style={{width: '3vw', height: '6vh'}}/></td>
                        <td>{user.nickName}({user.email})</td>
                        <td>{user.level}</td>
                        <td>{user.language}</td>
                        <td>{user.jointDt}</td>
                        <td>
                            <button type={'button'} className={'btn btn-danger'} onClick={banning}>차단</button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)}/>
                <Pagination.Prev onClick={
                    currentPage - 1 > 0
                        ? () => handlePageChange(currentPage - 1)
                        : () => handlePageChange(1)
                }/>
                {Array.from({length: Math.ceil(dummyPersonList.length / usersPerPage)}, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    );
                })}
                <Pagination.Next onClick={
                    currentPage + 1 < Math.ceil(dummyPersonList.length / usersPerPage)
                        ? () => handlePageChange(currentPage + 1)
                        : () => handlePageChange(Math.ceil(dummyPersonList.length / usersPerPage))
                }/>
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(dummyPersonList.length / usersPerPage))}/>
            </Pagination>
        </div>
    );
};

export default PersonList;