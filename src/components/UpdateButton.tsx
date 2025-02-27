"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleClick = () => {
    if (!pending) {
      router.push("/");
    }
  };
  return (
    <button
      disabled={pending}
      onClick={handleClick}
      className="max-w-96 bg-lama text-white text-center py-3 rounded-md"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};
export default UpdateButton;
