import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCard } from "~/redux/actions/cartActions";
import { cartState$ } from "~/redux/selectors";
import { fetchInfoProductByIdAPI } from "~/app/api";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const { cartItems } = useSelector(cartState$);
    const dispatch = useDispatch();

    const handleAddProductToCart = async (product) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await fetchInfoProductByIdAPI(product._id);

        if (data.countInStock < quantity) {
            window.alert("Sorry. Product is out of stock");
            return;
        }

        dispatch(addProductToCard({ ...product, quantity }));
    };

    return <Context.Provider value={{ handleAddProductToCart }}>{children}</Context.Provider>;
};
