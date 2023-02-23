import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchInfoProductByIdAPI } from "~/app/api";
import { MessageBox } from "~/components/MessageBox";
import { routesPath } from "~/config/route";
import { addProductToCard, removeProductCart } from "~/redux/actions/cartActions";
import { cartState$ } from "~/redux/selectors";

export const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector(cartState$);

    const handleUpdateCart = async (item, quantity) => {
        const { data } = await fetchInfoProductByIdAPI(item._id);

        if (data.countInStock < quantity) {
            window.alert("Sorry. Product is out of stock");
            return;
        }

        dispatch(addProductToCard({ ...item, quantity }));
    };

    const handleRemoveCart = (item) => {
        dispatch(removeProductCart(item));
    };

    const handleProceedToCheckout = () => {
        navigate("/signin?/redirect=/shipping");
    };

    return (
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1>Shopping cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to={routesPath.home}>Go shopping.</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => {
                                return (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={5}>
                                                <Image fluid rounded thumbnail src={item.image} alt={item.slug} />
                                                &ensp;
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button
                                                    variant="light"
                                                    disabled={item.quantity === 1}
                                                    onClick={() => handleUpdateCart(item, item.quantity - 1)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                &ensp;{item.quantity}&ensp;
                                                <Button
                                                    variant="light"
                                                    disabled={item.quantity === item.countInStock}
                                                    onClick={() => handleUpdateCart(item, item.quantity + 1)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </Col>
                                            <Col md={2}>{item.price * item.quantity} $</Col>
                                            <Col md={2}>
                                                <Button variant="light" onClick={() => handleRemoveCart(item)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal: {cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)} $
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        {cartItems.length === 0 ? (
                                            <Button variant="light" size="lg">
                                                Proceed to Checkout
                                            </Button>
                                        ) : (
                                            <Button variant="primary" size="lg" onClick={handleProceedToCheckout}>
                                                Proceed to Checkout
                                            </Button>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
