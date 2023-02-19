import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Nav.Link as={Link} to="/">
                                <Navbar.Brand>amazona</Navbar.Brand>
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
                <footer>
                    <div className="text-center">All right reserved</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
