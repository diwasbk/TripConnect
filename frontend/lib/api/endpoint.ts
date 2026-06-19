const API = {
    AUTH: {
        SIGN_UP: "/auth/signup",
        LOGIN: "/auth/login",
        WHOAMI: "/auth/whoami",
        GET_USER_BY_ID: (userId: string) => `/auth/user/${userId}`,
        UPDATE_USER_INFO_BY_ID: (userId: string) => `/auth/user/update/${userId}`,
        CHANGE_PASSWORD: "/auth/change-password",
        REQUEST_PASSWORD_RESET_EMAL: "/auth/request-password-reset-email",
        RESET_ACCOUNT_PASSWORD: "/auth/reset-account-password",
        DELETE_ACCOUNT: "/auth/delete-account"
    },
    BOOKING: {
        CREATE_BY_PACKAGE_ID: (packageId: string) => `/booking/${packageId}`,
        GET_BY_USER_ID: (userId: string) => `/booking/by-user-id/${userId}`,
        GET_BY_BOOKING_ID: (bookingId: string) => `/booking/booking-id/${bookingId}`,
        GET_BY_BOOKING_REFERENCE: (bookingReference: string) => `/booking/booking-reference/${bookingReference}`
    },
    PACKAGE: {
        CREATE_BASIC_INFO: "/package/create-basic-info",
        LIVE: (page: number) => `/package/live?page=${page}`,
        GET_TOP_BOOKED: "/package/top-booked",
        GET_BY_ID: (packageId: string) => `/package/${packageId}`,
        GET_BY_SLUG: (slug: string) => `/package/${slug}`,
        GET_BY_STATUS: (status: string) => `/package/all?status=${status}`,
        UPDATE_BASIC_INFO_BY_ID: (packageId: string) => `/package/update-basic-info/${packageId}`,
        DELETE_BY_ID: (packageId: string) => `/package/delete/${packageId}`,
        IMAGE: {
            UPLOAD_IMAGE_BY_ID: (packageId: string) => `/package/upload-photo/${packageId}`,
            VIEW_IMAGE: (image: string) => `/uploads/packages/${image}`,
            DELETE_IMAGE_BY_ID: (packageId: string) => `package/delete-photo/${packageId}`
        }
    },
    PROMOCODE: {
        CREATE: "/promocode/create",
        GET_BY_STATUS: (isActive: boolean) => `/promocode/all/${isActive}`,
        GET_BY_ID: (promocodeId: string) => `/promocode/${promocodeId}`,
        UPDATE_BY_ID: (promocodeId: string) => `/promocode/update/${promocodeId}`,
        ACTIVATE_OR_DEACTIVATE_BY_ID: (promocodeId: string, isActive: boolean) => `/activate-deactivate/${promocodeId}/${isActive}`,
        APPLY_BY_PAYMENT_ID: (paymentId: string) => `/promocode/apply/${paymentId}`,
        DELETE_BY_ID: (promocodeId: string) => `/promocode/delete/${promocodeId}`
    },
    GALLERY: {
        CREATE: "/gallery/create",
        GET_BY_SLUG: (slug: string) => `/gallery/${slug}`,
        GET_BY_STATUS: (isActive: boolean) => `/gallery/all/${isActive}`,
        UPDATE_INFO_BY_ID: (galleryId: string) => `/gallery/update-info/${galleryId}`,
        UPLOAD_COVER_PHOTO_BY_ID: (galleryId: string) => `/upload-cover-photo/${galleryId}`,
        UPLOAD_PHOTO_BY_ID: (galleryId: string) => `/upload-photo/${galleryId}`,
        DELETE_PHOTO_BY_ID: (galleryId: string) => `/delete-photo/${galleryId}`,
        ACTIVATE_OR_DEACTIVATE_BY_ID: (galleryId: string, isActive: boolean) => `/activate-deactivate/:${galleryId}/${isActive}`,
        DELETE_BY_ID: (galleryId: string) => `/delete/${galleryId}`
    },
    INQUIRY: {
        SEND: "/inquiry/send",
        GET_ALL: "/inquiry/all",
        REPLY_BY_ID: (inquiryId: string) => `/inquiry/reply/${inquiryId}`
    },
    SUBSCRIBER: {
        CREATE: "/subscriber/create",
        GET_ALL: "/subscriber/all",
    }
};

export default API;