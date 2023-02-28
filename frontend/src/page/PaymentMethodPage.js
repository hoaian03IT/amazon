import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CheckoutSteps } from "~/components/CheckoutSteps";
import { routesPath } from "~/config/route";
import { addPaymentMethod } from "~/redux/actions";
import { cartState$ } from "~/redux/selectors";

export const PaymentMethodPage = () => {
    const { search } = useLocation();

    const redirectURL = new URLSearchParams(search).get("redirect");

    const redirect = redirectURL || routesPath.orderPlace;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress, paymentMethod: method } = useSelector(cartState$);

    const [paymentMethod, setPaymentMethod] = useState(method || "");

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            dispatch(addPaymentMethod(paymentMethod));
            navigate(redirect);
        } else {
            toast.error("You must select payment method before continuing");
        }
    };

    useEffect(() => {
        if (!shippingAddress) {
            navigate(routesPath.shippingAddress);
        }
    }, [navigate, shippingAddress]);

    return (
        <div>
            <Helmet>Payment Method</Helmet>
            <CheckoutSteps step1 step2 step3 />
            <Container className="small-container">
                <h1>Payment Method</h1>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group>
                        <div className="mb-3">
                            <Form.Check
                                type="radio"
                                id="Paypal"
                                name="payment-method"
                                label="Paypal"
                                value="Paypal"
                                checked={paymentMethod === "Paypal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Form.Check
                                type="radio"
                                id="Stripe"
                                name="payment-method"
                                label="Stripe"
                                value="Stripe"
                                checked={paymentMethod === "Stripe"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <div className="mt-3">
                        <Button type="submit" variant="primary">
                            {/* {loading && <Spinner animation="border" variant="light" size="sm" />} */}
                            {/* &ensp;  */}
                            Continue
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};
