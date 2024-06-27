"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CartModel } from "./CartModel";
import { UseWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { UseCartStore } from "@/hooks/useCartStore";

const NavbarIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = UseWixClient();

  const { cart, getCart, counter, isCartOpen, setOpenClose } = UseCartStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  // let cartitemsBox = false;

  const data = null;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen(!isProfileOpen);
      if (isCartOpen) {
        setOpenClose();
      }
    }
  };
  const handleCart = () => {
    if (!cart.lineItems) {
      setOpenClose();
    } else {
      setOpenClose();
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);

    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={"/profile.png"}
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className=" absolute rounded-md bg-white p-4 top-8 left-0 text-sm shadow-md z-20 drop-shadow-md">
          <Link href={"/"}>Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src={"/notification.png"}
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer ">
        <Image
          src={"/cart.png"}
          alt=""
          width={22}
          height={22}
          className=""
          onClick={handleCart}
        />
        <div className="h-6 w-6 -top-4 bg-lama text-sm  -right-4 rounded-full absolute text-white flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModel />}
    </div>
  );
};

export default NavbarIcons;
