import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartState$, userState$ } from "~/redux/selectors";
import { fetchInfoProductByIdAPI } from "~/app/api";
import { addProductToCard } from "~/redux/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routesPath } from "~/config/route";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const { cartItems } = useSelector(cartState$);
    const { userInfo } = useSelector(userState$);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddProductToCart = async (product) => {
        if (userInfo) {
            const existItem = cartItems.find((x) => x._id === product._id);
            const quantity = existItem ? existItem.quantity + 1 : 1;

            const { data } = await fetchInfoProductByIdAPI(product._id);

            if (data.countInStock < quantity) {
                toast.error("Sorry. Product is out of stock");
                return;
            }

            dispatch(addProductToCard({ ...product, quantity }));
        } else {
            toast.warn("Please sign in before buying");
            navigate(routesPath.signIn);
        }
    };

    return <Context.Provider value={{ handleAddProductToCart }}>{children}</Context.Provider>;
};
