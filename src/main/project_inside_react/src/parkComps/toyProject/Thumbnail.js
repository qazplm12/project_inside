import {Button, Card, Col, Row} from "react-bootstrap";

function Thumbnail(props) {
    const { projectTitle,projectThumbnail, projectIdx } = props.toyProject;

    // 3줄씩 만들기 위한 함수
    const thumbnailCard = (e) => (
        <Card style={{ width: '18rem' }} className={"ms-3"} key={projectIdx}>
            <Card.Header>
                <Card.Img variant="top" src={"/images/thumbnail/"+projectThumbnail} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{projectTitle}</Card.Title>
            </Card.Body>
        </Card>
    )

    const thumbnailSize = 3;
    const chunksThumbnail = [];

    for (let i = 0; i < ; i += thumbnailSize) {
        chunksThumbnail.push(props.toyProject.slice(i, i + thumbnailSize));
    }

    return (
        <div>
            {chunksThumbnail.map((chunk, index) => (
                <Row key={index} className="mb-3">
                    {chunk.map((project, projectIndex) => (
                        <Col key={projectIndex} className="d-flex justify-content-center">
                            {thumbnailCard(project)}
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
}

export default Thumbnail;