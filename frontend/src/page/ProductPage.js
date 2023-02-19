import { useEffect } from "react";
import { Col, Row, Image, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "~/components/Rating";
import { clearError, fetchInfoProduct } from "~/redux/actions";

function ProductPage() {
    const dispatch = useDispatch();

    const { loading, product, error } = useSelector((state) => state.productState);

    const params = useParams();
    const { slug } = params;

    useEffect(() => {
        dispatch(clearError());
        dispatch(fetchInfoProduct.fetchInfoProductRequest(slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);
    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <div>
            <Row>
                <Col md={6} className="text-center">
                    <Image loading="lazy" className="img-large" src={product?.image} alt={product?.slug} />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product?.name}</title>
                            </Helmet>
                            <h1>{product?.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product?.rating} numReviews={product?.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: <p>{product?.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${product?.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product?.countInStock > 0 ? (
                                                    <Badge bg="success">In stock</Badge>
                                                ) : (
                                                    <Badge bg="danger">Unavailable</Badge>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product?.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button>Add to cart</Button>
                                            </div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}

export default ProductPage;
