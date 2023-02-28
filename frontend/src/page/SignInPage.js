import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { signIn } from "~/redux/actions";
import { userState$ } from "~/redux/selectors";

export const SignInPage = () => {
    const { error, userInfo, loading } = useSelector(userState$);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [preventRedirect, setPreventRedirect] = useState(true); // prevent the first time re-render because error have not updated yet (redux)

    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(signIn.signInRequest({ email, password }));
    };

    useEffect(() => {
        if (!error && !preventRedirect) {
            navigate(redirect);
        } else {
            setPreventRedirect(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, navigate, redirect]);

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [navigate, redirect, userInfo]);

    return (
        <div>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <Container className="small-container">
                <h1>Sign In</h1>
                <Form className="mt-3" onSubmit={handleSubmitForm}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="mt-3">
                        <Button type="submit" variant="primary">
                            {loading && <Spinner animation="border" variant="light" size="sm" />}
                            &nbsp;Sign In
                        </Button>
                    </div>
                    <div className="mt-3">
                        New Customer <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </Form>
            </Container>
        </div>
    );
};
