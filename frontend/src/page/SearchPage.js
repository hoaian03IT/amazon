import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingBox } from "~/components/LoadingBox";
import { MessageBox } from "~/components/MessageBox";
import { Product } from "~/components/Product";
import { Rating } from "~/components/Rating";
import { routesPath } from "~/config/route";
import { fetchFilteredProduct } from "~/redux/actions";
import { productState$ } from "~/redux/selectors";

const prices = [
    {
        name: "$1 to $50",
        value: "1-50",
    },
    {
        name: "$51 to $200",
        value: "51-200",
    },
    {
        name: "$201 to $1000",
        value: "201-1000",
    },
];

export const ratings = [
    {
        name: "4stars & up",
        rating: 4,
    },

    {
        name: "3stars & up",
        rating: 3,
    },

    {
        name: "2stars & up",
        rating: 2,
    },

    {
        name: "1stars & up",
        rating: 1,
    },
];

export const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products, loading, pages, categories: categoriesProduct, quantityProducts } = useSelector(productState$);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    const category = sp.get("category") || "all";
    const query = sp.get("query") || "all";
    const price = sp.get("price") || "all";
    const rating = sp.get("rating") || "all";
    const page = sp.get("page") || "all";
    const order = sp.get("order") || "all";

    const [categories] = useState(categoriesProduct);

    useEffect(() => {
        dispatch(
            fetchFilteredProduct.fetchFilteredProductRequest({
                category,
                query,
                price,
                rating,
                page,
                order,
            })
        );
    }, [category, dispatch, order, page, price, query, rating]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;

        return `${routesPath.search}?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
    };

    return (
        <div>
            <Helmet>
                <title>Search</title>
            </Helmet>
            <Row>
                <Col md={3}>
                    <h3>Department</h3>
                    <div>
                        <ul>
                            <li>
                                <Link className={"all" === category ? "text-bold" : ""} to={getFilterUrl({ category: "all" })}>
                                    Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link className={c === category ? "text-bold" : ""} to={getFilterUrl({ category: c })}>
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link className={"all" === price ? "text-bold" : ""} to={getFilterUrl({ price: "all" })}>
                                    Any
                                </Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link className={p.value === price ? "text-bold" : ""} to={getFilterUrl({ price: p.value })}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        className={`${r.rating}` === `${rating}` ? "text-bold" : ""}
                                        to={getFilterUrl({ rating: r.rating })}>
                                        <Rating caption=" & up" rating={r.rating} />
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link className={"all" === rating ? "text-bold" : ""} to={getFilterUrl({ rating: "all" })}>
                                    <Rating caption=" & up" rating={0} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    <>
                        <Row className="justify-content-between mb-3">
                            <Col md={6}>
                                <div>
                                    {quantityProducts > 0 ? quantityProducts : "No"} Results
                                    {query !== "all" ? " : " + query : ""}
                                    {category !== "all" ? " : " + category : ""}
                                    {price !== "all" ? " : Price " + price : ""}
                                    {rating !== "all" ? " : Rating " + rating + "& up" : ""}
                                    {query !== "all" || category !== "all" || price !== "all" || rating !== "all" ? (
                                        <Button variant="light" onClick={() => navigate(routesPath.search)}>
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        </Button>
                                    ) : null}
                                </div>
                            </Col>
                            <Col className="text-end">
                                Sort by{" "}
                                <select
                                    value={order}
                                    onChange={(e) => {
                                        const url = getFilterUrl({ order: e.target.value });
                                        navigate(url);
                                    }}>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price: Low to High</option>
                                    <option value="highest">Price: High to Low</option>
                                    <option value="toprated">Avg. Customer Reviews</option>
                                </select>
                            </Col>
                        </Row>
                        {loading ? (
                            <LoadingBox />
                        ) : products.length === 0 ? (
                            <MessageBox variant="danger">Product not found</MessageBox>
                        ) : (
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={6} lg={4} className="mb-3">
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        <div className="text-center">
                            {[...Array(pages).keys()].map((x) => (
                                <Link key={x + 1} className="mx-1" to={getFilterUrl({ page: x + 1 })}>
                                    <Button variant={`${x + 1 === Number(page) ? "primary" : "light"}`}>{x + 1}</Button>
                                </Link>
                            ))}
                        </div>
                    </>
                </Col>
            </Row>
        </div>
    );
};
