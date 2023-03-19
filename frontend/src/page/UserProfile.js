import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Image } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox } from "~/components/LoadingBox";
import { routesPath } from "~/config/route";
import { updateUserInfo } from "~/redux/actions";
import { userState$ } from "~/redux/selectors";
import { convertTextToPassword } from "~/utils/convertTextToPassword";
import { convertToBase64 } from "~/utils/convertToBase64";

export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, userInfo } = useSelector(userState$);

    const [name, setName] = useState(userInfo?.name);
    const [avatar, setAvatar] = useState(userInfo?.avatar);
    const [password, setPassword] = useState({ currentPassword: userInfo?.password, confirmPassword: "", newPassword: "" });
    const [disablePassword, setDisablePassword] = useState(true);
    const [disableFullName, setDisableFullName] = useState(true);
    const [hidePassword, setHidePassword] = useState({ confirmPassword: true, newPassword: true });
    const [editable, setEditable] = useState(false);

    const confirmPasswordRef = useRef();
    const newPasswordRef = useRef();
    const fileDialogRef = useRef();

    const handleCancelEdit = () => {
        setEditable(false);
        setDisableFullName(true);
        setDisablePassword(true);
        setName(userInfo?.name);
        setPassword({ currentPassword: userInfo?.password, confirmPassword: "", newPassword: "" });
        setAvatar(userInfo?.avatar);
        setHidePassword({ confirmPassword: true, newPassword: true });
    };

    const handleUploadImage = async (e) => {
        setEditable(true);
        const file = await convertToBase64(e.target.files[0]);
        console.log(file);
        setAvatar(file);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (password.confirmPassword && password.currentPassword !== password.confirmPassword) {
            toast.error("Password is incorrect");
        } else {
            dispatch(
                updateUserInfo.updateUserInfoRequest({
                    name: name || userInfo?.name,
                    avatar: avatar || userInfo?.avatar,
                    password: password.newPassword || password.currentPassword,
                    token: userInfo?.token,
                })
            );
            setEditable(false);
            setDisableFullName(true);
            setDisablePassword(true);
        }
    };

    useEffect(() => {
        if (!userInfo) {
            toast.warn("You need to sign-in");
            navigate(routesPath.signIn + "?redirect=" + routesPath.profile);
        }
    }, [navigate, userInfo]);

    return loading ? (
        <LoadingBox />
    ) : (
        <div>
            <Helmet>
                <title>Your Profile</title>
            </Helmet>
            <h1>Your Profile</h1>
            <Container className="small-container profile">
                <Form onSubmit={handleUpdateProfile}>
                    {/* Image */}
                    <div className="text-center">
                        <Image className="image-avatar-profile" thumbnail src={avatar} alt={userInfo?.fullName} />
                        <FormControl ref={fileDialogRef} accept="image/*" type="file" style={{ display: "none" }} onChange={handleUploadImage} />
                        <br />
                        <Button className="text-light" variant="info mt-5" onClick={() => fileDialogRef.current.click()}>
                            Upload Image
                        </Button>
                    </div>
                    {/* Form input */}
                    <FormGroup className="mt-5">
                        {/* Name */}
                        <FormLabel className="me-3">
                            <strong>Full name:</strong>
                        </FormLabel>
                        {disableFullName ? (
                            <>
                                <span>{name}</span>
                                <span
                                    className="float-end text-href"
                                    onClick={() => {
                                        setDisableFullName(false);
                                        setEditable(true);
                                    }}>
                                    Edit
                                </span>
                            </>
                        ) : (
                            <FormControl required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Input name" />
                        )}
                    </FormGroup>
                    {/* Password */}
                    <FormGroup className="mt-3">
                        <FormLabel className="me-3">
                            <strong>Password:</strong>
                        </FormLabel>
                        {disablePassword ? (
                            <>
                                <span>{convertTextToPassword(password.currentPassword)}</span>
                                <span
                                    className="float-end text-href"
                                    onClick={() => {
                                        setDisablePassword(false);
                                        setEditable(true);
                                    }}>
                                    Edit
                                </span>
                            </>
                        ) : (
                            <div>
                                {/* Confirm Password */}
                                <div className="position-relative">
                                    <FormControl
                                        ref={confirmPasswordRef}
                                        required
                                        type="password"
                                        value={password.confirmPassword}
                                        onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                                        placeholder="Input current password"
                                    />
                                    {hidePassword.confirmPassword ? (
                                        <FontAwesomeIcon
                                            className="position-absolute icon-eyes-button"
                                            icon={faEyeSlash}
                                            onClick={() => {
                                                confirmPasswordRef.current.type = "text";
                                                setHidePassword({ ...hidePassword, confirmPassword: false });
                                            }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="position-absolute icon-eyes-button"
                                            icon={faEye}
                                            onClick={() => {
                                                confirmPasswordRef.current.type = "password";
                                                setHidePassword({ ...hidePassword, confirmPassword: true });
                                            }}
                                        />
                                    )}
                                </div>
                                {/* New password */}
                                <div className="position-relative mt-2">
                                    <FormControl
                                        ref={newPasswordRef}
                                        required
                                        type="password"
                                        value={password.newPassword}
                                        onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                        placeholder="Input new password"
                                    />
                                    {hidePassword.newPassword ? (
                                        <FontAwesomeIcon
                                            className="position-absolute icon-eyes-button"
                                            icon={faEyeSlash}
                                            onClick={() => {
                                                newPasswordRef.current.type = "text";
                                                setHidePassword({ ...hidePassword, newPassword: false });
                                            }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="position-absolute icon-eyes-button"
                                            icon={faEye}
                                            onClick={() => {
                                                newPasswordRef.current.type = "password";
                                                setHidePassword({ ...hidePassword, newPassword: true });
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </FormGroup>
                    {/* Save-cancel button */}
                    {editable && (
                        <div className="mt-3 text-end">
                            <Button type="submit" className="me-2" variant="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelEdit} variant="light">
                                Cancel
                            </Button>
                        </div>
                    )}
                </Form>
            </Container>
        </div>
    );
};
