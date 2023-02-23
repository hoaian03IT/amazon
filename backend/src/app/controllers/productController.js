import data from "../../../data.js";

class ProductCtrl {
    getAllProducts(req, res) {
        res.send(data.products);
    }

    getInfoProduct(req, res) {
        const product = data.products.find((x) => x.slug === req.params.slug);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: "Product Not Found" });
        }
    }

    getStockProduct(req, res) {
        const product = data.products.find((x) => x._id === Number(req.params.id));
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: "Product Not Found" });
        }
    }
}

export const productControl = new ProductCtrl();
