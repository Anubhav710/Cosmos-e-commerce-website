"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="max-w-96 bg-lama text-white text-center py-3 rounded-md"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};
export default UpdateButton;
