import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { ProductCardProps } from "@/components/ProductsList/ProductCard/ProductCard";

export async function fetchProductById(productId: string) {
  const productRef = doc(db, "products", productId);
  const productDoc = await getDoc(productRef);

  if (productDoc.exists()) {
    return { id: productDoc.id, ...productDoc.data() };
  } else {
    throw new Error("Product not found");
  }
}

export async function fetchProductsForMenPage() {
  const productsRef = collection(db, "products");
  const menProductsQuery = query(productsRef, where("gender", "==", "MEN"));
  const data = await getDocs(menProductsQuery);
  const products = data.docs.map((doc) => {
    const { description, images, sizes, brand, material, ...rest } = doc.data();
    return {
      ...rest,
      id: doc.id,
      primaryImage: images[0],
    } as ProductCardProps;
  });
  return products;
}
