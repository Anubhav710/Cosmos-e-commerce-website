import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_kOOacEu0nbo7YZ",
  key_secret: "XB5CSt3lYB5FQ3JzwHTsUd0a",
});

export const POST = async (req: NextRequest) => {
  const { amount } = (await req.json()) as {
    amount: string;
  };

  let options = {
    amount: amount,
    currency: "INR",
    receipt: "rcp1",
  };

  const order = await razorpay.orders.create(options);

  console.log(order);

  return NextResponse.json({ orderId: order.id }, { status: 200 });
};
