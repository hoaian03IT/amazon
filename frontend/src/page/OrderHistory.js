import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "~/components/LoadingBox";
import { MessageBox } from "~/components/MessageBox";
import { routesPath } from "~/config/route";
import { fetchOrdersHistory } from "~/redux/actions";
import { orderState$, userState$ } from "~/redux/selectors";

export const OrderHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, history } = useSelector(orderState$);
    const { userInfo } = useSelector(userState$);

    useEffect(() => {
        if (history.length === 0) dispatch(fetchOrdersHistory.fetchOrdersHistoryRequest({ token: userInfo.token }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo.token]);

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>

            <h1>Order History</h1>

            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => navigate(routesPath.orderDetail.slice(0, 13) + order._id)}>
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
