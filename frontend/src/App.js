import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routesPath } from "./config/route";
import { cartState$ } from "./redux/selectors";
import { routes } from "./routes";

function App() {
    const { cartItems } = useSelector(cartState$);

    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Nav.Link as={Link} to={routesPath.home}>
                                <Navbar.Brand>amazona</Navbar.Brand>
                            </Nav.Link>
                            <Nav.Link as={Link} to={routesPath.cart}>
                                <Navbar.Brand>
                                    Cart
                                    <Badge pill bg="danger">
                                        {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}
                                    </Badge>
                                </Navbar.Brand>
                            </Nav.Link>
                        </Container>
                    </Navbar>
                </header>
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
        </BrowserRouter>
    );
}

export default App;
