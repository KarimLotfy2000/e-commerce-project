"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  setSelectedAddress,
  addAddress,
} from "@/store/slices/checkoutSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const AddressPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { addresses, selectedAddress, loading } = useSelector(
    (state: RootState) => state.checkout
  );

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<{
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  }>({});

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!newAddress.street.trim()) newErrors.street = "Street is required";
    if (!newAddress.city.trim()) newErrors.city = "City is required";
    if (!newAddress.country.trim()) newErrors.country = "Country is required";
    if (!newAddress.zipCode.trim()) newErrors.zipCode = "Zip Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = () => {
    if (!validate()) return;

    dispatch(addAddress(newAddress));

    setNewAddress({
      street: "",
      city: "",
      country: "",
      zipCode: "",
    });

    setErrors({});
  };

  const handleNext = () => {
    if (selectedAddress) {
      router.push("/checkout/payment");
    }
  };

  if (addresses.length === 0) return <LoadingSpinner />;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Select Address</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {addresses.length > 0 ? (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  className={`w-full p-3 border rounded hover:bg-primary-hover ${
                    selectedAddress?.id === addr.id
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => dispatch(setSelectedAddress(addr))}
                >
                  {addr.street}, {addr.city}, {addr.country} - {addr.zipCode}
                </button>
              ))}
            </div>
          ) : (
            <p>No addresses found. Please add one.</p>
          )}

          <div className="my-6 flex flex-col space-y-4">
            <h2 className="text-xl font-bold mt-6">Add New Address</h2>

            <div>
              <Input
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Zip Code"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="primary" onClick={handleAddAddress}>
              Add Address
            </Button>

            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={!selectedAddress}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressPage;
