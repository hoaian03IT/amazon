import { Alert } from "react-bootstrap";

export const MessageBox = ({ children, variant, show = true }) => (
    <Alert show={show} className="text-center" variant={variant || "info"}>
        {children}
    </Alert>
);
