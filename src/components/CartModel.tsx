"use client";
import { UseCartStore } from "@/hooks/useCartStore";
import { UseWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import React, { useEffect } from "react";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";

export const CartModel = () => {
  const { cart, isLoading, removeItem, setOpenClose } = UseCartStore();
  const wixClient = UseWixClient();
  const router = useRouter();

  const handleCheckOut = async () => {
    router.push("/success");
    setTimeout(() => {
      setOpenClose();
    }, 700);
  };

  const handleCart = () => {
    router.push("/cart");
    setTimeout(() => {
      setOpenClose();
    }, 700);
  };

  return (
    <div className="w-max  absolute p-4 shadow-sm drop-shadow-md rounded-md bg-white top-9 right-0 flex flex-col gap-6 z-20 ">
      {!cart.lineItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM  */}
            {cart.lineItems?.map((item) => (
              <div className=" flex gap-4" key={item._id}>
                <Image
                  src={wixMedia.getScaledToFillImageUrl(
                    item.image!,
                    72,
                    96,
                    {}
                  )}
                  alt=""
                  width={72}
                  height={72}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP  */}
                  <div>
                    {/* TITLE  */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-sm text-green-500 ">
                            {item.quantity} x
                          </div>
                        )}{" "}
                        ₹{item.price?.amount}
                      </div>
                    </div>
                    {/* DESC  */}
                    <div className="text-sm  text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM  */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* BOTTOM  */}
            <div>
              <div className="flex  items-center justify-between font-semibold">
                <span className="">Subtotal</span>
                <span className="">₹ --- </span>
              </div>
              <p className="text-gray-500 mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button
                  onClick={handleCart}
                  className="rounded-md py-3 px-4 ring-1 ring-gray-300"
                >
                  View Cart
                </button>
                <button
                  disabled={isLoading}
                  className="rounded-md disabled:cursor-not-allowed disabled:opacity-75 py-3 px-4 bg-black text-white"
                  onClick={handleCheckOut}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
