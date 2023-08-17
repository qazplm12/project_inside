import {Button,  Col, Container, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";
import {useEffect, useState} from "react";
import axios from "axios";
import TypeSearchProject from "./TypeSearchProject";
import {InView, useInView} from "react-intersection-observer";


function ToyListBoard(props) {

    const [toyProjects, setToyProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // 3칸씩 뿌려주기 위한 필드
    const thumbnailSize = 3;
    const chunksThumbnail = [];

    // 무한스크롤 필드
        const { ref, inView, entry} = useInView({
            threshold : 0,
        })

    const loadMoreItems = () => {
        setIsLoading(true);
        axios
            .get(`http://localhost:8080/pi/toyProject/ToyListBoard?page=${page}`)
            .then(response => {
                // setToyProjects(prevProjects => [...prevProjects, ...response.data]);
                setToyProjects((e) => [...response.data]);
                setIsLoading(true);
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => {
                console.log('전송실패' + error);
                setIsLoading(true);
            });
    };

    useEffect(() => {
        loadMoreItems();
    }, []); // 초기 로딩 시에만 실행

    // useEffect(() => {
    //     axios.get("http://localhost:8080/pi/toyProject/ToyListBoard")
    //         .then(response => {
    //             setToyProjects(response.data);
    //         })
    //         .catch(error => {
    //             console.log('전송실패'+error);
    //         });
    // }, [inView]);

    for (let i = 0; i < toyProjects.length; i += thumbnailSize) {
        chunksThumbnail.push(toyProjects.slice(i, i+thumbnailSize))
    }

    return (
        <Container>
            <Row >
                <Col className={"mt-3 d-inline d-flex justify-content-end"}></Col>
                <Col className={"mt-3 mb-3 d-inline  d-flex justify-content-end"}>
                    <Button className={"theme-outline-btn"}>최신 순</Button>
                    <Button className={"theme-btn ms-3"}>좋아요 순</Button>
                </Col>
                <Col sm className=" pb-3"><TypeSearchProject /></Col>
            </Row>
            {/*{toyProjects.map(toyProject => (*/}
            {/*    <Thumbnail toyProject={toyProject} />*/}
            {/*))}*/}
            <div>
                <div>
                    {chunksThumbnail.map((toyProjects) => (
                        <Row className={"mb-3 d-flex"}>
                            {toyProjects.map((toyProject) => (
                                <Col sm className={"b-inline"}>
                                    <Thumbnail toyProject={toyProject}/>
                                </Col>
                            ))}
                        </Row>))}
                </div>
                <InView
                    as="div"
                    onChange={loadMoreItems}
                    threshold={0}
                    rootMargin="1px">
                    <div>
                        {isLoading ? <img src={"/images/loding.gif"}/> : <p>더 많은 프로젝트 로드</p>}
                    </div>
                </InView>
            </div>
        </Container>
    );
}

export default ToyListBoard;