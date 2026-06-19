"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// Get Decoded Token From Cookie
export const getDecodedTokenFromCookie = async () => {
    const cookieStore = await cookies();

    const auth_token = cookieStore.get("auth_token")?.value || null;

    if (!auth_token) return null;

    const decoded_token = jwtDecode<any>(auth_token);

    return decoded_token;
};

// Clear Auth Token Cookie
export const clearAuthTokenCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
};