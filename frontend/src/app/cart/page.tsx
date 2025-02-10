import CartItemList from "@/components/Cart/CartItemList";
export const metadata = {
  title: "Your Shopping Cart | FashionFusion",
  description: "Review your selected fashion items before checkout.",
  openGraph: {
    title: "Your Shopping Cart | FashionFusion",
    description: "Check your selected items and proceed to checkout.",
    url: "https://fashionfusion.com/cart",
    type: "website",
  },
};
export default async function CartPage() {
  return (
    <div className="sm:container px-3 mx-auto py-10">
      <CartItemList />
    </div>
  );
}
