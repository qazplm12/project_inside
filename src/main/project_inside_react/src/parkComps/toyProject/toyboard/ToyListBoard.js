import {Button, Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./boardcomponent/Thumbnail";
import {useEffect, useState} from "react";
import axios from "axios";
import {InView, useInView} from "react-intersection-observer";
import ProjectSide from "./boardcomponent/ProjectSide";
import ChallengeListSidebar from "../../../leeComps/chanllengeList/ChallengeListSidebar";
import ListSidebar from "./boardcomponent/ListSidebar";


function ToyListBoard(props) {
    const [projectCode, setProjectCode] = useState([]); // 선택한 기술 스택을 담을 상태
    const [toyProjects, setToyProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // 태그 저장
    const [intag, setintag] = useState([])

    // 최신 순 클릭시
    const [latest, setLatest] = useState(true);

    // 좋아요 순 클릭시
    const [likeList, setLikeList] = useState(true);

    // 3칸씩 뿌려주기 위한 필드
    const thumbnailSize = 3;
    const [chunksThumbnail, setChunksThumbnail] = useState([]);

    // 무한스크롤 필드
    const {ref, inView, entry} = useInView({
        threshold: 0,
    })

    // ...toyProjects,
    const loadMoreItems = () => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/pi/toyProject/ToyListBoard?page=${page}`)
            .then(response => {
                setToyProjects((e) => [...response.data]);
                setIsLoading(false);
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => {
                console.log('전송실패' + error);
                setIsLoading(true);
            });
    };

    const tagSearchChange = () => {

    }

    // 검색 axios
    const handleTagSelections = (tag) => {
        console.log(tag + "아프다 ")
        setProjectCode(tag);
        axios.post(`http://localhost:8080/pi/toyProject/codeSearch?keyword=${tag}`)
            .then(response => {
                console.log('아프다')
                setProjectCode(response.data);

                setToyProjects(response.data)
            })
            .catch(error => {
                console.log('검색 실패: ' + error);
            });
    };


    useEffect(() => {
        loadMoreItems();
    }, []);


    // 아래 꺼랑  그밑에꺼랑 useEffect 랑 합쳐야 되나??

    // 이게 검색 결과르 불러 오는 useEffect
    // useEffect(() => {
    //     handleTagSelections(intag);
    // }, [intag]);

    // 기본 화면을 불러 오는거야
    useEffect(() => {
        const _chunksThumbnail = []
        for (let i = 0; i < toyProjects.length; i += thumbnailSize) {
            _chunksThumbnail.push(toyProjects.slice(i, i + thumbnailSize))
        }

        setChunksThumbnail(_chunksThumbnail)
    }, [toyProjects]);

    // useEffect(() => {
    //     handleTagSelections(intag);
    //
    //     const _chunksThumbnail = [];
    //     for (let i = 0; i < toyProjects.length; i += thumbnailSize) {
    //         _chunksThumbnail.push(toyProjects.slice(i, i + thumbnailSize));
    //     }
    //
    //     setChunksThumbnail(_chunksThumbnail);
    // }, [intag, toyProjects]);

    // 최신 순 클릭 시
    const LatestCheck = () => {
        setLatest(true);
        if (latest) {
            axios.post("http://localhost:8080/pi/toyProject/ReLatest")
                .then(response => {
                    // 진행중인 리스트만 가져오도록 필터링
                    setToyProjects(response.data.filter(item => item.projectFull !== "Y" && item.projectFinish !== "Y"));
                    setLatest(false);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLatest(false);
                });
        } else {
            axios.post("http://localhost:8080/pi/toyProject/Latest")
                .then(response => {
                    // 진행중인 리스트만 가져오도록 필터링
                    setToyProjects(response.data.filter(item => item.projectFull !== "Y" && item.projectFinish !== "Y"));
                    setLatest(true);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLatest(true);
                });
        }
    }

    // 찜많은 순 클릭시
    const likeListCheck = () => {
        setLikeList(true);
        if (likeList) {
            axios.post("http://localhost:8080/pi/toyProject/likeLatest")
                .then(response => {
                    setToyProjects(response.data);
                    setLikeList(false);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLikeList(false);
                });
        } else {
            axios.post("http://localhost:8080/pi/toyProject/likeMinLatest")
                .then(response => {
                    setToyProjects(response.data);
                    setLikeList(true);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLikeList(true);
                });
        }
    }

    return (
        <Container fluid>
            <Row className={"ms-5"}>
                <Col sm={6} className={"my-3 d-flex ps-5  justify-content-start"}>
                    <button className={"theme-btn"} onClick={LatestCheck}>
                        {latest ?
                            <span>최신 순<i className={"bi bi-caret-down-fill"}></i></span>
                            :
                            <span>최신 순<i className={"bi bi-caret-up-fill"}></i></span>
                        }
                    </button>
                    <button className={"theme-btn ms-3"} onClick={likeListCheck}>
                        {likeList ?
                            // 찜 많은순??
                            <span>좋아요 순<i className={"bi bi-caret-up-fill "}></i></span>
                            :
                            <span>좋아요 순<i className={"bi bi-caret-down-fill "}></i></span>
                        }
                    </button>
                </Col>
            </Row>

            <Row className={"d-flex justify-content-center"}>
                <Col sm={9} className={'me-4 ms-3'}>
                    <div>
                        {chunksThumbnail.map((toyProjects, index) => (
                            <Row
                                key={index}
                                className={"mb-3 d-flex"}>
                                {toyProjects.map((toyProject) => (
                                    <Col sm className={"b-inline"}>
                                        <Thumbnail toyProject={toyProject}/>
                                    </Col>
                                ))}
                            </Row>))}
                    </div>
                </Col>
                <Col sm={2} className={'px-0'}>
                    <aside className={"me-5"}>
                        {/*<ProjectSide/>*/}
                        <ListSidebar/>
                    </aside>
                </Col>

                <InView
                    as="div"
                    onChange={loadMoreItems}
                    threshold={0.1}
                    rootMargin="1px">
                    <div>
                        {isLoading ? <img src={"/images/loding.gif"}/> : null}
                    </div>
                </InView>
            </Row>
        </Container>
    );
}

export default ToyListBoard;