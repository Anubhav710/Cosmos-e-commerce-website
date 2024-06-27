import UpdateButton from "@/components/UpdateButton";
import { updateUser } from "@/lib/action";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import React from "react";

const profilePage = async () => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return <div>Not logged in!</div>;
  }

  return (
    <div className="h-[calc(100vh-80px)] mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full flex">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold my-6">Profile</h1>
          <form action={updateUser} className="flex flex-col gap-5">
            <input type="text" name="id" hidden value={user.member.contactId} />
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              placeholder={user.member?.profile?.nickname || "username"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />

            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder={user.member?.contact?.firstName || "First Name"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder={user.member?.contact?.lastName || "Last Name"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
            <label htmlFor="">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder={
                (user.member?.contact?.phones &&
                  user.member?.contact?.phones[0]) ||
                "+91 XXXXXXXXX"
              }
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder={
                (user.member?.contact?.emails &&
                  user.member?.contact?.emails[0]) ||
                "email@gmail.com"
              }
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
            <UpdateButton />
          </form>
        </div>
        <div className="md:w-1/2 w-full mt-[190px] max-w-96">
          <h1 className="text-3xl font-semibold my-6 ">Orders</h1>
          <div className="flex justify-between">
            <div>Order id</div>
            <div>price</div>
            <div>time</div>
            <div>status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
