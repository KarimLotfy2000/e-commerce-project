const casual = require("casual");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Define custom arrays for fashion-relevant data
const brands = [
  "Nike",
  "Adidas",
  "Zara",
  "H&M",
  "Gucci",
  "Prada",
  "Versace",
  "Louis Vuitton",
];
const materials = [
  "Cotton",
  "Leather",
  "Denim",
  "Polyester",
  "Wool",
  "Silk",
  "Linen",
];
const categories = ["Shoes", "Clothing", "Accessories"];
const genders = ["MEN", "WOMEN"];

const clothingTypes = [
  "Jacket",
  "Jeans",
  "Sneakers",
  "Scarf",
  "T-shirt",
  "Dress",
  "Boots",
];

const generateSizes = () => {
  const sizes = {};
  const availableSizes = [
    "S",
    "M",
    "L",
    "XL",
    "40",
    "41",
    "42",
    "43",
    "44",
    "36",
    "37",
    "38",
    "39",
    "40",
  ];
  availableSizes.forEach((size) => {
    sizes[size] = casual.boolean;
  });
  return sizes;
};

const generateProduct = () => {
  return {
    id: uuidv4(),
    gender: casual.random_element(genders),
    brand: casual.random_element(brands),
    material: casual.random_element(materials),
    title: `${casual.random_element(brands)} ${casual.random_element(
      clothingTypes
    )}`,

    price: parseFloat(casual.double(20, 500).toFixed(2)),
    description: casual.sentences(2),
    category: casual.random_element(categories),
    images: [
      `https://picsum.photos/seed/${uuidv4()}/600/400`, // Random image from Lorem Picsum
      `https://picsum.photos/seed/${uuidv4()}/600/400`,
      `https://picsum.photos/seed/${uuidv4()}/600/400`,
      `https://picsum.photos/seed/${uuidv4()}/600/400`,
      `https://picsum.photos/seed/${uuidv4()}/600/400`,
      `https://picsum.photos/seed/${uuidv4()}/600/400`,
    ],

    rating: {
      rate: parseFloat(casual.double(1, 5).toFixed(1)),
      count: casual.integer(10, 500),
    },
    sizes: generateSizes(),
  };
};

const generateProducts = (count) => {
  return Array.from({ length: count }, generateProduct);
};

// Function to add products to Firestore
const addProductsToFirestore = async (products) => {
  for (const product of products) {
    await firestore.collection("products").add(product);
    console.log(`Product ${product.title} added to Firestore`);
  }
};

const products = generateProducts(20);

addProductsToFirestore(products)
  .then(() => {
    console.log("All products added!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error adding products: ", error);
    process.exit(1);
  });
