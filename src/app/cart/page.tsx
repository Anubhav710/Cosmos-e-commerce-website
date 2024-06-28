"use client";
import { UseCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import React from "react";
import { media as wixMedia } from "@wix/sdk";
import { UseWixClient } from "@/hooks/useWixClient";

const page = () => {
  const { cart, isLoading, removeItem, setOpenClose } = UseCartStore();

  const wixClient = UseWixClient();
  return (
    <div className="h-[calc(100vh-80px)]  overflow-auto space-y-7 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-4xl font-semibold mt-4">Cart</h1>
      {cart.lineItems?.map((item) => (
        <div
          className=" flex gap-4 bg-gray-50/20 even:bg-gray-100 p-5 rounded-md"
          key={item._id}
        >
          <Image
            src={wixMedia.getScaledToFillImageUrl(item.image!, 180, 180, {})}
            alt=""
            width={170}
            height={100}
            className="object-cover rounded-md"
          />
          <div className="flex flex-col justify-between w-full">
            {/* TOP  */}
            <div>
              {/* TITLE  */}
              <div className="flex items-center justify-between gap-8">
                <h3 className="font-semibold">{item.productName?.original}</h3>
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
    </div>
  );
};

export default page;
