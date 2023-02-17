import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <Link to="/">amazona</Link>
                </header>
                <main>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.component;
                            return <Route path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
