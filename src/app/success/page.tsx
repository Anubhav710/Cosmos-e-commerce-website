"use client";
import React from "react";
import Confetti from "react-confetti";

const page = () => {
  return (
    <div className="flex flex-col  gap-6 items-center justify-center h-[calc(100vh-80px)]">
      <Confetti width={3000} height={1000} />
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium">
        We sent the invoice to your e-mail
      </h2>
      <h3>You are being redirected to order page...</h3>
    </div>
  );
};

export default page;
