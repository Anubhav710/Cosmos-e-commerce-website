import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const CategorieList = async () => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-4  mt-12 ">
      <div className="flex gap-4 md:gap-8">
        <Carousel className=" w-full h-[27rem]">
          <CarouselContent className=" w-full h-[27rem]">
            {cat.items.map((item) => (
              <CarouselItem className="basis-1/2 md:basis-1/4 lg:basis-1/5  ">
                <Link
                  key={item._id}
                  href={`/list?cat=${item.slug}`}
                  className=""
                >
                  <div className="relative bg-slate-100  h-96">
                    <Image
                      src={item.media?.mainMedia?.image?.url || "/cat.png"}
                      fill
                      alt="images"
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                  <h1 className="mt-8 font-light text-xs tracking-wide ">
                    {item.name}
                  </h1>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CategorieList;
