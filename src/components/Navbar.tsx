import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import Searchbar from "./Searchbar";
import dynamic from "next/dynamic";
// import NavbarIcons from "./NavbarIcons";

const NavbarIcons = dynamic(() => import("./NavbarIcons"), { ssr: false });

const Navbar = () => {
  return (
    <nav className="relative h-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      {/* MOBILE  */}
      <div className="flex justify-between items-center h-full md:hidden">
        <Link href={"/"} className="text-2xl uppercase tracking-wide">
          Cosmos
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREEN  */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT  */}
        <div className="W-1/3 xl:w-1/2  flex items-center gap-12 ">
          <Link href={"/"} className="flex gap-2">
            <Image src={"/logo.png"} alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-wide uppercase"> Cosmos </div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href={"/"}>Homepage</Link>
            <Link href={"/"}>Shop</Link>
            <Link href={"/"}>Deals</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </div>
        </div>
        {/* RIGHT  */}
        <div className="w-2/3  flex items-center justify-between gap-8">
          <Searchbar />
          <NavbarIcons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
