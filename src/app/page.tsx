import CategorieList from "@/components/CategorieList";
import Menu from "@/components/Menu";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { WixClientcontext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";

import Link from "next/link";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24  ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense fallback="">
          <CategorieList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.TSHIRT_PRODUCT_CATEGORY_ID}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
