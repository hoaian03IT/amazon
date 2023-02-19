import productRoutes from "./product.js";

export default function route(app) {
    app.use("/api/products", productRoutes);
}
