import { HomePage, ProductPage } from "~/page";
import { routesPath } from "~/config/route";

export const routes = [
    { path: routesPath.home, component: HomePage },
    { path: routesPath.product, component: ProductPage },
];
