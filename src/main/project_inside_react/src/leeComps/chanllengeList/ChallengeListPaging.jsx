import React, {useEffect} from 'react';
import Pagination from 'react-js-pagination';
import './paging.css';

function ChallengeListPaging(props) {
    const page = props.page;
    const count = props.count;
    const setPage = props.setPage;
    const postPerPage = props.postPerPage;

    return (
        <div>
            <Pagination
                activePage={page}
                itemsCountPerPage={postPerPage}   // 한 페이지 당 보여줄 아이템 수
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={setPage}
            />
        </div>
    )
}

export default ChallengeListPaging;