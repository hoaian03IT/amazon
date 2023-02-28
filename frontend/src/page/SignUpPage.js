import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { userState$ } from "~/redux/selectors";
import { convertToBase64 } from "~/utils/convertToBase64";
import { signUp } from "~/redux/actions";
import { toast } from "react-toastify";

export const SignUpPage = () => {
    const { error, userInfo, loading } = useSelector(userState$);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [baseAvatar, setBaseAvatar] = useState("");
    const [preventRedirect, setPreventRedirect] = useState(true); // prevent the first time re-render because error have not updated yet (redux)

    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password not match");
        } else {
            dispatch(
                signUp.signUpRequest({
                    avatar: baseAvatar,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    const handleUploadImage = async (e) => {
        const file = e.target?.files[0];
        setAvatar(e.target.value);
        if (file) {
            if (file.size > 200000) {
                setAvatar("");
                toast.error("Image is large. Upload small another!");
            } else {
                const base64 = await convertToBase64(file);
                setBaseAvatar(base64);
            }
        }
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
                <title>Sign Up</title>
            </Helmet>
            <Container className="small-container">
                <h1>Sign Up</h1>
                <Form className="mt-3" onSubmit={handleSubmitForm}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
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
                    <Form.Group controlId="confirm-password">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            value={avatar}
                            onChange={handleUploadImage}
                            required
                        />
                    </Form.Group>
                    <div className="mt-3">
                        <Button type="submit" variant="primary">
                            {loading && <Spinner animation="border" variant="light" size="sm" />}&nbsp;Sign Up
                        </Button>
                    </div>
                    <div className="mt-3">
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
                    </div>
                </Form>
            </Container>
        </div>
    );
};
