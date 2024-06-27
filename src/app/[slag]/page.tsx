import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

const page = async ({ params }: { params: { slag: string } }) => {
  const wixClient = await wixClientServer();
  const product = await wixClient?.products
    .queryProducts()
    .eq("slug", params.slag)
    .find();

  if (!product.items[0]) {
    return notFound();
  }

  const singleProduct = await product.items[0];
  // console.log(singleProduct);
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 mt-7">
      {/* IMAGES  */}
      <div className="w-full lg:w-1/2 lg:sticky top-16 h-max">
        <ProductImages items={singleProduct.media?.items} />
      </div>

      {/* TEXTS  */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{singleProduct.name}</h1>
        <p className="text-gray-500">{singleProduct.description}</p>
        <hr />
        <div className="flex items-center gap-4">
          {singleProduct.price?.price ===
          singleProduct.price?.discountedPrice ? (
            <h3 className="font-medium text-2xl">
              ₹ {singleProduct.price?.price}
            </h3>
          ) : (
            <>
              <h3 className="line-through text-xl text-gray-500">
                ₹ {singleProduct.price?.price}
              </h3>
              <h2 className="font-medium text-2xl">
                ₹ {singleProduct.price?.discountedPrice}
              </h2>
            </>
          )}
        </div>
        <hr />
        {singleProduct.variants && singleProduct.productOptions && (
          <CustomizeProduct
            productId={singleProduct._id}
            variants={singleProduct.variants}
            productOptions={singleProduct.productOptions}
          />
        )}

        <hr />
        {singleProduct.additionalInfoSections?.map((section: any) => {
          return (
            <div key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <p
                className="text-sm "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(section.description),
                }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
