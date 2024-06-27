import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";
export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookiesStore = cookies();
    refreshToken = JSON.parse(cookiesStore.get("refreshToken")?.value || "{}");
  } catch (e) {
    console.log(e);
  }

  const myWixClient = createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });
  return myWixClient;
};
