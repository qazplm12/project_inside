import {Button,  Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";
import {useEffect, useState} from "react";
import axios from "axios";
import TypeSearchProject from "./TypeSearchProject";
import {InView, useInView} from "react-intersection-observer";


function ToyListBoard(props) {
    const [projectCode, setProjectCode] = useState([]); // 선택한 기술 스택을 담을 상태
    const [toyProjects, setToyProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // 최신 순 클릭시
    const [latest, setLatest] = useState(true);

    // 좋아요 순 클릭시
    const [likeList, setLikeList] = useState(true);

    // 3칸씩 뿌려주기 위한 필드
    const thumbnailSize = 3;
    const [chunksThumbnail, setChunksThumbnail] = useState([]);

    // 무한스크롤 필드
        const { ref, inView, entry} = useInView({
            threshold : 0,
        })


    // ...toyProjects,
    const loadMoreItems = () => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/pi/toyProject/ToyListBoard?page=${page}`)
            .then(response => {
                setToyProjects((e) => [ ...response.data]);
                setIsLoading(false);
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => {
                console.log('전송실패' + error);
                setIsLoading(true);
            });
    };

        const tagSearchChange = () =>{

    }

    // 검색 axios
        const handleTagSelections = (tag) => {
            console.log(tag+ "아프다 ")
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

    // useEffect(() => {
    //     handleTagSelections(tag);
    // }, []);

    useEffect(() => {
        loadMoreItems();
    }, []);

    useEffect(() => {
        const _chunksThumbnail = []
        for (let i = 0; i < toyProjects.length; i += thumbnailSize) {
            _chunksThumbnail.push(toyProjects.slice(i, i+thumbnailSize))
        }

        setChunksThumbnail(_chunksThumbnail)
    }, [toyProjects]);

    // 최신 순 클릭 시
    const LatestCheck = () => {
        setLatest(true);
        if (latest) {
            axios.post("http://localhost:8080/pi/toyProject/ReLatest")
                .then(response => {
                    setToyProjects(response.data);
                    setLatest(false);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLatest(false);
                });
        } else {
            axios.post("http://localhost:8080/pi/toyProject/Latest")
                .then(response => {
                    setToyProjects(response.data);
                    setLatest(true);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLatest(true);
                });
        }
    }

    // 찜많은 순 클릭시
    const likeListCheck = () =>{
        setLikeList(true);
        if (likeList) {
            axios.post("http://localhost:8080/pi/toyProject/ReLatest")
                .then(response => {
                    setToyProjects(response.data);
                    setLikeList(false);
                })
                .catch(error => {
                    console.log('최신화 실패');
                    setLikeList(false);
                });
        } else {
            axios.post("http://localhost:8080/pi/toyProject/Latest")
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
        <Container>
            <Row>
                <Col sm={6} className={"my-3  justify-content-start"}>
                    <Button className={"theme-outline-btn"} onClick={LatestCheck}>
                        {latest ?
                                <span >최신 순<i className={"bi bi-caret-down-fill"}></i></span>
                            :
                                <span >최신 순<i className={"bi bi-caret-up-fill"}></i></span>
                        }
                    </Button>
                    <Button className={"theme-btn ms-3"} onClick={likeListCheck}>
                        {likeList ?
                            // 찜 많은순??
                            <span>좋아요 순<i className={"bi bi-caret-up-fill "}></i></span>
                        :
                            <span>좋아요 순<i className={"bi bi-caret-down-fill "}></i></span>
                        }
                    </Button>
                </Col>
                {/* 검색 실행후 바로 검색 되게 만드는 부분 */}
                <Col sm={6} className="">
                    <div className={""}>
                        <TypeSearchProject handleTagChange={handleTagSelections}/>
                    </div>
                </Col>
            </Row>

            <div>
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
                {/*<InView*/}
                {/*    as="div"*/}
                {/*    onChange={loadMoreItems}*/}
                {/*    threshold={0.1}*/}
                {/*    rootMargin="1px">*/}
                {/*    <div>*/}
                {/*        {isLoading ? <img src={"/images/loding.gif"}/> : null}*/}
                {/*    </div>*/}
                {/*</InView>*/}
            </div>
        </Container>
    );
}

export default ToyListBoard;