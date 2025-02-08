export const collectionData = {
  men: {
    bannerImage: "/images/modelPeach3.jpg",
    bannerText: "Premium Athleisure",
    exploreTitle: "Explore Our Men's Collection",
    exploreText:
      "Discover the latest trends in men's fashion, from casual wear to premium athleisure.",
    buttonLink: "/men/products",
    buttonText: "Explore All Men's Products",
    collectionCards: [
      {
        title: "Casual Wear",
        description: "Relax in style with our premium casual collection.",
        imageUrl: "/images/men-casual.jpg",
        link: "/men/products/clothing",
        buttonText: "Explore New Arrivals",
      },
      {
        title: "Sportswear",
        description: "Performance-focused gear for every athlete.",
        imageUrl: "/images/men-sport.jpg",
        link: "/men/products/sports",
        buttonText: "Shop Best Sellers in Sports",
      },
    ],
  },
  women: {
    bannerImage: "/images/modelPeachFemale.jpeg",
    bannerText: "Elegance & Comfort",
    exploreTitle: "Explore Our Women's Collection",
    exploreText:
      "Stay ahead of the fashion curve with our latest women's styles.",
    buttonLink: "/women/products",
    buttonText: "Explore All Women's Products",
    collectionCards: [
      {
        title: "Dresses & Outfits",
        description: "Stylish and comfortable dresses for any occasion.",
        imageUrl: "/images/women-casual.jpg",
        link: "/women/products/clothing",
        buttonText: "Explore New Arrivals",
      },
      {
        title: "Stylish Accessories",
        description:
          "Elevate your look with our trendy accessories collection.",
        imageUrl: "/images/women-accessories.jpg",
        link: "/women/products/accessories",
        buttonText: "Discover Trendy Accessories",
      },
    ],
  },
};
export const paymentMethods = [
  { value: "CREDIT_CARD", text: "Credit Card" },
  { value: "DEBIT_CARD", text: "Debit Card" },
  { value: "PAYPAL", text: "PayPal" },
  { value: "CASH_ON_DELIVERY", text: "Cash on Delivery" },
];
