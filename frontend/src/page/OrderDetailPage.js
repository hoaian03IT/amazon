import { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ListItems } from "~/components/ListItems";
import { LoadingBox } from "~/components/LoadingBox";
import { MessageBox } from "~/components/MessageBox";
import { routesPath } from "~/config/route";
import { fetchOrder } from "~/redux/actions";
import { orderState$, userState$ } from "~/redux/selectors";

export const OrderDetailPage = () => {
    const { orderInfo, loading, error } = useSelector(orderState$);
    const { userInfo } = useSelector(userState$);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        if (!userInfo) {
            toast.error("You need to sign-in!");
            navigate(routesPath.signIn + `?redirect=${routesPath.orderDetail.slice(0, 12)}/${id}`);
        }
        dispatch(fetchOrder.fetchOrderRequest({ id, token: userInfo?.token }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>Order Details</title>
            </Helmet>
            <h1>Order {id}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Header>Shipping</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Name: </strong>
                                {orderInfo?.shippingAddress.fullName}
                                <br />
                                <strong>Address: </strong>
                                {orderInfo?.shippingAddress.address},{orderInfo?.shippingAddress.city},
                                {orderInfo?.shippingAddress.country}
                            </Card.Text>
                            {orderInfo?.isDelivered ? (
                                <MessageBox variant="success">Delivered at {orderInfo.deliveredAt}</MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Header>Payment</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Method: </strong>
                                {orderInfo?.paymentMethod}
                            </Card.Text>
                            {orderInfo?.isPaid ? (
                                <MessageBox variant="success">Paid at {orderInfo.paidAt}</MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Header>Items</Card.Header>
                        <Card.Body>
                            <ListItems list={orderInfo?.orderItems} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Header>Order Summary</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={4}>Items:</Col>
                                        <Col>${orderInfo?.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={4}>Shipping:</Col>
                                        <Col>${orderInfo?.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={4}>Tax:</Col>
                                        <Col>${orderInfo?.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={4}>
                                            <strong>Order total:</strong>
                                        </Col>
                                        <Col>
                                            <strong>${orderInfo?.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
