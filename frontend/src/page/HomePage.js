import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "~/redux/actions";

function HomePage() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productReducer.products);

    useEffect(() => {
        dispatch(fetchProduct.fetchProductRequest());
    }, [dispatch]);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {products.map((product) => (
                    <div key={product.slug} className="product">
                        <Link to={`/product/${product.slug}`}>
                            {" "}
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <div className="product-info">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>
                            <p>
                                <strong>${product.price}</strong>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
