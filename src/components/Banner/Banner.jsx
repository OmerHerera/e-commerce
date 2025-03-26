import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../Images/table.jpg";
import dyBanner from "../../Images/dy-banner.jpg";

import "./banner.css";
function srcImg(title) {
    return title === 'dy' ? dyBanner: productBg;
}
const Banner = ({title}) => {
    return ( 
        <div className="image-container">
            <img src={srcImg(title)} alt="Product-bg" />
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <h2>{title !== 'dy'? title: '' }</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;