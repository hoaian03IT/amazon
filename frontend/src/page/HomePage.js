import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { clearError, fetchProducts } from "~/redux/actions";
import { Product } from "~/components/Product";
import { Helmet } from "react-helmet-async";
import { LoadingBox } from "~/components/LoadingBox";
import { MessageBox } from "~/components/MessageBox";
import { productState$ } from "~/redux/selectors";

function HomePage() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(productState$);

    useEffect(() => {
        dispatch(clearError());
        if (products.length === 0) dispatch(fetchProducts.fetchProductsRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1>Featured Products</h1>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Row>
                    <div className="products">
                        {products.map((product) => (
                            <Col key={product._id} sm={6} md={6} lg={3} className="mb-3">
                                <Product product={product} />
                            </Col>
                        ))}
                    </div>
                </Row>
            )}
        </div>
    );
}

export default HomePage;
