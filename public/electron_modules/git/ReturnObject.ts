export class ReturnObject {
    errorCode: ErrorCode = 0;
    value: any;

    constructor(value: any, errorCode?: ErrorCode) {
        this.value = value;

        if (errorCode !== undefined) {
            this.errorCode = errorCode;
        }
    }
}

export enum ErrorCode {
    UnknownError = 1,
    GitNotFound = 2,
    NoValidPathGiven = 3,
    LocalChangesPreventCheckout = 4,
    LocalChangesPreventPull = 5
}

export enum ErrorMessages {
    localChangesWouldBeOverwritten = "error: Your local changes to the following files would be overwritten by"
}
