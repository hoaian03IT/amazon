import { HomePage, ProductPage } from "~/page";
import { routesPath } from "~/config/route";
import { CartPage } from "~/page/CartPage";

export const routes = [
    { path: routesPath.home, component: HomePage },
    { path: routesPath.product, component: ProductPage },
    { path: routesPath.cart, component: CartPage },
];
