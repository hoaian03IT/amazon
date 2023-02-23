import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import { Rating } from "./Rating";
import { Context } from "./ContextProvider";

export const Product = ({ product }) => {
    const { handleAddProductToCart } = useContext(Context);

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
                {product.countInStock === 0 ? (
                    <Button variant="light" disabled>
                        Out of Stock
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => handleAddProductToCart(product)}>
                        Add to cart
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};
