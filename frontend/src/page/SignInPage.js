import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

export const SignInPage = () => {
    const { search } = useLocation();

    const redirectInUrl = new URLSearchParams(search).get("redirect");

    const redirect = redirectInUrl ? redirectInUrl : "/";

    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1>Sign In</h1>
            <Form className="mt-3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className="mt-3">
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </div>
                <div className="mt-3">
                    New Customer <Link to={`/signin?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    );
};
