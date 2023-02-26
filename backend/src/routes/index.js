import productRoutes from "./product.js";
import seedRoutes from "./seed.js";
import userRoutes from "./user.js";

export default function route(app) {
    app.use("/api/products", productRoutes);
    app.use("/api/seed", seedRoutes);
    app.use("/api/users", userRoutes);
}
