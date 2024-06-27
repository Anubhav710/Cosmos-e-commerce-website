"use client";
import Image from "next/image";
import React, { useState } from "react";

// const images = [
//   {
//     id: 1,
//     src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1717765450292-18590bd7d975?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: 3,
//     src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
// ];

const ProductImages = ({ items }: { items: any }) => {
  console.log(items.image);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          fill
          alt="image"
          sizes="50vw"
          className="object-cover rounded-md object-top"
        />
      </div>
      <div className="relative flex justify-between mt-8 gap-4">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            className="h-32 w-1/4 relative gap-4 mt-8 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt="images"
              className="object-cover object-top rounded-md"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
