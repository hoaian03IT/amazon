import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Rating } from "./Rating";

export const Product = ({ product }) => {
    return (
        <Card className="product">
            <Card.Link as={Link} to={`/product/${product.slug}`}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
            </Card.Link>
            <Card.Body className="product-info">
                <Card.Link as={Link} to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Card.Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>
                    <strong>${product.price}</strong>
                </Card.Text>
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    );
};
