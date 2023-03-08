import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routesPath } from "~/config/route";

export const ListItems = ({ list, variant = "small" }) => {
    return (
        <ListGroup variant="flush" className={`list-group-scroll-${variant}`}>
            {list &&
                list.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <Image src={item.image} alt={item.slug} fluid thumbnail rounded />
                                <Link className="ms-3" to={routesPath.product.slice(0, 9) + item.slug}>
                                    {item.name}
                                </Link>
                            </Col>
                            <Col md={3}>Quantity: {item.quantity}</Col>
                            <Col md={3}>Price: ${item.quantity * item.price}</Col>
                        </Row>
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
};
