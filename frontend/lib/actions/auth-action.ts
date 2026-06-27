import { changePasswordType, deleteAccountType, loginType, requestPasswordResetEmaiType, resetPassswordType } from "../schemas/auth.schema";
import { changePassword, deleteUserAccountByUserId, getAllUsers, getUserById, loginUser, requestPasswordResetEmail, resetAccountPassword, signupUser, updateUserInfoById, whoAmI } from "../api/auth";
import { userType } from "../schemas/user.schema";

// Handle Signup
export const handleSignup = async (data: loginType) => {
    try {
        const result = await signupUser(data);

        if (!result) {
            return {
                message: result.message || "Signup failed!",
                success: false
            };
        };

        return {
            message: result.message || "Signup successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Signup failed!",
            success: false
        };
    };
};

// Handle Login
export const handleLogin = async (data: loginType) => {
    try {
        const result = await loginUser(data);

        if (!result) {
            return {
                message: result.message || "Login failed!",
                success: false
            };
        };

        return {
            message: result.message || "Login successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Login failed!",
            success: false
        };
    };
};

// Handle Who Am I
export const handleWhoAmI = async () => {
    try {
        const result = await whoAmI();

        if (!result) {
            return {
                message: result.message || "User not found!",
                success: false
            };
        };

        return {
            message: result.message || "User fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "User not found!",
            success: false
        };
    };
};

// Handle Get All Users
export const handleGetAllUsers = async (page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllUsers(page, limit);

        if (!result) {
            return {
                message: result.message || "Users not found!",
                success: false
            };
        };

        return {
            message: result.message || "Users fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Users not found!",
            success: false
        };
    };
};

// Handle Get User By ID
export const handleGetUserById = async (userId: string) => {
    try {
        const result = await getUserById(userId);

        if (!result) {
            return {
                message: result.message || "User not found!",
                success: false
            };
        };

        return {
            message: result.message || "User fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "User not found!",
            success: false
        };
    };
};

// Handle Update User Info By ID
export const handleUpdateUserInfoById = async (userId: string, data: userType) => {
    try {
        const result = await updateUserInfoById(userId, data);

        if (!result) {
            return {
                message: result.message || "Failed to update profile!",
                success: false
            };
        };

        return {
            message: result.message || "Profile updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update profile!",
            success: false
        };
    };
};

// Handle Change Password
export const handleChangePassword = async (data: changePasswordType) => {
    try {
        const result = await changePassword(data);

        if (!result) {
            return {
                message: result.message || "Failed to change password!",
                success: false
            };
        };

        return {
            message: result.message || "Password changed successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to change password!",
            success: false
        };
    };
};

// Handle Request Password Reset Email
export const handleRequestPasswordResetEmail = async (data: requestPasswordResetEmaiType) => {
    try {
        const result = await requestPasswordResetEmail(data);

        if (!result) {
            return {
                message: result.message || "Failed to request password reset email!",
                success: false
            };
        };

        return {
            message: result.message || "Password reset email sent successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to request password reset email!",
            success: false
        };
    };
};

// Handle Reset Account Password
export const handleResetAccountPassword = async (data: resetPassswordType) => {
    try {
        const result = await resetAccountPassword(data);

        if (!result) {
            return {
                message: result.message || "Failed to reset password!",
                success: false
            };
        };

        return {
            message: result.message || "Password reset successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to reset password!",
            success: false
        };
    };
};

// Handle Delete User Account By User Id
export const handleDeleteUserAccountByUserId = async (userId: string, data: deleteAccountType) => {
    try {
        const result = await deleteUserAccountByUserId(userId, data);

        if (!result) {
            return {
                message: result.message || "Failed to delete account!",
                success: false
            };
        };

        return {
            message: result.message || "Account deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete account!",
            success: false
        };
    };
};