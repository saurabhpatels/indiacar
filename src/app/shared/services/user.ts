export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface Users {
    $key: string;
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: Number;
}