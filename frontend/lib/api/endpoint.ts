const API = {
    AUTH: {
        SIGN_UP: "/auth/signup",
        LOGIN: "/auth/login",
        WHOAMI: "/auth/whoami",
        GET_ALL_USERS: (page: number, limit: number) => `/auth/user/all?page=${page}&limit=${limit}`,
        GET_USER_BY_ID: (userId: string) => `/auth/user/${userId}`,
        UPDATE_USER_INFO_BY_ID: (userId: string) => `/auth/user/update/${userId}`,
        CHANGE_PASSWORD: "/auth/change-password",
        REQUEST_PASSWORD_RESET_EMAIL: "/auth/request-password-reset-email",
        RESET_ACCOUNT_PASSWORD: "/auth/reset-account-password",
        DELETE_ACCOUNT_BY_ID: (userId: string) => `/auth/delete-account/${userId}`
    },
    PACKAGE: {
        CREATE_BASIC_INFO: "/package/create-basic-info",
        ADD_PACKAGE_DETAILS: (packageId: string) => `package/add-details/${packageId}`,
        LIVE: (page: number, limit: number) => `/package/live?page=${page}&limit=${limit}`,
        GET_TOP_BOOKED: "/package/top-booked",
        GET_BY_ID: (packageId: string) => `/package/${packageId}`,
        GET_BY_SLUG: (slug: string) => `/package/slug/${slug}`,
        GET_BY_STATUS: (status: string, page: number, limit: number) => `/package/all?status=${status}&page=${page}&limit=${limit}`,
        GET_BY_ACTIVE_STATUS: (isActive: boolean, page: number, limit: number) => `/package/active-status/${isActive}?page=${page}&limit=${limit}`,
        UPDATE_BASIC_INFO_BY_ID: (packageId: string) => `/package/update-basic-info/${packageId}`,
        DELETE_BY_ID: (packageId: string) => `/package/delete/${packageId}`,
        ACTIVATE_OR_DEACTIVATE_BY_ID: (packageId: string, isActive: boolean) => `/package/activate-deactivate/${packageId}/${isActive}`,
        PUBLISH_PACKAGE_BY_ID: (packageId: string) => `/package/publish/${packageId}`,
        PHOTO: {
            UPLOAD_PHOTO_BY_ID: (packageId: string) => `/package/upload-photo/${packageId}`,
            VIEW_PHOTO: (photo: string) => `/uploads/packages/${photo}`,
            DELETE_PHOTO_BY_ID: (packageId: string) => `package/delete-photo/${packageId}`
        },
        ITINERARY: {
            ADD_BY_PKG_ID: (packageId: string) => `/package/itinerary/add/${packageId}`,
            UPDATE_BY_ID: (packageId: string, itineraryId: string) => `/package/itinerary/update/${packageId}/${itineraryId}`,
            DELETE_BY_ID: (packageId: string, itineraryId: string) => `/package/itinerary/delete/${packageId}/${itineraryId}`,
        },
        DEPARTURE: {
            ADD_BY_PKG_ID: (packageId: string) => `/package/departure/add/${packageId}`,
            UPDATE_BY_ID: (packageId: string, departureId: string) => `/package/departure/update/${packageId}/${departureId}`,
            DELETE_BY_ID: (packageId: string, departureId: string) => `/package/departure/delete/${packageId}/${departureId}`,
        }
    },
    BOOKING: {
        CREATE_BY_PACKAGE_ID: (packageId: string) => `/booking/create/${packageId}`,
        GET_ALL_BY_STATUS_AND_GUEST_TYPE: (status: string, isGuest: boolean, page: number, limit: number) => `/booking/all/${status}/${isGuest}?page=${page}&limit=${limit}`,
        GET_BY_BOOKING_ID: (bookingId: string) => `/booking/booking-id/${bookingId}`,
        GET_BY_BOOKING_REFERENCE: (bookingReference: string) => `/booking/booking-reference/${bookingReference}`,
        GET_ALL_BY_PACKAGE_ID: (packageId: string, page: number, limit: number) => `/booking/by-package-id/${packageId}?page=${page}&limit=${limit}`,
        GET_ALL_BY_USER_ID: (userId: string, page: number, limit: number) => `/booking/by-user-id/${userId}?page=${page}&limit=${limit}`,
        UPDATE_DETAILS_BY_ID: (bookingId: string) => `/booking/update-details/${bookingId}`,
        UPDATE_STATUS_BY_ID: (bookingId: string, status: string) => `/booking/update-status/${bookingId}/${status}`,
        DELETE_BY_ID: (bookingId: string) => `/booking/delete/${bookingId}`
    },
    PAYMENT: {
        GET_ALL_BY_STATUS: (paymentStatus: string, page: number, limit: number) => `/payment/all/${paymentStatus}?page=${page}&limit=${limit}`,
        GET_BY_ID: (paymentId: string) => `/payment/${paymentId}`,
        UPDATE_BY_STATUS: (paymentId: string, paymentStatus: string) => `/payment/update/${paymentId}/${paymentStatus}`,
        INITIALIZE_ESEWA_BY_ID: (paymentId: string) => `/payment/esewa/initialize/${paymentId}`,
        VERIFY_ESEWA: (data: string) => `/payment/esewa/verify-payment?data=${data}`
    },
    PROMOCODE: {
        CREATE: "/promocode/create",
        GET_BY_STATUS: (isActive: boolean, page: number, limit: number) => `/promocode/all/${isActive}?page=${page}&limit=${limit}`,
        GET_BY_ID: (promocodeId: string) => `/promocode/${promocodeId}`,
        ACTIVATE_OR_DEACTIVATE_BY_ID: (promocodeId: string, isActive: boolean) => `/promocode/activate-deactivate/${promocodeId}/${isActive}`,
        UPDATE_BY_ID: (promocodeId: string) => `/promocode/update/${promocodeId}`,
        APPLY_BY_PAYMENT_ID: (paymentId: string) => `/promocode/apply/${paymentId}`,
        DELETE_BY_ID: (promocodeId: string) => `/promocode/delete/${promocodeId}`
    },
    GALLERY: {
        CREATE: "/gallery/create",
        GET_BY_SLUG: (slug: string) => `/gallery/${slug}`,
        GET_ALL_BY_STATUS: (isActive: boolean, page: number, limit: number) => `/gallery/all/${isActive}?page=${page}&limit=${limit}`,
        UPDATE_INFO_BY_ID: (galleryId: string) => `/gallery/update-info/${galleryId}`,
        UPLOAD_COVER_PHOTO_BY_ID: (galleryId: string) => `/upload-cover-photo/${galleryId}`,
        UPLOAD_PHOTO_BY_ID: (galleryId: string) => `/upload-photo/${galleryId}`,
        DELETE_PHOTO_BY_ID: (galleryId: string) => `/delete-photo/${galleryId}`,
        ACTIVATE_OR_DEACTIVATE_BY_ID: (galleryId: string, isActive: boolean) => `/activate-deactivate/:${galleryId}/${isActive}`,
        DELETE_BY_ID: (galleryId: string) => `/delete/${galleryId}`
    },
    INQUIRY: {
        SEND: "/inquiry/send",
        GET_ALL: (page: number, limit: number) => `/inquiry/all?page=${page}&limit=${limit}`,
        REPLY_BY_ID: (inquiryId: string) => `/inquiry/reply/${inquiryId}`,
        UPDATE_STATUS_BY_ID: (inquiryId: string, status: string) => `/inquiry/update-status/${inquiryId}/${status}`,
        DELETE_BY_ID: (inquiryId: string) => `/inquiry/delete/${inquiryId}`
    },
    SUBSCRIBER: {
        CREATE: "/subscriber/create",
        GET_ALL_BY_STATUS: (status: string, page: number, limit: number) => `/subscriber/all/${status}?page=${page}&limit=${limit}`,
        UPDATE_STATUS_BY_EMAIL: (email: string, status: string) => `/subscriber/update-status/${email}/${status}`,
        DELETE_BY_ID: (subscriberId: string) => `/subscriber/delete/${subscriberId}`
    },
    SUMMARY: {
        DASHBOARD: "/summary/dashboard",
        PACKAGE: "/summary/package",
        BOOKING: "/summary/booking"
    }
};

export default API;