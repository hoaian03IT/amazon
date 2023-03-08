import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routesPath } from "~/config/route";

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Row className="checkout-steps mb-5">
            <Col className={step1 ? "active" : ""}>
                <Link className="link-grey disable" to={routesPath.signIn}>
                    Sign-in
                </Link>
            </Col>
            <Col className={step2 ? "active" : ""}>
                <Link className="link-grey" to={routesPath.shippingAddress}>
                    Shipping
                </Link>
            </Col>
            <Col className={step3 ? "active" : ""}>
                <Link className="link-grey" to={routesPath.paymentMethod}>
                    Payment
                </Link>
            </Col>
            <Col className={step4 ? "active" : ""}>
                <Link className="link-grey" to={routesPath.orderPlace}>
                    Place Order
                </Link>
            </Col>
        </Row>
    );
};
