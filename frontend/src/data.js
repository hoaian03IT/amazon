import { images } from "./assets/image";

const data = {
    products: [
        {
            name: "Nike slim shirt",
            slug: "nike-slim-shirt",
            category: "Shirts",
            image: images.p1,
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
        },
        {
            name: "Nike slim pant",
            slug: "nike-slim-pant",
            category: "Pants",
            image: images.p3,
            price: 100,
            countInStock: 5,
            brand: "Nike",
            rating: 405,
            numReviews: 8,
            description: "high quality pant",
        },
        {
            name: "Adidas fit shirt",
            slug: "adidas-fit-shirt",
            category: "Shirts",
            image: images.p2,
            price: 120,
            countInStock: 10,
            brand: "Adidas",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
        },
        {
            name: "Adidas fit pant",
            slug: "adidas-fit-pant",
            category: "Pants",
            image: images.p4,
            price: 120,
            countInStock: 10,
            brand: "Adidas",
            rating: 4.5,
            numReviews: 10,
            description: "high quality pant",
        },
    ],
};

export default data;
