import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routesPath } from "~/config/route";

export const SearchBox = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(query ? `${routesPath.search}?query=${query}` : `${routesPath.search}`);
    };

    return (
        <Form className="d-flex me-auto" onSubmit={handleSubmit}>
            <InputGroup>
                <FormControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search product..."
                    aria-label="Search product"
                    aria-describedby="button-search"
                />
                <Button id="button-search" variant="outline-primary" type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </InputGroup>
        </Form>
    );
};
