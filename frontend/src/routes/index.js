import { HomePage, ProductPage } from "~/page";
import { routesPath } from "~/config/route";
import { CartPage } from "~/page/CartPage";
import { SignInPage } from "~/page/SignInPage";
import { ShippingAddressPage } from "~/page/ShippingAddressPage";
import { SignUpPage } from "~/page/SignUpPage";
import { PaymentMethodPage } from "~/page/PaymentMethodPage";
import { OrderPlacePage } from "~/page/OrderPlacePage";
import { OrderDetailPage } from "~/page/OrderDetailPage";
import { OrderHistory } from "~/page/OrderHistory";
import { UserProfile } from "~/page/UserProfile";
import { SearchPage } from "~/page/SearchPage";

export const routes = [
    { path: routesPath.home, component: HomePage },
    { path: routesPath.product, component: ProductPage },
    { path: routesPath.cart, component: CartPage },
    { path: routesPath.signUp, component: SignUpPage },
    { path: routesPath.signIn, component: SignInPage },
    { path: routesPath.shippingAddress, component: ShippingAddressPage },
    { path: routesPath.paymentMethod, component: PaymentMethodPage },
    { path: routesPath.orderPlace, component: OrderPlacePage },
    { path: routesPath.orderDetail, component: OrderDetailPage },
    { path: routesPath.orderHistory, component: OrderHistory },
    { path: routesPath.profile, component: UserProfile },
    { path: routesPath.search, component: SearchPage },
];
