import { faBars, faCartShopping, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Badge, Button, Container, Dropdown, Image, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SearchBox } from "./components/SearchBox";

import { routesPath } from "./config/route";
import { fetchCategories, signOut } from "./redux/actions";
import { cartState$, productState$, userState$ } from "./redux/selectors";
import { routes } from "./routes";

function App() {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const { categories } = useSelector(productState$);

    const { cartItems } = useSelector(cartState$);
    const { userInfo } = useSelector(userState$);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        setTimeout(() => {
            dispatch(signOut());
            window.location.href = routesPath.home;
        }, 500);
    };

    useEffect(() => {
        dispatch(fetchCategories.fetchCategoriesRequest());
    }, [dispatch]);

    return (
        <div className={sideBarIsOpen ? "d-flex flex-column site-container active-cont" : "d-flex flex-column site-container "}>
            <ToastContainer position="bottom-center" limit={1} newestOnTop={true} autoClose={2000} />
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Button variant="dark" onClick={() => setSideBarIsOpen(!sideBarIsOpen)}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                        <Nav.Item>
                            <Nav.Link as={Link} to={routesPath.home}>
                                <Navbar.Brand>amazona</Navbar.Brand>
                            </Nav.Link>
                        </Nav.Item>
                        {/* search */}
                        <SearchBox />

                        <Nav.Item className="d-flex">
                            <Nav.Link as={Link} to={routesPath.cart}>
                                <Navbar.Brand className="position-relative">
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Your Cart</Tooltip>}>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </OverlayTrigger>

                                    <Badge pill bg="danger" className="badge-cart">
                                        {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}
                                    </Badge>
                                </Navbar.Brand>
                            </Nav.Link>
                            {userInfo ? (
                                <Dropdown className="ms-3">
                                    <Dropdown.Toggle as={Image} className="img-avatar" src={userInfo.avatar} alt={userInfo.name} />
                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item as={Link} to={routesPath.profile}>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to={routesPath.orderHistory}>
                                            Order history
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to={routesPath.home} onClick={handleSignOut}>
                                            Sign out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Link as={Link} to={routesPath.signIn} className="ms-3">
                                    <Navbar.Brand className="m-0">
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Sign In</Tooltip>}>
                                            <FontAwesomeIcon icon={faCircleUser} className="icon-user" />
                                        </OverlayTrigger>
                                    </Navbar.Brand>
                                </Nav.Link>
                            )}
                        </Nav.Item>
                    </Container>
                </Navbar>
            </header>
            <div
                className={
                    sideBarIsOpen
                        ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                        : "side-navbar d-flex justify-content-between flex-wrap flex-column"
                }>
                <Nav className="flex-column text-white w-100 p-2">
                    <Nav.Item>
                        <strong>Categories</strong>
                    </Nav.Item>
                    {categories.map((category) => (
                        <Nav.Item key={category}>
                            <Nav.Link as={Link} to={`/search?category=${category}`} onClick={() => setSideBarIsOpen(false)}>
                                {category}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
            <main className="mt-3">
                <Container>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </Container>
            </main>
            <footer className="text-center mb-3">
                <div>All right reserved</div>
            </footer>
        </div>
    );
}

export default App;
