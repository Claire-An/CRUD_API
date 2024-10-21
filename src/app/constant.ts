export const enum messageError {
    ResourceNotFound = "Resource not found",
    UserIdNotFound = "UserId not found",
    UserIdInvalid = "userId is invalid",
    UserNotFound = "User not found",
    UserInvalid = "User is invalid",
    ServerError = "Server error",
}

export const enum StatusCode {
    OK = 200,
    POST_OK = 201,
    DELETE_OK = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}