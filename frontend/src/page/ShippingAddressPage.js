import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { routesPath } from "~/config/route";
import { addShippingAddress } from "~/redux/actions";
import { cartState$, userState$ } from "~/redux/selectors";
import { data } from "~/data";
import { CheckoutSteps } from "~/components/CheckoutSteps";

export const ShippingAddressPage = () => {
    const { search } = useLocation();

    const redirectURL = new URLSearchParams(search).get("redirect");

    const redirect = redirectURL || routesPath.paymentMethod;

    const { shippingAddress } = useSelector(cartState$);

    const [fullName, setFullName] = useState(shippingAddress?.fullName || "");
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber || "");
    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [valueCountry, setValueCountry] = useState(
        data.countries.findIndex((country) => country.name === shippingAddress?.country) + "" || "-1"
    );
    const [valueCity, setValueCity] = useState(
        data.countries[Number(valueCountry)]?.cities.findIndex((city) => city.name === shippingAddress?.city) || "-1"
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(userState$);
    const { cartItems } = useSelector(cartState$);
    const { countries } = data;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const country = countries[valueCountry];

        dispatch(
            addShippingAddress({
                fullName,
                phoneNumber,
                country: country.name,
                city: country.cities[valueCity].name,
                address,
            })
        );
        navigate(redirect);
    };

    useEffect(() => {
        if (!userInfo) navigate(`${routesPath.signIn}?redirect=/shipping`);
        if (cartItems.length === 0) navigate(routesPath.cart);
    }, [userInfo, cartItems, navigate]);

    return (
        <div>
            <Helmet>Shipping Address</Helmet>
            <CheckoutSteps step1 step2 />
            <Container className="small-container">
                <h1>Shipping Address</h1>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Select value={valueCountry} onChange={(e) => setValueCountry(e.target.value)} required>
                            <option value={-1}>Select country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Select
                            value={valueCity}
                            onChange={(e) => setValueCity(e.target.value)}
                            // eslint-disable-next-line eqeqeq
                            disabled={valueCountry == -1}
                            required>
                            <option value={-1}>Select city</option>
                            {valueCountry >= 0 &&
                                countries[valueCountry].cities.map((cities) => (
                                    <option key={cities.id} value={cities.id}>
                                        {cities.name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // eslint-disable-next-line eqeqeq
                            disabled={valueCity == -1}
                            required
                        />
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
