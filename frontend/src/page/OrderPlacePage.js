import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckoutSteps } from "~/components/CheckoutSteps";
import { routesPath } from "~/config/route";
import { cartState$, userState$ } from "~/redux/selectors";

export const OrderPlacePage = () => {
    const navigate = useNavigate();

    const { shippingAddress, paymentMethod, cartItems } = useSelector(cartState$);
    const { userInfo } = useSelector(userState$);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0));
    const shippingPrice = cartItems.length < 10 ? round2(0) : round2(10);
    const taxPrice = round2(0.15 * itemsPrice);
    const totalPrice = taxPrice + shippingPrice + itemsPrice;

    const handlePlaceOrder = () => {};

    useEffect(() => {
        if (!userInfo) {
            navigate(routesPath.signIn);
            toast.warn("You need to sign-in");
        } else if (cartItems.length === 0) {
            navigate(routesPath.cart);
            toast.warn("Your cart is empty");
        } else if (!shippingAddress) {
            navigate(routesPath.shippingAddress);
            toast.warn("You need to fill shipping address");
        }
    }, [cartItems.length, navigate, paymentMethod, shippingAddress, userInfo]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Helmet>
                <title>Order Place</title>
            </Helmet>
            <h1>Order Place</h1>
            <Row className="mt-3">
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Header>
                            <h3>Shipping</h3>
                        </Card.Header>
                        <Card.Body className="mt-3">
                            <Card.Text>
                                <strong>Name: </strong>
                                {userInfo?.name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Address: </strong>
                                {shippingAddress?.address}, {shippingAddress?.city}, {shippingAddress?.country}
                            </Card.Text>
                            <Card.Link as={Link} to={`${routesPath.shippingAddress}?redirect=${routesPath.orderPlace}`}>
                                Edit
                            </Card.Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Header>
                            <h3>Payment</h3>
                        </Card.Header>
                        <Card.Body className="mt-3">
                            <Card.Text>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </Card.Text>
                            <Card.Link as={Link} to={`${routesPath.paymentMethod}?redirect=${routesPath.orderPlace}`}>
                                Edit
                            </Card.Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Header>
                            <h3>Items</h3>
                        </Card.Header>
                        <Card.Body className="mt-3">
                            <ListGroup className="list-group-scroll-small mb-3">
                                {cartItems.map((item) => (
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
                            <Card.Link as={Link} to={routesPath.cart}>
                                Edit
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <h3>Order Summary</h3>
                        </Card.Header>
                        <Card.Body className="ps-4 pe-4">
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Items: </Col>
                                        <Col md={6}>${itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Shipping: </Col>
                                        <Col md={6}>${shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Tax: </Col>
                                        <Col md={6}>${taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>
                                        <Row>
                                            <Col md={6}>Order Total: </Col>
                                            <Col md={6}>${totalPrice.toFixed(2)}</Col>
                                        </Row>
                                    </strong>
                                </ListGroup.Item>
                                <div className="d-grid mt-3">
                                    <Button
                                        variant="primary"
                                        onClick={handlePlaceOrder}
                                        disabled={cartItems.length === 0}>
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
