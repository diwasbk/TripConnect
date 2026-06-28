import { changePasswordType, deleteAccountType, loginType, requestPasswordResetEmailType, resetPasswordType } from "../schemas/auth.schema";
import { userType } from "../schemas/user.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Signup User
export const signupUser = async (data: loginType) => {
    try {
        const response = await axiosInstance.post(API.AUTH.SIGN_UP, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Signup failed!");
    };
};

// Login User
export const loginUser = async (data: loginType) => {
    try {
        const response = await axiosInstance.post(API.AUTH.LOGIN, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Login failed!");
    };
};

// Who Am I
export const whoAmI = async () => {
    try {
        const response = await axiosInstance.get(API.AUTH.WHOAMI);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "User not found!");
    };
};

// Get All Users
export const getAllUsers = async (page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.AUTH.GET_ALL_USERS(page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Users not found!");
    };
};

// Get User By ID
export const getUserById = async (userId: string) => {
    try {
        const response = await axiosInstance.get(API.AUTH.GET_USER_BY_ID(userId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "User not found!");
    };
};

// Update User Info By ID 
export const updateUserInfoById = async (userId: string, data: userType) => {
    try {
        const response = await axiosInstance.put(API.AUTH.UPDATE_USER_INFO_BY_ID(userId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update profile!");
    };
};

// Change Password
export const changePassword = async (data: changePasswordType) => {
    try {
        const response = await axiosInstance.patch(API.AUTH.CHANGE_PASSWORD, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to change password!");
    };
};

// Request Password Reset Email
export const requestPasswordResetEmail = async (data: requestPasswordResetEmailType) => {
    try {
        const response = await axiosInstance.post(API.AUTH.REQUEST_PASSWORD_RESET_EMAIL, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to request password reset email!");
    };
};

// Reset Account Password
export const resetAccountPassword = async (data: resetPasswordType) => {
    try {
        const response = await axiosInstance.patch(API.AUTH.RESET_ACCOUNT_PASSWORD, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to reset password!");
    };
};

// Delete User Account By User ID
export const deleteUserAccountByUserId = async (userId: string, data: deleteAccountType) => {
    try {
        const response = await axiosInstance.delete(API.AUTH.DELETE_ACCOUNT_BY_ID(userId), { data });

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete account!");
    };
};