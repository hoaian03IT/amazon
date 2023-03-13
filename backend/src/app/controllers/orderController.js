import { orderModel } from "../models/orderModel.js";

class orderClass {
    async createOrder(req, res) {
        try {
            const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } =
                req.body;
            const newOrder = new orderModel({
                orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                user: req.user.id,
            });

            const order = await newOrder.save();
            res.status(201).send(order);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async getOrder(req, res) {
        try {
            const id = req.params.id;
            const order = await orderModel.findById(id);
            const author = order.user.toString();
            if (author !== req.user.id) res.status(400).send({ message: "You are not allowed to watch this order" });
            else res.status(200).send(order);
        } catch (error) {
            res.status(400).send({ message: "Order not found" });
        }
    }

    async destroyAll(req, res) {
        try {
            await orderModel.deleteMany();
            res.status(200).send("Cleaned!");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async payOrder(req, res) {
        try {
            const id = req.params.id;
            const order = await orderModel.findById(id);
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updateOrder = await order.save();
            res.status(200).send(updateOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async getAllOrderByUser(req, res) {
        try {
            const id = req.user.id;
            const orders = await orderModel.find({ user: id });
            res.status(200).send(orders);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

export const orderController = new orderClass();
