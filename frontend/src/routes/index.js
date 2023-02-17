import { HomePage, ProductPage } from "~/page";
import { routesPath } from "~/page/config/route";

export const routes = [
    { path: routesPath.home, component: HomePage },
    { path: routesPath.product, component: ProductPage },
];
