import { Order } from "@/config/types/order";
import ImageComponent from "@/components/ui/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const estimatedDeliveryDate = new Date(order.orderDate);
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Order #{order.id}</h2>
        <p className="text-sm text-gray-600">
          Ordered on: {formatDate(order.orderDate)}
        </p>
      </div>

      {/* <p className="text-sm text-gray-500">
        Status: <span className="font-semibold">{order.status}</span> // needs to be adjusted in backend 
      </p> */}
      <p className="text-sm text-gray-500">
        Estimated Delivery:{" "}
        <span className="font-semibold">
          {formatDate(estimatedDeliveryDate)}
        </span>
      </p>

      <div className="mt-4 space-y-3">
        {order.orderItems.map((item) => (
          <Link
            href={`/products/${item.sizeVariant.product.id}`}
            key={item.id}
            className="flex items-center gap-4 p-2 border rounded-md"
          >
            <ImageComponent
              src={item.sizeVariant.product.image || "/images/placeholder.svg"}
              alt={item.sizeVariant.product.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">
                {item.sizeVariant.product.brand} {item.sizeVariant.product.name}
              </p>
              <p className="text-sm text-gray-500">
                Size: {item.sizeVariant.size}
              </p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              {item.quantity > 1 && (
                <p className="text-sm text-gray-500">
                  Price per unit:{" "}
                  <span className="font-semibold">
                    {item.sizeVariant.price.toFixed(2)} €
                  </span>
                </p>
              )}
              <p className="text-sm font-semibold">
                Subtotal: {item.subtotal.toFixed(2)} €
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center border-t pt-3">
        <p className="text-lg font-bold">
          Total: {order.totalPrice.toFixed(2)} €
        </p>
        <p className="text-sm text-gray-500">
          {order.paymentMethod.replace("_", " ")}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
