import { WixClientcontext } from "@/context/wixContext";
import { useContext } from "react";

export const UseWixClient = () => {
  const data = useContext(WixClientcontext);

  if (!data) {
    throw new Error("wix Client is not defiend");
  }

  return data;
};
