import { Spinner } from "react-bootstrap";

export const LoadingBox = () => (
    <div className="text-center">
        <Spinner animation="border" role="status" className="spinner-loading">
            <span className="visually-hidden">Loading</span>
        </Spinner>
    </div>
);
