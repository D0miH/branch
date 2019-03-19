export class ReturnObject {
    errorCode: ErrorCode = 0;
    value: string | string[];

    constructor(value: string | string[], errorCode?: ErrorCode) {
        this.value = value;

        if (errorCode !== undefined) {
            this.errorCode = errorCode;
        }
    }
}

export enum ErrorCode {
    UnknownError = 1,
    GitNotFound = 2,
    NoValidPathGiven = 3
}
