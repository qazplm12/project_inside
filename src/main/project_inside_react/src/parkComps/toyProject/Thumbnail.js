import {Button, Card} from "react-bootstrap";

function thumbnail(props){

    return(
        // 썸내일 이지미 및 관련 텍스트 3개씩 뿌려주는 컴포넌트
        <Card style={{ width: '18rem' }}>
            <Card.Header>
                <Card.Img variant="top" src="holder.js/100px180" />
            </Card.Header>
            <Card.Body>
                <Card.Title><p>프로젝트내용</p></Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default thumbnail;